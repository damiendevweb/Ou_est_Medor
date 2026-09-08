// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore -- module résolu au runtime par l'Edge Runtime
import { sendMail } from '../_shared/smtp.ts'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Content-Type': 'application/json',
}

const json = (status: number, body: unknown) =>
  new Response(JSON.stringify(body), { status, headers: corsHeaders })

const isEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(JSON.stringify({ ok: true }), { status: 200, headers: corsHeaders })
  }

  if (req.method !== 'POST') {
    return json(405, { error: 'Method not allowed' })
  }

  try {
    const body = await req.json() as Record<string, unknown>

    const prenom = typeof body.prenom === 'string' ? body.prenom.trim().slice(0, 80) : ''
    const nom = typeof body.nom === 'string' ? body.nom.trim().slice(0, 80) : ''
    const email = typeof body.email === 'string' ? body.email.trim().slice(0, 200) : ''
    const telephone = typeof body.telephone === 'string' ? body.telephone.trim().slice(0, 30) : ''
    const sujet = typeof body.sujet === 'string' ? body.sujet.trim().slice(0, 80) : ''
    const message = typeof body.message === 'string' ? body.message.trim().slice(0, 4000) : ''
    const consent = body.consent === true
    const website = typeof body.website === 'string' ? body.website : ''

    // Honeypot anti-spam : un robot remplit ce champ caché
    if (website !== '') {
      return json(200, { ok: true, skipped: 'spam' })
    }

    if (!prenom || !nom || !email || !message) {
      return json(400, { error: 'Champs obligatoires manquants' })
    }
    if (!isEmail(email)) {
      return json(400, { error: 'Adresse email invalide' })
    }
    if (!consent) {
      return json(400, { error: 'Le consentement est requis' })
    }

    const subjectLabel = sujet || 'Autre'

    const text = [
      `Nouveau message depuis le formulaire de contact du site`,
      ``,
      `Prénom : ${prenom}`,
      `Nom : ${nom}`,
      `Email : ${email}`,
      ...(telephone ? [`Téléphone : ${telephone}`] : []),
      `Sujet : ${subjectLabel}`,
      ``,
      `—————`,
      message,
      `—————`,
      ``,
      `Répondre à : ${email}`,
    ].join('\n')

    const sent = await sendMail({
      to: Deno.env.get('SMTP_FROM') ?? 'contact@ouestmedor.fr',
      subject: `[Contact] ${subjectLabel} — ${prenom} ${nom}`,
      text,
      replyTo: email,
    })

    if (!sent) {
      return json(500, { error: "Impossible d'envoyer le message pour le moment. Réessaie plus tard." })
    }

    return json(200, { ok: true })
  } catch (error: unknown) {
    const err = error instanceof Error ? error : new Error(String(error))
    console.error('contact-form error:', err.message)
    return json(500, { error: 'Une erreur est survenue.' })
  }
})