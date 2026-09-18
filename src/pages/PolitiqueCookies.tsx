export const PolitiqueCookies = () => {
    return (
        <div className="max-w-4xl mx-auto px-5 py-12">
            <h1 className="font-unbounded text-3xl md:text-4xl font-bold text-text-primary mb-8">
                Politique de Cookies
            </h1>

            <div className="prose prose-sm text-text-secondary space-y-8">
                <section id="qu'est-ce-qu-un-cookie">
                    <h2 className="text-lg font-semibold text-text-primary mb-3">1. Qu'est-ce qu'un cookie ?</h2>
                    <p className="leading-relaxed">Un cookie est un petit fichier texte déposé sur votre terminal (ordinateur, tablette, smartphone) lors de la consultation d'un site internet. Il permet au site de stocker des informations sur vos habitudes de navigation.</p>
                </section>

                <section id="cookies-utilises">
                    <h2 className="text-lg font-semibold text-text-primary mb-3">2. Cookies utilisés sur ce site</h2>

                    <h3 className="text-base font-semibold text-text-primary mt-4 mb-2">Cookies essentiels</h3>
                    <p className="leading-relaxed">Ces cookies sont indispensables au fonctionnement du site. Ils ne peuvent pas être désactivés.</p>
                    <ul className="list-disc list-inside mt-2 space-y-1">
                        <li><strong>Panier d'achat</strong> : conservation de votre panier lors de votre navigation</li>
                        <li><strong>Session utilisateur</strong> : maintien de votre connexion</li>
                        <li><strong>Consentement cookies</strong> : mémorisation de votre choix concernant les cookies</li>
                    </ul>

                    <h3 className="text-base font-semibold text-text-primary mt-6 mb-2">Cookies analytics</h3>
                    <p className="leading-relaxed">Ces cookies nous permettent de mesurer l'audience du site et d'améliorer votre expérience. Ils ne sont chargés qu'avec votre consentement.</p>
                    <ul className="list-disc list-inside mt-2 space-y-1">
                        <li><strong>Umami</strong> : mesure d'audience respectueuse de la vie privée (pages visitées, durée de session, provenance). Aucun cookie publicitaire n'est utilisé.</li>
                    </ul>
                </section>

                <section id="duree-vie">
                    <h2 className="text-lg font-semibold text-text-primary mb-3">3. Durée de vie des cookies</h2>
                    <ul className="list-disc list-inside space-y-1">
                        <li><strong>Cookies essentiels</strong> : durée de la session utilisateur</li>
                        <li><strong>Cookie de consentement</strong> : 13 mois</li>
                        <li><strong>Cookies analytics (Umami)</strong> : durée de la session</li>
                    </ul>
                </section>

                <section id="gestion-preferences">
                    <h2 className="text-lg font-semibold text-text-primary mb-3">4. Gestion de vos préférences</h2>
                    <p className="leading-relaxed">Vous pouvez modifier vos préférences de cookies à tout moment en cliquant sur le lien « Cookies » en bas de chaque page du site.</p>
                </section>

                <section id="cookies-tiers">
                    <h2 className="text-lg font-semibold text-text-primary mb-3">5. Cookies tiers</h2>
                    <p className="leading-relaxed">Ce site n'utilise aucun cookie publicitaire ni aucun cookie de tiers à des fins commerciales. Le seul service tiers est Umami, qui est un outil de mesure d'audience respectueux de la vie privée.</p>
                </section>

                <section id="inscription-suppression">
                    <h2 className="text-lg font-semibold text-text-primary mb-3">6. Comment supprimer les cookies ?</h2>
                    <p className="leading-relaxed">Vous pouvez paramétrer votre navigateur pour refuser les cookies ou être alerté lorsqu'un cookie est déposé. Les paramètres varient selon les navigateurs :</p>
                    <ul className="list-disc list-inside mt-2 space-y-1">
                        <li><strong>Chrome</strong> : Paramètres → Confidentialité et sécurité → Cookies</li>
                        <li><strong>Firefox</strong> : Paramètres → Vie privée et sécurité → Cookies</li>
                        <li><strong>Safari</strong> → Préférences → Confidentialité</li>
                        <li><strong>Edge</strong> → Paramètres → Confidentialité → Cookies</li>
                    </ul>
                </section>

                <section id="contact">
                    <h2 className="text-lg font-semibold text-text-primary mb-3">7. Contact</h2>
                    <p className="leading-relaxed">Pour toute question relative à notre politique de cookies, contactez-nous à : <a href="mailto:contact@ouestmedor.fr" className="text-accent hover:underline">contact@ouestmedor.fr</a></p>
                </section>
            </div>
        </div>
    )
}
