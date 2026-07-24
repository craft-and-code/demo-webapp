import { Link } from "react-router";
import { Zap } from "lucide-react";

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
          <Zap className="h-5 w-5 text-white" strokeWidth={2.5} aria-hidden="true" />
        </div>
        <span className="font-extrabold text-2xl tracking-tight text-slate-800 dark:text-white">
          Nova<span className="text-primary">Energy</span>
        </span>
      </Link>
    </div>
  );
}
