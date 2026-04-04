import { useEffect, useState } from 'react'
import { reverseGeocode } from '../lib/reverse-geocoding'

type Address = {
  displayName: string
  shortAddress: string
  address: {
    houseNumber: string | null
    road: string | null
    suburb: string | null
    city: string | null
    postcode: string | null
    county: string | null
    state: string | null
    country: string | null
    countryCode: string | null
  }
} | null

export const useReverseGeocoding = (lat: number | null, lng: number | null) => {
  const [address, setAddress] = useState<Address>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (lat == null || lng == null) {
      setAddress(null)
      setError(null)
      setLoading(false)
      return
    }

    let cancelled = false

    const fetchAddress = async () => {
      setLoading(true)
      setError(null)

      try {
        const data = await reverseGeocode(lat, lng)

        if (!cancelled) {
          setAddress({
            displayName: data.displayName,
            shortAddress: data.shortAddress,
            address: data.address,
          })
        }
      } catch (e) {
        if (!cancelled) {
          setError(e instanceof Error ? e.message : String(e))
        }
      } finally {
        if (!cancelled) {
          setLoading(false)
        }
      }
    }

    void fetchAddress()

    return () => {
      cancelled = true
    }
  }, [lat, lng])

  return { address, loading, error }
}