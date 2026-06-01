import { Link } from 'react-router-dom'

const milestones = [
    {
        year: '2020',
        icon: '💡',
        title: 'L\'idée',
        subtitle: 'Un chien perdu, une révélation',
        text: 'Tout commence un soir de novembre. Max, le golden retriever de notre fondateur, s\'échappe du jardin. Après 6 heures d\'angoisse et des dizaines d\'affiches collées dans le quartier, Max est retrouvé par hasard. Ce soir-là, une évidence s\'impose : il doit exister un moyen plus simple de réunir un propriétaire et son animal.',
        highlight: '"Et si une simple médaille pouvait tout changer ?"',
        gradient: 'from-orange-400 to-yellow-300',
        emoji: '🐕',
    },
    {
        year: '2021',
        icon: '🔧',
        title: 'Le premier prototype',
        subtitle: 'Des plans sur une serviette à l\'impression 3D',
        text: 'Pendant 8 mois, l\'équipe planche sur le concept. Le défi est de taille : créer une médaille aussi robuste qu\'élégante, capable de résister aux chocs, à l\'eau et au temps. Les premiers prototypes sortent d\'une imprimante 3D artisanale. Ils sont imparfaits, mais le rêve prend forme.',
        highlight: '8 mois de R&D, 12 prototypes, une conviction.',
        gradient: 'from-purple-300 to-green-300',
        emoji: '⚙️',
    },
    {
        year: '2022',
        icon: '🚀',
        title: 'Le lancement',
        subtitle: 'Les premières médailles voient le jour',
        text: 'Après des mois de tests et d\'itérations, les premières médailles Où est Médor ? sont enfin produites. Le site web est en ligne, les premiers clients commandent. L\'accueil est au-delà de nos espérances : les premiers témoignages de retrouvailles arrivent dès les premières semaines. L\'aventure est lancée.',
        highlight: 'Les premiers "Merci, vous m\'avez sauvé la vie" arrivent.',
        gradient: 'from-pink-300 to-purple-300',
        emoji: '🎉',
    },
    {
        year: '2023',
        icon: '❤️',
        title: '1000 animaux protégés',
        subtitle: 'Une communauté grandit',
        text: 'Le cap des 1000 animaux enregistrés est franchi. Ce n\'est pas qu\'un chiffre : ce sont 1000 familles qui dorment sur leurs deux oreilles. Les bouches-à-oreilles fonctionnent, les vétérinaires recommandent nos médailles, et la presse locale commence à parler de nous.',
        highlight: '+ de 50 histoires de retrouvailles heureuses cette année.',
        gradient: 'from-green-300 to-purple-300',
        emoji: '🌟',
    },
    {
        year: '2024',
        icon: '📱',
        title: 'L\'application mobile',
        subtitle: 'La technologie au service de la tranquillité',
        text: 'Nous lançons l\'application mobile Où est Médor ? Disponible sur iOS et Android, elle permet de gérer le profil de son animal, de recevoir des notifications instantanées en cas de scan, et même de partager la localisation en temps réel avec les vétérinaires partenaires.',
        highlight: 'Une app, des milliers de vies connectées.',
        gradient: 'from-purple-300 to-pink-300',
        emoji: '📲',
    },
    {
        year: '2025',
        icon: '🎨',
        title: 'Nouveaux produits',
        subtitle: 'La gamme s\'agrandit',
        text: 'Fort de notre succès, nous élargissons la gamme : nouvelles couleurs, tailles XXS pour les chats et petits chiens, médailles en édition limitée, et même des colliers connectés. Chaque produit est pensé avec la même exigence de qualité et de design.',
        highlight: 'Des couleurs, des styles, une signature.',
        gradient: 'from-yellow-300 to-orange-400',
        emoji: '🌈',
    },
    {
        year: '2026',
        icon: '🏆',
        title: 'Cap des 2500 animaux',
        subtitle: 'Et la suite s\'annonce encore plus belle',
        text: 'Aujourd\'hui, ce sont plus de 2500 animaux qui portent fièrement leur médaille Où est Médor ?. Notre taux de retrouvailles atteint 98%. Mais on ne s\'arrête pas là : partenariats avec des refuges, développement à l\'international, et des innovations qui vont encore vous surprendre. Le meilleur reste à venir.',
        highlight: '98% de retrouvailles. 2500 familles protégées. Et ce n\'est que le début.',
        gradient: 'from-orange-400 to-pink-300',
        emoji: '🥇',
    },
]

export const NotreHistoire = () => {
    return (
        <div className="min-h-screen bg-light-grey">
            <div className="max-w-6xl mx-auto px-6 py-8">
                <nav className="flex items-center gap-2 text-sm text-text-secondary">
                    <Link to="/" className="hover:text-orange-400 transition-colors">Accueil</Link>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                    </svg>
                    <span className="text-dark-grey font-medium">Notre histoire</span>
                </nav>
            </div>

            <div className="relative py-8 overflow-hidden">
                <div className="absolute inset-0 pointer-events-none">
                    <span className="absolute top-10 left-[8%] text-6xl opacity-5 animate-float-slow">🐾</span>
                    <span className="absolute bottom-20 right-[12%] text-5xl opacity-5 animate-float">🐾</span>
                    <span className="absolute top-1/3 right-[5%] text-4xl opacity-5 animate-float" style={{ animationDelay: '1s' }}>🦴</span>
                </div>
                <div className="max-w-4xl mx-auto px-6 text-center relative">
                    <span className="inline-block text-6xl mb-4">📖</span>
                    <h1 className="text-5xl md:text-6xl font-bold text-dark-grey mb-4">
                        Notre histoire
                    </h1>
                    <p className="text-lg text-text-secondary max-w-2xl mx-auto">
                        De l'idée d'une soirée d'angoisse à plus de 2500 animaux protégés. Découvre comment Où est Médor ? est devenu la médaille connectée préférée des propriétaires.
                    </p>
                </div>
            </div>

            <div className="relative pb-20">
                <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-orange-300 via-pink-300 to-purple-300 hidden lg:block -translate-x-1/2 opacity-40" />

                {milestones.map((m, i) => (
                    <div key={m.year} className={`relative ${i % 2 === 0 ? 'lg:text-right' : 'lg:text-left'}`}>
                        <div className="max-w-6xl mx-auto px-6 py-16 lg:py-24">
                            <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
                                {i % 2 === 0 ? (
                                    <>
                                        <div className="order-2 lg:order-1 pr-0 lg:pr-12">
                                            <div className="inline-block bg-white rounded-full px-4 py-1.5 shadow-md mb-4">
                                                <span className="text-sm font-bold text-dark-grey">{m.icon} {m.year}</span>
                                            </div>
                                            <h2 className="text-3xl md:text-4xl font-bold text-dark-grey mb-2">{m.title}</h2>
                                            <p className="text-text-secondary mb-4">{m.subtitle}</p>
                                            <p className="text-text-secondary leading-relaxed mb-6">{m.text}</p>
                                            <div className="bg-orange-100 rounded-2xl p-4 inline-block">
                                                <p className="text-dark-grey font-bold italic">{m.highlight}</p>
                                            </div>
                                        </div>
                                        <div className={`order-1 lg:order-2 h-72 lg:h-96 rounded-3xl bg-gradient-to-br ${m.gradient} flex items-center justify-center shadow-xl relative overflow-hidden`}>
                                            <span className="absolute inset-0 opacity-10">
                                                <span className="absolute top-5 left-5 text-7xl">🐾</span>
                                                <span className="absolute bottom-5 right-5 text-6xl">🐾</span>
                                                <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-6xl">🐾</span>
                                            </span>
                                            <span className="text-8xl relative z-10">{m.emoji}</span>
                                            <div className="absolute bottom-4 left-4 bg-white/20 backdrop-blur-sm rounded-xl px-3 py-1.5">
                                                <span className="text-white font-bold text-sm">{m.year}</span>
                                            </div>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div className="order-2 pl-0 lg:pl-12">
                                            <div className="inline-block bg-white rounded-full px-4 py-1.5 shadow-md mb-4">
                                                <span className="text-sm font-bold text-dark-grey">{m.icon} {m.year}</span>
                                            </div>
                                            <h2 className="text-3xl md:text-4xl font-bold text-dark-grey mb-2">{m.title}</h2>
                                            <p className="text-text-secondary mb-4">{m.subtitle}</p>
                                            <p className="text-text-secondary leading-relaxed mb-6">{m.text}</p>
                                            <div className="bg-orange-100 rounded-2xl p-4 inline-block">
                                                <p className="text-dark-grey font-bold italic">{m.highlight}</p>
                                            </div>
                                        </div>
                                        <div className={`order-1 h-72 lg:h-96 rounded-3xl bg-gradient-to-br ${m.gradient} flex items-center justify-center shadow-xl relative overflow-hidden`}>
                                            <span className="absolute inset-0 opacity-10">
                                                <span className="absolute top-5 left-5 text-7xl">🐾</span>
                                                <span className="absolute bottom-5 right-5 text-6xl">🐾</span>
                                                <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-6xl">🐾</span>
                                            </span>
                                            <span className="text-8xl relative z-10">{m.emoji}</span>
                                            <div className="absolute bottom-4 left-4 bg-white/20 backdrop-blur-sm rounded-xl px-3 py-1.5">
                                                <span className="text-white font-bold text-sm">{m.year}</span>
                                            </div>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>

                        {i < milestones.length - 1 && (
                            <div className="hidden lg:flex justify-center">
                                <div className="w-8 h-8 rounded-full bg-white shadow-md border-2 border-orange-300 flex items-center justify-center relative z-10 -my-8">
                                    <span className="text-xs">🐾</span>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            <div className="bg-gradient-to-r from-orange-400 via-pink-300 to-purple-300 py-20">
                <div className="max-w-4xl mx-auto px-6 text-center text-white">
                    <span className="inline-block text-5xl mb-6">🎯</span>
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">
                        Prêt à écrire la suite de l'histoire ?
                    </h2>
                    <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
                        Chaque médaille vendue est une nouvelle histoire de retrouvailles qui s'écrit. Rejoins l'aventure.
                    </p>
                    <Link
                        to="/categorie/medaille-gravee"
                        className="inline-flex items-center gap-2 bg-white text-dark-grey font-bold text-lg px-10 py-4 rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-105"
                    >
                        Commander ma médaille
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </Link>
                </div>
            </div>
        </div>
    )
}
