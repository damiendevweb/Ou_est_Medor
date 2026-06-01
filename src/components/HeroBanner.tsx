import { Link } from 'react-router-dom'
import herobanner_visual from '../assets/images/herobanner_1.jpg'

export const HeroBanner = () => {
    return (
        <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-light-grey">
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <span className="absolute top-20 left-[15%] text-5xl opacity-10 animate-float-slow">🐾</span>
                <span className="absolute bottom-32 right-[20%] text-4xl opacity-10 animate-float" style={{ animationDelay: '1s' }}>🐾</span>
                <span className="absolute top-1/3 right-[10%] text-3xl opacity-10 animate-float" style={{ animationDelay: '2s' }}>🦴</span>
                <span className="absolute bottom-1/4 left-[8%] text-3xl opacity-10 animate-float-slow" style={{ animationDelay: '0.5s' }}>🐶</span>
                <span className="absolute top-[15%] right-[35%] text-2xl opacity-10 animate-float" style={{ animationDelay: '3s' }}>⭐</span>
            </div>

            <div className="relative max-w-7xl mx-auto px-6 lg:px-8 w-full">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                    <div className="animate-fade-in-up order-2 lg:order-1 pt-20 lg:pt-0">
                        <span className="inline-block bg-orange-100 text-orange-400 text-sm font-bold px-4 py-2 rounded-full mb-6">
                            🐕 La médaille connectée n°1 en France
                        </span>
                        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.1] text-dark-grey mb-6">
                            Ne perdez plus
                            <br />
                            <span className="text-orange-400">votre animal</span>
                            <br />
                            de vue
                        </h1>
                        <p className="text-lg sm:text-xl text-text-secondary leading-relaxed max-w-lg mb-8">
                            Une médaille QR Code scannable par tout smartphone. Fiche complète,
                            géolocalisation et notification instantanée. La tranquillité d'esprit
                            offerte à votre compagnon.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <Link
                                to="/categorie/medaille-gravee"
                                className="inline-flex items-center gap-2 bg-orange-400 hover:bg-orange-500 text-white font-bold text-lg px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-105"
                            >
                                Commander ma médaille
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </Link>
                            <Link
                                to="/login"
                                className="inline-flex items-center gap-2 bg-white text-dark-grey font-bold text-lg px-8 py-4 rounded-full border-2 border-dark-grey/10 hover:border-orange-400 hover:text-orange-400 shadow-lg hover:shadow-xl transition-all"
                            >
                                Déjà client ?
                            </Link>
                        </div>
                        <div className="flex items-center gap-6 mt-10 text-sm text-text-secondary">
                            <div className="flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-green-300 animate-pulse" />
                                +2 500 animaux protégés
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-yellow-300">⭐</span>
                                4.9/5 avis clients
                            </div>
                        </div>
                    </div>

                    <div className="relative order-1 lg:order-2 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                        <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white/50">
                            <img
                                className="w-full h-100 lg:h-137.5 object-cover"
                                src={herobanner_visual}
                                alt="Chien avec médaille connectée"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-dark-grey/20 to-transparent" />
                        </div>

                        <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl p-4 flex items-center gap-3 animate-float-slow">
                            <div className="w-12 h-12 bg-green-200 rounded-xl flex items-center justify-center text-xl">✅</div>
                            <div>
                                <p className="text-sm font-bold text-dark-grey">Scan réussi</p>
                                <p className="text-xs text-text-secondary">Retrouvailles en cours</p>
                            </div>
                        </div>

                        <div className="absolute -top-4 -right-4 bg-white rounded-2xl shadow-xl p-3 flex items-center gap-2 animate-float" style={{ animationDelay: '1.5s' }}>
                            <span className="text-2xl">📱</span>
                            <span className="text-sm font-bold text-dark-grey">QR Code</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="absolute bottom-0 left-0 right-0 h-1 bg-linear-to-r from-orange-300 via-pink-300 to-purple-300" />
        </section>
    )
}
