import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

import type { ThemeMode } from "../types/ui";

/**
 * Bouton de bascule interactif pour changer entre les modes clair et sombre.
 * Sauvegarde la préférence dans le localStorage.
 * 
 * @returns {React.ReactElement} Le composant SwitchMode.
 */
export function SwitchMode() {
  /** @type {[ThemeMode, React.Dispatch<React.SetStateAction<ThemeMode>>]} */
  const [theme, setTheme] = useState<ThemeMode>("dark"); // Par défaut sombre

  // Initialisation et persistance du thème
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as ThemeMode | null;
    const systemPrefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;
    const activeTheme = savedTheme || (systemPrefersDark ? "dark" : "light");

    setTheme(activeTheme);
    applyTheme(activeTheme);
  }, []);

  /**
   * Applique la classe correspondante au document HTML.
   *
   * @function applyTheme
   * @param {ThemeMode} mode - Le mode de thème à appliquer ('light' ou 'dark').
   * @returns {void}
   */
  const applyTheme = (mode: ThemeMode) => {
    if (mode === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  /**
   * Bascule entre le mode clair et le mode sombre, et l'enregistre en local.
   *
   * @function toggleTheme
   * @returns {void}
   */
  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    localStorage.setItem("theme", nextTheme);
    applyTheme(nextTheme);
  };

  return (
    <button
      onClick={toggleTheme}
      type="button"
      aria-label={
        theme === "dark" ? "Passer au thème clair" : "Passer au thème sombre"
      }
      aria-pressed={theme === "dark"}
      className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 dark:border-gray-800 bg-slate-50 dark:bg-gray-900 text-slate-700 dark:text-amber-400 shadow-sm hover:bg-slate-100 dark:hover:bg-gray-850 hover:border-slate-300 dark:hover:border-gray-700 hover:scale-105 active:scale-95 transition-all duration-200"
    >
      {theme === "dark" ? (
        /* Icône Soleil pour passer au thème clair */
        <Sun className="h-5 w-5 animate-spin-slow" aria-hidden="true" />
      ) : (
        /* Icône Lune pour passer au thème sombre */
        <Moon className="h-5 w-5" aria-hidden="true" />
      )}
    </button>
  );
}
