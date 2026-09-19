// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore -- Supabase Edge Functions resolve npm: imports at runtime
import Stripe from 'npm:stripe@17'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore -- Supabase Edge Functions resolve npm: imports at runtime
import { createClient } from 'npm:@supabase/supabase-js@2'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore -- module résolu au runtime par l'Edge Runtime
import { sendMail } from '../_shared/smtp.ts'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, stripe-signature',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Content-Type': 'application/json',
}

const json = (status: number, body: unknown) =>
  new Response(JSON.stringify(body), { status, headers: corsHeaders })

// Lis un secret en essayant plusieurs noms : nom canonique (utilisé en live)
// puis nom de test éventuel défini dans le dashboard Supabase.
const readSecret = (...names: string[]) => {
  for (const name of names) {
    const value = Deno.env.get(name)
    if (value) return value
  }
  return undefined
}

// Clé d'accès données (bypass RLS) :
// - nouveau format SUPABASE_SECRET_KEYS (JSON {"default":"sb_secret_xxx"})
// - legacy SUPABASE_SERVICE_ROLE_KEY (chaîne JWT), déprécié fin 2026
const getServiceRoleKey = (): string | undefined => {
  const newKeys = Deno.env.get('SUPABASE_SECRET_KEYS')
  if (newKeys) {
    try {
      const parsed = JSON.parse(newKeys) as Record<string, string>
      if (parsed['default']) return parsed['default']
    } catch {
      // Ignore, on retombe sur le legacy
    }
  }
  return Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(JSON.stringify({ ok: true }), { status: 200, headers: corsHeaders })
  }

  if (req.method !== 'POST') {
    return json(405, { error: 'Method not allowed' })
  }

  const stripeSecretKey = readSecret('STRIPE_SECRET_KEY', 'STRIPE_TEST_SECRET_KEY')
  const webhookSecret = readSecret('STRIPE_WEBHOOK_SECRET', 'STRIPE_TEST_WEBHOOK_KEY')
  const supabaseUrl = Deno.env.get('SUPABASE_URL')
  const serviceRoleKey = getServiceRoleKey()

  if (!stripeSecretKey || !webhookSecret || !supabaseUrl || !serviceRoleKey) {
    return json(500, { error: 'Missing environment variables' })
  }

  const stripe = new Stripe(stripeSecretKey, { apiVersion: '2024-06-20' })
  const supabase = createClient(supabaseUrl, serviceRoleKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  })

  const body = await req.text()
  const signature = req.headers.get('stripe-signature')

  if (!signature) {
    return json(400, { error: 'Missing stripe-signature header' })
  }

  let event: Stripe.Event
  try {
    event = await stripe.webhooks.constructEventAsync(body, signature, webhookSecret)
  } catch (error: unknown) {
    const err = error instanceof Error ? error : new Error(String(error))
    console.error('Webhook signature verification failed:', err.message)
    return json(400, { error: 'Invalid signature' })
  }

  try {
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session

      const orderId = session.metadata?.order_id
      const userId = session.metadata?.user_id ?? null

      if (!orderId) {
        return json(200, { received: true, skipped: 'No order_id in metadata' })
      }

      const { data: existing } = await supabase
        .from('orders')
        .select('id, status, stripe_session_id')
        .eq('id', orderId)
        .single()

      if (existing && existing.status === 'paid') {
        return json(200, { received: true, skipped: 'Already processed' })
      }

      const fullSession = await stripe.checkout.sessions.retrieve(session.id, {
        expand: ['line_items.data.price.product'],
      })

      const lineItems = (fullSession.line_items?.data ?? []) as Stripe.Checkout.Session.LineItem[]

      const shippingAddress = fullSession.shipping_details?.address
        ? {
            line1: shippingAddressLine1(fullSession.shipping_details.address as unknown as Record<string, unknown>),
            city: addressField(fullSession.shipping_details.address as unknown as Record<string, unknown>, 'city'),
            postal_code: addressField(fullSession.shipping_details.address as unknown as Record<string, unknown>, 'postal_code'),
            country: addressField(fullSession.shipping_details.address as unknown as Record<string, unknown>, 'country'),
          }
        : null

      const totalDetails = fullSession.total_details
      const discountCents = totalDetails?.amount_discount ?? 0
      const shippingCents = totalDetails?.amount_shipping ?? 0

      // Récupère les codes promo lisibles (ex: BIENVENUE10)
      let promoCode: string | null = null
      const breakdownDiscounts = totalDetails?.breakdown?.discounts ?? []
      const promoIds = breakdownDiscounts
        .map((d: { promotion_code?: string }) => d.promotion_code)
        .filter(Boolean) as string[]

      if (promoIds.length > 0) {
        const codes: string[] = []
        for (const promoId of promoIds) {
          try {
            const promo = await stripe.promotionCodes.retrieve(promoId)
            codes.push(promo.code)
          } catch {
            codes.push(promoId)
          }
        }
        promoCode = codes.join(',')
      }

      const orderPayload = {
        stripe_session_id: fullSession.id,
        stripe_payment_intent_id:
          typeof fullSession.payment_intent === 'string' ? fullSession.payment_intent : null,
        status: 'paid',
        user_id: userId,
        customer_email:
          fullSession.customer_details?.email ?? fullSession.customer_email ?? null,
        shipping_address: shippingAddress as unknown as Record<string, unknown> | null,
        shipping_cents: shippingCents,
        subtotal_cents: fullSession.amount_subtotal ?? 0,
        discount_cents: discountCents,
        total_cents: fullSession.amount_total ?? 0,
        promo_code: promoCode,
        currency: (fullSession.currency ?? 'eur').toLowerCase(),
      }

      if (existing) {
        const { error: updateError } = await supabase
          .from('orders')
          .update(orderPayload)
          .eq('id', orderId)
        if (updateError) {
          console.error('Order update error:', updateError)
          return json(500, { error: 'Failed to update order' })
        }
      } else {
        const { error: insertError } = await supabase
          .from('orders')
          .insert({ id: orderId, ...orderPayload })
        if (insertError) {
          console.error('Order insert error:', insertError)
          return json(500, { error: 'Failed to create order' })
        }
      }

      const orderItems = lineItems.map((li) => {
        const product = li.price?.product as
          | (Stripe.Product & { metadata?: Record<string, string> })
          | string
          | null

        const metadata = product && typeof product === 'object' ? (product.metadata ?? {}) : {}

        const customization =
          metadata.pet_name != null || metadata.phone1 != null
            ? {
                petName: metadata.pet_name ?? '',
                phone1: metadata.phone1 ?? '',
                phone2: metadata.phone2 ?? '',
                font: metadata.font ?? '',
              }
            : null

        return {
          order_id: orderId,
          product_id: metadata.product_id ?? null,
          quantity: li.quantity ?? 1,
          unit_price_cents: Math.round((li.amount_total ?? 0) / (li.quantity ?? 1)),
          customization,
        }
      }).filter((oi) => oi.product_id)

      if (orderItems.length > 0) {
        const { error: itemsError } = await supabase.from('order_items').insert(orderItems)
        if (itemsError) {
          console.error('Order items insert error:', itemsError)
        }
      }

      // Décrémente le stock (atomique, sans effet si stock limité insuffisant)
      for (const oi of orderItems) {
        const { error: stockError } = await supabase.rpc('decrement_product_stock', {
          p_product_id: oi.product_id,
          p_quantity: oi.quantity,
        })
        if (stockError) {
          console.error('Stock decrement error:', stockError)
        }
      }

      // Envoie l'email de confirmation (best-effort, après la réponse au webhook)
      const customerEmail = orderPayload.customer_email
      if (customerEmail && lineItems.length > 0) {
        const confirmPromise = sendOrderConfirmation({
          email: customerEmail,
          orderId,
          currency: orderPayload.currency,
          lines: lineItems.map((li) => {
            const product = li.price?.product as unknown
            const productName =
              product && typeof product === 'object' && 'name' in product
                ? String((product as { name?: string }).name ?? 'Produit')
                : 'Produit'
            const metadata =
              product && typeof product === 'object' && 'metadata' in product
                ? ((product as { metadata?: Record<string, string> }).metadata ?? {})
                : {}
            const customization =
              metadata.pet_name != null || metadata.phone1 != null
                ? ` — ${metadata.pet_name ?? ''}${metadata.phone1 ? ` · ${metadata.phone1}` : ''}${metadata.phone2 ? ` · ${metadata.phone2}` : ''}`
                : ''
            return {
              name: `${productName}${customization}`,
              quantity: li.quantity ?? 1,
              unitPriceCents: Math.round((li.amount_total ?? 0) / (li.quantity ?? 1)),
            }
          }),
          subtotalCents: orderPayload.subtotal_cents,
          discountCents: orderPayload.discount_cents,
          shippingCents: orderPayload.shipping_cents,
          totalCents: orderPayload.total_cents,
          address: orderPayload.shipping_address as
            | { line1?: string | null; city?: string | null; postal_code?: string | null; country?: string | null }
            | null,
        })
        const waitUntil = (globalThis as { EdgeRuntime?: { waitUntil: (p: Promise<unknown>) => void } })
          .EdgeRuntime?.waitUntil
        if (waitUntil) {
          waitUntil(confirmPromise)
        } else {
          void confirmPromise
        }
      }

      return json(200, {
        received: true,
        orderId,
        status: 'paid',
        items: orderItems.length,
      })
    }

    return json(200, { received: true, skipped: `Unhandled event ${event.type}` })
  } catch (error: unknown) {
    const err = error instanceof Error ? error : new Error(String(error))
    console.error('Unhandled error in stripe-webhook:', err)
    return json(500, { error: err.message ?? 'Internal server error' })
  }
})

function shippingAddressLine1(address: Record<string, unknown>): string | null {
  const line1 = address['line1'] as string | null | undefined
  const line2 = address['line2'] as string | null | undefined
  return [line1, line2].filter(Boolean).join(' ') || null
}

function addressField(address: Record<string, unknown>, key: string): string | null {
  const value = address[key] as string | null | undefined
  return value ?? null
}

type ConfirmationEmailArgs = {
  email: string
  orderId: string
  currency: string
  lines: { name: string; quantity: number; unitPriceCents: number }[]
  subtotalCents: number
  discountCents: number
  shippingCents: number
  totalCents: number
  address: { line1?: string | null; city?: string | null; postal_code?: string | null; country?: string | null } | null
}

const formatPrice = (cents: number, currency: string) =>
  new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: currency.toUpperCase(),
  }).format(cents / 100)

const sendOrderConfirmation = async (args: ConfirmationEmailArgs) => {
  const { email, orderId, currency, lines, subtotalCents, discountCents, shippingCents, totalCents, address } = args

  const linesText = lines
    .map((l) => `• ${l.name}\n  ${l.quantity} × ${formatPrice(l.unitPriceCents, currency)} = ${formatPrice(l.unitPriceCents * l.quantity, currency)}`)
    .join('\n')

  const addressText = address?.line1
    ? `${address.line1}${address.postal_code ? `, ${address.postal_code}` : ''}${address.city ? ` ${address.city}` : ''}${address.country ? ` (${address.country})` : ''}`
    : '(adresse non renseignée)'

  const text = [
    `Bonjour,`,
    ``,
    `Merci pour votre commande sur Où est Médor ?`,
    ``,
    `Référence de commande : ${orderId.slice(0, 8).toUpperCase()}`,
    ``,
    `====================`,
    linesText,
    ``,
    `Sous-total : ${formatPrice(subtotalCents, currency)}`,
    ...(discountCents > 0 ? [`Remise : −${formatPrice(discountCents, currency)}`] : []),
    `Livraison : ${shippingCents > 0 ? formatPrice(shippingCents, currency) : 'Offerte'}`,
    `TOTAL : ${formatPrice(totalCents, currency)}`,
    `====================`,
    ``,
    `Livraison prévue à :`,
    addressText,
    ``,
    `Votre médaillle sera expédiée sous 48h ouvrées.`,
    ``,
    `À bientôt,`,
    `L'équipe Où est Médor ?`,
  ].join('\n')

  await sendMail({
    to: email,
    subject: `Confirmation de commande ${orderId.slice(0, 8).toUpperCase()} — Où est Médor ?`,
    text,
  })
}