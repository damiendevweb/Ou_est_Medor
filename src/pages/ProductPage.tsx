import { useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { useCart } from '../context/CartContext'

type ProductImage = {
    id: string
    image_url: string
    image_alt: string | null
    sort_order: number
    is_primary: boolean
}

type Product = {
    id: string
    slug: string
    name: string
    description: string | null
    price_cents: number
    category: string | null
    stock: number | null
    is_active: boolean
    product_images: ProductImage[]
}

const formatPrice = (priceCents: number) =>
    new Intl.NumberFormat('fr-FR', {
        style: 'currency',
        currency: 'EUR',
    }).format(priceCents / 100)

const FONTS = [
    { value: 'Fredoka', label: 'Fredoka', family: "'Fredoka', sans-serif", desc: 'Ron&dote;de et amicale' },
    { value: 'DM Serif Display', label: 'Serif', family: "'DM Serif Display', serif", desc: 'Élégante et classique' },
    { value: 'Poppins', label: 'Poppins', family: "'Poppins', sans-serif", desc: 'Moderne et épurée' },
]

export const ProductPage = () => {
    const { slug } = useParams()
    const [product, setProduct] = useState<Product | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const { addToCart } = useCart()

    const [petName, setPetName] = useState('')
    const [phone1, setPhone1] = useState('')
    const [phone2, setPhone2] = useState('')
    const [selectedFont, setSelectedFont] = useState(FONTS[0].value)
    const [added, setAdded] = useState(false)

    useEffect(() => {
        const getProduct = async () => {
            if (!slug) return
            setLoading(true)
            setError(null)

            const { data, error } = await supabase
                .from('products')
                .select(`
          id,
          slug,
          name,
          description,
          price_cents,
          category,
          stock,
          is_active,
          product_images (
            id,
            image_url,
            image_alt,
            sort_order,
            is_primary
          )
        `)
                .eq('slug', slug)
                .eq('is_active', true)
                .single()

            if (error) {
                console.error(error)
                setError('Impossible de charger ce produit.')
                setProduct(null)
            } else {
                setProduct(data)
            }
            setLoading(false)
        }
        getProduct()
    }, [slug])

    const sortedImages = useMemo(() => {
        if (!product?.product_images) return []
        return [...product.product_images].sort((a, b) => a.sort_order - b.sort_order)
    }, [product])

    const isFormValid = petName.trim() !== '' && phone1.trim() !== ''

    const handleAddToCart = () => {
        if (!product || !isFormValid) return
        addToCart({
            id: product.id,
            slug: product.slug,
            name: product.name,
            price_cents: product.price_cents,
            image_url: sortedImages[0]?.image_url ?? null,
            customization: {
                petName: petName.trim(),
                phone1: phone1.trim(),
                phone2: phone2.trim(),
                font: selectedFont,
            },
        })
        setAdded(true)
        setTimeout(() => setAdded(false), 2000)
    }

    const previewText = petName
        ? `${petName}\n${phone1 || '06 XX XX XX XX'}${phone2 ? `\n${phone2}` : ''}`
        : 'Médor\n06 01 02 03 04\n06 05 06 07 08'

    const currentFont = FONTS.find(f => f.value === selectedFont)!

    if (loading) {
        return (
            <div className="min-h-screen bg-light-grey flex items-center justify-center">
                <p className="text-lg text-text-secondary">Chargement du produit...</p>
            </div>
        )
    }

    if (error) {
        return (
            <div className="min-h-screen bg-light-grey flex items-center justify-center">
                <p className="text-lg text-red-500">{error}</p>
            </div>
        )
    }

    if (!product) {
        return (
            <div className="min-h-screen bg-light-grey flex items-center justify-center">
                <p className="text-lg text-text-secondary">Produit introuvable.</p>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-light-grey">
            <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
                <div className="grid gap-12 lg:grid-cols-2">

                    <div className="space-y-4">
                        {sortedImages[0] && (
                            <div className="rounded-3xl overflow-hidden shadow-lg border-2 border-white">
                                <img
                                    src={sortedImages[0].image_url}
                                    alt={sortedImages[0].image_alt || product.name}
                                    className="aspect-square w-full object-cover"
                                />
                            </div>
                        )}

                        {sortedImages.length > 1 && (
                            <div className="grid grid-cols-2 gap-4">
                                {sortedImages.slice(1, 3).map((image) => (
                                    <div key={image.id} className="rounded-2xl overflow-hidden shadow border border-white">
                                        <img
                                            src={image.image_url}
                                            alt={image.image_alt || product.name}
                                            className="aspect-square w-full object-cover"
                                        />
                                    </div>
                                ))}
                            </div>
                        )}

                        <div className="bg-white rounded-3xl p-6 shadow-lg border-t-4 border-orange-300">
                            <h3 className="font-bold text-dark-grey mb-3">Aperçu de la gravure</h3>
                            <div className="bg-light-grey rounded-2xl p-6 min-h-[160px] flex items-center justify-center">
                                <div className="text-center" style={{ fontFamily: currentFont.family }}>
                                    {previewText.split('\n').map((line, i) => (
                                        <p key={i} className="text-dark-grey" style={{ fontSize: i === 0 ? '1.4rem' : '1rem', fontWeight: i === 0 ? 700 : 400 }}>
                                            {line}
                                        </p>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col gap-6">
                        <div>
                            <span className="inline-block bg-orange-100 text-orange-400 text-xs font-bold px-3 py-1 rounded-full mb-4">
                                {product.category || 'Médaille connectée'}
                            </span>
                            <h1 className="text-3xl md:text-4xl font-bold text-dark-grey">
                                {product.name}
                            </h1>

                            <p className="mt-4 text-2xl font-bold text-orange-400">
                                {formatPrice(product.price_cents)}
                            </p>

                            {product.description && (
                                <div className="mt-4">
                                    <p className="text-text-secondary leading-relaxed">
                                        {product.description}
                                    </p>
                                </div>
                            )}
                        </div>

                        <div className="bg-white rounded-3xl p-6 shadow-lg border-t-4 border-yellow-300">
                            <h3 className="font-bold text-dark-grey text-lg mb-5">
                                Personnalise ta médaille
                            </h3>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-semibold text-dark-grey mb-1.5">
                                        Nom de l'animal <span className="text-orange-400">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={petName}
                                        onChange={e => setPetName(e.target.value)}
                                        placeholder="ex: Médor"
                                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-orange-400 focus:outline-none transition-colors bg-light-grey text-dark-grey"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-dark-grey mb-1.5">
                                        Téléphone 1 <span className="text-orange-400">*</span>
                                    </label>
                                    <input
                                        type="tel"
                                        value={phone1}
                                        onChange={e => setPhone1(e.target.value)}
                                        placeholder="ex: 06 01 02 03 04"
                                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-orange-400 focus:outline-none transition-colors bg-light-grey text-dark-grey"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-dark-grey mb-1.5">
                                        Téléphone 2 <span className="text-text-secondary">(optionnel)</span>
                                    </label>
                                    <input
                                        type="tel"
                                        value={phone2}
                                        onChange={e => setPhone2(e.target.value)}
                                        placeholder="ex: 06 05 06 07 08"
                                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-orange-400 focus:outline-none transition-colors bg-light-grey text-dark-grey"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-dark-grey mb-3">
                                        Police d'écriture
                                    </label>
                                    <div className="grid grid-cols-3 gap-3">
                                        {FONTS.map((font) => (
                                            <button
                                                key={font.value}
                                                type="button"
                                                onClick={() => setSelectedFont(font.value)}
                                                className={`p-3 rounded-xl border-2 text-center transition-all ${
                                                    selectedFont === font.value
                                                        ? 'border-orange-400 bg-orange-100 shadow-md'
                                                        : 'border-gray-200 bg-light-grey hover:border-orange-200'
                                                }`}
                                            >
                                                <p className="text-sm font-bold text-dark-grey mb-1" style={{ fontFamily: font.family }}>
                                                    {font.label}
                                                </p>
                                                <p className="text-[10px] text-text-secondary">{font.desc}</p>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-3xl p-6 shadow-lg border-t-4 border-orange-300">
                            <div className="flex items-center gap-4 mb-4">
                                <h3 className="font-bold text-dark-grey text-lg">Aperçu des polices</h3>
                            </div>
                            <div className="space-y-4">
                                {FONTS.map((font) => (
                                    <div key={font.value} className="bg-light-grey rounded-xl p-4">
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-xs font-semibold text-text-secondary">{font.label}</span>
                                            <span className="text-[10px] text-text-secondary">{font.desc}</span>
                                        </div>
                                        <p
                                            className="text-xl text-dark-grey"
                                            style={{ fontFamily: font.family }}
                                        >
                                            {petName || 'Médor'} — {phone1 || '06 01 02 03 04'}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {typeof product.stock === 'number' && (
                            <p className={`text-sm font-medium ${product.stock > 0 ? 'text-green-400' : 'text-red-400'}`}>
                                {product.stock > 0 ? '✓ En stock' : 'Rupture de stock'}
                            </p>
                        )}

                        <button
                            onClick={handleAddToCart}
                            disabled={!isFormValid}
                            type="button"
                            className={`w-full inline-flex items-center justify-center gap-2 rounded-full px-8 py-4 text-lg font-bold shadow-lg hover:shadow-xl transition-all ${
                                isFormValid
                                    ? 'bg-orange-400 hover:bg-orange-500 text-white hover:scale-[1.02]'
                                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                            }`}
                        >
                            {added ? (
                                <>
                                    ✓ Ajouté au panier !
                                </>
                            ) : (
                                <>
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" />
                                    </svg>
                                    Ajouter au panier
                                </>
                            )}
                        </button>

                        {!isFormValid && (
                            <p className="text-xs text-text-secondary text-center -mt-4">
                                Remplis le nom de l'animal et le téléphone 1 pour ajouter au panier
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
