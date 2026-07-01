import { API_BASE_URL } from "../config";

import type { PdlData, ApiError } from "../types/pdl";

/**
 * Vérifie si le serveur API est joignable.
 * 
 * @returns {Promise<boolean>} Une promesse qui résout à true si l'API est en ligne, false sinon.
 */
export const checkApiStatus = async (): Promise<boolean> => {
  try {
    const res = await fetch(`${API_BASE_URL}/`);
    return res.ok;
  } catch {
    return false;
  }
};

/**
 * Récupère la liste complète des PDL.
 * 
 * @returns {Promise<PdlData[]>} Une promesse contenant la liste des PDL.
 * @throws {ApiError} Si l'API renvoie une erreur ou si le serveur est inaccessible.
 */
export const fetchPdlList = async (): Promise<PdlData[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/listpdl`);
    if (!response.ok) {
      throw await parseErrorResponse(response);
    }
    return response.json();
  } catch (err) {
    if ((err as ApiError).kind) throw err; // déjà une ApiError
    throw {
      title: "Erreur de connexion",
      message: "Le serveur est inaccessible.",
      kind: "network",
    } as ApiError;
  }
};

/**
 * Récupère le détail d'un PDL par son identifiant.
 * 
 * @param pdl - L'identifiant du point de livraison (PDL).
 * @returns {Promise<PdlData>} Une promesse contenant les détails du PDL.
 * @throws {ApiError} Si l'API renvoie une erreur ou si le serveur est inaccessible.
 */
export const fetchPdlDetail = async (pdl: string): Promise<PdlData> => {
  try {
    const response = await fetch(`${API_BASE_URL}/pdl/${pdl}`);
    if (!response.ok) {
      throw await parseErrorResponse(response);
    }
    return response.json();
  } catch (err) {
    if ((err as ApiError).kind) throw err; // déjà une ApiError
    throw {
      title: "Erreur de connexion",
      message: "Le serveur est inaccessible.",
      kind: "network",
    } as ApiError;
  }
};

/**
 * Parse la réponse d'erreur de l'API de manière uniforme.
 * 
 * @param response - L'objet Response retourné par fetch.
 * @returns {Promise<ApiError>} Une promesse contenant l'erreur formatée.
 */
const parseErrorResponse = async (response: Response): Promise<ApiError> => {
  try {
    const errData = await response.json();
    return {
      title: errData.error || `Erreur (${response.status})`,
      message: errData.message || "Erreur lors de la récupération des données.",
      kind: "api",
    };
  } catch {
    return {
      title: `Erreur (${response.status})`,
      message: "Erreur lors de la récupération des données.",
      kind: "api",
    };
  }
};
