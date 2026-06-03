import { FONTS } from '../lib/product.types'

type Props = {
    petName: string
    phone1: string
    phone2: string
    phone1Error: string
    phone2Error: string
    selectedFont: string
    onPetNameChange: (v: string) => void
    onPhone1Change: (v: string) => void
    onPhone2Change: (v: string) => void
    onFontChange: (v: string) => void
}

export const ProductCustomization = ({
    petName, phone1, phone2, phone1Error, phone2Error, selectedFont,
    onPetNameChange, onPhone1Change, onPhone2Change, onFontChange,
}: Props) => {
    return (
        <div>
            <p className="text-xs tracking-[0.3em] text-text-secondary uppercase mb-3">Personnalisation</p>
            <div className="space-y-4">
                <Field label="Nom de l'animal *">
                    <input
                        type="text"
                        value={petName}
                        onChange={e => onPetNameChange(e.target.value)}
                        placeholder="ex: Médor"
                        className="w-full p-2 border-b border-dark-grey/30 focus:border-dark-grey focus:outline-none bg-transparent text-dark-grey"
                    />
                </Field>

                <Field label="Téléphone 1 *" error={phone1Error}>
                    <input
                        type="tel"
                        value={phone1}
                        onChange={e => {
                            onPhone1Change(e.target.value)
                        }}
                        placeholder="06 01 02 03 04"
                        className={`w-full p-2 border-b focus:outline-none bg-transparent text-dark-grey ${
                            phone1Error ? 'border-red-400' : 'border-dark-grey/30 focus:border-dark-grey'
                        }`}
                    />
                </Field>

                <Field label="Téléphone 2 (optionnel)" error={phone2Error}>
                    <input
                        type="tel"
                        value={phone2}
                        onChange={e => {
                            onPhone2Change(e.target.value)
                        }}
                        placeholder="06 05 06 07 08"
                        className={`w-full p-2 border-b focus:outline-none bg-transparent text-dark-grey ${
                            phone2Error ? 'border-red-400' : 'border-dark-grey/30 focus:border-dark-grey'
                        }`}
                    />
                </Field>

                <div>
                    <p className="text-xs tracking-wider text-text-secondary uppercase mb-3">Police d'écriture</p>
                    <div className="flex gap-2">
                        {FONTS.map((font) => (
                            <button
                                key={font.value}
                                type="button"
                                onClick={() => onFontChange(font.value)}
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
    )
}

const Field = ({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) => (
    <div>
        <label className="block text-xs tracking-wider text-text-secondary uppercase mb-2">{label}</label>
        {children}
        {error && <p className="text-xs text-red-400 mt-1">{error}</p>}
    </div>
)
