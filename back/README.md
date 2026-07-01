# API REST Points de Livraison (PDL) - Node.js

Cette API REST moderne a été construite avec **Node.js (v26)** et **Express** pour exposer et interroger les données des Points de Livraison (PDL) issues du fichier `pdl_data.json`.

Le projet est entièrement documenté en français, typé à l'aide de commentaires au format **JSDoc**, et dispose d'une architecture modulaire robuste avec des tests d'intégration intégrés.

---

## 🏗️ Architecture du Projet

Le code est structuré selon une architecture en couches propre afin de garantir la maintenabilité, la lisibilité et l'évolutivité du code :

```text
back/
├── .env                  # Configuration d'environnement locale
├── .env.example          # Gabarit de configuration d'environnement
├── .editorconfig         # Configuration de l'éditeur de code
├── package.json          # Définition des dépendances et scripts npm
├── pdl_data.json         # Base de données source (format JSON)
├── README.md             # Documentation générale du projet (ce fichier)
└── src/
    ├── app.js            # Initialisation et configuration d'Express
    ├── server.js         # Point d'entrée pour le démarrage du serveur HTTP
    ├── config/
    │   └── config.js     # Gestionnaire et validateur de configuration
    ├── controllers/
    │   └── pdlController.js  # Traitement des requêtes et validation des entrées
    ├── middlewares/
    │   ├── errorHandler.js   # Middleware d'interception des erreurs globales (500)
    │   └── notFoundHandler.js # Middleware d'interception des routes inconnues (404)
    ├── routes/
    │   └── pdlRoutes.js      # Définition des points de terminaison (endpoints)
    ├── services/
    │   └── pdlService.js     # Logique métier et accès aux données (cache Map O(1))
    └── tests/
        └── api.test.js       # Suite de tests d'intégration E2E natifs
```

---

## 🛠️ Prérequis

- **Node.js** : Version `v22.x` ou supérieure (développé et testé sous **Node.js v26.0.0**)
- **npm** : Version `v10.x` ou supérieure

---

## 🚀 Installation et Démarrage

### 1. Cloner ou naviguer dans le dossier du projet
```bash
cd back
```

### 2. Installer les dépendances
```bash
npm install
```

### 3. Configurer l'environnement
Copiez le fichier d'exemple `.env.example` en `.env` :
```bash
cp .env.example .env
```
Le fichier `.env` par défaut contient :
```env
PORT=3000
NODE_ENV=development
DATA_PATH=pdl_data.json
```

### 4. Démarrer le serveur

#### En mode Production
```bash
npm start
```

#### En mode Développement (avec rechargement automatique)
Le rechargement utilise l'option native `--watch` de Node.js, évitant l'usage de paquets additionnels comme `nodemon` :
```bash
npm run dev
```

Un message de succès s'affichera dans la console :
```text
==================================================
🚀 Serveur API PDL démarré avec succès !
🌍 URL locale : http://localhost:3000
⚙️  Environnement : development
📁 Fichier de données : /Users/kcell/Documents/NovaEnergy/Test d'embauche/Projet/back/pdl_data.json
==================================================
```

---

## 🧪 Exécution des Tests

Le projet intègre une suite complète de tests d'intégration de bout en bout (E2E) utilisant le **test runner natif** de Node.js (`node:test`). Elle démarre automatiquement un serveur éphémère sur un port dynamique libre pour valider les comportements de toutes les routes.

Pour lancer les tests :
```bash
npm test
```

---

## 📡 Spécification des Points de Terminaison (API)

Toutes les réponses de l'API sont retournées avec l'en-tête `Content-Type: application/json` et un jeu d'en-têtes HTTP désactivant la mise en cache pour garantir des données fraîches.

### 1. Statut opérationnel de l'API

- **Route** : `GET /`
- **Description** : Renvoie le statut de fonctionnement de l'API, un horodatage et la version.
- **Commande Test (curl)** :
  ```bash
  curl -i http://localhost:3000/
  ```
- **Exemple de Réponse JSON (200 OK)** :
  ```json
  {
    "status": "OK",
    "timestamp": "2026-05-28T10:45:00.000Z",
    "version": "1.0.0"
  }
  ```

---

### 2. Liste complète des Points de Livraison (PDL)

- **Route** : `GET /listpdl`
- **Description** : Retourne la liste complète de l'ensemble des points de livraison existants.
- **Commande Test (curl)** :
  ```bash
  curl -i http://localhost:3000/listpdl
  ```
- **Exemple de Réponse JSON (200 OK)** :
  ```json
  [
    {
      "pdl": "10433218196001",
      "nom": "Martin",
      "prenom": "Alice",
      "ville": "Strasbourg",
      "consommation_kwh": 8423
    },
    {
      "pdl": "89083863794026",
      "nom": "Bernard",
      "prenom": "Bruno",
      "ville": "Rennes",
      "consommation_kwh": 9905
    }
  ]
  ```

---

### 3. Détails d'un Point de Livraison (PDL) spécifique

- **Route** : `GET /pdl/:pdl`
- **Description** : Renvoie le détail complet du point de livraison correspondant à l'identifiant `:pdl` (chaîne numérique de 14 chiffres).
- **Commande Test (curl)** :
  ```bash
  curl -i http://localhost:3000/pdl/10433218196001
  ```
- **Exemple de Réponse JSON (200 OK)** :
  ```json
  {
    "pdl": "10433218196001",
    "nom": "Martin",
    "prenom": "Alice",
    "ville": "Strasbourg",
    "consommation_kwh": 8423
  }
  ```

---

## 🛑 Gestion des Erreurs et Statuts HTTP

L'API met en place une gestion rigoureuse des cas d'erreur grâce à ses middlewares dédiés et ses règles de validation.

### 1. Format de PDL invalide (400 Bad Request)
Si l'identifiant PDL fourni dans l'URL ne respecte pas le format numérique attendu de 14 chiffres (ex: contient des lettres ou est trop court).
- **Commande Test (curl)** :
  ```bash
  curl -i http://localhost:3000/pdl/1234abc7890
  ```
- **Réponse JSON (400 Bad Request)** :
  ```json
  {
    "error": "Bad Request",
    "message": "L'identifiant du point de livraison (PDL) doit être une chaîne de 14 chiffres."
  }
  ```

### 2. Point de livraison introuvable (404 Not Found)
Si l'identifiant PDL respecte le format de 14 chiffres, mais n'est pas présent dans notre base de données.
- **Commande Test (curl)** :
  ```bash
  curl -i http://localhost:3000/pdl/99999999999999
  ```
- **Réponse JSON (404 Not Found)** :
  ```json
  {
    "error": "Not Found",
    "message": "Le point de livraison (PDL) '99999999999999' est introuvable."
  }
  ```

### 3. Route ou ressource inexistante (404 Not Found)
Si le client tente d'appeler une route non enregistrée sur le serveur HTTP.
- **Commande Test (curl)** :
  ```bash
  curl -i http://localhost:3000/api/inconnue
  ```
- **Réponse JSON (404 Not Found)** :
  ```json
  {
    "error": "Not Found",
    "message": "La route demandée 'GET /api/inconnue' n'existe pas sur ce serveur."
  }
  ```

### 4. Erreur Interne du Serveur (500 Internal Server Error)
En cas de défaillance imprévue sur le serveur (ex: fichier JSON de données corrompu ou introuvable).
- **Réponse JSON en mode Production (500 Internal Server Error)** :
  ```json
  {
    "error": "Internal Server Error",
    "message": "Une erreur interne inattendue est survenue sur le serveur."
  }
  ```
- En mode développement (`NODE_ENV=development`), la réponse contiendra également le champ `stack` contenant la trace complète de l'erreur pour faciliter le diagnostic.

---

## 💡 Choix techniques & Optimisations

- **Indexation en O(1) pour les recherches** : Au chargement des données depuis le fichier JSON par `pdlService.js`, une indexation en mémoire est réalisée via un objet `Map` natif JavaScript. Ainsi, l'accès à un PDL spécifique par la route `GET /pdl/:pdl` s'effectue en temps constant **O(1)** au lieu d'un parcours linéaire **O(N)**.
- **Sécurité et intégrité du cache** : Le service retourne des copies superficielles (`[...pdlCache]` et `{ ...pdl }`) des structures en mémoire pour empêcher toute modification accidentelle des données de référence de l'API.
- **Formatage des commentaires JSDoc** : Toutes les fonctions et modules sont documentés pour permettre une autocomplétion riche sous les éditeurs modernes comme VS Code.
