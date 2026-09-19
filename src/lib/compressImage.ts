const MAX_WIDTH = 600
const MAX_HEIGHT = 600
const QUALITY = 0.8

export const compressImage = (file: File | Blob): Promise<Blob> => {
    return new Promise((resolve, reject) => {
        const img = new Image()
        const url = URL.createObjectURL(file)

        img.onload = () => {
            URL.revokeObjectURL(url)

            let { width, height } = img

            if (width > MAX_WIDTH || height > MAX_HEIGHT) {
                const ratio = Math.min(MAX_WIDTH / width, MAX_HEIGHT / height)
                width = Math.round(width * ratio)
                height = Math.round(height * ratio)
            }

            const canvas = document.createElement('canvas')
            canvas.width = width
            canvas.height = height

            const ctx = canvas.getContext('2d')
            if (!ctx) return reject(new Error('Canvas not supported'))

            ctx.drawImage(img, 0, 0, width, height)

            canvas.toBlob(
                (blob) => (blob ? resolve(blob) : reject(new Error('Compression failed'))),
                'image/jpeg',
                QUALITY
            )
        }

        img.onerror = () => reject(new Error('Invalid image'))
        img.src = url
    })
}
