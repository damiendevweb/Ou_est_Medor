import { Link } from 'react-router-dom'
import { FaqAccordion } from '../components/FAQ'
import { HeroBanner } from '../components/HeroBanner'
import { BlogSection } from '../components/BlogSection'

const stats = [
  { value: '2 500+', label: 'Animaux protégés', icon: '🐕', color: 'from-orange-300 to-orange-400' },
  { value: '98%', label: 'Taux de retrouvailles', icon: '❤️', color: 'from-pink-300 to-pink-400' },
  { value: '4.9/5', label: 'Avis clients', icon: '⭐', color: 'from-yellow-300 to-yellow-400' },
  { value: '10 min', label: 'Délai moyen scan → contact', icon: '⚡', color: 'from-purple-300 to-pink-300' },
]

const steps = [
  {
    step: '01',
    title: 'Commande ta médaille',
    desc: "Choisis la couleur et la taille. Reçois ta médaille Où est Médor ? en 48h chez toi.",
    icon: '🛒',
    gradient: 'from-orange-400 to-yellow-300',
  },
  {
    step: '02',
    title: 'Crée le profil de ton animal',
    desc: 'Ajoute nom, santé, vaccins, allergies et coordonnées. Tout est modifiable à tout moment.',
    icon: '📝',
    gradient: 'from-purple-300 to-pink-300',
  },
  {
    step: '03',
    title: 'Scan = Retrouvailles',
    desc: "Quelqu'un scanne le QR Code, tu reçois une notification avec la localisation. Simple et rapide.",
    icon: '📍',
    gradient: 'from-pink-300 to-yellow-300',
  },
]

const features = [
  {
    icon: '📱',
    title: 'Scan sans app',
    desc: 'N\'importe quel smartphone peut lire le QR Code. Aucune application à télécharger.',
    color: 'bg-orange-100',
    iconColor: 'text-orange-400',
  },
  {
    icon: '🔔',
    title: 'Notification instantanée',
    desc: 'Sois prévenu en temps réel dès que ta médaille est scannée, avec la position GPS.',
    color: 'bg-purple-200',
    iconColor: 'text-purple-300',
  },
  {
    icon: '📋',
    title: 'Fiche santé complète',
    desc: 'Vaccins, allergies, comportement, vétérinaire — toutes les infos utiles au même endroit.',
    color: 'bg-pink-200',
    iconColor: 'text-pink-400',
  },
  {
    icon: '🔄',
    title: 'Infos modifiables',
    desc: 'Déménagement ? Nouveau numéro ? Modifie les données en ligne sans racheter de médaille.',
    color: 'bg-green-200',
    iconColor: 'text-green-400',
  },
  {
    icon: '🔒',
    title: 'Données sécurisées',
    desc: 'Hébergement Supabase chiffré. Tu contrôles ce qui est public ou privé sur le profil.',
    color: 'bg-purple-200',
    iconColor: 'text-purple-300',
  },
  {
    icon: '🎨',
    title: 'Design personnalisé',
    desc: 'Plusieurs couleurs et finitions disponibles. Ta médaille, ton style.',
    color: 'bg-yellow-200',
    iconColor: 'text-yellow-400',
  },
]

const testimonials = [
  {
    name: 'Sophie M.',
    role: 'Propriétaire de Max',
    avatar: 'SM',
    gradient: 'from-pink-300 to-yellow-300',
    text: '"Grâce à Où est Médor ?, j\'ai retrouvé Max en 10 minutes. Un couple de promeneurs a scanné la médaille et j\'ai été prévenue direct. Je recommande les yeux fermés !"',
    rating: 5,
  },
  {
    name: 'Thomas L.',
    role: 'Propriétaire de Loki',
    avatar: 'TL',
    gradient: 'from-green-300 to-orange-300',
    text: '"Je n\'y croyais pas au début, mais quand mon chat a disparu 3 jours, c\'est la médaille qui l\'a ramené. Le voisin a scanné le QR Code. Un vrai soulagement."',
    rating: 5,
  },
  {
    name: 'Marie D.',
    role: 'Éleveuse canine',
    avatar: 'MD',
    gradient: 'from-purple-300 to-pink-300',
    text: '"Je recommande Où est Médor ? à tous mes clients. La qualité des matériaux et la simplicité du système en font le meilleur accessoire de sécurité pour animaux."',
    rating: 5,
  },
]

export const HomePage = () => {
  return (
    <>
      <HeroBanner />

      <section className="relative -mt-12 z-10 max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((s) => (
            <div key={s.label} className="bg-white rounded-2xl shadow-lg p-6 text-center hover:shadow-xl transition-all hover:-translate-y-1">
              <div className={`w-12 h-12 mx-auto mb-3 rounded-xl bg-gradient-to-br ${s.color} flex items-center justify-center text-xl`}>
                {s.icon}
              </div>
              <p className="text-2xl md:text-3xl font-bold text-dark-grey">{s.value}</p>
              <p className="text-xs md:text-sm text-text-secondary mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-28">
        <div className="text-center mb-16">
          <span className="inline-block text-4xl mb-3">👣</span>
          <h2 className="text-4xl md:text-5xl font-bold text-dark-grey mb-4">
            Comment ça marche ?
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            3 étapes simples pour protéger votre animal et ne plus jamais le perdre de vue.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {steps.map((s) => (
            <div key={s.step} className="relative group">
              <div className="absolute -top-3 -left-3 text-7xl md:text-8xl font-bold text-dark-grey/5 select-none pointer-events-none">
                {s.step}
              </div>
              <div className="relative bg-white rounded-3xl p-8 shadow-lg group-hover:shadow-xl transition-all min-h-[280px] flex flex-col">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${s.gradient} flex items-center justify-center text-3xl mb-6 shadow-md`}>
                  {s.icon}
                </div>
                <h3 className="text-xl font-bold text-dark-grey mb-3">{s.title}</h3>
                <p className="text-text-secondary leading-relaxed flex-1">{s.desc}</p>
                <div className="mt-6 h-1.5 rounded-full bg-gradient-to-r from-dark-grey/5 to-dark-grey/10">
                  <div className={`h-full rounded-full bg-gradient-to-r ${s.gradient}`} style={{ width: `${(parseInt(s.step) / 3) * 100}%` }} />
                </div>
              </div>
              {s.step !== '03' && (
                <div className="hidden md:block absolute top-1/2 -right-7 text-2xl text-orange-300 z-10">→</div>
              )}
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white py-28">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="inline-block text-4xl mb-3">✨</span>
            <h2 className="text-4xl md:text-5xl font-bold text-dark-grey mb-4">
              Tout ce dont vous avez besoin
            </h2>
            <p className="text-lg text-text-secondary max-w-2xl mx-auto">
              Une solution complète pour la sécurité et le bien-être de votre animal.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f) => (
              <div
                key={f.title}
                className="group p-8 rounded-3xl border-2 border-transparent hover:border-orange-200 transition-all hover:shadow-xl hover:-translate-y-1 bg-light-grey"
              >
                <div className={`w-14 h-14 ${f.color} rounded-2xl flex items-center justify-center text-2xl mb-5 group-hover:scale-110 transition-all`}>
                  <span role="img">{f.icon}</span>
                </div>
                <h3 className="text-lg font-bold text-dark-grey mb-3">{f.title}</h3>
                <p className="text-text-secondary leading-relaxed text-sm">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-28 overflow-hidden">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="inline-block text-4xl mb-3">💬</span>
            <h2 className="text-4xl md:text-5xl font-bold text-dark-grey mb-4">
              Ils nous font confiance
            </h2>
            <p className="text-lg text-text-secondary max-w-2xl mx-auto">
              Des milliers de propriétaires heureux grâce à Où est Médor ?
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((t) => (
              <div key={t.name} className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 flex flex-col">
                <div className="flex items-center gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <span key={i} className="text-yellow-300 text-lg">⭐</span>
                  ))}
                </div>
                <p className="text-dark-grey leading-relaxed flex-1 italic mb-6">{t.text}</p>
                <div className="flex items-center gap-4 mt-auto pt-6 border-t border-gray-100">
                  <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${t.gradient} flex items-center justify-center text-white text-sm font-bold`}>
                    {t.avatar}
                  </div>
                  <div>
                    <p className="font-bold text-dark-grey text-sm">{t.name}</p>
                    <p className="text-xs text-text-secondary">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-400 via-pink-300 to-purple-300" />
        <div className="absolute inset-0 opacity-10">
          <span className="absolute top-10 left-[20%] text-6xl animate-float-slow">🐾</span>
          <span className="absolute bottom-10 right-[20%] text-5xl animate-float">🐾</span>
          <span className="absolute top-1/2 left-[10%] text-4xl animate-float">🦴</span>
        </div>
        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <span className="inline-block text-5xl mb-6">🎯</span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Prêt à protéger votre animal ?
          </h2>
          <p className="text-lg md:text-xl text-white/80 mb-10 max-w-2xl mx-auto">
            Rejoignez les milliers de propriétaires qui dorment sur leurs deux oreilles grâce à Où est Médor ?
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/categorie/medaille-gravee"
              className="inline-flex items-center gap-2 bg-white text-dark-grey font-bold text-lg px-10 py-4 rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-105"
            >
              Commander maintenant
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-white/20 text-white font-bold text-lg px-10 py-4 rounded-full border-2 border-white/40 hover:bg-white/30 transition-all"
            >
              Nous contacter
            </Link>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20" />
      </section>

      <section className="bg-white py-24">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <span className="inline-block text-4xl mb-3">❓</span>
            <h3 className="text-3xl md:text-4xl font-bold text-dark-grey">Foire aux questions</h3>
          </div>
          <FaqAccordion />
        </div>
      </section>

      <BlogSection />
    </>
  )
}
