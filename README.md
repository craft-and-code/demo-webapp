# ⚡ NovaEnergy — PDL Explorer

This repository hosts a small full-stack application built around a clean client-server architecture. It exposes a set of electricity delivery points (_Points de Livraison_, or **PDL**) through a REST API and renders them in a dynamic, responsive and accessible interface.

The goal is a compact yet production-minded showcase: clear separation of concerns, a fully typed frontend, self-hosted assets, and deliberate attention to accessibility and performance rather than raw feature count.

## 🧱 Tech Stack

- **Frontend** — React 19, React Router 7 (SSR enabled), TypeScript, Tailwind CSS v4, Vite 8. Documentation generated with TypeDoc, linting via ESLint. Inter is self-hosted (variable `woff2`), with no dependency on Google Fonts.
- **Backend** — Node.js (ESM), Express 4, `dotenv`, tested with the native `node:test` runner. Layered architecture: `routes → controllers → services → middlewares`.

## 📁 Project Structure

The repository is organized as follows:

- `/back`: Contains all server logic, the REST API, and JSON data handling. A dedicated `README.md` provides detailed setup and operation instructions for the backend.
- `/front`: Contains the user interface. A dedicated `README.md` explains the component structure and how to run the frontend.
- `/screenshots`: Contains screenshots of the user interface and features. Perfect for an instant visual preview of the application without having to install and run it locally.

## ✨ Features & Highlights

### Interface & Components

- **Pages** — a list view (`Home`) with live search/filtering, loading skeletons, and dedicated empty / API-offline states; and a `PDL Detail` view with a consumption gauge and estimated cost & CO₂ metrics.
- **Components** — `Navbar`, `Logo`, `SwitchMode` (dark/light toggle persisted to `localStorage`), `ApiStatut` (polled live status badge), `PdlCard`, and an accessible `ErrorModal`.
- **Data layer** — a `usePdl` hook handling list/detail fetching with typed error states (network vs. API), a typed `api` service, and colour helpers.

### Accessibility

- Document language declared as French (`lang="fr"`).
- Search field paired with an associated (visually hidden) `<label>`.
- Error modal exposed as `role="alertdialog"`, with focus moved to it on open and restored on close, closing on `Escape` or backdrop click.
- Consumption gauge exposed as `role="progressbar"` with full value semantics (`aria-valuenow/min/max/valuetext`).
- Live API status announced via `role="status"` / `aria-live`.
- Theme toggle with a dynamic `aria-label` and `aria-pressed` state.
- Decorative SVG icons and emoji marked `aria-hidden`; loading skeletons flagged `aria-busy`.
- Light-theme contrast fixed (removal of a permanently light text colour).

### Performance & Assets

- **Self-hosted fonts** — Inter served locally (variable `woff2`, `latin` + `latin-ext` subsets, `font-display: swap`, preload of the primary file), removing any render-blocking Google Fonts request.
- Fonts are fetched reproducibly via `npm run fetch-fonts` (see `front/README.md`).

## 🚀 Future Enhancements & Scalability

While the project is fully functional as a showcase, here are the targeted areas for improvement for a large-scale production deployment:

- **Icon Optimization**: Replace hardcoded inline SVG tags with reusable icon files (SVG format or via an icon library). This will lighten the source code, simplify maintenance, and make it easier to share the design system across other applications.
- **Homepage Pagination**: To prevent infinite scrolling on the home page as the volume of JSON data grows, implementing a pagination system (navigation bar with page numbers 1, 2, 3...) is highly recommended.
- **Display Configuration**: In conjunction with pagination, add a selector allowing the user to choose the maximum number of items displayed per page (e.g., 50, 100, or 500 items).

## 📌 Notes

- 📁 **Managing the `front/docs` Folder**: This folder is currently tracked in Git for demonstration purposes. Eventually, it should be added to `.gitignore` to avoid cluttering the commit history every time the documentation is regenerated.

---

# ⚡ NovaEnergy — Explorateur de PDL

Ce dépôt héberge une application _full-stack_ construite autour d'une architecture client-serveur claire. Elle expose un ensemble de points de livraison d'électricité (**PDL**) via une API REST et les restitue dans une interface dynamique, responsive et accessible.

L'objectif est une vitrine compacte mais pensée pour la production : séparation nette des responsabilités, _frontend_ entièrement typé, ressources auto-hébergées et une attention délibérée à l'accessibilité et à la performance plutôt qu'à l'accumulation de fonctionnalités.

## 🧱 Stack technique

- **Frontend** — React 19, React Router 7 (rendu côté serveur activé), TypeScript, Tailwind CSS v4, Vite 8. Documentation générée avec TypeDoc, _linting_ via ESLint. La police Inter est auto-hébergée (variable `woff2`), sans aucune dépendance à Google Fonts.
- **Backend** — Node.js (ESM), Express 4, `dotenv`, testé avec le _runner_ natif `node:test`. Architecture en couches : `routes → controllers → services → middlewares`.

## 📁 Structure du Projet

Le dépôt est organisé de la manière suivante :

- `/back` : Contient toute la logique du serveur, de l'API REST et de la manipulation des données JSON. Un `README.md` dédié s'y trouve pour détailler l'installation et le fonctionnement du _backend_.
- `/front` : Contient l'interface utilisateur. Un `README.md` dédié explique la structure des composants et comment lancer la partie _frontend_.
- `/screenshots` : Regroupe des captures d'écran de l'interface et du projet. Idéal pour visualiser le rendu et le fonctionnement global instantanément, sans avoir à installer et lancer l'application en local.

## ✨ Fonctionnalités & Points pris en compte

### Interface & Composants

- **Pages** — une vue liste (`Home`) avec recherche/filtrage en direct, squelettes de chargement et états dédiés vide / API hors ligne ; et une vue `Détail PDL` avec une jauge de consommation ainsi que des estimations de coût et d'empreinte CO₂.
- **Composants** — `Navbar`, `Logo`, `SwitchMode` (bascule clair/sombre persistée dans le `localStorage`), `ApiStatut` (badge de statut live interrogé périodiquement), `PdlCard`, et une `ErrorModal` accessible.
- **Couche données** — un hook `usePdl` gérant la récupération liste/détail avec des états d'erreur typés (réseau vs. API), un service `api` typé, et des utilitaires de couleurs.

### Accessibilité

- Langue du document déclarée en français (`lang="fr"`).
- Champ de recherche associé à un `<label>` (masqué visuellement).
- Modale d'erreur exposée en `role="alertdialog"`, avec le focus déplacé dessus à l'ouverture et restauré à la fermeture, fermeture au clavier (`Échap`) ou au clic sur le fond.
- Jauge de consommation exposée en `role="progressbar"` avec une sémantique de valeur complète (`aria-valuenow/min/max/valuetext`).
- Statut de l'API annoncé via `role="status"` / `aria-live`.
- Bouton de thème doté d'un `aria-label` dynamique et d'un état `aria-pressed`.
- Icônes SVG et emoji décoratifs marqués `aria-hidden` ; squelettes de chargement signalés en `aria-busy`.
- Contraste corrigé en thème clair (suppression d'une couleur de texte claire appliquée en permanence).

### Performance & Ressources

- **Polices auto-hébergées** — Inter servie en local (variable `woff2`, sous-ensembles `latin` + `latin-ext`, `font-display: swap`, préchargement du fichier principal), ce qui supprime toute requête bloquante vers Google Fonts.
- Les polices se récupèrent de façon reproductible via `npm run fetch-fonts` (voir `front/README.md`).

## 🚀 Pistes d'Amélioration & Évolutions

Bien que le projet soit pleinement fonctionnel comme vitrine, voici les axes d'amélioration envisagés pour une mise en production ou un projet à plus grande échelle :

- **Optimisation des icônes** : remplacer les balises SVG actuellement intégrées "en dur" dans le code par de vrais fichiers d'icônes réutilisables (au format SVG ou via une bibliothèque d'icônes). Cela permet d'alléger le code source et de faciliter la maintenance ou le partage avec d'autres applications de la charte graphique.
- **Pagination de la page d'accueil** : pour éviter une liste infinie sur la page HOME si le volume de données JSON augmente, l'implémentation d'un système de pagination (barre de navigation avec les numéros de pages 1, 2, 3...) est fortement recommandée.
- **Configuration de l'affichage** : en lien avec la pagination, ajouter un sélecteur permettant à l'utilisateur de choisir le nombre maximum d'éléments à afficher par page (par exemple : 50, 100 ou 500 éléments).

## 📌 Notes

- 📁 **Gestion du dossier `front/docs`** : Ce dossier est actuellement suivi sur Git pour ce projet. À terme, il devrait être ajouté au `.gitignore` pour éviter de polluer l'historique des commits à chaque régénération de la documentation.
