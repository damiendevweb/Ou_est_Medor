import { useRef, useState, useEffect, useCallback } from 'react'

type Props = {
    file: File
    onCrop: (blob: Blob) => void
    onCancel: () => void
}

const CROP_RATIO = 4 / 3
const OUT_W = 800
const OUT_H = 600

export const CropModal = ({ file, onCrop, onCancel }: Props) => {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const imgRef = useRef<HTMLImageElement | null>(null)
    const [ready, setReady] = useState(false)
    const [dragging, setDragging] = useState(false)
    const dragStart = useRef({ x: 0, y: 0 })
    const imgPos = useRef({ x: 0, y: 0 })
    const imgPosOnDragStart = useRef({ x: 0, y: 0 })
    const drawWRef = useRef(0)
    const drawHRef = useRef(0)

    const clampPos = useCallback((x: number, y: number) => {
        const canvas = canvasRef.current
        if (!canvas) return { x, y }
        const cw = canvas.width
        const ch = canvas.height
        const dw = drawWRef.current
        const dh = drawHRef.current
        const cropH = cw / CROP_RATIO
        const cropY = (ch - cropH) / 2

        let minX: number, maxX: number, minY: number, maxY: number

        if (dw > cw) {
            minX = cw - dw
            maxX = 0
        } else {
            minX = 0
            maxX = 0
        }

        if (dh > cropH) {
            minY = cropY + cropH - dh
            maxY = cropY
        } else {
            minY = (ch - dh) / 2
            maxY = (ch - dh) / 2
        }

        return {
            x: Math.min(maxX, Math.max(minX, x)),
            y: Math.min(maxY, Math.max(minY, y)),
        }
    }, [])

    useEffect(() => {
        const img = new Image()
        img.onload = () => {
            imgRef.current = img
            setReady(true)
        }
        img.src = URL.createObjectURL(file)
    }, [file])

    useEffect(() => {
        if (!ready) return
        const canvas = canvasRef.current
        const img = imgRef.current
        if (!canvas || !img) return

        const cw = canvas.width
        const ch = canvas.height

        const imgRatio = img.naturalWidth / img.naturalHeight
        let dw: number, dh: number
        if (imgRatio > CROP_RATIO) {
            dh = ch
            dw = ch * imgRatio
        } else {
            dw = cw
            dh = cw / imgRatio
        }
        drawWRef.current = dw
        drawHRef.current = dh
        imgPos.current = clampPos((cw - dw) / 2, (ch - dh) / 2)
    }, [ready, clampPos])

    const draw = useCallback(() => {
        const canvas = canvasRef.current
        const img = imgRef.current
        if (!canvas || !img) return

        const ctx = canvas.getContext('2d')
        if (!ctx) return

        const cw = canvas.width
        const ch = canvas.height
        const dw = drawWRef.current
        const dh = drawHRef.current
        const dx = imgPos.current.x
        const dy = imgPos.current.y

        ctx.clearRect(0, 0, cw, ch)
        ctx.fillStyle = '#1a1a1a'
        ctx.fillRect(0, 0, cw, ch)
        ctx.drawImage(img, dx, dy, dw, dh)

        const cropH = cw / CROP_RATIO
        const cropY = (ch - cropH) / 2

        ctx.fillStyle = 'rgba(0,0,0,0.55)'
        ctx.fillRect(0, 0, cw, cropY)
        ctx.fillRect(0, cropY + cropH, cw, ch - cropY - cropH)

        ctx.strokeStyle = '#fff'
        ctx.lineWidth = 2
        ctx.strokeRect(0, cropY, cw, cropH)
    }, [])

    useEffect(() => {
        if (ready && imgRef.current && canvasRef.current) draw()
    }, [ready, draw])

    const getPos = (e: React.MouseEvent | React.TouchEvent) => {
        const canvas = canvasRef.current
        if (!canvas) return { x: 0, y: 0 }
        const rect = canvas.getBoundingClientRect()
        const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX
        const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY
        return {
            x: (clientX - rect.left) * (canvas.width / rect.width),
            y: (clientY - rect.top) * (canvas.height / rect.height),
        }
    }

    const handleStart = (e: React.MouseEvent | React.TouchEvent) => {
        e.preventDefault()
        setDragging(true)
        const pos = getPos(e)
        dragStart.current = pos
        imgPosOnDragStart.current = { ...imgPos.current }
    }

    const handleMove = (e: React.MouseEvent | React.TouchEvent) => {
        if (!dragging) return
        e.preventDefault()
        const pos = getPos(e)
        const dx = pos.x - dragStart.current.x
        const dy = pos.y - dragStart.current.y
        imgPos.current = clampPos(
            imgPosOnDragStart.current.x + dx,
            imgPosOnDragStart.current.y + dy
        )
        draw()
    }

    const handleEnd = () => setDragging(false)

    const handleCrop = () => {
        const img = imgRef.current
        const canvas = canvasRef.current
        if (!img || !canvas) return

        const cw = canvas.width
        const ch = canvas.height
        const cropH = cw / CROP_RATIO
        const cropY = (ch - cropH) / 2

        const outCanvas = document.createElement('canvas')
        outCanvas.width = OUT_W
        outCanvas.height = OUT_H
        const outCtx = outCanvas.getContext('2d')!

        outCtx.drawImage(canvas, 0, cropY, cw, cropH, 0, 0, OUT_W, OUT_H)

        outCanvas.toBlob((blob) => {
            if (blob) onCrop(blob)
        }, 'image/jpeg', 0.85)
    }

    if (!ready) return null

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
            <div className="bg-bg-elevated border border-border rounded-lg p-5 max-w-md w-full">
                <p className="text-sm font-semibold text-text-primary mb-3">Recadrer la photo</p>
                <canvas
                    ref={canvasRef}
                    width={400}
                    height={300}
                    className="w-full rounded border border-border cursor-move touch-none"
                    onMouseDown={handleStart}
                    onMouseMove={handleMove}
                    onMouseUp={handleEnd}
                    onMouseLeave={handleEnd}
                    onTouchStart={handleStart}
                    onTouchMove={handleMove}
                    onTouchEnd={handleEnd}
                />
                <p className="text-[10px] text-text-muted mt-2 text-center">Glissez pour positionner la photo</p>
                <div className="flex gap-2 mt-4">
                    <button
                        onClick={onCancel}
                        className="flex-1 px-4 py-2 text-xs font-medium text-text-secondary border border-border rounded hover:bg-bg-hover transition-colors"
                    >
                        Annuler
                    </button>
                    <button
                        onClick={handleCrop}
                        className="flex-1 px-4 py-2 text-xs font-medium text-bg bg-accent rounded hover:bg-accent-hover transition-colors"
                    >
                        Valider
                    </button>
                </div>
            </div>
        </div>
    )
}
