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
    { value: 'Fredoka', label: 'Fredoka', family: "'Fredoka', sans-serif", desc: 'Ronde et amicale' },
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
    const [phone1Error, setPhone1Error] = useState('')
    const [phone2Error, setPhone2Error] = useState('')
    const [selectedFont, setSelectedFont] = useState(FONTS[0].value)
    const [added, setAdded] = useState(false)

    const validatePhone = (value: string) => {
        if (!value) return ''
        if (value.length < 10) return 'Minimum 10 caractères'
        if (value.length > 14) return 'Maximum 14 caractères'
        if (/[^\d ]/.test(value)) return 'Seuls les chiffres et les espaces sont autorisés'
        const digits = value.replace(/\s/g, '')
        if (digits.length !== 10) return 'Le numéro doit contenir exactement 10 chiffres'
        return ''
    }

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
                .maybeSingle()

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

    const isFormValid = petName.trim() !== '' && phone1.trim() !== '' && !phone1Error && !phone2Error

    const isOutOfStock = product?.stock !== null && product?.stock !== undefined && product.stock <= 0

    const handleAddToCart = () => {
        if (!product || !isFormValid || isOutOfStock) return
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
        ? `${petName}\n${phone1 || '06 01 02 03 04'}${phone2 ? `\n${phone2}` : ''}`
        : 'Médor\n06 01 02 03 04\n06 05 06 07 08'

    const currentFont = FONTS.find(f => f.value === selectedFont)!

    const [openAccordion, setOpenAccordion] = useState<string | null>(null)

    const toggleAccordion = (name: string) => {
        setOpenAccordion(openAccordion === name ? null : name)
    }

    const accordion = (name: string, label: string, content: React.ReactNode) => (
        <div className="border-b border-gray-200">
            <button
                onClick={() => toggleAccordion(name)}
                className="flex w-full items-center justify-between py-4 text-left text-sm font-semibold text-dark-grey hover:text-orange-400 transition-colors"
            >
                {label}
                <svg className={`w-4 h-4 transition-transform ${openAccordion === name ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
            </button>
            {openAccordion === name && (
                <div className="pb-4 text-sm text-text-secondary leading-relaxed">
                    {content}
                </div>
            )}
        </div>
    )

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
        <div className="min-h-screen bg-white">
            <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
                <div className="lg:grid lg:gap-16 lg:grid-cols-2 lg:items-start">

                    <div className="space-y-4 lg:sticky lg:top-27">
                        {sortedImages[0] && (
                            <img
                                src={sortedImages[0].image_url}
                                alt={sortedImages[0].image_alt || product.name}
                                className="aspect-square w-full object-cover"
                            />
                        )}

                        {sortedImages.length > 1 && (
                            <div className="grid grid-cols-2 gap-4">
                                {sortedImages.slice(1, 3).map((image) => (
                                    <img
                                        key={image.id}
                                        src={image.image_url}
                                        alt={image.image_alt || product.name}
                                        className="aspect-square w-full object-cover"
                                    />
                                ))}
                            </div>
                        )}


                    </div>

                    <div className="flex flex-col gap-8">
                        <div>
                            <p className="text-xs tracking-[0.3em] text-text-secondary uppercase mb-3">Médaille connectée</p>
                            <h1 className="text-4xl md:text-5xl text-dark-grey" style={{ fontFamily: "'DM Serif Display', serif" }}>
                                {product.name}
                            </h1>
                            <p className="mt-4 text-2xl font-bold text-dark-grey">
                                {formatPrice(product.price_cents)}
                            </p>
                            {product.description && (
                                <p className="mt-5 text-sm text-text-secondary leading-relaxed max-w-md">
                                    {product.description}
                                </p>
                            )}
                        </div>

                        <div>
                            <p className="text-xs tracking-[0.3em] text-text-secondary uppercase mb-3">Personnalisation</p>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-xs tracking-wider text-text-secondary uppercase mb-2">Nom de l'animal *</label>
                                    <input
                                        type="text"
                                        value={petName}
                                        onChange={e => setPetName(e.target.value)}
                                        placeholder="ex: Médor"
                                        className="w-full p-2 border-b border-dark-grey/30 focus:border-dark-grey focus:outline-none bg-transparent text-dark-grey"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs tracking-wider text-text-secondary uppercase mb-2">Téléphone 1 *</label>
                                    <input 
                                        type="tel"
                                        value={phone1}
                                        onChange={e => {
                                            const v = e.target.value
                                            setPhone1(v)
                                            setPhone1Error(validatePhone(v))
                                        }}
                                        placeholder="06 01 02 03 04"
                                        className={`w-full p-2 border-b focus:outline-none bg-transparent text-dark-grey ${
                                            phone1Error ? 'border-red-400' : 'border-dark-grey/30 focus:border-dark-grey'
                                        }`}
                                    />
                                    {phone1Error && <p className="text-xs text-red-400 mt-1">{phone1Error}</p>}
                                </div>

                                <div>
                                    <label className="block text-xs tracking-wider text-text-secondary uppercase mb-2">Téléphone 2 <span className="text-text-secondary/70">(optionnel)</span></label>
                                    <input
                                        type="tel"
                                        value={phone2}
                                        onChange={e => {
                                            const v = e.target.value
                                            setPhone2(v)
                                            setPhone2Error(validatePhone(v))
                                        }}
                                        placeholder="06 05 06 07 08"
                                        className={`w-full p-2 border-b focus:outline-none bg-transparent text-dark-grey ${
                                            phone2Error ? 'border-red-400' : 'border-dark-grey/30 focus:border-dark-grey'
                                        }`}
                                    />
                                    {phone2Error && <p className="text-xs text-red-400 mt-1">{phone2Error}</p>}
                                </div>

                                <div>
                                    <p className="text-xs tracking-wider text-text-secondary uppercase mb-3">Police d'écriture</p>
                                    <div className="flex gap-2">
                                        {FONTS.map((font) => (
                                            <button
                                                key={font.value}
                                                type="button"
                                                onClick={() => setSelectedFont(font.value)}
                                                className={`px-4 py-2 text-sm border transition-all ${
                                                    selectedFont === font.value
                                                        ? 'border-dark-grey bg-dark-grey text-white'
                                                        : 'border-dark-grey/30 text-dark-grey hover:border-dark-grey'
                                                }`}
                                                style={{ fontFamily: font.family }}
                                            >
                                                {font.label}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                                                <div className="flex items-center justify-center gap-6">
                            <div className="relative flex items-center justify-center w-40 h-40 shrink-0">
                                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-gray-300 via-gray-100 to-gray-400 border-[5px] border-gray-400/60" />
                                <div className="absolute inset-2.5 rounded-full bg-gradient-to-b from-gray-100/80 to-gray-300/40" />
                                <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full border-[2.5px] border-gray-400/70 bg-gray-200/50" />
                                <div className="relative text-center px-4" style={{ fontFamily: currentFont.family }}>
                                    {previewText.split('\n').map((line, i) => (
                                        <p key={i} className={`text-gray-700 ${i === 0 ? 'text-base font-bold' : 'text-xs'}`}>
                                            {line}
                                        </p>
                                    ))}
                                </div>
                            </div>
                            <div className="relative flex items-center justify-center w-40 h-40 shrink-0">
                                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-gray-300 via-gray-100 to-gray-400 border-[5px] border-gray-400/60" />
                                <div className="absolute inset-2.5 rounded-full bg-gradient-to-b from-gray-100/80 to-gray-300/40" />
                                <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full border-[2.5px] border-gray-400/70 bg-gray-200/50" />
                                <img
                                    src="https://izugqskkkniyybedqoem.supabase.co/storage/v1/object/public/qr-code/qr-ZCRBZ.png"
                                    alt="QR code de la médaille"
                                    className="relative w-28 h-28 mix-blend-multiply"
                                />
                            </div>
                        </div>

                        <div className="flex flex-col gap-3 pt-2">
                            <button
                                onClick={handleAddToCart}
                                disabled={!isFormValid || isOutOfStock}
                                type="button"
                                className={`w-full inline-flex items-center justify-center gap-2 px-8 py-4 text-sm font-semibold tracking-widest uppercase transition-all ${
                                    isOutOfStock
                                        ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                        : isFormValid
                                            ? 'bg-dark-grey text-white hover:bg-black'
                                            : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                }`}
                            >
                                {added ? '✓ Ajouté au panier' : 'Ajouter au panier'}
                            </button>
                            {isOutOfStock && (
                                <p className="text-xs text-red-400 font-medium">Ce produit est actuellement en rupture de stock</p>
                            )}
                            {!isOutOfStock && !isFormValid && (
                                <p className="text-xs text-text-secondary">Remplis le nom et le téléphone 1 pour ajouter au panier</p>
                            )}
                        </div>

                        <div className="pt-2">
                            {product.description && accordion('description', 'Description', (
                                <p>{product.description}</p>
                            ))}
                            {accordion('caracteristiques', 'Caractéristiques', (
                                <ul className="space-y-2">
                                    <li className="flex justify-between"><span>Marque</span><span className="font-medium text-dark-grey">Parfs</span></li>
                                    <li className="flex justify-between"><span>Collection</span><span className="font-medium text-dark-grey">2022</span></li>
                                    <li className="flex justify-between"><span>Référence</span><span className="font-medium text-dark-grey">G480745</span></li>
                                    <li className="flex justify-between"><span>Matériau</span><span className="font-medium text-dark-grey">Acier inoxydable</span></li>
                                    <li className="flex justify-between"><span>Diamètre</span><span className="font-medium text-dark-grey">30 mm</span></li>
                                </ul>
                            ))}
                            {accordion('paiement', 'Payment & delivery', (
                                <div className="space-y-2">
                                    <p>Paiement sécurisé par carte bancaire (Stripe).</p>
                                    <p>Livraison offerte en France métropolitaine sous 5-7 jours ouvrés.</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <section className="py-24 text-center">
                <div className="mx-auto max-w-3xl px-4 mb-12">
                    <h2 className="text-3xl md:text-5xl text-dark-grey mb-6" style={{ fontFamily: "'DM Serif Display', serif" }}>A bold burst of identity.</h2>
                    <p className="text-sm text-text-secondary leading-relaxed max-w-xl mx-auto">
                        Au cœur de ce médaillon, un QR code unique, prêt à transmettre ton identité à la personne qui le scanne.
                    </p>
                </div>
                <div className="relative w-full max-w-4xl mx-auto aspect-[16/9] overflow-hidden bg-orange-100 flex items-center justify-center">
                    <div className="relative flex items-center justify-center w-72 h-72">
                        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-orange-200 via-yellow-100 to-orange-300 border-[6px] border-orange-300/60" />
                        <div className="absolute inset-3 rounded-full bg-gradient-to-b from-orange-100/80 to-orange-200/40" />
                        <div className="absolute top-3 left-1/2 -translate-x-1/2 w-5 h-5 rounded-full border-[3px] border-orange-300/70 bg-orange-100/50" />
                        <img
                            src="https://izugqskkkniyybedqoem.supabase.co/storage/v1/object/public/qr-code/qr-ZCRBZ.png"
                            alt="QR code médaillon"
                            className="relative w-44 h-44 mix-blend-multiply"
                        />
                    </div>
                </div>
            </section>

            <section className="py-20">
                <div className="mx-auto max-w-6xl px-4 grid md:grid-cols-2 gap-12 items-center">
                    {sortedImages[0] && (
                        <img
                            src={sortedImages[0].image_url}
                            alt={product.name}
                            className="aspect-square w-full object-cover"
                        />
                    )}
                    <div className="text-center md:text-left">
                        <h3 className="text-2xl md:text-3xl text-dark-grey mb-6 leading-tight" style={{ fontFamily: "'DM Serif Display', serif" }}>
                            Enhances the bond between you and your pet.
                        </h3>
                        <p className="text-sm text-text-secondary leading-relaxed mb-8">
                            Parfs Médaille instaure un rituel apaisant, comme un rituel parfumé. Un détail pensé pour ne jamais perdre ce qui compte.
                        </p>
                        <a href="#personnalisation" className="inline-block text-xs tracking-[0.3em] uppercase text-dark-grey border-b border-dark-grey pb-1 hover:opacity-70">Acquérir</a>
                    </div>
                </div>
            </section>

            <section className="py-24 text-center">
                <div className="mx-auto max-w-3xl px-4 mb-12">
                    <h2 className="text-3xl md:text-5xl text-dark-grey mb-6" style={{ fontFamily: "'DM Serif Display', serif" }}>Echo Your Love</h2>
                    <p className="text-sm text-text-secondary leading-relaxed max-w-xl mx-auto">
                        Un médaillon qui résonne comme un témoignage d'affection, capturant le lien unique entre toi et ton animal.
                    </p>
                </div>
                {sortedImages[0] && (
                    <img
                        src={sortedImages[0].image_url}
                        alt={product.name}
                        className="w-full max-w-4xl mx-auto aspect-[16/9] object-cover"
                    />
                )}
            </section>


        </div>
    )
}
