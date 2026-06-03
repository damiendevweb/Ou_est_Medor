export type ProductImage = {
    id: string
    image_url: string
    image_alt: string | null
    sort_order: number
    is_primary: boolean
}

export type Product = {
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

export const FONTS = [
    { value: 'Fredoka', label: 'Fredoka', family: "'Fredoka', sans-serif", desc: 'Ronde et amicale' },
    { value: 'DM Serif Display', label: 'Serif', family: "'DM Serif Display', serif", desc: 'Élégante et classique' },
    { value: 'Poppins', label: 'Poppins', family: "'Poppins', sans-serif", desc: 'Moderne et épurée' },
]

export const formatPrice = (priceCents: number) =>
    new Intl.NumberFormat('fr-FR', {
        style: 'currency',
        currency: 'EUR',
    }).format(priceCents / 100)

export const validatePhone = (value: string) => {
    if (!value) return ''
    if (value.length < 10) return 'Minimum 10 caractères'
    if (value.length > 14) return 'Maximum 14 caractères'
    if (/[^\d ]/.test(value)) return 'Seuls les chiffres et les espaces sont autorisés'
    const digits = value.replace(/\s/g, '')
    if (digits.length !== 10) return 'Le numéro doit contenir exactement 10 chiffres'
    return ''
}
