import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useProduct } from '../hooks/useProduct'
import { FONTS, formatPrice, validatePhone } from '../lib/product.types'
import { ProductImageGallery } from '../components/ProductImageGallery'
import { ProductMedalPreview } from '../components/ProductMedalPreview'
import { ProductCustomization } from '../components/ProductCustomization'
import { ProductAccordion } from '../components/ProductAccordion'
import { ProductActions } from '../components/ProductActions'

export const ProductPage = () => {
    const { slug } = useParams()
    const { product, loading, error, sortedImages } = useProduct(slug)
    const { addToCart } = useCart()

    const [petName, setPetName] = useState('')
    const [phone1, setPhone1] = useState('')
    const [phone2, setPhone2] = useState('')
    const [phone1Error, setPhone1Error] = useState('')
    const [phone2Error, setPhone2Error] = useState('')
    const [selectedFont, setSelectedFont] = useState(FONTS[0].value)
    const [added, setAdded] = useState(false)

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

    const accordionItems = [
        ...(product.description
            ? [{ name: 'description', label: 'Description', content: <p>{product.description}</p> }]
            : []),
        {
            name: 'caracteristiques',
            label: 'Caractéristiques',
            content: (
                <ul className="space-y-2">
                    <li className="flex justify-between"><span>Marque</span><span className="font-medium text-dark-grey">Parfs</span></li>
                    <li className="flex justify-between"><span>Collection</span><span className="font-medium text-dark-grey">2022</span></li>
                    <li className="flex justify-between"><span>Référence</span><span className="font-medium text-dark-grey">G480745</span></li>
                    <li className="flex justify-between"><span>Matériau</span><span className="font-medium text-dark-grey">Acier inoxydable</span></li>
                    <li className="flex justify-between"><span>Diamètre</span><span className="font-medium text-dark-grey">30 mm</span></li>
                </ul>
            ),
        },
        {
            name: 'paiement',
            label: 'Payment & delivery',
            content: (
                <div className="space-y-2">
                    <p>Paiement sécurisé par carte bancaire (Stripe).</p>
                    <p>Livraison offerte en France métropolitaine sous 5-7 jours ouvrés.</p>
                </div>
            ),
        },
    ]

    return (
        <div className="min-h-screen bg-white">
            <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
                <div className="lg:grid lg:gap-16 lg:grid-cols-2 lg:items-start">

                    <ProductImageGallery images={sortedImages} productName={product.name} />

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

                        <ProductCustomization
                            petName={petName}
                            phone1={phone1}
                            phone2={phone2}
                            phone1Error={phone1Error}
                            phone2Error={phone2Error}
                            selectedFont={selectedFont}
                            onPetNameChange={setPetName}
                            onPhone1Change={(v) => { setPhone1(v); setPhone1Error(validatePhone(v)) }}
                            onPhone2Change={(v) => { setPhone2(v); setPhone2Error(validatePhone(v)) }}
                            onFontChange={setSelectedFont}
                        />

                        <ProductMedalPreview currentFont={currentFont} previewText={previewText} />

                        <ProductActions
                            isFormValid={isFormValid}
                            isOutOfStock={isOutOfStock}
                            added={added}
                            onAddToCart={handleAddToCart}
                        />

                        <ProductAccordion items={accordionItems} />
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
                <div className="relative w-full max-w-4xl mx-auto aspect-video overflow-hidden bg-orange-100 flex items-center justify-center">
                    <div className="relative flex items-center justify-center w-72 h-72">
                        <div className="absolute inset-0 rounded-full bg-linear-to-br from-orange-200 via-yellow-100 to-orange-300 border-[6px] border-orange-300/60" />
                        <div className="absolute inset-3 rounded-full bg-linear-to-b from-orange-100/80 to-orange-200/40" />
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
                        className="w-full max-w-4xl mx-auto aspect-video object-cover"
                    />
                )}
            </section>
        </div>
    )
}
