import type { PdlData } from "./pdl";
import type { ApiStatus } from "./ui";

/**
 * Propriétés pour le composant `PdlCard`.
 */
export interface PdlCardProps {
  /** Données du point de livraison affiché par la carte. */
  pdlItem: PdlData;
}

/**
 * Propriétés pour le composant `ApiStatut`.
 */
export interface ApiStatutProps {
  /** Statut courant de l'API (`checking`, `online`, `offline`). */
  statuts: ApiStatus;
}

/**
 * Propriétés attendues par le composant `ErrorModal`.
 */
export interface ErrorModalProps {
  /** Indique si la modale doit être affichée. */
  isOpen: boolean;
  /** Le titre de la modale (généralement le type d'erreur). */
  title: string;
  /** Le message détaillé décrivant l'erreur. */
  message: string;
  /** Fonction de rappel appelée lors de la fermeture de la modale. */
  onClose: () => void;
}
