import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { useGeolocation } from '../hooks/useGeolocation'
import { useReverseGeocoding } from '../hooks/useReverseGeocoding'
import { useAge } from '../hooks/useAge'

type Animal = {
    id: string
    nom: string
    race: string
    age: number
    poids: number
    ok_congenere: boolean
    ok_enfants: boolean
    telephone_1: string
    telephone_2: string | null
    mail_1: string
    mail_2: string | null
    prenom_proprietaire: string
    telephone_veterinaire: string
    birth_date?: string
}

type AccessMeta = {
    from: string
    path: string
    userAgent: string
    latitude?: number
    longitude?: number
    address?: string
}

export const AnimalPage = () => {
    const { animalId } = useParams<{ animalId: string }>()
    const [animal, setAnimal] = useState<Animal | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [formData,] = useState<Partial<Animal>>({})

    const { display: ageDisplay } = useAge(formData.birth_date)

    const {
        latitude: lat,
        longitude: lng,
        getLocation,
        error: geoError,
    } = useGeolocation()

    const {
        address,
    } = useReverseGeocoding(lat ?? null, lng ?? null)

    const normalizedAnimalId = animalId?.toUpperCase() ?? ''
    const isFicheEmpty = animal && (!animal.nom || animal.nom.trim() === '')

    const logAnimalAccess = async (id: string, meta: AccessMeta) => {
        try {
            if (typeof window === 'undefined') return

            const key = `animal-access:${id}`
            const now = Date.now()
            const last = sessionStorage.getItem(key)

            if (last && now - Number(last) < 2 * 60 * 1000) return

            const { error } = await supabase.from('animal_access_events').insert({
                animal_id: id,
                event_type: 'scan',
                source: 'public_animal_page',
                meta,
            })

            if (error) {
                console.error('Erreur insert animal_access_events:', error)
                return
            }

            sessionStorage.setItem(key, String(now))
        } catch (e) {
            console.error('Erreur logAnimalAccess:', e)
        }
    }

    useEffect(() => {
        void getLocation()
    }, [getLocation])

    useEffect(() => {
        if (!normalizedAnimalId) return

        let cancelled = false

        const fetchAnimal = async () => {
            setLoading(true)
            setError(null)

            const { data, error } = await supabase
                .from('animal')
                .select('*')
                .eq('id', normalizedAnimalId)
                .single()

            if (cancelled) return

            if (error && error.code !== 'PGRST116') {
                setError('Erreur de chargement')
                setAnimal(null)
            } else if (!data) {
                setError('Animal non trouvé')
                setAnimal(null)
            } else {
                setAnimal(data)
            }

            setLoading(false)
        }

        void fetchAnimal()
        return () => { cancelled = true }
    }, [normalizedAnimalId])

    useEffect(() => {
        if (!animal?.id) return
        if (typeof window === 'undefined') return

        const key = `animal-access:${animal.id}`
        const last = sessionStorage.getItem(key)
        const now = Date.now()

        if (last && now - Number(last) < 2 * 60 * 1000) return

        let cancelled = false

        const sendWithBestAvailableData = async () => {
            if (cancelled) return

            const meta: AccessMeta = {
                from: 'url',
                path: window.location.pathname,
                userAgent: navigator.userAgent,
                latitude: lat ?? undefined,
                longitude: lng ?? undefined,
                address: address?.shortAddress ?? undefined,
            }

            await logAnimalAccess(animal.id, meta)
        }

        if (address?.shortAddress) {
            void sendWithBestAvailableData()
            return
        }

        if (geoError) {
            void sendWithBestAvailableData()
            return
        }

        const timeoutId = window.setTimeout(() => {
            void sendWithBestAvailableData()
        }, 4000)

        return () => {
            cancelled = true
            window.clearTimeout(timeoutId)
        }
    }, [animal?.id, lat, lng, address?.shortAddress, geoError])

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-light-grey">
                <div className="text-center">
                    <div className="w-14 h-14 rounded-full border-4 border-orange-300 border-t-orange-400 animate-spin mx-auto mb-4" />
                    <p className="text-text-secondary">Chargement de {normalizedAnimalId}</p>
                </div>
            </div>
        )
    }

    if (error || !animal) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-light-grey">
                <div className="text-center p-8 max-w-md">
                    <span className="text-6xl block mb-4">🐶</span>
                    <h2 className="text-4xl font-bold text-dark-grey mb-2">{normalizedAnimalId}</h2>
                    <p className="text-lg text-text-secondary mb-6">{error || 'Animal introuvable'}</p>
                    <p className="text-sm text-text-secondary">
                        Vérifie l'ID ou{' '}
                        <Link to="/" className="text-orange-400 hover:underline font-medium">retourne à l'accueil</Link>
                    </p>
                </div>
            </div>
        )
    }

    if (isFicheEmpty) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12 text-center bg-light-grey">
                <div className="max-w-md p-8 bg-white rounded-3xl shadow-xl border-t-4 border-yellow-300">
                    <div className="w-20 h-20 bg-linear-to-r from-orange-400 to-yellow-300 rounded-2xl mx-auto mb-6 flex items-center justify-center shadow-lg">
                        <span className="text-3xl">🐕</span>
                    </div>
                    <h2 className="text-3xl font-bold text-dark-grey mb-4">
                        Fiche {normalizedAnimalId}
                    </h2>
                    <p className="text-dark-grey mb-4 leading-relaxed">
                        La fiche de ce chien <strong>n'est pas encore remplie</strong>.<br />
                        <span className="text-orange-400 font-bold">C'est le vôtre ?</span>
                    </p>
                    <div className="bg-orange-100 rounded-2xl p-4 mb-6">
                        <p className="text-sm font-medium text-dark-grey">
                            👆 <strong>Inscris-toi</strong> pour remplir sa fiche complète
                        </p>
                    </div>
                    <a
                        href={`/login?mode=signup&animal=${normalizedAnimalId}`}
                        className="inline-block w-full bg-orange-400 hover:bg-orange-500 text-white font-bold py-4 px-8 rounded-full shadow-lg hover:shadow-xl transition-all text-center"
                    >
                        ✍️ Remplir ma fiche
                    </a>
                    <p className="text-xs text-text-secondary mt-6 font-mono bg-light-grey px-3 py-1 rounded-full inline-block">
                        ID: {normalizedAnimalId}
                    </p>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-light-grey py-12">
            <div className="max-w-2xl mx-auto px-4">
                <div className="bg-white rounded-3xl shadow-lg overflow-hidden border-t-4 border-orange-300">
                    <div className="bg-linear-to-r from-orange-400 to-yellow-300 p-8 text-white text-center">
                        <span className="text-6xl block mb-2">🐾</span>
                        <h1 className="text-4xl font-bold">{animal.nom}</h1>
                        <p className="text-white/80 text-lg">{animal.race}</p>
                        <span className="inline-block mt-3 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1 text-xs font-mono">
                            {animal.id}
                        </span>
                    </div>

                    <div className="p-6 md:p-8 space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="bg-light-grey rounded-2xl p-5">
                                <h3 className="font-bold text-dark-grey mb-3 text-sm uppercase tracking-wider">📊 Infos physiques</h3>
                                <div className="space-y-2 text-sm">
                                    <p className="flex justify-between"><span className="text-text-secondary">Âge</span><span className="font-medium text-dark-grey">{ageDisplay}</span></p>
                                    <p className="flex justify-between"><span className="text-text-secondary">Poids</span><span className="font-medium text-dark-grey">{animal.poids} kg</span></p>
                                </div>
                            </div>

                            <div className="bg-light-grey rounded-2xl p-5">
                                <h3 className="font-bold text-dark-grey mb-3 text-sm uppercase tracking-wider">👥 Compatibilités</h3>
                                <div className="flex flex-wrap gap-2">
                                    <span className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-sm font-medium ${animal.ok_congenere ? 'bg-green-200 text-green-700' : 'bg-red-200 text-red-700'}`}>
                                        {animal.ok_congenere ? '✓ Congénères' : '✗ Congénères'}
                                    </span>
                                    <span className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-sm font-medium ${animal.ok_enfants ? 'bg-green-200 text-green-700' : 'bg-red-200 text-red-700'}`}>
                                        {animal.ok_enfants ? '✓ Enfants' : '✗ Enfants'}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="bg-light-grey rounded-2xl p-5">
                            <h3 className="font-bold text-dark-grey mb-3 text-sm uppercase tracking-wider">📞 Contacts</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                                <div>
                                    <p className="text-text-secondary text-xs">Propriétaire</p>
                                    <p className="font-medium text-dark-grey">{animal.prenom_proprietaire}</p>
                                </div>
                                <div>
                                    <p className="text-text-secondary text-xs">Téléphone</p>
                                    <p className="font-medium">
                                        <a href={`tel:${animal.telephone_1}`} className="text-orange-400 hover:underline">
                                            {animal.telephone_1}
                                        </a>
                                        {animal.telephone_2 && (
                                            <> · <a href={`tel:${animal.telephone_2}`} className="text-orange-400 hover:underline opacity-80">{animal.telephone_2}</a></>
                                        )}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-text-secondary text-xs">Email</p>
                                    <p className="font-medium">
                                        <a href={`mailto:${animal.mail_1}`} className="text-orange-400 hover:underline">
                                            {animal.mail_1}
                                        </a>
                                        {animal.mail_2 && (
                                            <> · <a href={`mailto:${animal.mail_2}`} className="text-orange-400 hover:underline opacity-80">{animal.mail_2}</a></>
                                        )}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-text-secondary text-xs">Vétérinaire</p>
                                    <p className="font-medium">
                                        <a href={`tel:${animal.telephone_veterinaire}`} className="text-orange-400 hover:underline">
                                            {animal.telephone_veterinaire}
                                        </a>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}