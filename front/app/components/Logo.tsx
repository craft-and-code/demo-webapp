import { Link } from "react-router";

/**
 * Composant de logo officiel de l'application NovaEnergy avec support pour thèmes sombre/clair.
 * 
 * @returns {React.ReactElement} Le composant Logo.
 */
export function Logo() {
  return (
    <div className="flex items-center">
      <Link
        to="/"
        className="group flex items-center gap-2.5 transition-opacity duration-200 hover:opacity-90"
        aria-label="Retour à l'accueil"
      >
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-secondary shadow-lg shadow-primary/20">
          <svg className="h-5 w-5 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
          </svg>
        </div>
        <span className="font-extrabold text-2xl tracking-tight text-slate-800 dark:text-white">
          Nova<span className="text-primary">Energy</span>
        </span>
      </Link>
    </div>
  );
}
