/**
 * @file errorHandler.js
 * @description Middleware global de gestion des exceptions pour l'application Express.
 * @module middlewares/errorHandler
 */

import config from '../config/config.js';

/**
 * Capture toutes les erreurs non gérées levées dans les routes ou les autres middlewares.
 * Renvoie une réponse HTTP 500 ou adaptée au format JSON.
 * 
 * @function errorHandler
 * @param {Error} err - L'erreur interceptée.
 * @param {import('express').Request} req - L'objet de requête Express.
 * @param {import('express').Response} res - L'objet de réponse Express.
 * @param {import('express').NextFunction} next - La fonction de rappel pour le middleware suivant.
 * @returns {void}
 */
export function errorHandler(err, req, res, next) {
    // Si les en-têtes ont déjà été envoyés au client, déléguer à Express
    if (res.headersSent) {
        return next(err);
    }

    // Journalisation détaillée de l'erreur côté serveur
    console.error('[errorHandler] Erreur non gérée interceptée :', {
        message: err.message,
        stack: err.stack,
        method: req.method,
        url: req.originalUrl
    });

    const isDevelopment = config.nodeEnv === 'development';

    // Statut HTTP par défaut pour les erreurs internes
    const statusCode = err.status || 500;

    res.status(statusCode).json({
        error: statusCode === 500 ? 'Internal Server Error' : 'Error',
        message: err.message || 'Une erreur interne inattendue est survenue sur le serveur.',
        ...(isDevelopment ? { stack: err.stack } : {})
    });
}

export default errorHandler;
