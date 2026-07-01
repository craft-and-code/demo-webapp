import type { ApiStatutProps } from "../types/components";

/**
 * Composant de badge de statut de l'API avec pulsation de couleur.
 * Affiche un badge indiquant si l'API est en ligne, hors ligne ou en cours de vérification.
 * 
 * @param props - Les propriétés du composant ApiStatut.
 * @param props.statuts - L'état actuel de l'API ("online", "offline", "checking").
 * @returns {React.ReactElement} Le composant ApiStatut.
 */
export function ApiStatut({ statuts }: ApiStatutProps) {
  return (
    <div
      className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold backdrop-blur-sm transition-all duration-300 ${
        statuts === "online"
          ? "border-emerald-500/20 bg-emerald-500/5 text-emerald-600 dark:text-emerald-400"
          : statuts === "offline"
            ? "border-red-500/20 bg-red-500/5 text-red-600 dark:text-red-400"
            : "border-slate-200 dark:border-gray-800 bg-slate-100 dark:bg-gray-900/50 text-slate-500 dark:text-gray-400"
      }`}
    >
      <span className="relative flex h-2 w-2">
        {statuts === "online" && (
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
        )}
        {statuts === "offline" && (
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75"></span>
        )}
        <span
          className={`relative inline-flex h-2 w-2 rounded-full ${
            statuts === "online"
              ? "bg-emerald-500"
              : statuts === "offline"
                ? "bg-red-500"
                : "bg-slate-400 dark:bg-gray-600"
          }`}
        ></span>
      </span>

      <span className="hidden sm:inline">
        {statuts === "online" && "API En Ligne"}
        {statuts === "offline" && "API Hors Ligne"}
        {statuts === "checking" && "Connexion..."}
      </span>
      <span className="sm:hidden">
        {statuts === "online" && "Ligne"}
        {statuts === "offline" && "Hors"}
        {statuts === "checking" && "..."}
      </span>
    </div>
  );
}
