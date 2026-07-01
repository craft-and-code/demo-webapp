/**
 * @file config.js
 * @description Centralise le chargement, la validation et l'exposition des variables d'environnement.
 * @module config/config
 */

import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Chargement des variables d'environnement depuis le fichier .env
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '../../');

/**
 * Configure le port réseau sur lequel le serveur écoute.
 * @type {number}
 * @private
 */
const parsedPort = parseInt(process.env.PORT || '3000', 10);
const port = isNaN(parsedPort) || parsedPort <= 0 || parsedPort > 65535 ? 3000 : parsedPort;

/**
 * Configure l'environnement d'exécution de l'application.
 * @type {string}
 * @private
 */
const nodeEnv = process.env.NODE_ENV || 'development';

/**
 * Définit le chemin absolu du fichier contenant les données des PDL.
 * @type {string}
 * @private
 */
const relativeDataPath = process.env.DATA_PATH || 'pdl_data.json';
const dataPath = path.isAbsolute(relativeDataPath)
    ? relativeDataPath
    : path.resolve(rootDir, relativeDataPath);

/**
 * Objet de configuration globale de l'application.
 * @typedef {Object} Config
 * @property {number} port - Le port réseau d'écoute du serveur.
 * @property {string} nodeEnv - L'environnement d'exécution (ex: 'development', 'production', 'test').
 * @property {string} dataPath - Le chemin absolu d'accès au fichier JSON des PDL.
 */

/**
 * @type {Config}
 */
export const config = {
    port,
    nodeEnv,
    dataPath
};

export default config;
