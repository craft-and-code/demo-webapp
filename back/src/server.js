/**
 * @file server.js
 * @description Point d'entrée de l'application. Démarre le serveur HTTP Express.
 * @module server
 */

import app from './app.js';
import config from './config/config.js';

/**
 * Démarre le serveur HTTP Express.
 * Écoute sur le port configuré et affiche un message informatif dans la console.
 */
function startServer() {
    const server = app.listen(config.port, () => {
        const address = server.address();
        const host = typeof address === 'string' ? address : 'localhost';
        const port = typeof address === 'string' ? config.port : address.port;

        console.log('==================================================');
        console.log(`🚀 Serveur API PDL démarré avec succès !`);
        console.log(`🌍 URL locale : http://${host}:${port}`);
        console.log(`⚙️  Environnement : ${config.nodeEnv}`);
        console.log(`📁 Fichier de données : ${config.dataPath}`);
        console.log('==================================================');
    });

    // Gestion propre de l'arrêt du processus pour fermer les connexions
    const gracefullyShutdown = () => {
        console.log('\n🛑 Signal d\'arrêt reçu. Fermeture propre du serveur...');
        server.close(() => {
            console.log('💤 Serveur arrêté avec succès. Au revoir !');
            process.exit(0);
        });
    };

    process.on('SIGTERM', gracefullyShutdown);
    process.on('SIGINT', gracefullyShutdown);
}

startServer();
