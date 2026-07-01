/**
 * @file app.js
 * @description Configure et initialise l'application Express, ses middlewares et ses routes.
 * @module app
 */

import express from 'express';
import pdlRoutes from './routes/pdlRoutes.js';
import notFoundHandler from './middlewares/notFoundHandler.js';
import errorHandler from './middlewares/errorHandler.js';

/**
 * L'instance principale de l'application Express.
 * @type {import('express').Application}
 */
export const app = express();

// Middleware pour parser les requêtes au format JSON
app.use(express.json());

// En-têtes CORS et désactivation de la mise en cache
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Surrogate-Control', 'no-store');
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
    next();
});

// Attachement des routes de l'API PDL à la racine
app.use('/', pdlRoutes);

// Middleware de capture des routes inconnues (404)
app.use(notFoundHandler);

// Middleware global de gestion des erreurs (500, etc.)
app.use(errorHandler);

export default app;
