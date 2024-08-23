# Holdem Planning

Bienvenue sur **Holdem Planning**, une application conçue pour timer les différentes estimations durant une session de poker planning.

## Fonctionnalités

- **Estimation de temps** : Timer pour les différentes estimations.
- **Progressive Web App (PWA)** : L'application peut être installée sur votre appareil pour une expérience optimale.
- **Authentification** : Connectez-vous en toute sécurité grâce à Supabase.
- **Prochainement** : Intégration de la base de données avec Supabase pour stocker vos données.

## URL de l'Application

L'application est disponible à l'URL suivante : [Lien ici](https://holdem-planning.vercel.app/)

## Technologies Utilisées

- **React** : Bibliothèque JavaScript pour construire l'interface utilisateur.
- **Vite** : Outil de build rapide et léger pour le développement front-end.
- **Supabase** : Plateforme backend pour l'authentification et, bientôt, la gestion de la base de données.
- **PWA** : L'application est une Progressive Web App, offrant une expérience utilisateur similaire à celle d'une application native.

## Installation

Pour installer et lancer l'application en local, suivez les étapes suivantes :

1. Clonez le dépôt :
    ```sh
    git clone https://github.com/votre-utilisateur/holdem-planning.git
    cd holdem-planning
    ```

2. Installez les dépendances :
    ```sh
    npm install
    ```

3. Lancez le serveur de développement :
    ```sh
    npm run dev
    ```

4. Pour créer un build de production :
    ```sh
    npm run build
    ```

## Configuration

Assurez-vous de configurer les variables d'environnement pour la connexion à Supabase et d'autres configurations nécessaires. Créez un fichier `.env` à la racine du projet avec les variables suivantes :

```env
VITE_SUPABASE_URL=your-supabase-url
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
````

## Contribution

Les contributions sont les bienvenues ! Pour contribuer :

1. Forkez le projet

2. Créez votre branche de fonctionnalité (git checkout -b feature/AmazingFeature)

3. Commitez vos changements (git commit -m 'Add some AmazingFeature')

4. Poussez votre branche (git push origin feature/AmazingFeature)

5. Ouvrez une Pull Request

## Licence

Ce projet est sous licence MIT. Voir le fichier LICENSE pour plus de détails.

## Remerciements

Merci à tous les contributeurs et aux mainteneurs des bibliothèques open-source utilisées dans ce projet.