import { useState } from 'react'
import { supabase } from '../lib/supabase'

const SUJETS = [
    { value: 'produit', label: 'Question sur un produit' },
    { value: 'commande', label: 'Suivi de commande' },
    { value: 'retrouvailles', label: 'Témoignage de retrouvailles' },
    { value: 'partenariat', label: 'Partenariat' },
    { value: 'autre', label: 'Autre' },
]

type FormState = {
    prenom: string
    nom: string
    email: string
    telephone: string
    sujet: string
    message: string
    consent: boolean
    website: string
}

const emptyForm: FormState = {
    prenom: '',
    nom: '',
    email: '',
    telephone: '',
    sujet: '',
    message: '',
    consent: false,
    website: '',
}

export const Contact = () => {
    const [form, setForm] = useState<FormState>(emptyForm)
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
    const [error, setError] = useState<string | null>(null)

    const update = <K extends keyof FormState>(key: K, value: FormState[K]) => {
        setForm((prev) => ({ ...prev, [key]: value }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (status === 'loading') return

        setStatus('loading')
        setError(null)

        try {
            const { error } = await supabase.functions.invoke('contact-form', {
                body: form,
            })

            if (error) {
                const detail = (error as { context?: { data?: { error?: string } } }).context?.data?.error
                setError(detail ?? "Impossible d'envoyer le message. Réessaie plus tard.")
                setStatus('error')
                return
            }

            setForm(emptyForm)
            setStatus('success')
        } catch {
            setError("Impossible d'envoyer le message. Réessaie plus tard.")
            setStatus('error')
        }
    }

    const inputClass =
        "w-full px-3 py-2 rounded border border-border bg-bg-surface text-text-primary text-sm focus:border-accent focus:ring-0 placeholder:text-text-muted"

    return (
        <div>
            <div className="max-w-4xl mx-auto px-5 pt-4 pb-9 text-center">
                <h1 className="font-unbounded text-3xl md:text-4xl font-bold text-text-primary mb-3">
                    Contact
                </h1>
                <p className="text-sm text-text-secondary">
                    Une question, un doute, une histoire à partager ?
                </p>
            </div>

            <div className="max-w-5xl mx-auto px-5 pb-20">

                {/* Form */}
                <div className="max-w-2xl mx-auto">
                    <div className="bg-bg-elevated border border-border rounded p-8 md:p-10">
                        <h2 className="text-lg font-bold text-text-primary mb-1">Envoie-nous un message</h2>
                        <p className="text-xs text-text-muted mb-8">Tous les champs marqués d'un * sont obligatoires.</p>

                        <form onSubmit={handleSubmit} className="space-y-5">
                            {/* Honeypot anti-spam (invisible) */}
                            <input
                                type="text"
                                name="website"
                                value={form.website}
                                onChange={(e) => update('website', e.target.value)}
                                className="hidden"
                                tabIndex={-1}
                                autoComplete="off"
                            />

                            <div className="grid sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-[10px] font-semibold text-text-muted uppercase tracking-wider mb-1.5">
                                        Prénom *
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Sophie"
                                        value={form.prenom}
                                        onChange={(e) => update('prenom', e.target.value)}
                                        className={inputClass}
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-[10px] font-semibold text-text-muted uppercase tracking-wider mb-1.5">
                                        Nom *
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Martin"
                                        value={form.nom}
                                        onChange={(e) => update('nom', e.target.value)}
                                        className={inputClass}
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-[10px] font-semibold text-text-muted uppercase tracking-wider mb-1.5">
                                    Email *
                                </label>
                                <input
                                    type="email"
                                    placeholder="sophie@exemple.fr"
                                    value={form.email}
                                    onChange={(e) => update('email', e.target.value)}
                                    className={inputClass}
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-[10px] font-semibold text-text-muted uppercase tracking-wider mb-1.5">
                                    Téléphone <span className="text-text-muted">(optionnel)</span>
                                </label>
                                <input
                                    type="tel"
                                    placeholder="06 01 02 03 04"
                                    value={form.telephone}
                                    onChange={(e) => update('telephone', e.target.value)}
                                    className={inputClass}
                                />
                            </div>

                            <div>
                                <label className="block text-[10px] font-semibold text-text-muted uppercase tracking-wider mb-1.5">
                                    Sujet *
                                </label>
                                <select
                                    value={form.sujet}
                                    onChange={(e) => update('sujet', e.target.value)}
                                    className={inputClass}
                                    required
                                >
                                    <option value="">Sélectionne un sujet</option>
                                    {SUJETS.map((s) => (
                                        <option key={s.value} value={s.value}>{s.label}</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-[10px] font-semibold text-text-muted uppercase tracking-wider mb-1.5">
                                    Message *
                                </label>
                                <textarea
                                    rows={5}
                                    placeholder="Dis-nous tout..."
                                    value={form.message}
                                    onChange={(e) => update('message', e.target.value)}
                                    className={`${inputClass} resize-y`}
                                    required
                                />
                            </div>

                            <div className="flex items-center gap-3">
                                <input
                                    id="consent"
                                    type="checkbox"
                                    checked={form.consent}
                                    onChange={(e) => update('consent', e.target.checked)}
                                    className="w-4 h-4 rounded border-border bg-bg-surface text-accent focus:ring-accent"
                                    required
                                />
                                <label htmlFor="consent" className="text-xs text-text-muted">
                                    J'accepte que mes données soient traitées pour répondre à ma demande.{' '}
                                    <a href="#" className="text-accent hover:underline">Politique de confidentialité</a>.
                                </label>
                            </div>

                            {status === 'success' && (
                                <p className="p-3 rounded bg-success/10 text-success text-sm">
                                    Message envoyé ! On te répond très vite.
                                </p>
                            )}
                            {status === 'error' && error && (
                                <p className="p-3 rounded bg-error/10 text-error text-sm">{error}</p>
                            )}

                            <button
                                type="submit"
                                disabled={status === 'loading'}
                                className="w-full bg-accent hover:bg-accent-hover text-bg font-semibold text-sm px-8 py-3 rounded transition-all disabled:opacity-60"
                            >
                                {status === 'loading' ? 'Envoi en cours...' : 'Envoyer mon message'}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}