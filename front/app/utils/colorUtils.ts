/**
 * Génère un dégradé de couleur CSS Tailwind déterministe en fonction d'un nom.
 *
 * @param name - Le nom complet du client.
 * @returns Les classes de dégradé Tailwind (ex: 'from-cyan-500 to-blue-600').
 */
export const getGradientByName = (name: string): string => {
  const gradients = [
    "from-cyan-500 to-blue-600",
    "from-emerald-400 to-teal-600",
    "from-purple-500 to-indigo-600",
    "from-rose-500 to-pink-600",
    "from-amber-400 to-orange-600",
    "from-violet-500 to-fuchsia-600",
  ];
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return gradients[Math.abs(hash) % gradients.length];
};
