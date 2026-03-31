import { supabase } from '../lib/supabase'

const VAPID_PUBLIC_KEY = 'BLLo_5JbZd_ag8cYUy6L5CT6ZzbkqIxMnHqkOWlvGcS0XnIIK4Iip6vS1kWaY_PcwJXnNPwjGMiyi8sj_wRtdbs'

function urlBase64ToUint8Array(base64String: string) {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4)
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/')
  const rawData = window.atob(base64)
  return Uint8Array.from([...rawData].map((char) => char.charCodeAt(0)))
}

export default function EnablePushButton() {
  const enablePush = async () => {
    const { data: userData } = await supabase.auth.getUser()
    const user = userData.user

    if (!user) {
      alert('Vous devez être connecté')
      return
    }

    if (!('serviceWorker' in navigator) || !('PushManager' in window)) {
      alert('Push non supporté sur cet appareil')
      return
    }

    const permission = await Notification.requestPermission()
    if (permission !== 'granted') {
      alert('Permission refusée')
      return
    }

    const registration = await navigator.serviceWorker.ready

    let subscription = await registration.pushManager.getSubscription()

    if (!subscription) {
      subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(VAPID_PUBLIC_KEY)
      })
    }

    const json = subscription.toJSON()

    const { error } = await supabase.from('push_subscriptions').upsert(
      {
        user_id: user.id,
        endpoint: subscription.endpoint,
        p256dh: json.keys?.p256dh,
        auth: json.keys?.auth
      },
      { onConflict: 'endpoint' }
    )

    if (error) {
      console.error(error)
      alert('Erreur enregistrement push')
      return
    }

    alert('Notifications activées')
  }

  return (
    <button
      onClick={enablePush}
      className="rounded-xl bg-teal-700 px-4 py-2 text-white"
    >
      Activer les notifications
    </button>
  )
}