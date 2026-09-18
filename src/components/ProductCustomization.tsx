import { FONTS } from '../lib/product.types'
import { Input } from './Input'

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
            <h3 className="text-lg font-semibold text-text-primary mb-4 font-unbounded">Personnalisation</h3>
            <div className="space-y-4">
                <Field label="Nom de l'animal *">
                    <Input
                        type="text"
                        value={petName}
                        onChange={e => onPetNameChange(e.target.value)}
                        placeholder="ex: Médor"
                    />
                </Field>

                <Field label="Téléphone 1 *" error={phone1Error}>
                    <Input
                        type="tel"
                        value={phone1}
                        onChange={e => onPhone1Change(e.target.value)}
                        placeholder="06 01 02 03 04"
                        className={phone1Error ? 'border-error' : ''}
                    />
                </Field>

                <Field label="Téléphone 2 (optionnel)" error={phone2Error}>
                    <Input
                        type="tel"
                        value={phone2}
                        onChange={e => onPhone2Change(e.target.value)}
                        placeholder="06 05 06 07 08"
                        className={phone2Error ? 'border-error' : ''}
                    />
                </Field>

                <div>
                    <p className="text-[10px] font-semibold text-text-muted uppercase tracking-wider mb-3">Police d'écriture</p>
                    <div className="flex gap-1.5">
                        {FONTS.map((font) => (
                            <button
                                key={font.value}
                                type="button"
                                onClick={() => onFontChange(font.value)}
                                className={`px-3 py-1.5 text-xs border rounded transition-all ${
                                    selectedFont === font.value
                                        ? 'border-accent bg-accent text-bg'
                                        : 'border-border text-text-secondary hover:border-border-strong'
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
        <label className="block text-[10px] font-semibold text-text-muted uppercase tracking-wider mb-1.5">{label}</label>
        {children}
        {error && <p className="text-xs text-error mt-1">{error}</p>}
    </div>
)
