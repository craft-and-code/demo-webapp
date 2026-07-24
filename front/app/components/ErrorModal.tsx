import { useEffect, useRef } from "react";
import { TriangleAlert } from "lucide-react";

import type { ErrorModalProps } from "../types/components";

/**
 * Composant modal générique pour afficher les erreurs critiques.
 * Bloque l'interaction utilisateur jusqu'à sa fermeture.
 * 
 * @param props - Les propriétés du composant ErrorModal.
 * @param props.isOpen - Indique si la modale est visible.
 * @param props.title - Le titre de la modale.
 * @param props.message - Le message d'erreur détaillé.
 * @param props.onClose - Fonction appelée lors de la fermeture de la modale.
 * @returns {React.ReactElement | null} Le composant ErrorModal ou null si fermé.
 */
export function ErrorModal({
  isOpen,
  title,
  message,
  onClose,
}: ErrorModalProps) {
  /** Bouton de fermeture : reçoit le focus à l'ouverture. */
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  /** Élément actif avant l'ouverture, pour restaurer le focus à la fermeture. */
  const previousFocusRef = useRef<HTMLElement | null>(null);

  // Fermeture au clavier (Échap) + gestion du focus.
  useEffect(() => {
    if (!isOpen) return;

    previousFocusRef.current = document.activeElement as HTMLElement | null;
    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      previousFocusRef.current?.focus();
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Arrière-plan flouté et sombre (Backdrop), cliquable pour fermer */}
      <div
        className="fixed inset-0 bg-gray-950/70 backdrop-blur-md transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Conteneur de la pop-in */}
      <div
        className="relative z-10 w-full max-w-md transform overflow-hidden rounded-2xl border border-red-500/30 bg-gray-900/90 p-6 text-left shadow-2xl shadow-red-500/10 transition-all sm:my-8"
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        aria-describedby="modal-desc"
      >
        {/* Icône d'erreur stylisée */}
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-500/10 text-red-400">
          <TriangleAlert className="h-6 w-6" strokeWidth={2} aria-hidden="true" />
        </div>

        {/* Contenu textuel */}
        <div className="mt-4 text-center">
          <h3
            className="text-lg font-semibold leading-6 text-white"
            id="modal-title"
          >
            {title}
          </h3>
          <div className="mt-2">
            <p id="modal-desc" className="text-sm text-gray-300">
              {message}
            </p>
          </div>
        </div>

        {/* Bouton d'action unique */}
        <div className="mt-6 flex justify-center">
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            className="inline-flex w-full justify-center rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-900 active:bg-red-700 transition-all duration-200"
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
}

export default ErrorModal;
