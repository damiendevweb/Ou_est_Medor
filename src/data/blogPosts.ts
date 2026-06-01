export interface BlogPost {
  slug: string
  title: string
  excerpt: string
  content: string
  date: string
  category: string
  categoryColor: string
  author: string
  authorRole: string
  authorInitials: string
  authorGradient: string
  readTime: string
}

export const blogPosts: BlogPost[] = [
  {
    slug: "choisir-medaille-chien",
    title: "Comment choisir la bonne médaille pour son chien ?",
    excerpt: "Découvrez nos conseils pour choisir la médaille parfaite pour votre compagnon à quatre pattes, alliant style et sécurité.",
    content: `Choisir une médaille pour son chien n'est pas un acte anodin. C'est à la fois un accessoire de mode et un outil de sécurité essentiel.

## Pourquoi une médaille est indispensable

Une médaille d'identification est le premier réflexe à avoir lorsqu'on adopte un animal. En cas de fugue ou de perte, c'est souvent le moyen le plus rapide pour être contacté. Contrairement à la puce électronique qui nécessite un lecteur vétérinaire, une médaille se lit au premier coup d'œil.

## Les critères de choix

### 1. La matière
Les médailles en acier inoxydable sont les plus résistantes. Elles ne rouillent pas et supportent les chocs. Le laiton massif est une excellente alternative pour un look plus classique.

### 2. La taille
Une médaille ne doit être ni trop petite (illisible) ni trop grande (gênante pour l'animal). Pour un chien de taille moyenne, visez un diamètre de 25 à 30 mm.

### 3. La lisibilité
Privilégiez une gravure en profondeur plutôt qu'une impression qui s'efface avec le temps. Les caractères doivent être suffisamment grands pour être lus à distance.

### 4. Le système d'attache
Un anneau solide est indispensable. Évitez les attaches en plastique qui peuvent se casser.

## La médaille connectée : l'innovation qui change tout

Les médailles avec QR Code comme celles de Où est Médor ? offrent un avantage décisif : elles permettent d'accéder à une fiche complète (vaccins, allergies, comportement) simplement en scannant le code avec un smartphone. Plus besoin de limiter les informations à graver.

## Conclusion

Investir dans une médaille de qualité, c'est investir dans la sécurité de votre animal. Avec les nouvelles technologies, vous pouvez même aller bien plus loin qu'une simple gravure.`,
    date: "Mar 16, 2026",
    category: "Conseils",
    categoryColor: "orange",
    author: "Vétérinaire Médor",
    authorRole: "Conseil expert",
    authorInitials: "VM",
    authorGradient: "from-orange-300 to-green-300",
    readTime: "5 min"
  },
  {
    slug: "fonctionnement-qr-code-medor",
    title: "Comment fonctionne le QR Code de Où est Médor ?",
    excerpt: "Tout comprendre sur la technologie derrière nos médailles connectées et comment elles permettent des retrouvailles rapides.",
    content: `Vous vous demandez comment une simple médaille peut révolutionner la sécurité de votre animal ? Voici tout ce qu'il faut savoir.

## Qu'est-ce qu'un QR Code ?

Le QR Code (Quick Response Code) est un code-barres en 2D qui peut être scanné par n'importe quel smartphone. Il stocke bien plus d'informations qu'un code-barres traditionnel.

## Comment ça marche concrètement ?

### Étape 1 : La médaille
Chaque médaille Où est Médor ? est gravée d'un QR Code unique lié au profil de votre animal dans notre base de données sécurisée.

### Étape 2 : Le scan
Quand quelqu'un trouve votre animal, il lui suffit de scanner le QR Code avec son téléphone. Aucune application à télécharger : la caméra du smartphone suffit ou alors une simple application de lecture de QR code.

### Étape 3 : L'information
Le scan affiche instantanément les informations que vous avez choisies de partager : nom de l'animal, numéro de téléphone, allergies éventuelles.

### Étape 4 : La notification
Vous recevez une notification en temps réel avec la localisation approximative du scan. Vous savez immédiatement où votre animal a été retrouvé.

## La sécurité avant tout

Nous utilisons Supabase pour héberger les données de manière sécurisée. Vous contrôlez exactement quelles informations sont publiques et lesquelles restent privées.

## Les avantages par rapport à une médaille classique

- Plus d'informations disponibles
- Mise à jour à distance (déménagement, nouveau numéro)
- Géolocalisation du scan
- Pas de limite de caractères pour la gravure

La technologie au service de la tranquillité d'esprit !`,
    date: "Mar 10, 2026",
    category: "Technologie",
    categoryColor: "purple",
    author: "Équipe Médor",
    authorRole: "Blog technique",
    authorInitials: "OM",
    authorGradient: "from-purple-300 to-pink-300",
    readTime: "4 min"
  },
  {
    slug: "temoignage-retrouvailles-chien",
    title: '"Grâce à Médor, j\'ai retrouvé mon chien en 10 minutes"',
    excerpt: "L'histoire touchante de Sophie et son golden retriever Max, réunis grâce à la médaille intelligente.",
    content: `Sophie habite à Lyon avec Max, son golden retriever de 3 ans. Comme tous les jours, elle lui a ouvert la porte du jardin pour qu'il puisse profiter du soleil. Mais ce jour-là, Max a senti une odeur intrigante et a décidé de passer sous la clôture.

## Le moment de panique

"Quand je me suis retournée et que j'ai vu le trou sous le grillage, mon cœur s'est arrêté. J'ai immédiatement commencé à courir dans le quartier en l'appelant, mais rien."

Sophie a passé 20 minutes à chercher sans succès. C'est là qu'elle s'est souvenue de la médaille Où est Médor ? qu'elle avait offerte à Max pour Noël.

## Le déclic

"J'ai sorti mon téléphone et je me suis connectée à mon compte. Il y avait déjà une notification : '🐾 Max a été scanné !' avec une localisation à 800 mètres de la maison."

Un couple de promeneurs avait trouvé Max dans un parc et avait scanné le QR Code. En quelques secondes, ils avaient le nom du chien et le numéro de téléphone de Sophie.

## La retrouvaille

"Dix minutes plus tard, je serrais Max dans mes bras. Sans la médaille, je serais encore en train de coller des affiches dans tout le quartier."

## Un message pour les propriétaires

Sophie recommande à tous les propriétaires d'équiper leur animal : "On pense toujours que ça n'arrive qu'aux autres, jusqu'au jour où ça nous arrive. Une médaille connectée, c'est si peu pour une tranquillité d'esprit totale."

Aujourd'hui, Max porte fièrement sa médaille Où est Médor ? et Sophie a même équipé le collier de son chat !`,
    date: "Feb 12, 2026",
    category: "Témoignage",
    categoryColor: "pink",
    author: "Sophie M.",
    authorRole: "Propriétaire",
    authorInitials: "S",
    authorGradient: "from-pink-300 to-yellow-300",
    readTime: "3 min"
  }
]

export function getBlogPost(slug: string): BlogPost | undefined {
  return blogPosts.find(p => p.slug === slug)
}
