# L’Atelier des Volcans — démonstration

Site vitrine statique fictif conçu pour présenter un exemple de réalisation à des commerces locaux.

## Structure

```text
atelier-des-volcans-github-pages/
├── .nojekyll
├── favicon.svg
├── index.html
├── styles.css
├── script.js
└── images/
```

## Ouvrir le site localement

Double-clique sur `index.html`. Aucun logiciel, serveur ou compte n’est nécessaire.

## Publier sur GitHub Pages

1. Crée un dépôt GitHub public, par exemple `restaurant-demo`.
2. Dépose tous les fichiers et le dossier `images` à la racine du dépôt.
3. Ouvre **Settings → Pages**.
4. Dans **Build and deployment**, choisis **Deploy from a branch**.
5. Sélectionne la branche `main`, puis le dossier `/ (root)` et enregistre.
6. Patiente quelques minutes : l’adresse sera du type `https://TON-PSEUDO.github.io/restaurant-demo/`.

## Protection de cette démonstration

- La page contient `noindex, nofollow, noarchive` afin de ne pas être référencée comme un véritable restaurant.
- Les appels, réservations, itinéraires et réseaux sociaux affichent un message de démonstration au lieu de joindre de fausses coordonnées.
- Les visuels et l’établissement sont explicitement présentés comme fictifs.

## Passage à un véritable client

Avant une publication commerciale :

1. Remplace le nom, l’adresse, le téléphone, les horaires, les réseaux sociaux, les textes, les plats et les tarifs.
2. Remplace ou fais valider toutes les photographies et leurs droits d’utilisation.
3. Supprime la balise `robots` contenant `noindex`.
4. Remplace les attributs `data-demo-action` par les vrais liens `tel:`, réservation et Google Maps.
5. Remplace les liens sociaux fictifs par les profils officiels.
6. Complète les mentions légales avec les informations de l’entreprise et de l’hébergeur.
7. Ajoute des données structurées Schema.org uniquement avec les informations exactes du client.
8. Teste le site sur téléphone, tablette et ordinateur avant publication.

## Personnalisation rapide

Les couleurs, polices, largeurs et espacements principaux sont regroupés au début de `styles.css`, dans le bloc `:root`.
