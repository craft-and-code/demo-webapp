/**
 * @file pdlController.js
 * @description Contrôleur gérant les requêtes HTTP associées aux points de livraison (PDL).
 * @module controllers/pdlController
 */

import pdlService from '../services/pdlService.js';

/**
 * Renvoie le statut opérationnel de l'API.
 * 
 * @function getStatus
 * @param {import('express').Request} req - L'objet de requête Express.
 * @param {import('express').Response} res - L'objet de réponse Express.
 * @returns {void}
 */
export function getStatus(req, res) {
    res.status(200).json({
        status: 'OK',
        timestamp: new Date().toISOString(),
        version: '1.0.0'
    });
}

/**
 * Récupère et renvoie la liste complète des points de livraison.
 * 
 * @async
 * @function listPdls
 * @param {import('express').Request} req - L'objet de requête Express.
 * @param {import('express').Response} res - L'objet de réponse Express.
 * @param {import('express').NextFunction} next - La fonction de rappel pour le middleware d'erreur suivant.
 * @returns {Promise<void>}
 */
export async function listPdls(req, res, next) {
    try {
        const pdls = await pdlService.getAllPdls();
        res.status(200).json(pdls);
    } catch (error) {
        next(error);
    }
}

/**
 * Récupère et renvoie le détail d'un point de livraison spécifique par son identifiant unique.
 * Valide également le format de l'identifiant fourni.
 * 
 * @async
 * @function getPdlById
 * @param {import('express').Request} req - L'objet de requête Express.
 * @param {import('express').Response} res - L'objet de réponse Express.
 * @param {import('express').NextFunction} next - La fonction de rappel pour le middleware d'erreur suivant.
 * @returns {Promise<void>}
 */
export async function getPdlById(req, res, next) {
    try {
        const { pdl } = req.params;

        // Validation du format du PDL : doit être une chaîne numérique de 14 chiffres
        const pdlRegex = /^\d{14}$/;
        if (!pdlRegex.test(pdl)) {
            res.status(400).json({
                error: 'Bad Request',
                message: "L'identifiant du point de livraison (PDL) doit être une chaîne de 14 chiffres."
            });
            return;
        }

        const pdlDetail = await pdlService.getPdlById(pdl);

        if (!pdlDetail) {
            res.status(404).json({
                error: 'Not Found',
                message: `Le point de livraison (PDL) '${pdl}' est introuvable.`
            });
            return;
        }

        res.status(200).json(pdlDetail);
    } catch (error) {
        next(error);
    }
}

export default {
    getStatus,
    listPdls,
    getPdlById
};
