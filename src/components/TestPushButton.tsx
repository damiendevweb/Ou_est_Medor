import { supabase } from '../lib/supabase'

export default function TestPushButton() {
  const sendTestPush = async () => {
    const { data, error } = await supabase.functions.invoke('push-notification', {
      body: { body: 'Notification de test depuis l\'interface DoggyTracker.' },
    })

    if (error) {
      alert('Erreur: ' + error.message + (data ? '\nDétail: ' + JSON.stringify(data) : ''))
    } else {
      alert(`Notification envoyée ! (${data?.sent || 0} appareil(s))`)
    }
  }

  return (
    <button
      type="button"
      onClick={sendTestPush}
      className="rounded-xl bg-orange-400 px-4 py-2 text-white font-medium hover:bg-orange-500 transition-colors"
    >
      Envoyer une push test
    </button>
  )
}