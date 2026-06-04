type Props = {
    currentFont: { family: string }
    previewText: string
}

export const ProductMedalPreview = ({ currentFont, previewText }: Props) => {
    return (
        <div className="flex items-center justify-center gap-6">
            <div className="relative flex items-center justify-center w-40 h-40 shrink-0">
                <MedalBase />
                <MedalRing />
                <div className="relative text-center px-4" style={{ fontFamily: currentFont.family }}>
                    {previewText.split('\n').map((line, i) => (
                        <p key={i} className={`text-gray-700 ${i === 0 ? 'text-base font-bold' : 'text-xs'}`}>
                            {line}
                        </p>
                    ))}
                </div>
            </div>
            <div className="relative flex items-center justify-center w-40 h-40 shrink-0">
                <MedalBase />
                <MedalRing />
                <img
                    src="https://izugqskkkniyybedqoem.supabase.co/storage/v1/object/public/qr-code/qr-ZCRBZ.png"
                    alt="QR code de la médaille"
                    className="relative w-28 h-28 mix-blend-multiply"
                />
            </div>
        </div>
    )
}

const MedalBase = () => (
    <>
        <div className="absolute inset-0 rounded-full bg-linear-to-br from-gray-300 via-gray-100 to-gray-400 border-[5px] border-gray-400/60" />
        <div className="absolute inset-2.5 rounded-full bg-linear-to-b from-gray-100/80 to-gray-300/40" />
    </>
)

const MedalRing = () => (
    <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full border-[2.5px] border-gray-400/70 bg-gray-200/50" />
)
