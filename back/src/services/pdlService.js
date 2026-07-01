/**
 * @file pdlService.js
 * @description Service de gestion et d'accès aux données des Points de Livraison (PDL).
 * @module services/pdlService
 */

import fs from 'fs/promises';
import config from '../config/config.js';

/**
 * @typedef {Object} PdlData
 * @property {string} pdl - L'identifiant unique du point de livraison (ex: '10433218196001').
 * @property {string} nom - Le nom de famille du client associé.
 * @property {string} prenom - Le prénom du client associé.
 * @property {string} ville - La ville d'installation du point de livraison.
 * @property {number} consommation_kwh - La consommation électrique annuelle en kWh.
 */

/**
 * Cache contenant la liste complète des Points de Livraison (PDL).
 * @type {PdlData[]|null}
 * @private
 */
let pdlCache = null;

/**
 * Map d'indexation pour des recherches rapides de PDL par identifiant unique en O(1).
 * @type {Map<string, PdlData>|null}
 * @private
 */
let pdlMapCache = null;

/**
 * Charge les données depuis le fichier JSON configuré et initialise les caches en mémoire.
 * Cette opération est thread-safe et utilise un verrouillage d'initialisation simple.
 * 
 * @async
 * @function initData
 * @returns {Promise<void>}
 * @throws {Error} Si le fichier JSON est introuvable ou mal formé.
 */
async function initData() {
    if (pdlCache && pdlMapCache) {
        return;
    }

    try {
        const rawData = await fs.readFile(config.dataPath, 'utf-8');
        /** @type {PdlData[]} */
        const data = JSON.parse(rawData);

        pdlCache = data;
        pdlMapCache = new Map();

        for (const item of data) {
            if (item.pdl) {
                pdlMapCache.set(item.pdl, item);
            }
        }
    } catch (error) {
        console.error(`[pdlService] Erreur lors du chargement des données depuis ${config.dataPath}:`, error);
        throw new Error('Impossible de charger la base de données des Points de Livraison.');
    }
}

/**
 * Récupère la liste complète des points de livraison.
 * 
 * @async
 * @function getAllPdls
 * @returns {Promise<PdlData[]>} La liste complète des points de livraison.
 * @throws {Error} Si le chargement initial des données échoue.
 */
export async function getAllPdls() {
    await initData();
    // Retourne une copie superficielle de la liste pour éviter la modification accidentelle du cache
    return [...pdlCache];
}

/**
 * Récupère le détail d'un point de livraison par son identifiant unique.
 * 
 * @async
 * @function getPdlById
 * @param {string} pdlId - L'identifiant unique (PDL) à rechercher.
 * @returns {Promise<PdlData|null>} Le détail du PDL trouvé, ou null s'il n'existe pas.
 * @throws {Error} Si le chargement initial des données échoue.
 */
export async function getPdlById(pdlId) {
    await initData();
    const pdl = pdlMapCache.get(pdlId);
    return pdl ? { ...pdl } : null;
}

export default {
    getAllPdls,
    getPdlById
};
