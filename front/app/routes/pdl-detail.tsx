import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router";

import { usePdlDetail } from "../hooks/usePdl";

import Navbar from "../components/Navbar";
import ErrorModal from "../components/ErrorModal";

/**
 * Page de détail affichant les informations complètes d'un Point de Livraison (PDL).
 * Affiche des métriques de consommation, une jauge visuelle et gère les erreurs spécifiques.
 * 
 * @returns {Array<object>} Les balises meta pour la page.
 */

export function meta() {
  return [
    { title: "NovaEnergy - Détail du Point de Livraison (PDL)" },
    {
      name: "description",
      content:
        "Détails de consommation électrique et informations d'installation du PDL.",
    },
  ];
}

/**
 * Composant de page de détail du PDL.
 *
 * @function PdlDetail
 * @returns {React.ReactElement} Le composant de page.
 */
export default function PdlDetail() {
  const { pdl } = useParams();
  const navigate = useNavigate();

  /** @type {[boolean, React.Dispatch<React.SetStateAction<boolean>>]} */
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const { data: pdlData, loading, error: apiError } = usePdlDetail(pdl);

  useEffect(() => {
    if (apiError && apiError.kind === "api") setIsModalOpen(true);
  }, [apiError]);

  // Redirige vers la liste principale si l'erreur bloque l'accès
  const handleCloseModal = () => {
    setIsModalOpen(false);
    navigate("/");
  };

  // Calculs de métriques basés sur la consommation
  const getConsumptionStats = (kwh: number) => {
    // Ces valeurs en production devraient idéalement provenir d'une source de données dynamique ou d'une configuration externe.
    // Tarif moyen fictif en France: 0.25€ par kWh
    const TARIFF_PER_KWH = 0.25;
    // Facteur moyen d'émissions de CO2 en France: 0.052 kg CO2/kWh
    const CO2_FACTOR = 0.052;

    const totalCostYear = kwh * TARIFF_PER_KWH;
    const monthlyCost = totalCostYear / 12;
    const co2Footprint = kwh * CO2_FACTOR;

    let level: "low" | "moderate" | "high" = "moderate";
    let levelLabel = "Consommation Modérée";
    let levelColor = "text-cyan-400 bg-cyan-500/10 border-cyan-500/20";
    let barColor = "bg-cyan-500 shadow-cyan-500/35";

    if (kwh < 3000) {
      level = "low";
      levelLabel = "Consommation Faible";
      levelColor = "text-emerald-400 bg-emerald-500/10 border-emerald-500/20";
      barColor = "bg-emerald-500 shadow-emerald-500/35";
    } else if (kwh > 10000) {
      level = "high";
      levelLabel = "Consommation Élevée (Énergivore)";
      levelColor = "text-rose-400 bg-rose-500/10 border-rose-500/20";
      barColor = "bg-rose-500 shadow-rose-500/35";
    }

    // Pourcentage relatif à une consommation maximum de référence à 20 000 kWh pour la jauge
    const percentage = Math.min(Math.round((kwh / 20000) * 100), 100);

    return {
      monthlyCost: monthlyCost.toFixed(2),
      co2Footprint: co2Footprint.toFixed(1),
      levelLabel,
      levelColor,
      barColor,
      percentage,
    };
  };

  const stats = pdlData ? getConsumptionStats(pdlData.consommation_kwh) : null;

  return (
    <div className="min-h-screen dark:bg-slate-950 text-slate-100 font-sans pb-16">
      <Navbar />

      <main className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 mt-10">
        {/* Bouton Retour avec flèche animée */}
        <div className="mb-8">
          <Link
            to="/"
            className="group inline-flex items-center gap-2 rounded-xl dark:bg-gray-900/60 border border-gray-800/80 px-4 py-2 text-sm font-semibold text-gray-400 dark:text-gray-300 hover:bg-gray-900 hover:text-cyan-400 hover:border-cyan-500/20 transition-all duration-200"
          >
            <svg
              className="h-4 w-4 transform transition-transform group-hover:-translate-x-1 duration-200"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Retour à la liste
          </Link>
        </div>

        {loading ? (
          /* Squelette de Chargement du Détail */
          <div className="animate-pulse space-y-6">
            <div className="rounded-3xl border border-gray-800 dark:bg-gray-900/30 p-8 flex flex-col items-center">
              <div className="h-16 w-16 rounded-2xl bg-gray-800 mb-4"></div>
              <div className="h-6 w-48 rounded bg-gray-800 mb-3"></div>
              <div className="h-4 w-32 rounded bg-gray-800"></div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="h-28 rounded-2xl bg-gray-900/30 border border-gray-800"></div>
              <div className="h-28 rounded-2xl bg-gray-900/30 border border-gray-800"></div>
              <div className="h-28 rounded-2xl bg-gray-900/30 border border-gray-800"></div>
            </div>
          </div>
        ) : (
          pdlData &&
          stats && (
            <div className="space-y-6">
              {/* Carte d'Identité du Client */}
              <div className="relative overflow-hidden rounded-3xl border border-gray-800 dark:bg-gray-900/40 p-8 shadow-2xl">
                {/* Effet de lueur arrière-plan */}
                <div className="absolute -right-24 -top-24 h-48 w-48 rounded-full bg-primary/10 blur-3xl" />

                <div className="flex flex-col items-center sm:flex-row sm:items-start gap-6">
                  {/* Icone PDL style "Compteur Linky" */}
                  <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-tr from-primary to-secondary p-0.5 shadow-lg shadow-primary/20">
                    <div className="flex h-full w-full items-center justify-center rounded-2xl bg-white dark:bg-slate-950">
                      <span className="text-2xl">📈</span>
                    </div>
                  </div>

                  {/* Informations de base */}
                  <div className="text-center sm:text-left space-y-1.5 w-full">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                      <h2 className="text-2xl font-black tracking-tight text-slate-800 dark:text-white">
                        {pdlData.prenom} {pdlData.nom}
                      </h2>
                      <span
                        className={`inline-flex self-center rounded-full border px-2.5 py-0.5 text-xs font-semibold ${stats.levelColor}`}
                      >
                        {stats.levelLabel}
                      </span>
                    </div>

                    <p className="text-sm font-semibold text-cyan-400/90 font-mono tracking-wider">
                      N° PDL : {pdlData.pdl}
                    </p>

                    {/* Localisation */}
                    <div className="pt-2 flex items-center justify-center sm:justify-start gap-1 text-sm text-gray-300">
                      <svg
                        className="h-4.5 w-4.5 dark:text-gray-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2.0"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                      <span>
                        Installé à{" "}
                        <strong className="text-slate-800 dark:text-white">
                          {pdlData.ville}
                        </strong>
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Section Jauge Visuelle */}
              <div className="rounded-3xl border border-gray-800 dark:bg-gray-900/40 p-8">
                <h3 className="text-sm font-extrabold uppercase tracking-wider text-gray-400 mb-4">
                  Jauge de consommation
                </h3>

                <div className="space-y-3">
                  {/* Barre de Progression Graphique */}
                  <div className="relative h-4 w-full overflow-hidden rounded-full dark:bg-gray-950 p-0.5">
                    <div
                      className={`h-full rounded-full transition-all duration-1000 ${stats.barColor}`}
                      style={{ width: `${stats.percentage}%` }}
                    />
                  </div>

                  {/* Légende du graphique */}
                  <div className="flex items-center justify-between text-xs text-gray-500 font-mono font-medium">
                    <span>0 kWh</span>
                    <span className="text-cyan-400/80 font-bold">
                      {pdlData.consommation_kwh.toLocaleString()} kWh
                    </span>
                    <span>20 000 kWh</span>
                  </div>
                </div>
              </div>

              {/* Section Cartes Statistiques */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {/* Consommation Annuelle */}
                <div className="rounded-2xl border border-gray-800 dark:bg-gray-900/30 p-6 flex flex-col hover:border-gray-700/80 transition-all duration-300">
                  <span className="text-xs font-bold uppercase tracking-wider text-gray-400">
                    Consommation
                  </span>
                  <span className="mt-2 text-2xl font-black text-slate-800 dark:text-white tracking-tight">
                    {pdlData.consommation_kwh.toLocaleString()}
                  </span>
                  <span className="text-xs text-gray-500 mt-1 font-semibold">
                    kWh / an
                  </span>
                </div>

                {/* Coût Estimé Mensuel */}
                <div className="rounded-2xl border border-gray-800 dark:bg-gray-900/30 p-6 flex flex-col hover:border-gray-700/80 transition-all duration-300">
                  <span className="text-xs font-bold uppercase tracking-wider text-gray-400">
                    Facturation Est.
                  </span>
                  <span className="mt-2 text-2xl font-black text-cyan-400 tracking-tight">
                    {stats.monthlyCost} €
                  </span>
                  <span className="text-xs text-gray-500 mt-1 font-semibold">
                    mensuel (tarif indicatif)
                  </span>
                </div>

                {/* Empreinte Carbone */}
                <div className="rounded-2xl border border-gray-800 dark:bg-gray-900/30 p-6 flex flex-col hover:border-gray-700/80 transition-all duration-300">
                  <span className="text-xs font-bold uppercase tracking-wider text-gray-400">
                    Empreinte CO₂
                  </span>
                  <span className="mt-2 text-2xl font-black text-emerald-400 tracking-tight">
                    ~{stats.co2Footprint}
                  </span>
                  <span className="text-xs text-gray-500 mt-1 font-semibold">
                    kg CO₂ émis / an
                  </span>
                </div>
              </div>
            </div>
          )
        )}
      </main>

      {/* Pop-in bloquante de gestion d'erreur avec redirection */}
      <ErrorModal
        isOpen={isModalOpen}
        title={apiError?.title || "Erreur"}
        message={apiError?.message || ""}
        onClose={handleCloseModal}
      />
    </div>
  );
}
