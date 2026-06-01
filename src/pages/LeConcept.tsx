import { Link } from 'react-router-dom'

const steps = [
    {
        icon: '🏷️',
        title: '1. Tu reçois ta médaille',
        desc: 'Commande en ligne, reçue chez toi en 48h. Unique, robuste, élégante.',
        gradient: 'from-orange-400 to-yellow-300',
    },
    {
        icon: '📝',
        title: '2. Tu crées le profil',
        desc: 'Nom, téléphones, infos santé. Tout se gère depuis ton espace sécurisé.',
        gradient: 'from-yellow-300 to-green-300',
    },
    {
        icon: '📱',
        title: '3. Le QR Code est scanné',
        desc: 'N\'importe qui scanne avec son téléphone. Aucune app à installer.',
        gradient: 'from-green-300 to-purple-300',
    },
    {
        icon: '🔔',
        title: '4. Tu es notifié·e',
        desc: 'SMS et notification avec la position. Retrouvailles en un clic.',
        gradient: 'from-purple-300 to-pink-300',
    },
]

const comparisons = [
    {
        trad: 'Informations limitées',
        tradDesc: 'Quelques caractères gravés, illisibles avec le temps',
        smart: 'Fiche complète et modifiable',
        smartDesc: 'Santé, vaccins, coordonnées, accessible en un scan',
        icon: '📋',
    },
    {
        trad: 'Aucune mise à jour possible',
        tradDesc: 'Déménagement ? Nouveau numéro ? Tu rachètes une médaille',
        smart: 'Modifiable à tout moment',
        smartDesc: 'Depuis ton compte, en ligne, sans frais supplémentaires',
        icon: '🔄',
    },
    {
        trad: 'Pas de suivi en temps réel',
        tradDesc: 'Tu ne sais pas quand ta médaille a été lue',
        smart: 'Notification instantanée',
        smartDesc: 'Scan → alerte avec localisation GPS en temps réel',
        icon: '📍',
    },
    {
        trad: 'Médaille générique',
        tradDesc: 'Design standard, aucun choix possible',
        smart: 'Personnalisation complète',
        smartDesc: 'Couleurs, polices, textes — ta médaille, ton style',
        icon: '🎨',
    },
]

const materials = [
    { icon: '🛡️', title: 'Acier inoxydable', desc: 'Résiste aux chocs, à l\'eau et au temps. Zéro entretien.' },
    { icon: '⚡', title: 'QR Code incassable', desc: 'Gravé en profondeur dans le métal. Impossible à effacer.' },
    { icon: '🎀', title: 'Anneau renforcé', desc: 'Système d\'attache solide qui ne s\'ouvre pas tout seul.' },
    { icon: '🌈', title: 'Finition soignée', desc: 'Bords polis, aspect premium. Plusieurs coloris disponibles.' },
]

export const LeConcept = () => {
    return (
        <div className="min-h-screen bg-light-grey">
            <div className="max-w-6xl mx-auto px-6 py-8">
                <nav className="flex items-center gap-2 text-sm text-text-secondary">
                    <Link to="/" className="hover:text-orange-400 transition-colors">Accueil</Link>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                    </svg>
                    <span className="text-dark-grey font-medium">Le concept</span>
                </nav>
            </div>

            <div className="relative pb-8 overflow-hidden">
                <div className="absolute inset-0 pointer-events-none">
                    <span className="absolute top-10 left-[12%] text-6xl opacity-5 animate-float-slow">🐾</span>
                    <span className="absolute bottom-20 right-[10%] text-5xl opacity-5 animate-float">🐕</span>
                    <span className="absolute top-1/2 right-[30%] text-4xl opacity-5 animate-float" style={{ animationDelay: '1s' }}>🔍</span>
                </div>
                <div className="max-w-5xl mx-auto px-6 text-center relative">
                    <span className="inline-block text-6xl mb-4">🔮</span>
                    <h1 className="text-5xl md:text-6xl font-bold text-dark-grey mb-4 leading-[1.1]">
                        Le concept
                    </h1>
                    <p className="text-xl text-text-secondary max-w-3xl mx-auto leading-relaxed">
                        Une médaille connectée qui transforme un simple QR Code en <span className="font-bold text-orange-400">lien direct</span> entre celui qui trouve votre animal et vous.
                    </p>
                </div>
            </div>

            <div className="relative max-w-6xl mx-auto px-6 pb-20">
                <div className="bg-white rounded-4xl shadow-xl overflow-hidden border-t-4 border-orange-300">
                    <div className="grid lg:grid-cols-2">
                        <div className="p-10 md:p-14 flex flex-col justify-center">
                            <span className="inline-block text-4xl mb-4">🤔</span>
                            <h2 className="text-3xl md:text-4xl font-bold text-dark-grey mb-4">
                                C'est quoi, <span className="text-orange-400">Où est Médor ?</span>
                            </h2>
                            <p className="text-text-secondary leading-relaxed mb-4">
                                Où est Médor ? est une médaille connectée qui remplace les traditionnelles plaques gravées par un QR Code intelligent. Fixée au collier de votre animal, elle permet à n'importe qui de scanner le code avec son smartphone pour accéder instantanément aux informations que vous avez choisies de partager.
                            </p>
                            <p className="text-text-secondary leading-relaxed">
                                Pas d'application à télécharger, pas de abonnement. Juste une médaille, un QR Code, et la tranquillité d'esprit.
                            </p>
                        </div>
                        <div className="bg-gradient-to-br from-orange-400 to-yellow-300 p-10 md:p-14 flex items-center justify-center min-h-[300px] relative overflow-hidden">
                            <span className="absolute opacity-10 text-9xl">🐾</span>
                            <div className="text-center relative">
                                <span className="text-8xl block mb-4">🏅</span>
                                <p className="text-white font-bold text-xl">La médaille qui parle</p>
                                <p className="text-white/70">QR Code + scan = retrouvailles</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-white py-24">
                <div className="max-w-6xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <span className="inline-block text-4xl mb-3">👣</span>
                        <h2 className="text-4xl md:text-5xl font-bold text-dark-grey mb-4">
                            Comment ça marche ?
                        </h2>
                        <p className="text-lg text-text-secondary max-w-2xl mx-auto">
                            4 étapes, 0 complication. De la commande aux retrouvailles.
                        </p>
                    </div>
                    <div className="relative">
                        <div className="hidden lg:block absolute top-24 left-[calc(16.66%+1.5rem)] right-[calc(16.66%+1.5rem)] h-0.5 bg-gradient-to-r from-orange-300 via-green-300 via-purple-300 to-pink-300" />
                        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
                            {steps.map((s) => (
                                <div key={s.title} className="relative text-center group">
                                    <div className={`w-20 h-20 mx-auto mb-6 rounded-3xl bg-gradient-to-br ${s.gradient} flex items-center justify-center text-3xl shadow-lg group-hover:scale-110 transition-all`}>
                                        {s.icon}
                                    </div>
                                    <h3 className="text-lg font-bold text-dark-grey mb-2">{s.title}</h3>
                                    <p className="text-text-secondary text-sm leading-relaxed">{s.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div className="py-24">
                <div className="max-w-6xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <span className="inline-block text-4xl mb-3">⚡</span>
                        <h2 className="text-4xl md:text-5xl font-bold text-dark-grey mb-4">
                            Médaille classique vs Où est Médor ?
                        </h2>
                        <p className="text-lg text-text-secondary max-w-2xl mx-auto">
                            La différence entre une simple plaque gravée et une médaille connectée.
                        </p>
                    </div>
                    <div className="space-y-4">
                        {comparisons.map((c) => (
                            <div key={c.icon} className="bg-white rounded-3xl p-6 md:p-8 shadow-lg hover:shadow-xl transition-all">
                                <div className="grid md:grid-cols-[1fr_auto_1fr] gap-4 md:gap-8 items-center">
                                    <div className="bg-red-50 rounded-2xl p-5 border-l-4 border-red-300">
                                        <p className="text-xs font-bold text-red-400 uppercase mb-1">Médaille classique</p>
                                        <p className="font-bold text-dark-grey mb-1">{c.trad}</p>
                                        <p className="text-sm text-text-secondary">{c.tradDesc}</p>
                                    </div>
                                    <div className="hidden md:flex flex-col items-center">
                                        <span className="text-3xl mb-1">{c.icon}</span>
                                        <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                        </svg>
                                    </div>
                                    <div className="bg-green-50 rounded-2xl p-5 border-l-4 border-green-300 md:order-3">
                                        <p className="text-xs font-bold text-green-400 uppercase mb-1">Où est Médor ?</p>
                                        <p className="font-bold text-dark-grey mb-1">{c.smart}</p>
                                        <p className="text-sm text-text-secondary">{c.smartDesc}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="bg-white py-24">
                <div className="max-w-6xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <span className="inline-block text-4xl mb-3">🛡️</span>
                        <h2 className="text-4xl md:text-5xl font-bold text-dark-grey mb-4">
                            Conçue pour durer
                        </h2>
                        <p className="text-lg text-text-secondary max-w-2xl mx-auto">
                            Des matériaux premium pour une médaille qui traverse le temps.
                        </p>
                    </div>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {materials.map((m) => (
                            <div key={m.title} className="text-center bg-light-grey rounded-3xl p-8 hover:shadow-lg transition-all hover:-translate-y-1 border-b-4 border-orange-300">
                                <span className="text-5xl block mb-4">{m.icon}</span>
                                <h3 className="font-bold text-dark-grey mb-2">{m.title}</h3>
                                <p className="text-sm text-text-secondary">{m.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="py-24">
                <div className="max-w-6xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <span className="inline-block text-4xl mb-3">❤️</span>
                        <h2 className="text-4xl md:text-5xl font-bold text-dark-grey mb-4">
                            Pour qui ?
                        </h2>
                        <p className="text-lg text-text-secondary max-w-2xl mx-auto">
                            Que vous ayez un chien, un chat ou un lapin, il existe une médaille pour chaque compagnon.
                        </p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="bg-white rounded-3xl p-8 shadow-lg text-center hover:shadow-xl transition-all hover:-translate-y-1 border-t-4 border-orange-300">
                            <span className="text-7xl block mb-4">🐕</span>
                            <h3 className="text-xl font-bold text-dark-grey mb-2">Pour les chiens</h3>
                            <p className="text-text-secondary text-sm">Toutes tailles, tous gabarits. Résiste aux jeux, à la pluie et aux aventures.</p>
                        </div>
                        <div className="bg-white rounded-3xl p-8 shadow-lg text-center hover:shadow-xl transition-all hover:-translate-y-1 border-t-4 border-pink-300">
                            <span className="text-7xl block mb-4">🐱</span>
                            <h3 className="text-xl font-bold text-dark-grey mb-2">Pour les chats</h3>
                            <p className="text-text-secondary text-sm">Version XXS légère et silencieuse. Parfaite pour les explorateurs félins.</p>
                        </div>
                        <div className="bg-white rounded-3xl p-8 shadow-lg text-center hover:shadow-xl transition-all hover:-translate-y-1 border-t-4 border-yellow-300">
                            <span className="text-7xl block mb-4">🐰</span>
                            <h3 className="text-xl font-bold text-dark-grey mb-2">Pour tous les animaux</h3>
                            <p className="text-text-secondary text-sm">Lapins, furets, NAC… s'il a un collier, il peut avoir sa médaille.</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-gradient-to-r from-orange-400 via-pink-300 to-purple-300 py-20">
                <div className="max-w-4xl mx-auto px-6 text-center text-white">
                    <span className="inline-block text-5xl mb-6">✨</span>
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">
                        Prêt à passer au niveau supérieur ?
                    </h2>
                    <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
                        Rejoins les milliers de propriétaires qui ont déjà équipé leur animal d'une médaille Où est Médor ?.
                    </p>
                    <Link
                        to="/categorie/medaille-gravee"
                        className="inline-flex items-center gap-2 bg-white text-dark-grey font-bold text-lg px-10 py-4 rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-105"
                    >
                        Découvrir nos médailles
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </Link>
                </div>
            </div>
        </div>
    )
}
