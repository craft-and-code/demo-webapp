import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";

import type { Route } from "./+types/root";
import "./app.css";

/**
 * Fournit les liens vers les ressources (favicon, polices auto-hébergées).
 * Les polices Inter sont servies en local (voir app.css et public/fonts) :
 * plus aucune dépendance à Google Fonts. On précharge le fichier « normal »
 * (le plus utilisé) pour éviter tout FOUT au premier rendu.
 *
 * @returns {Route.LinksFunction} Un tableau de configurations de liens pour le composant racine.
 */
export const links: Route.LinksFunction = () => [
  { rel: "icon", type: "image/png", href: "/favicon.png" },
  { rel: "apple-touch-icon", href: "/favicon.png" },
  {
    rel: "preload",
    href: "/fonts/inter-latin-wght-normal.woff2",
    as: "font",
    type: "font/woff2",
    crossOrigin: "anonymous",
  },
];

/**
 * Composant de mise en page globale de l'application.
 * Contient les balises HTML principales et gère l'injection des ressources.
 * 
 * @param props - Les propriétés du layout.
 * @param props.children - Le contenu enfant à afficher dans la balise body.
 * @returns {React.ReactElement} Le layout de base de l'application.
 */
export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

/**
 * Composant racine de l'application, responsable de l'affichage des routes.
 * 
 * @returns {React.ReactElement} Le point d'entrée du routage (Outlet).
 */
export default function App() {
  return <Outlet />;
}

/**
 * Composant attrape-erreurs global (Error Boundary).
 * Affiche une page d'erreur en cas de problème de routage ou d'erreur non gérée.
 * 
 * @param props - Les propriétés de l'ErrorBoundary.
 * @param props.error - L'erreur interceptée.
 * @returns {React.ReactElement} Le composant affichant les détails de l'erreur.
 */
export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oups !";
  let details = "Une erreur inattendue s'est produite.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Erreur";
    details =
      error.status === 404
        ? "La page demandée est introuvable."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
