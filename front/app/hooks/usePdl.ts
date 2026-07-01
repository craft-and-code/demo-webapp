import { useState, useEffect } from "react";

import { fetchPdlList, fetchPdlDetail } from "../services/api";
import type { PdlData, ApiError } from "../types/pdl";

/**
 * État générique pour les appels API.
 * 
 * @template T - Le type des données attendues de l'API.
 */
export interface FetchState<T> {
  data: T | null;
  loading: boolean;
  error: ApiError | null;
}

/**
 * Hook pour récupérer la liste complète des PDL.
 * 
 * @returns {FetchState<PdlData[]>} L'état de la requête avec les données de la liste des PDL, le statut de chargement et les erreurs.
 */
export function usePdlList(): FetchState<PdlData[]> {
  const [data, setData] = useState<PdlData[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<ApiError | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const result = await fetchPdlList();
        setData(result);
        setError(null);
      } catch (err) {
        setError(err as ApiError);
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    load();

    // Polling toutes les 15 secondes
    const interval = setInterval(async () => {
      try {
        const result = await fetchPdlList();
        setData(result);
        setError(null); // ← API revenue, on réaffiche la liste
      } catch (err) {
        setError(err as ApiError);
        setData(null); // ← API tombée, on vide la liste
      }
    }, 15000);

    return () => clearInterval(interval);
  }, []);

  return { data, loading, error };
}

/**
 * Hook pour récupérer le détail d'un PDL par son identifiant.
 * 
 * @param pdl - L'identifiant du point de livraison (PDL).
 * @returns {FetchState<PdlData>} L'état de la requête avec les données du PDL, le statut de chargement et les erreurs.
 */
export function usePdlDetail(pdl: string | undefined): FetchState<PdlData> {
  const [data, setData] = useState<PdlData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<ApiError | null>(null);

  useEffect(() => {
    if (!pdl) return;

    const load = async () => {
      try {
        setLoading(true);
        const result = await fetchPdlDetail(pdl);
        setData(result);
      } catch (err) {
        setError(err as ApiError);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [pdl]);

  return { data, loading, error };
}
