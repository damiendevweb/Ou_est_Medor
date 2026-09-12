import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react'
import { useCart } from '../context/CartContext'
import { useProduct } from '../hooks/useProduct'
import { FONTS, formatPrice, validatePhone } from '../lib/product.types'
import { ProductImageGallery } from '../components/ProductImageGallery'
import { ProductMedalPreview } from '../components/ProductMedalPreview'
import { ProductCustomization } from '../components/ProductCustomization'
import { ProductActions } from '../components/ProductActions'

const faqItems = [
    {
        q: 'Comment fonctionne le QR code ?',
        a: 'Chaque médaillon est gravé avec un QR code unique. Quand quelqu\'un le scanne avec son téléphone, il accède instantanément à la fiche de votre animal avec ses coordonnées et informations importantes.'
    },
    {
        q: 'Le médaillon est-il résistant à l\'eau ?',
        a: 'Oui, le médaillon est en acier inoxydable 316L et est totalement étanche. Vous pouvez le laisser sur votre animal pendant les bains, la pluie ou les baignades.'
    },
    {
        q: 'Faut-il payer un abonnement ?',
        a: 'Non, aucuns frais cachés. Le médaillon est une achat unique. Le QR code est actif à vie, sans abonnement ni frais récurrents.'
    },
    {
        q: 'Quelles informations sont affichées ?',
        a: 'Le nom de votre animal, votre numéro de téléphone, et toute autre information que vous souhaitez ajouter (traitement médical, propriétaire de secours, etc).'
    },
    {
        q: 'Le gravure est-elle durable ?',
        a: 'La gravure laser est permanente. Contrairement à une impression, elle ne s\'efface pas avec le temps, les frottements ou les intempéries.'
    }
]

const FAQAccordion = () => {
    return (
        <div className="flex flex-col gap-3 lg:gap-4">
            {faqItems.map((item, i) => (
                <Disclosure key={i}>
                    {({ open }) => (
                        <div className="rounded-lg bg-[#f5f5f5] text-text-primary">
                            <DisclosureButton className="w-full cursor-pointer p-4 lg:p-6 select-none">
                                <div className="flex items-center justify-between">
                                    <span className="text-base font-bold tracking-[-0.02em] pr-4 md:text-xl text-left">
                                        {item.q}
                                    </span>
                                    <div className="relative size-3 shrink-0">
                                        <div className="w-full h-[1.5px] bg-current top-1/2 left-0 -translate-y-1/2 absolute" />
                                        <div className={`h-full w-[1.5px] bg-current left-1/2 top-0 -translate-x-1/2 absolute transition-opacity duration-200 ease-in-out ${open ? 'opacity-0' : 'opacity-100'}`} />
                                    </div>
                                </div>
                            </DisclosureButton>
                            <div className="grid transition-[grid-template-rows] duration-300 ease-in-out" style={{ gridTemplateRows: open ? '1fr' : '0fr' }}>
                                <DisclosurePanel static className="overflow-hidden">
                                    <div className="px-4 pb-4 lg:px-6 lg:pb-6 text-sm text-text-secondary leading-relaxed">
                                        {item.a}
                                    </div>
                                </DisclosurePanel>
                            </div>
                        </div>
                    )}
                </Disclosure>
            ))}
        </div>
    )
}

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
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-sm text-text-muted">Chargement...</p>
            </div>
        )
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-sm text-error">{error}</p>
            </div>
        )
    }

    if (!product) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-sm text-text-muted">Produit introuvable.</p>
            </div>
        )
    }

    const accordionItems = [
        ...(product.description
            ? [{ name: 'description', label: 'Description', content: <p className="text-sm text-text-secondary">{product.description}</p> }]
            : []),
        {
            name: 'caracteristiques',
            label: 'Caractéristiques',
            content: (
                <div className="space-y-px bg-border rounded overflow-hidden">
                    {[
                        { label: 'Marque', value: 'Parfs' },
                        { label: 'Collection', value: '2022' },
                        { label: 'Référence', value: 'G480745' },
                        { label: 'Matériau', value: 'Acier inoxydable' },
                        { label: 'Diamètre', value: '30 mm' },
                    ].map((row) => (
                        <div key={row.label} className="bg-bg-elevated grid grid-cols-2 gap-4 px-4 py-2.5">
                            <span className="text-xs text-text-muted">{row.label}</span>
                            <span className="text-xs text-text-primary font-medium text-right">{row.value}</span>
                        </div>
                    ))}
                </div>
            ),
        },
        {
            name: 'paiement',
            label: 'Paiement & livraison',
            content: (
                <div className="space-y-2 text-xs text-text-secondary">
                    <p>Paiement sécurisé par carte bancaire (Stripe).</p>
                    <p>Livraison offerte en France métropolitaine sous 5-7 jours ouvrés.</p>
                </div>
            ),
        },
    ]

    return (
        <div className="min-h-screen">
            <div className="max-w-6xl mx-auto px-5 py-10">
                <div className="lg:grid lg:gap-8 lg:grid-cols-2 lg:items-start">
                    <ProductImageGallery images={sortedImages} productName={product.name} />

                    <div className="flex flex-col gap-6 mt-8 lg:mt-0">
                        <div>
                            <div className="flex items-center gap-2 mb-3">
                                <span className="text-[10px] font-semibold text-accent uppercase tracking-widest">Médaille connectée</span>
                                <div className="flex-1 h-px bg-border" />
                            </div>
                            <h1 className="font-unbounded text-2xl md:text-3xl text-text-primary">
                                {product.name}
                            </h1>
                            <p className="mt-2 text-lg font-bold text-accent">
                                {formatPrice(product.price_cents)}
                            </p>
                            {product.description && (
                                <p className="mt-3 text-sm text-text-secondary leading-relaxed max-w-md">
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
                    </div>
                </div>
            </div>

            {/* Technology section — 3-card grid */}
            <section className="py-10 lg:py-20">
                <div className="max-w-7xl mx-auto px-5 mb-10 lg:mb-20">
                    <h2 className="text-3xl md:text-4xl lg:text-5xl text-left lg:text-center text-text-primary font-unbounded font-light leading-tight tracking-tighter">
                        Des retrouvailles en un scan
                    </h2>
                </div>

                <div className="max-w-7xl mx-auto px-5">
                    <ul className="grid gap-x-8 gap-y-16 lg:grid-cols-3">
                        {[
                            {
                                icon: (
                                    <svg className="w-10 h-10 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 013.75 9.375v-4.5zM3.75 14.625c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5a1.125 1.125 0 01-1.125-1.125v-4.5zM13.5 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0113.5 9.375v-4.5z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 6.75h.75v.75h-.75v-.75zM6.75 16.5h.75v.75h-.75v-.75zM16.5 6.75h.75v.75h-.75v-.75zM13.5 13.5h.75v.75h-.75v-.75zM13.5 19.5h.75v.75h-.75v-.75zM19.5 13.5h.75v.75h-.75v-.75zM19.5 19.5h.75v.75h-.75v-.75zM16.5 16.5h.75v.75h-.75v-.75z" />
                                    </svg>
                                ),
                                title: 'Un scan, et c\'est parti',
                                desc: 'Un simple coup d\'œil sur le QR code et la personne qui trouve votre animal accède instantanément à ses informations essentielles.'
                            },
                            {
                                icon: (
                                    <svg className="w-10 h-10 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                                    </svg>
                                ),
                                title: 'Résistant et fiable',
                                desc: 'Gravure laser permanente, acier inoxydable et étanchéité totale. Le médaillon survit à toutes les aventures, du canapé au grand air.'
                            },
                            {
                                icon: (
                                    <svg className="w-10 h-10 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                ),
                                title: 'Disponible 24h/24',
                                desc: 'Les informations de votre animal sont accessibles à tout moment, sans batterie, sans abonnement, sans compromis.'
                            }
                        ].map((card) => (
                            <li key={card.title} className="flex flex-col items-start">
                                <div className="relative mb-6 lg:mb-8 w-full aspect-square rounded-3xl bg-bg-elevated border border-border flex items-center justify-center">
                                    {card.icon}
                                </div>
                                <h3 className="text-lg font-unbounded font-semibold text-text-primary mb-2">
                                    {card.title}
                                </h3>
                                <p className="text-sm text-text-secondary leading-relaxed mb-auto">
                                    {card.desc}
                                </p>
                            </li>
                        ))}
                    </ul>
                </div>
            </section>

            {/* 50/50 Split — image + text */}
            <section className="py-10 lg:py-20">
                <div className="max-w-7xl mx-auto px-5 mb-10 lg:mb-20">
                    <h2 className="text-3xl md:text-4xl lg:text-5xl text-left lg:text-center text-text-primary font-unbounded font-light leading-tight tracking-tighter">
                        Conçu pour durer
                    </h2>
                </div>

                <div className="max-w-7xl mx-auto px-5">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-y-12 items-center">
                        {/* Image */}
                        <div className="md:col-span-7 md:col-start-1 order-1">
                            <div className="relative aspect-[9/10] md:aspect-4/3 rounded-3xl overflow-hidden bg-bg-elevated border border-border flex items-center justify-center">
                                <svg className="w-20 h-20 text-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                            </div>
                        </div>

                        {/* Text + icon grid */}
                        <div className="md:col-span-7 md:col-start-8 order-2 flex flex-col justify-center gap-8">
                            <p className="text-base lg:text-lg text-text-secondary font-sans leading-relaxed">
                                Chaque médaillon est fabriqué en acier inoxydable premium, gravé au laser pour une lisibilité à vie. Il résiste à l'eau, aux chocs et au temps qui passe.
                            </p>

                            <div className="grid grid-cols-2 gap-6 pt-4 md:pt-2">
                                {[
                                    { label: 'Acier inoxydable 316L', icon: 'M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z' },
                                    { label: 'Gravure laser', icon: 'M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z' },
                                    { label: '100% étanche', icon: 'M12 21a8.004 8.004 0 008-8c0-3.754-2.14-6.07-4-7.503C13.14 3.93 11 6.246 11 13a8.004 8.004 0 001 3.963' },
                                    { label: 'Sans abonnement', icon: 'M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
                                ].map((item) => (
                                    <div key={item.label} className="flex gap-x-2 lg:gap-x-4">
                                        <div className="bg-[#C4BEB6] shrink-0 flex justify-center items-center size-12 rounded-full lg:size-14">
                                            <svg className="w-5 h-5 text-text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
                                            </svg>
                                        </div>
                                        <span className="text-sm lg:text-base text-text-primary font-sans flex items-center">
                                            {item.label}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ Accordion */}
            <section className="mb-20">
                <div className="max-w-7xl mx-auto px-5 mb-16 md:text-center lg:mb-20 xl:mb-24">
                    <h2 className="text-3xl md:text-4xl lg:text-5xl text-left lg:text-center text-text-primary font-unbounded font-light leading-tight tracking-tighter">
                        Questions fréquentes
                    </h2>
                </div>

                <div className="max-w-4xl mx-auto px-5 lg:px-6">
                    <FAQAccordion />
                </div>
            </section>
        </div>
    )
}
