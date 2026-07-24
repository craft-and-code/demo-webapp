import { useEffect, useState } from "react";

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
        <svg
          className="h-5 w-5 animate-spin-slow"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2.0"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.364l-.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z"
          />
        </svg>
      ) : (
        /* Icône Lune pour passer au thème sombre */
        <svg
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2.0"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
          />
        </svg>
      )}
    </button>
  );
}
