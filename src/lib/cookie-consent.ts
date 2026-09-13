const STORAGE_KEY = 'cookie-consent'

export function hasAnalyticsConsent(): boolean {
    return localStorage.getItem(STORAGE_KEY) === 'analytics'
}
