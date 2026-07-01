/**
 * Structure de données d'un Point de Livraison (PDL) renvoyée par l'API.
 */
export interface PdlData {
  /** L'identifiant unique à 14 chiffres du point de livraison. */
  pdl: string;
  /** Nom de famille du client. */
  nom: string;
  /** Prénom du client. */
  prenom: string;
  /** Ville d'installation du PDL. */
  ville: string;
  /** Consommation électrique en kWh. */
  consommation_kwh: number;
}

/**
 * Structure d'erreur pour la pop-in.
 */
export interface ApiError {
  /** Le type ou titre de l'erreur. */
  title: string;
  /** Le message d'erreur descriptif. */
  message: string;
  /** Le type d'erreur (réseau ou API). */
  kind: "network" | "api";
}
