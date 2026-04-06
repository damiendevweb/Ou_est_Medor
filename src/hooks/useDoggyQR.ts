import { useState, useCallback } from 'react'
import QRCode from 'qrcode'
import { supabase } from '../lib/supabase'

const generateRandomId = (): string => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  let id = ''
  for (let i = 0; i < 5; i++) {
    id += chars[Math.floor(Math.random() * chars.length)]
  }
  return id
}

export const useDoggyQR = () => {
  const [storageUrl, setStorageUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [randomId, setRandomId] = useState('')
  const generateNewQR = useCallback(async () => {
    const newId = generateRandomId()
    setRandomId(newId)
    setLoading(true)
    try {
      const { error: insertError } = await supabase.from('animal').insert({ id: newId })
      if (insertError) throw insertError
      const dataUrl = await QRCode.toDataURL(`https://doggytracker.onrender.com/${newId}`)
      const base64Data = dataUrl.split(',')[1]
      const fileBytes = Uint8Array.from(atob(base64Data), (char) => char.charCodeAt(0))
      const filePath = `qr-${newId}.png`
      const { error: uploadError } = await supabase.storage
        .from('qr-code')
        .upload(filePath, fileBytes, {
          contentType: 'image/png',
          upsert: true,
        })
      if (uploadError) throw uploadError
      const { data: urlData } = supabase.storage.from('qr-code').getPublicUrl(filePath)
      const { error: updateError } = await supabase
        .from('animal')
        .update({ qr_url: urlData.publicUrl })
        .eq('id', newId)
      if (updateError) throw updateError
      setStorageUrl(urlData.publicUrl)
    } finally {
      setLoading(false)
    }
  }, [])

  return {
    randomId,
    storageUrl,
    generateNewQR,
    loading,
  }
}