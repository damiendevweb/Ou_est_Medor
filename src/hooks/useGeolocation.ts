import { useState, useCallback } from 'react'

interface GeoState {
  loading: boolean
  latitude?: number
  longitude?: number
  error?: string
}

export function useGeolocation() {
  const [state, setState] = useState<GeoState>({ loading: false })

  const getLocation = useCallback(() => {
    if (!navigator.geolocation) {
      setState({ loading: false, error: 'Géo non supportée' })
      return
    }

    setState({ loading: true })
    
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setState({
          loading: false,
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        })
      },
      (error) => {
        setState({ 
          loading: false, 
          error: `Refus: ${error.message}` 
        })
      },
      { enableHighAccuracy: true, timeout: 10000 }
    )
  }, [])

  return { ...state, getLocation }
}
