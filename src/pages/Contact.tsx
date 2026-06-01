export const Contact = () => {
    return (
        <div className="min-h-screen bg-light-grey">
            <div className="relative py-20 overflow-hidden">
                <div className="absolute inset-0 pointer-events-none">
                    <span className="absolute top-10 left-[10%] text-5xl opacity-10 animate-float-slow">🐾</span>
                    <span className="absolute bottom-10 right-[15%] text-4xl opacity-10 animate-float">🐶</span>
                    <span className="absolute top-1/2 right-[25%] text-3xl opacity-10 animate-float" style={{ animationDelay: '1s' }}>🦴</span>
                </div>
                <div className="max-w-4xl mx-auto px-6 text-center relative">
                    <span className="inline-block text-5xl mb-4">💌</span>
                    <h1 className="text-4xl md:text-5xl font-bold text-dark-grey mb-4">
                        On reste en contact ?
                    </h1>
                    <p className="text-lg text-text-secondary max-w-2xl mx-auto">
                        Une question, un doute, une histoire de retrouvailles à partager ? On est là pour vous répondre.
                    </p>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-6 pb-20">
                <div className="grid md:grid-cols-3 gap-6 mb-16">
                    <div className="bg-white rounded-3xl p-6 shadow-lg text-center hover:shadow-xl transition-all border-t-4 border-orange-300">
                        <div className="w-14 h-14 bg-orange-100 rounded-2xl flex items-center justify-center text-2xl mx-auto mb-4">📧</div>
                        <h3 className="font-bold text-dark-grey mb-2">Email</h3>
                        <p className="text-text-secondary text-sm">contact@ouestmedor.fr</p>
                        <p className="text-text-secondary text-sm">Réponse sous 24h</p>
                    </div>
                    <div className="bg-white rounded-3xl p-6 shadow-lg text-center hover:shadow-xl transition-all border-t-4 border-yellow-300">
                        <div className="w-14 h-14 bg-yellow-200 rounded-2xl flex items-center justify-center text-2xl mx-auto mb-4">📞</div>
                        <h3 className="font-bold text-dark-grey mb-2">Téléphone</h3>
                        <p className="text-text-secondary text-sm">01 23 45 67 89</p>
                        <p className="text-text-secondary text-sm">Lun-Ven 9h-18h</p>
                    </div>
                    <div className="bg-white rounded-3xl p-6 shadow-lg text-center hover:shadow-xl transition-all border-t-4 border-pink-300">
                        <div className="w-14 h-14 bg-pink-200 rounded-2xl flex items-center justify-center text-2xl mx-auto mb-4">📍</div>
                        <h3 className="font-bold text-dark-grey mb-2">Adresse</h3>
                        <p className="text-text-secondary text-sm">12 Rue des Toutous</p>
                        <p className="text-text-secondary text-sm">75000 Paris</p>
                    </div>
                </div>

                <div className="max-w-2xl mx-auto">
                    <div className="bg-white rounded-3xl shadow-lg p-8 md:p-10 border-t-4 border-orange-300">
                        <h2 className="text-2xl font-bold text-dark-grey mb-2">Envoie-nous un message</h2>
                        <p className="text-text-secondary text-sm mb-8">Tous les champs marqués d'un * sont obligatoires.</p>

                        <form className="space-y-6">
                            <div className="grid sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-semibold text-dark-grey mb-1.5">
                                        Prénom <span className="text-orange-400">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Sophie"
                                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-orange-400 focus:outline-none transition-colors bg-light-grey text-dark-grey placeholder:text-gray-400"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-dark-grey mb-1.5">
                                        Nom <span className="text-orange-400">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Martin"
                                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-orange-400 focus:outline-none transition-colors bg-light-grey text-dark-grey placeholder:text-gray-400"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-dark-grey mb-1.5">
                                    Email <span className="text-orange-400">*</span>
                                </label>
                                <input
                                    type="email"
                                    placeholder="sophie@exemple.fr"
                                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-orange-400 focus:outline-none transition-colors bg-light-grey text-dark-grey placeholder:text-gray-400"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-dark-grey mb-1.5">
                                    Téléphone <span className="text-text-secondary">(optionnel)</span>
                                </label>
                                <input
                                    type="tel"
                                    placeholder="06 01 02 03 04"
                                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-orange-400 focus:outline-none transition-colors bg-light-grey text-dark-grey placeholder:text-gray-400"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-dark-grey mb-1.5">
                                    Sujet <span className="text-orange-400">*</span>
                                </label>
                                <select className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-orange-400 focus:outline-none transition-colors bg-light-grey text-dark-grey">
                                    <option value="">Sélectionne un sujet</option>
                                    <option value="produit">Question sur un produit</option>
                                    <option value="commande">Suivi de commande</option>
                                    <option value="retrouvailles">Témoignage de retrouvailles</option>
                                    <option value="partenariat">Partenariat</option>
                                    <option value="autre">Autre</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-dark-grey mb-1.5">
                                    Message <span className="text-orange-400">*</span>
                                </label>
                                <textarea
                                    rows={5}
                                    placeholder="Dis-nous tout..."
                                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-orange-400 focus:outline-none transition-colors bg-light-grey text-dark-grey placeholder:text-gray-400 resize-y"
                                />
                            </div>

                            <div className="flex items-start gap-3">
                                <input
                                    id="consent"
                                    type="checkbox"
                                    className="mt-1 w-4 h-4 rounded border-gray-300 text-orange-400 focus:ring-orange-400"
                                />
                                <label htmlFor="consent" className="text-sm text-text-secondary">
                                    J'accepte que mes données soient traitées pour répondre à ma demande.{' '}
                                    <a href="#" className="text-orange-400 hover:underline">Politique de confidentialité</a>.
                                </label>
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-orange-400 hover:bg-orange-500 text-white font-bold text-lg px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-[1.02]"
                            >
                                <span className="flex items-center justify-center gap-2">
                                    Envoyer mon message
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                </span>
                            </button>
                        </form>
                    </div>

                    <div className="mt-8 bg-gradient-to-r from-orange-400 via-pink-300 to-purple-300 rounded-3xl p-8 text-center text-white">
                        <span className="inline-block text-4xl mb-3">🐕</span>
                        <h3 className="text-2xl font-bold mb-2">Besoin d'aide rapidement ?</h3>
                        <p className="text-white/80 mb-6">
                            Consulte notre FAQ pour trouver une réponse immédiate à tes questions.
                        </p>
                        <a
                            href="#"
                            className="inline-block bg-white text-dark-grey font-bold px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-105"
                        >
                            Voir la FAQ
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}
