/**
 * @file notFoundHandler.js
 * @description Middleware Express pour intercepter les requêtes ciblant des routes non existantes.
 * @module middlewares/notFoundHandler
 */

/**
 * Intercepte et renvoie une réponse HTTP 404 au format JSON pour les ressources non trouvées.
 * 
 * @function notFoundHandler
 * @param {import('express').Request} req - L'objet de requête Express.
 * @param {import('express').Response} res - L'objet de réponse Express.
 * @param {import('express').NextFunction} next - La fonction de rappel pour le middleware suivant.
 * @returns {void}
 */
export function notFoundHandler(req, res, next) {
    res.status(404).json({
        error: 'Not Found',
        message: `La route demandée '${req.method} ${req.originalUrl}' n'existe pas sur ce serveur.`
    });
}

export default notFoundHandler;
