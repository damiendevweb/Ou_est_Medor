export const MentionsLegales = () => {
    return (
        <div className="max-w-4xl mx-auto px-5 py-12">
            <h1 className="font-unbounded text-3xl md:text-4xl font-bold text-text-primary mb-8">
                Mentions Légales
            </h1>

            <div className="prose prose-sm text-text-secondary space-y-8">
                <section id="editeur">
                    <h2 className="text-lg font-semibold text-text-primary mb-3">1. Éditeur du site</h2>
                    <p className="leading-relaxed">
                        <strong>Où est Médor ?</strong><br />
                        [Nom de la société]<br />
                        [Forme juridique]<br />
                        Capital social : [Montant] €<br />
                        Siège social : [Adresse]<br />
                        RCS [Ville] : [Numéro SIRET]<br />
                        TVA intracommunautaire : [Numéro]<br />
                        Directeur de la publication : [Nom]
                    </p>
                </section>

                <section id="hebergeur">
                    <h2 className="text-lg font-semibold text-text-primary mb-3">2. Hébergeur</h2>
                    <p className="leading-relaxed">
                        Ce site est hébergé par :<br />
                        <strong>Render</strong><br />
                        Render Inc.<br />
                        525 Brannan St<br />
                        San Francisco, CA 94107<br />
                        États-Unis
                    </p>
                </section>

                <section id="propriete-intellectuelle">
                    <h2 className="text-lg font-semibold text-text-primary mb-3">3. Propriété intellectuelle</h2>
                    <p className="leading-relaxed">L'ensemble du contenu de ce site (textes, images, vidéos, logos, marques, graphismes, logiciels, programmes, codes sources, etc.) est la propriété exclusive de la société ou de ses partenaires et est protégé par les lois françaises et internationales relatives à la propriété intellectuelle.</p>
                    <p className="leading-relaxed mt-2">Toute reproduction, représentation, modification, publication, adaptation de tout ou partie du contenu du site, quel que soit le moyen ou le procédé utilisé, est interdite, sauf autorisation écrite préalable de la société.</p>
                </section>

                <section id="donnees-personnelles">
                    <h2 className="text-lg font-semibold text-text-primary mb-3">4. Données personnelles</h2>
                    <p className="leading-relaxed">Le traitement des données personnelles est décrit dans notre <a href="/politique-de-confidentialite" className="text-accent hover:underline">Politique de Confidentialité</a>.</p>
                </section>

                <section id="cookies">
                    <h2 className="text-lg font-semibold text-text-primary mb-3">5. Cookies</h2>
                    <p className="leading-relaxed">L'utilisation des cookies est décrite dans notre <a href="/politique-de-cookies" className="text-accent hover:underline">Politique de Cookies</a>.</p>
                </section>

                <section id="credits">
                    <h2 className="text-lg font-semibold text-text-primary mb-3">6. Crédits</h2>
                    <p className="leading-relaxed">
                        Conception et développement : [Nom du développeur / Agence]<br />
                        Hébergement : Render<br />
                        CMS : Sanity
                    </p>
                </section>
            </div>
        </div>
    )
}
