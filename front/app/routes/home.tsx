import { useEffect, useMemo, useState } from "react";
import { Search, TriangleAlert } from "lucide-react";

import { API_BASE_URL } from "../config";

import { usePdlList } from "../hooks/usePdl";

import Navbar from "../components/Navbar";
import PdlCard from "../components/PdlCard";
import ErrorModal from "../components/ErrorModal";

/**
 * Page principale affichant la liste complète des Points de Livraison (PDL).
 * Intègre la recherche dynamique, un squelette de chargement et une gestion d'erreurs.
 * 
 * @returns {Array<object>} Les balises meta pour la page.
 */

export function meta() {
  return [
    { title: "NovaEnergy - Liste des Points de Livraison (PDL)" },
    {
      name: "description",
      content:
        "Consultez, recherchez et gérez les points de livraison (PDL) du réseau NovaEnergy.",
    },
  ];
}

/**
 * Composant de page Liste (Home).
 *
 * @function Home
 * @returns {React.ReactElement} Le composant de page.
 */
export default function Home() {
  const { data: pdls, loading, error: apiError } = usePdlList();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  useEffect(() => {
    if (apiError && apiError.kind === "api") setIsModalOpen(true);
  }, [apiError]);

  /** @type {[string, React.Dispatch<React.SetStateAction<string>>]} */
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Filtrage réactif des PDL selon la saisie de l'utilisateur
  const filteredPdls = useMemo(() => {
    if (!pdls) return [];
    return pdls.filter((pdl) => {
      const query = searchQuery.toLowerCase().trim();
      if (!query) return true;

      return (
        pdl.nom.toLowerCase().includes(query) ||
        pdl.prenom.toLowerCase().includes(query) ||
        pdl.ville.toLowerCase().includes(query) ||
        pdl.pdl.includes(query)
      );
    });
  }, [pdls, searchQuery]);

  return (
    <div className="min-h-screen dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans pb-16">
      <Navbar />

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-10">
        {/* Section d'en-tête */}
        <div className="text-center sm:text-left sm:flex sm:items-center sm:justify-between border-b border-gray-800/60 pb-8 mb-8">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl bg-gradient-to-r from-primary via-blue-400 to-secondary bg-clip-text text-transparent">
              Points de Livraison
            </h1>
            <p className="mt-2 text-sm sm:text-base text-gray-400">
              Recherchez, filtrez et accédez aux détails de consommation de vos
              points de livraison.
            </p>
          </div>

          {/* Compteur d'éléments */}
          {!loading && (
            <div className="mt-4 sm:mt-0 inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1.5 text-xs font-semibold text-primary border border-primary/20">
              {filteredPdls.length}{" "}
              {filteredPdls.length > 1 ? "points affichés" : "point affiché"}
            </div>
          )}
        </div>

        {/* Barre de Recherche Dynamique */}
        <div className="relative mb-8 max-w-xl mx-auto sm:mx-0">
          <label htmlFor="pdl-search" className="sr-only">
            Rechercher un point de livraison par nom, prénom, ville ou numéro PDL
          </label>
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <Search className="h-5 w-5 text-gray-500" aria-hidden="true" />
          </div>
          <input
            id="pdl-search"
            type="search"
            placeholder="Rechercher par nom, prénom, ville ou PDL..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="block w-full rounded-xl border border-gray-400 dark:border-gray-600 dark:bg-gray-900/60 py-3 pl-10 pr-4 text-sm text-gray-900 dark:text-white placeholder-gray-500 shadow-inner focus:border-blue-400/50 focus:bg-gray-200 dark:focus:bg-gray-900 focus:outline-none focus:ring-1 focus:ring-cyan-500/50 transition-all duration-200"
          />
        </div>

        {/* Affichage des Squelettes lors du Chargement */}
        {loading ? (
          <div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
            aria-busy="true"
            aria-label="Chargement des points de livraison"
          >
            {Array.from({ length: 8 }).map((_, idx) => (
              <div
                key={idx}
                aria-hidden="true"
                className="animate-pulse rounded-2xl border border-gray-800/80 bg-gray-900/30 p-6 flex flex-col items-center"
              >
                <div className="h-14 w-14 rounded-full bg-gray-800 mb-4"></div>
                <div className="h-4 w-32 rounded bg-gray-800 mb-2.5"></div>
                <div className="h-3.5 w-20 rounded bg-gray-800 mb-6"></div>
                <div className="h-9 w-full rounded-lg bg-gray-800"></div>
              </div>
            ))}
          </div>
        ) : apiError?.kind === "network" ? (
          /* État API hors ligne */
          <div className="flex flex-col items-center justify-center py-16 border border-dashed border-red-500/20 rounded-3xl bg-red-500/5">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400 mb-4">
              <TriangleAlert className="h-6 w-6" strokeWidth={1.5} aria-hidden="true" />
            </div>
            <h3 className="text-base font-bold text-red-400">API hors ligne</h3>
            <p className="text-sm text-gray-500 mt-1 text-center px-4">
              Impossible de charger les points de livraison.
              <br />
              Vérifiez que le serveur tourne sur le port {API_BASE_URL}.
            </p>
          </div>
        ) : (
          <>
            {/* Liste des Cartes PDL */}
            {filteredPdls.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filteredPdls.map((pdlItem) => (
                  <PdlCard key={pdlItem.pdl} pdlItem={pdlItem} />
                ))}
              </div>
            ) : (
              /* État Vide */
              <div className="flex flex-col items-center justify-center py-16 border border-dashed border-gray-800 rounded-3xl dark:bg-gray-900/10">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl dark:bg-gray-900 border dark:border-gray-800 text-gray-500 mb-4">
                  <Search className="h-6 w-6" strokeWidth={1.5} aria-hidden="true" />
                </div>
                <h3 className="text-base font-bold text-gray-400">
                  Aucun résultat trouvé
                </h3>
                <p className="text-sm text-gray-500 mt-1 text-center px-4">
                  Aucun point de livraison ne correspond à la recherche "
                  {searchQuery}".
                </p>
              </div>
            )}
          </>
        )}
      </main>

      {/* Pop-in de gestion globale d'erreurs */}
      <ErrorModal
        isOpen={isModalOpen}
        title={apiError?.title || "Erreur"}
        message={apiError?.message || ""}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
