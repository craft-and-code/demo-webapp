# 📝 Project Showcase

Welcome to this repository. This project serves as a portfolio piece to demonstrate my development skills and technical rigor. It involves fetching JSON data via an API and displaying it dynamically and ergonomically on a user interface.
Built with a professional mindset, the project is cleanly segmented following a standard client-server architecture, showcasing my ability to structure scalable and production-ready applications.

## 📁 Project Structure

The repository is organized as follows:

- `/back`: Contains all server logic, the REST API, and JSON data handling. A dedicated README.md provides detailed setup and operation instructions for the backend.
- `/front`: Contains the user interface. A dedicated `README.md` explains the component structure and how to run the frontend.
- `/screenshots` : Contains screenshots of the user interface and features. Perfect for an instant visual preview of the application without having to install and run it locally.

## 🚀 Future Enhancements & Scalability

While the project is fully functional as a showcase, here are the targeted areas for improvement for a large-scale production deployment:

- **Icon Optimization**: Replace hardcoded inline SVG tags with reusable icon files (SVG format or via an icon library). This will lighten the source code, simplify maintenance, and make it easier to share the design system across other applications.
- **Theme Support (Dark/Light Mode)**: Color variables have not yet been optimized for dynamic theme switching. Further work on the global stylesheet and design system is required to implement this feature.
- **Homepage Pagination**: To prevent infinite scrolling on the home page as the volume of JSON data grows, implementing a pagination system (navigation bar with page numbers 1, 2, 3...) is highly recommended.
- **Display Configuration**: In conjunction with pagination, add a selector allowing the user to choose the maximum number of items displayed per page (e.g., 50, 100, or 500 items).

## 📌 Notes

- 📁 **Managing the `front/docs` Folder**: This folder is currently tracked in Git for demonstration purposes. Eventually, it should be added to `.gitignore` to avoid cluttering the commit history every time the documentation is regenerated.

---

# 📝 Projet de Démonstration

Bienvenue dans ce dépôt. Ce projet sert de vitrine pour illustrer mes compétences en développement et ma rigueur technique. Il consiste à récupérer des données au format JSON via une API et à les afficher de manière dynamique et ergonomique sur une interface utilisateur.
Conçu avec une approche professionnelle, le projet a été segmenté de façon claire en respectant l'architecture client-serveur, prouvant ainsi ma capacité à structurer des applications évolutives.

## 📁 Structure du Projet

Le dépôt est organisé de la manière suivante :

- `/back` : Contient toute la logique du serveur, de l'API REST et de la manipulation des données JSON. Un `README.md` dédié s'y trouve pour détailler l'installation et le fonctionnement du _backend_.
- `/front` : Contient l'interface utilisateur. Un `README.md` dédié explique la structure des composants et comment lancer la partie _frontend_.
- `/screenshots` : Regroupe des captures d'écran de l'interface et du projet. Idéal pour visualiser le rendu et le fonctionnement global instantanément, sans avoir à installer et lancer l'application en local.

## 🚀 Pistes d'Amélioration & Évolutions

Bien que le projet soit pleinement fonctionnel pour les besoins du test, voici les axes d'amélioration envisagés pour une mise en production ou un projet à plus grande échelle :

- **Optimisation des icônes** : remplacer les balises SVG actuellement intégrées "en dur" dans le code par de vrais fichiers d'icônes réutilisables (au format SVG ou via une bibliothèque d'icônes). Cela permet d'alléger le code source et de faciliter la maintenance ou le partage avec d'autres applications de la charte graphique.
- **Support des thèmes (Dark/Light mode)** : les variables de couleurs n'ont pas encore été optimisées pour gérer le mode clair et le mode sombre. Un travail sur la feuille de style globale et la charte graphique est nécessaire pour implémenter cette fonctionnalité.
- **Pagination de la page d'accueil** : pour éviter une liste infinie sur la page HOME si le volume de données JSON augmente, l'implémentation d'un système de pagination (barre de navigation avec les numéros de pages 1, 2, 3...) est fortement recommandée.
- **Configuration de l'affichage** : En lien avec la pagination, ajouter un sélecteur permettant à l'utilisateur de choisir le nombre maximum d'éléments à afficher par page (par exemple : 50, 100 ou 500 éléments).

## 📌 Notes

- 📁 **Gestion du dossier `front/docs`** : Ce dossier est actuellement suivi sur Git pour ce projet. À terme, il devrait être ajouté au `.gitignore` pour éviter de polluer l'historique des commits à chaque régénération de la documentation.
