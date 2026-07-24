import { Link } from "react-router";
import { ChevronRight, MapPin } from "lucide-react";

import { getGradientByName } from "../utils/colorUtils";
import type { PdlCardProps } from "../types/components";

/**
 * Carte interactive affichant un aperçu rapide d'un Point de Livraison (PDL).
 *
 * @param props - Les propriétés du composant PdlCard.
 * @param props.pdlItem - Les données du PDL à afficher.
 * @returns {React.ReactElement} Le composant PdlCard.
 */
export function PdlCard({ pdlItem }: PdlCardProps) {
  const fullName = `${pdlItem.prenom} ${pdlItem.nom}`;
  const initials =
    `${pdlItem.prenom.charAt(0)}${pdlItem.nom.charAt(0)}`.toUpperCase();
  const gradient = getGradientByName(fullName);

  return (
    <div className="group relative rounded-2xl border border-slate-200/80 bg-white/80 p-6 flex flex-col items-center shadow-md hover:shadow-primary/5 hover:border-primary/30 hover:bg-white/90 hover:scale-[1.03] transition-all duration-300 dark:border-gray-800/80 dark:bg-gray-900/40 dark:hover:bg-gray-900/70">
      {/* Avatar */}
      <div
        className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-tr ${gradient} shadow-lg shadow-black/30 mb-4 transition-transform group-hover:scale-110 duration-300`}
      >
        <span className="text-base font-bold text-white tracking-wide">
          {initials}
        </span>
      </div>

      {/* Nom complet */}
      <h3 className="text-base font-bold text-slate-800 dark:text-white group-hover:text-primary transition-colors duration-300 text-center truncate w-full">
        {pdlItem.prenom} {pdlItem.nom}
      </h3>

      {/* Badge ville */}
      <div className="mt-1 flex items-center gap-1 text-xs text-gray-400 mb-6">
        <MapPin className="h-3.5 w-3.5 text-gray-500" aria-hidden="true" />
        <span>{pdlItem.ville}</span>
      </div>

      {/* Lien PDL */}
      <Link
        to={`/pdl/${pdlItem.pdl}`}
        className="mt-auto flex w-full items-center justify-center gap-1.5 rounded-xl bg-blue-400 dark:bg-gray-800 border dark:border-gray-700/60 py-2.5 px-3 text-xs font-bold text-gray-200 hover:bg-gradient-to-r hover:from-primary hover:to-secondary hover:border-transparent hover:text-white shadow-inner active:scale-95 transition-all duration-300"
      >
        <span>PDL {pdlItem.pdl}</span>
        <ChevronRight className="h-3.5 w-3.5" strokeWidth={2.5} aria-hidden="true" />
      </Link>
    </div>
  );
}

export default PdlCard;
