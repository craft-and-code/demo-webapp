import { useEffect, useState } from "react";

import { checkApiStatus } from "../services/api";
import type { ApiStatus } from "../types/ui";

import { ApiStatut } from "./ApiStatut";
import { Logo } from "./Logo";
import { SwitchMode } from "./SwitchMode";

/**
 * Composant de navigation principal de l'application NovaEnergy.
 * Intègre le logo, le statut de l'API et le sélecteur de thème.
 * 
 * @returns {React.ReactElement} Le composant Navbar.
 */
export function Navbar() {
  /** @type {[ApiStatus, React.Dispatch<React.SetStateAction<ApiStatus>>]} */
  const [status, setStatus] = useState<ApiStatus>("checking");

  // Vérification du statut de l'API
  useEffect(() => {
    const check = async () => {
      const online = await checkApiStatus();
      setStatus(online ? "online" : "offline");
    };

    check();
    const interval = setInterval(check, 15000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200 dark:border-gray-800 bg-white/80 dark:bg-gray-950/80 backdrop-blur-md transition-colors duration-300">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Logo />

        <div className="flex items-center gap-4">
          <ApiStatut statuts={status} />
          <SwitchMode />
        </div>
      </div>
    </header>
  );
}

export default Navbar;
