/**
 * @file pdlRoutes.js
 * @description Définit les routes d'API pour les points de livraison (PDL).
 * @module routes/pdlRoutes
 */

import { Router } from 'express';
import pdlController from '../controllers/pdlController.js';

/**
 * Le routeur Express pour l'API des Points de Livraison (PDL).
 * @type {import('express').Router}
 */
const router = Router();

/**
 * Route GET /
 * Retourne le statut de l'API.
 */
router.get('/', pdlController.getStatus);

/**
 * Route GET /listpdl
 * Retourne la liste complète des points de livraison avec toutes leurs données.
 */
router.get('/listpdl', pdlController.listPdls);

/**
 * Route GET /pdl/:pdl
 * Retourne le détail d'un point de livraison identifié par son identifiant unique.
 */
router.get('/pdl/:pdl', pdlController.getPdlById);

export default router;
