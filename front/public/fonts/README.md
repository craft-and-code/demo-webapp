# Polices auto-hébergées

Ce dossier contient les fichiers Inter (variable `woff2`) servis en local, sans
dépendance à Google Fonts.

Les binaires ne sont pas versionnés (voir `.gitignore`). Pour les récupérer :

```bash
npm run fetch-fonts
```

Fichiers attendus (référencés par `app/app.css`) :

- `inter-latin-wght-normal.woff2`
- `inter-latin-ext-wght-normal.woff2`
- `inter-latin-wght-italic.woff2`
- `inter-latin-ext-wght-italic.woff2`

Source : [Fontsource](https://fontsource.org/fonts/inter) — Inter, licence SIL Open Font License 1.1.
