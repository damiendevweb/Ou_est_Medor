import { useEffect, useMemo, useState } from 'react'
import { supabase } from '../lib/supabase'
import type { Product } from '../lib/product.types'

export const useProduct = (slug: string | undefined) => {
    const [product, setProduct] = useState<Product | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

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

    return { product, loading, error, sortedImages }
}
