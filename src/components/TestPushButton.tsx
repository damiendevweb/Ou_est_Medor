import { supabase } from '../lib/supabase'

export default function TestPushButton() {
  const sendTestPush = async () => {
    await supabase.functions.invoke('push-notification', {
      body: {},
    })
  }

  return (
    <button
      type="button"
      onClick={sendTestPush}
      className="rounded-xl bg-black px-4 py-2 text-white"
    >
      Envoyer une push test
    </button>
  )
}