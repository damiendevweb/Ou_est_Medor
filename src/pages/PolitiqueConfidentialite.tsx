export const PolitiqueConfidentialite = () => {
    return (
        <div className="max-w-4xl mx-auto px-5 py-12">
            <h1 className="font-unbounded text-3xl md:text-4xl font-bold text-text-primary mb-8">
                Politique de Confidentialité
            </h1>

            <div className="prose prose-sm text-text-secondary space-y-8">
                <section id="responsable">
                    <h2 className="text-lg font-semibold text-text-primary mb-3">1. Responsable du traitement</h2>
                    <p className="leading-relaxed">Le responsable du traitement des données personnelles est la société Où est Médor ?, exploitée par [Nom de la société], dont le siège social est situé à [Adresse], immatriculée au RCS de [Ville] sous le numéro [SIRET].</p>
                </section>

                <section id="donnees-collectees">
                    <h2 className="text-lg font-semibold text-text-primary mb-3">2. Données collectées</h2>
                    <p className="leading-relaxed">Nous collectons les données suivantes dans le cadre de l'utilisation du site et des services :</p>
                    <ul className="list-disc list-inside mt-2 space-y-1">
                        <li><strong>Données d'identification</strong> : prénom, adresse email</li>
                        <li><strong>Données de contact</strong> : numéro de téléphone</li>
                        <li><strong>Données de commande</strong> : historique des achats, adresse de livraison</li>
                        <li><strong>Données de navigation</strong> : pages visitées, durée de la session (via Umami, uniquement avec votre consentement)</li>
                    </ul>
                </section>

                <section id="finalite">
                    <h2 className="text-lg font-semibold text-text-primary mb-3">3. Finalité du traitement</h2>
                    <p className="leading-relaxed">Les données personnelles sont collectées pour les finalités suivantes :</p>
                    <ul className="list-disc list-inside mt-2 space-y-1">
                        <li>Gestion des commandes et de la livraison</li>
                        <li>Gestion du compte utilisateur</li>
                        <li>Communication relative aux commandes</li>
                        <li>Mesure d'audience (uniquement avec consentement)</li>
                        <li>Respect des obligations légales</li>
                    </ul>
                </section>

                <section id="base-legale">
                    <h2 className="text-lg font-semibold text-text-primary mb-3">4. Base légale du traitement</h2>
                    <p className="leading-relaxed">Le traitement de vos données personnelles repose sur : l'exécution du contrat de vente, votre consentement (pour les cookies analytics), et notre intérêt légitime (pour la gestion de la relation client).</p>
                </section>

                <section id="destinataires">
                    <h2 className="text-lg font-semibold text-text-primary mb-3">5. Destinataires des données</h2>
                    <p className="leading-relaxed">Vos données personnelles sont transmises uniquement aux prestataires nécessaires au bon fonctionnement du service : Stripe (paiement), Supabase (hébergement des données), et les services de livraison.</p>
                </section>

                <section id="duree-conservation">
                    <h2 className="text-lg font-semibold text-text-primary mb-3">6. Durée de conservation</h2>
                    <p className="leading-relaxed">Les données personnelles sont conservées pendant la durée nécessaire à l'accomplissement des finalités pour lesquelles elles ont été collectées, et durant 3 ans à compter de la dernière interaction avec l'utilisateur.</p>
                </section>

                <section id="droits">
                    <h2 className="text-lg font-semibold text-text-primary mb-3">7. Vos droits</h2>
                    <p className="leading-relaxed">Conformément au RGPD, vous disposez des droits suivants :</p>
                    <ul className="list-disc list-inside mt-2 space-y-1">
                        <li><strong>Droit d'accès</strong> : obtenir une copie de vos données</li>
                        <li><strong>Droit de rectification</strong> : corriger des données inexactes</li>
                        <li><strong>Droit à l'effacement</strong> : demander la suppression de vos données</li>
                        <li><strong>Droit à la portabilité</strong> : recevoir vos données dans un format structuré</li>
                        <li><strong>Droit d'opposition</strong> : vous opposer au traitement de vos données</li>
                    </ul>
                    <p className="mt-2">Pour exercer vos droits, contactez-nous à : <a href="mailto:contact@ouestmedor.fr" className="text-accent hover:underline">contact@ouestmedor.fr</a></p>
                </section>

                <section id="securite">
                    <h2 className="text-lg font-semibold text-text-primary mb-3">8. Sécurité des données</h2>
                    <p className="leading-relaxed">Nous mettons en œuvre toutes les mesures techniques et organisationnelles nécessaires pour protéger vos données personnelles contre tout accès non autorisé, altération, divulgation ou destruction.</p>
                </section>

                <section id="cookies">
                    <h2 className="text-lg font-semibold text-text-primary mb-3">9. Cookies</h2>
                    <p className="leading-relaxed">Pour en savoir plus sur l'utilisation des cookies, consultez notre <a href="/politique-de-cookies" className="text-accent hover:underline">Politique de Cookies</a>.</p>
                </section>

                <section id="contact">
                    <h2 className="text-lg font-semibold text-text-primary mb-3">10. Contact</h2>
                    <p className="leading-relaxed">Pour toute question relative à la protection de vos données personnelles, vous pouvez nous contacter à : <a href="mailto:contact@ouestmedor.fr" className="text-accent hover:underline">contact@ouestmedor.fr</a></p>
                </section>
            </div>
        </div>
    )
}
