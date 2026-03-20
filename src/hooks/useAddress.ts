import { useEffect, useState } from 'react'

interface Address {
  display_name: string
  road?: string
  city?: string
  postcode?: string
  country?: string
}

export function useAddress(lat: number, lng: number) {
  const [address, setAddress] = useState<Address | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!lat || !lng) return

    setLoading(true)
    fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json&addressdetails=1`)
      .then(res => res.json())
      .then((data: Address) => {
        setAddress(data)
        setError('')
      })
      .catch(() => setError('Adresse indisponible'))
      .finally(() => setLoading(false))
  }, [lat, lng])

  return { address, loading, error }
}
