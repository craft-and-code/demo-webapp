/**
 * @file api.test.js
 * @description Tests d'intégration de bout en bout (E2E) pour l'API REST PDL.
 * Utilise le test runner natif de Node.js (node:test) et le module d'assertion (node:assert).
 */

import test from 'node:test';
import assert from 'node:assert';
import app from '../app.js';

test('Tests d\'intégration de l\'API PDL', async (t) => {
    /** @type {import('http').Server} */
    let server;
    /** @type {string} */
    let baseUrl;

    // Démarre l'application Express sur un port libre choisi par l'OS avant de lancer les tests
    t.before(() => {
        return new Promise((resolve) => {
            // Le port 0 indique à l'OS d'attribuer un port libre disponible de manière dynamique
            server = app.listen(0, () => {
                const port = server.address().port;
                baseUrl = `http://localhost:${port}`;
                resolve();
            });
        });
    });

    // Arrête le serveur proprement après l'exécution de tous les tests
    t.after(() => {
        return new Promise((resolve) => {
            server.close(resolve);
        });
    });

    await t.test('GET / - doit retourner le statut opérationnel de l\'API', async () => {
        const response = await fetch(`${baseUrl}/`);
        
        // Assertions sur les en-têtes et le statut
        assert.strictEqual(response.status, 200);
        assert.ok(response.headers.get('content-type')?.includes('application/json'));
        
        // Assertions sur le corps de réponse JSON
        const data = await response.json();
        assert.strictEqual(data.status, 'OK');
        assert.ok(data.timestamp);
        assert.strictEqual(data.version, '1.0.0');
    });

    await t.test('GET /listpdl - doit retourner la liste complète de tous les PDL', async () => {
        const response = await fetch(`${baseUrl}/listpdl`);
        
        assert.strictEqual(response.status, 200);
        assert.ok(response.headers.get('content-type')?.includes('application/json'));
        
        const data = await response.json();
        assert.ok(Array.isArray(data));
        assert.strictEqual(data.length, 50); // Le fichier pdl_data.json contient 50 entrées

        // Vérification de la structure du premier élément
        const premierPdl = data[0];
        assert.strictEqual(premierPdl.pdl, '10433218196001');
        assert.strictEqual(premierPdl.nom, 'Martin');
        assert.strictEqual(premierPdl.prenom, 'Alice');
        assert.strictEqual(premierPdl.ville, 'Strasbourg');
        assert.strictEqual(premierPdl.consommation_kwh, 8423);
    });

    await t.test('GET /pdl/:pdl - doit retourner les détails d\'un PDL existant et valide', async () => {
        const targetPdl = '89083863794026';
        const response = await fetch(`${baseUrl}/pdl/${targetPdl}`);
        
        assert.strictEqual(response.status, 200);
        assert.ok(response.headers.get('content-type')?.includes('application/json'));
        
        const data = await response.json();
        assert.strictEqual(data.pdl, targetPdl);
        assert.strictEqual(data.nom, 'Bernard');
        assert.strictEqual(data.prenom, 'Bruno');
        assert.strictEqual(data.ville, 'Rennes');
        assert.strictEqual(data.consommation_kwh, 9905);
    });

    await t.test('GET /pdl/:pdl - doit retourner un statut 404 pour un PDL inexistant', async () => {
        const targetPdl = '99999999999999'; // N'existe pas dans le fichier JSON
        const response = await fetch(`${baseUrl}/pdl/${targetPdl}`);
        
        assert.strictEqual(response.status, 404);
        assert.ok(response.headers.get('content-type')?.includes('application/json'));
        
        const data = await response.json();
        assert.strictEqual(data.error, 'Not Found');
        assert.ok(data.message.includes(targetPdl));
    });

    await t.test('GET /pdl/:pdl - doit retourner un statut 400 pour un format de PDL contenant des lettres', async () => {
        const targetPdl = '1234abc7890123';
        const response = await fetch(`${baseUrl}/pdl/${targetPdl}`);
        
        assert.strictEqual(response.status, 400);
        assert.ok(response.headers.get('content-type')?.includes('application/json'));
        
        const data = await response.json();
        assert.strictEqual(data.error, 'Bad Request');
        assert.ok(data.message.includes('14 chiffres'));
    });

    await t.test('GET /pdl/:pdl - doit retourner un statut 400 pour un format de PDL trop court', async () => {
        const targetPdl = '12345';
        const response = await fetch(`${baseUrl}/pdl/${targetPdl}`);
        
        assert.strictEqual(response.status, 400);
        
        const data = await response.json();
        assert.strictEqual(data.error, 'Bad Request');
        assert.ok(data.message.includes('14 chiffres'));
    });

    await t.test('GET /route-inexistante - doit retourner une erreur 404 JSON via le middleware d\'interception', async () => {
        const response = await fetch(`${baseUrl}/route-inexistante`);
        
        assert.strictEqual(response.status, 404);
        assert.ok(response.headers.get('content-type')?.includes('application/json'));
        
        const data = await response.json();
        assert.strictEqual(data.error, 'Not Found');
        assert.ok(data.message.includes('route-inexistante'));
    });
});
