import { Routes, Route, Navigate, useLocation } from 'react-router-dom'

import { useAuth } from './hooks/useAuth'
import { AuthPage } from './pages/AuthPage'
import { AnimalPage } from './pages/AnimalPage'
import { HomePage } from './pages/HomePage'
import { Dashboard } from './pages/Dashboard'
import { GenerateQR } from './pages/GenerateQR'
import { ResetPasswordPage } from './pages/ResetPagePassword'
import { ScrollToTop } from './components/ScrollToTop'
import { NavigationBar } from './components/NavigationBar'
import { TopInfoBanner } from './components/TopInfoBanner'
import { ProfilePage } from './pages/Profile'
import { Footer } from './components/Footer'
import { PWAInstallPrompt } from './components/PWAInstallPrompt'
import { CookieConsent } from './components/CookieConsent'
import { Contact } from './pages/Contact'
import { ProductPage } from './pages/ProductPage'
import { BlogPostPage } from './pages/BlogPostPage'
import { NotreHistoire } from './pages/NotreHistoire'
import { LeConcept } from './pages/LeConcept'
import { ToastProvider } from './components/Toast'
import { CheckoutPage } from './pages/CheckoutPage'
import { CheckoutSuccessPage } from './pages/CheckoutSuccessPage'
import { OrdersPage } from './pages/OrdersPage'
import { CGV } from './pages/CGV'
import { PolitiqueConfidentialite } from './pages/PolitiqueConfidentialite'
import { MentionsLegales } from './pages/MentionsLegales'
import { PolitiqueCookies } from './pages/PolitiqueCookies'
import { FAQPage } from './pages/FAQPage'
import { BlogPage } from './pages/BlogPage'
import { USPs } from './components/USPs'

function App() {
  const { user, loading } = useAuth()
  const location = useLocation()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg">Chargement...</p>
      </div>
    )
  }

  const showPWA = (location.pathname === '/dashboard' || location.pathname === '/profile') && user
  const isAnimalPage = /^\/[A-Z0-9]{5}$/.test(location.pathname)

  return (
    <ToastProvider>
      <div className="min-h-screen flex flex-col">
        <ScrollToTop />
        {!isAnimalPage && <TopInfoBanner />}
        {!isAnimalPage && <NavigationBar />}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<AuthPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
          <Route path="/dashboard" element={
            user ? <Dashboard /> : <Navigate to="/login" />
          } />
          <Route
            path="/profile"
            element={user ? <ProfilePage /> : <Navigate to="/login" />}
          />
          <Route
            path="/mes-commandes"
            element={user ? <OrdersPage /> : <Navigate to="/login" />}
          />
          <Route path='produit/:slug' element={<ProductPage />} />
          <Route path='generate-qr-code' element={<GenerateQR />} />
          <Route path='contact' element={<Contact />} />
          <Route path='notre-histoire' element={<NotreHistoire />} />
          <Route path='le-concept' element={<LeConcept />} />
          <Route path='blog' element={<BlogPage />} />
          <Route path='blog/:slug' element={<BlogPostPage />} />
          <Route path='/commande' element={<CheckoutPage />} />
          <Route path='/paiement/succes' element={<CheckoutSuccessPage />} />
          <Route path='/cgv' element={<CGV />} />
          <Route path='/politique-de-confidentialite' element={<PolitiqueConfidentialite />} />
          <Route path='/mentions-legales' element={<MentionsLegales />} />
          <Route path='/politique-de-cookies' element={<PolitiqueCookies />} />
          <Route path='/faq' element={<FAQPage />} />

          <Route path="/:animalId" element={<AnimalPage />} />

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>

        {showPWA && <PWAInstallPrompt />}
        {!isAnimalPage && <CookieConsent />}
        {!isAnimalPage && <USPs />}
        {!isAnimalPage && <Footer />}
      </div>
    </ToastProvider>
  )
}

export default App
