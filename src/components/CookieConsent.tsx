import { useState } from 'react'
import { Link } from 'react-router-dom'

const STORAGE_KEY = 'cookie-consent'

export const CookieConsent = () => {
    const [visible, setVisible] = useState(() => {
        const v = localStorage.getItem(STORAGE_KEY)
        return v !== 'essential' && v !== 'analytics'
    })

    const acceptAll = () => {
        localStorage.setItem(STORAGE_KEY, 'analytics')
        setVisible(false)
        window.location.reload()
    }

    const essentialOnly = () => {
        localStorage.setItem(STORAGE_KEY, 'essential')
        setVisible(false)
    }

    if (!visible) return null

    return (
        <div className="fixed bottom-0 inset-x-0 z-50 p-4 md:p-6">
            <div className="max-w-3xl mx-auto bg-bg-elevated border border-border rounded-lg shadow-lg p-5 md:p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <div className="flex-1">
                    <p className="text-sm font-semibold text-text-primary mb-1">Préférences de cookies</p>
                    <p className="text-xs text-text-secondary leading-relaxed">
                        Ce site utilise des cookies et d'autres technologies pour personnaliser votre expérience et effectuer des mesures d'audience. Aucun traceur publicitaire ne tourne sur ce site. <br />
                        Pour plus d'informations, vous pouvez consulter notre <Link to="/politique-de-cookies">politique de cookies</Link> et de <Link to="/politique-de-confidentialite">confidentialité</Link>. Vous pouvez aussi retirer votre consentement à tout moment.
                    </p>
                </div>
                <div className="flex gap-2 shrink-0">
                    <button
                        onClick={essentialOnly}
                        className="px-4 py-2 text-xs font-medium text-text-secondary border border-border rounded hover:bg-bg-hover transition-colors"
                    >
                        Tout refuser
                    </button>
                    <button
                        onClick={essentialOnly}
                        className="px-4 py-2 text-xs font-medium text-text-secondary border border-border rounded hover:bg-bg-hover transition-colors"
                    >
                        Essentiels uniquement
                    </button>
                    <button
                        onClick={acceptAll}
                        className="px-4 py-2 text-xs font-medium text-bg bg-accent rounded hover:bg-accent-hover transition-colors"
                    >
                        Tout accepter
                    </button>
                </div>
            </div>
        </div>
    )
}
