export const CGV = () => {
    return (
        <div className="max-w-4xl mx-auto px-5 py-12">
            <h1 className="font-unbounded text-3xl md:text-4xl font-bold text-text-primary mb-8">
                Conditions Générales de Vente
            </h1>

            <div className="prose prose-sm text-text-secondary space-y-8">
                <section id="objet">
                    <h2 className="text-lg font-semibold text-text-primary mb-3">Article 1 — Objet</h2>
                    <p className="leading-relaxed">Les présentes Conditions Générales de Vente (CGV) régissent les relations contractuelles entre la société Où est Médor ?, exploitée par [Nom de la société], dont le siège social est situé à [Adresse], immatriculée au RCS de [Ville] sous le numéro [SIRET], et tout acheteur procédant à un achat via le site ouestmedor.fr.</p>
                </section>

                <section id="produits">
                    <h2 className="text-lg font-semibold text-text-primary mb-3">Article 2 — Produits</h2>
                    <p className="leading-relaxed">Les produits proposés à la vente sont les médaillons pour animaux de compagnie gravés avec QR code, tels que présentés sur le site ouestmedor.fr. Chaque produit est décrit avec la plus grande exactitude possible. Les photographies sont aussi fidèles que possible mais ne sauraient garantir une similitude parfaite avec le produit réel.</p>
                </section>

                <section id="prix">
                    <h2 className="text-lg font-semibold text-text-primary mb-3">Article 3 — Prix</h2>
                    <p className="leading-relaxed">Les prix sont indiqués en euros (€) toutes taxes comprises (TTC). La société se réserve le droit de modifier ses prix à tout moment, sendo que le prix applicable est celui en vigueur au moment de la validation de la commande par l'acheteur.</p>
                </section>

                <section id="commande">
                    <h2 className="text-lg font-semibold text-text-primary mb-3">Article 4 — Commande</h2>
                    <p className="leading-relaxed">La commande est validée lorsque l'acheteur a complété toutes les étapes du processus de commande : choix du produit, personnalisation, coordonnées, et paiement. Un email de confirmation est envoyé à l'adresse email renseignée par l'acheteur.</p>
                </section>

                <section id="paiement">
                    <h2 className="text-lg font-semibold text-text-primary mb-3">Article 5 — Paiement</h2>
                    <p className="leading-relaxed">Le paiement s'effectue en ligne par carte bancaire via le système sécurisé Stripe. Le débit de la carte est effectué au moment de la validation de la commande. Toutes les transactions sont sécurisées et chiffrées.</p>
                </section>

                <section id="livraison">
                    <h2 className="text-lg font-semibold text-text-primary mb-3">Article 6 — Livraison</h2>
                    <p className="leading-relaxed">Les médaillons sont fabriqués sur commande et expédiés dans un délai estimé de [X] jours ouvrés suivant la validation de la commande. Le délai de livraison peut varier en fonction de la destination. Les frais de livraison sont indiqués avant la validation de la commande.</p>
                </section>

                <section id="droit-retractation">
                    <h2 className="text-lg font-semibold text-text-primary mb-3">Article 7 — Droit de rétractation</h2>
                    <p className="leading-relaxed">Conformément aux articles L. 221-18 et suivants du Code de la consommation, l'acheteur dispose d'un délai de 14 jours à compter de la réception du produit pour exercer son droit de rétractation, sans avoir à justifier de motif. Toutefois, ce droit ne peut être exercé pour les produits personnalisés (médaillons gravés).</p>
                </section>

                <section id="garanties">
                    <h2 className="text-lg font-semibold text-text-primary mb-3">Article 8 — Garanties</h2>
                    <p className="leading-relaxed">Les produits bénéficient de la garantie légale de conformité prévue aux articles L. 217-3 et suivants du Code de la consommation. En cas de défaut de conformité, l'acheteur peut demander l'échange ou le remboursement du produit.</p>
                </section>

                <section id="responsabilite">
                    <h2 className="text-lg font-semibold text-text-primary mb-3">Article 9 — Responsabilité</h2>
                    <p className="leading-relaxed">La société ne saurait être tenue responsable des dommages résultant d'une utilisation non conforme du produit. La responsabilité de la société est limitée au montant de la commande.</p>
                </section>

                <section id="donnees-personnelles">
                    <h2 className="text-lg font-semibold text-text-primary mb-3">Article 10 — Données personnelles</h2>
                    <p className="leading-relaxed">Les données personnelles collectées sont traitées conformément au Règlement Général sur la Protection des Données (RGPD). Pour plus d'informations, consultez notre <a href="/politique-de-confidentialite" className="text-accent hover:underline">Politique de Confidentialité</a>.</p>
                </section>

                <section id="litiges">
                    <h2 className="text-lg font-semibold text-text-primary mb-3">Article 11 — Litiges</h2>
                    <p className="leading-relaxed">Les présentes CGV sont soumises au droit français. En cas de litige, les parties s'engagent à rechercher une amiable avant toute action judiciaire. À défaut, les tribunaux compétents seront ceux du ressort du siège social de la société.</p>
                </section>
            </div>
        </div>
    )
}
