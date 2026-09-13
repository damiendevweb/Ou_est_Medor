import { hasAnalyticsConsent } from './cookie-consent'

export function initUmami() {
    const websiteId = import.meta.env.VITE_UMAMI_WEBSITE_ID
    if (!websiteId || import.meta.env.DEV || !hasAnalyticsConsent()) return

    const script = document.createElement('script')
    script.defer = true
    script.src = 'https://cloud.umami.is/script.js'
    script.setAttribute('data-website-id', websiteId)
    document.head.appendChild(script)
}
