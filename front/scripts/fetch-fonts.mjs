/**
 * Récupère les fichiers de police Inter (variable woff2) pour l'auto-hébergement.
 *
 * À lancer une fois (ou après un clone) : `npm run fetch-fonts`.
 * Les fichiers sont écrits dans public/fonts/ et référencés par app.css.
 * Source : Fontsource (Inter, OFL) via le CDN jsDelivr.
 *
 * Aucune dépendance externe : utilise uniquement les modules Node natifs.
 */
import { createWriteStream } from "node:fs";
import { mkdir, stat } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { get } from "node:https";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT_DIR = join(__dirname, "..", "public", "fonts");
const BASE = "https://cdn.jsdelivr.net/fontsource/fonts/inter:vf@latest";

/** Fichiers à télécharger : nom local -> nom distant Fontsource. */
const FILES = {
  "inter-latin-wght-normal.woff2": "latin-wght-normal.woff2",
  "inter-latin-ext-wght-normal.woff2": "latin-ext-wght-normal.woff2",
  "inter-latin-wght-italic.woff2": "latin-wght-italic.woff2",
  "inter-latin-ext-wght-italic.woff2": "latin-ext-wght-italic.woff2",
};

/**
 * Télécharge une URL vers un fichier, en suivant les redirections.
 * @param {string} url
 * @param {string} dest
 * @returns {Promise<void>}
 */
function download(url, dest) {
  return new Promise((resolve, reject) => {
    get(url, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        res.resume();
        return download(res.headers.location, dest).then(resolve, reject);
      }
      if (res.statusCode !== 200) {
        res.resume();
        return reject(new Error(`HTTP ${res.statusCode} pour ${url}`));
      }
      const file = createWriteStream(dest);
      res.pipe(file);
      file.on("finish", () => file.close(() => resolve()));
      file.on("error", reject);
    }).on("error", reject);
  });
}

async function main() {
  await mkdir(OUT_DIR, { recursive: true });
  for (const [local, remote] of Object.entries(FILES)) {
    const dest = join(OUT_DIR, local);
    process.stdout.write(`↓ ${local} … `);
    await download(`${BASE}/${remote}`, dest);
    const { size } = await stat(dest);
    console.log(`ok (${Math.round(size / 1024)} Ko)`);
  }
  console.log("\nPolices Inter récupérées dans public/fonts/ ✓");
}

main().catch((err) => {
  console.error("\nÉchec du téléchargement des polices :", err.message);
  process.exit(1);
});
