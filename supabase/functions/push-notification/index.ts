// supabase/functions/send-test-push/index.ts
// @ts-nocheck

import 'jsr:@supabase/functions-js/edge-runtime.d.ts'
import { createClient } from 'npm:@supabase/supabase-js@2'
import webpush from 'npm:web-push'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Content-Type': 'application/json',
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: corsHeaders,
    })
  }

  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: corsHeaders,
    })
  }

  try {
    const authHeader = req.headers.get('Authorization')
    if (!authHeader) {
      return new Response(JSON.stringify({ error: 'Missing Authorization header' }), {
        status: 401,
        headers: corsHeaders,
      })
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL')
    const supabaseAnonKey = Deno.env.get('SUPABASE_ANON_KEY')
    const supabaseServiceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')
    const vapidPublicKey = Deno.env.get('VAPID_PUBLIC_KEY')
    const vapidPrivateKey = Deno.env.get('VAPID_PRIVATE_KEY')

    if (
      !supabaseUrl ||
      !supabaseAnonKey ||
      !supabaseServiceRoleKey ||
      !vapidPublicKey ||
      !vapidPrivateKey
    ) {
      return new Response(JSON.stringify({ error: 'Missing required environment variables' }), {
        status: 500,
        headers: corsHeaders,
      })
    }

    const userClient = createClient(supabaseUrl, supabaseAnonKey, {
      global: {
        headers: {
          Authorization: authHeader,
        },
      },
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    })

    const {
      data: { user },
      error: userError,
    } = await userClient.auth.getUser()

    if (userError || !user) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: corsHeaders,
      })
    }

    const admin = createClient(supabaseUrl, supabaseServiceRoleKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    })

    const body = await req.json().catch(() => ({}))

    const title = body?.title ?? 'DoggyTracker'
    const message = body?.body ?? 'Ceci est une notification push de test.'
    const url = body?.url ?? '/dashboard'

    const { data: subscriptions, error: subscriptionsError } = await admin
      .from('push_subscriptions')
      .select('id, endpoint, p256dh, auth')
      .eq('user_id', user.id)

    if (subscriptionsError) {
      return new Response(JSON.stringify({ error: subscriptionsError.message }), {
        status: 500,
        headers: corsHeaders,
      })
    }

    if (!subscriptions || subscriptions.length === 0) {
      return new Response(
        JSON.stringify({
          ok: false,
          message: 'No push subscriptions found for this user',
        }),
        {
          status: 404,
          headers: corsHeaders,
        }
      )
    }

    webpush.setVapidDetails(
      'mailto:contact@doggytracker.app',
      vapidPublicKey,
      vapidPrivateKey
    )

    const payload = JSON.stringify({
      title,
      body: message,
      icon: '/icons/icon-192x192.png',
      url,
    })

    let sent = 0
    let failed = 0
    const invalidSubscriptionIds: string[] = []

    for (const sub of subscriptions) {
      try {
        await webpush.sendNotification(
          {
            endpoint: sub.endpoint,
            keys: {
              p256dh: sub.p256dh,
              auth: sub.auth,
            },
          },
          payload
        )
        sent++
      } catch (error: any) {
        failed++
        console.error('Push error for subscription', sub.id, error)

        const statusCode = error?.statusCode || error?.status
        if (statusCode === 404 || statusCode === 410) {
          invalidSubscriptionIds.push(sub.id)
        }
      }
    }

    if (invalidSubscriptionIds.length > 0) {
      await admin.from('push_subscriptions').delete().in('id', invalidSubscriptionIds)
    }

    return new Response(
      JSON.stringify({
        ok: true,
        sent,
        failed,
        removedInvalidSubscriptions: invalidSubscriptionIds.length,
      }),
      {
        status: 200,
        headers: corsHeaders,
      }
    )
  } catch (error: any) {
    console.error('Unhandled error:', error)

    return new Response(
      JSON.stringify({
        error: error?.message ?? 'Internal server error',
      }),
      {
        status: 500,
        headers: corsHeaders,
      }
    )
  }
})