/**
 * Geometria da marca "Coração e Cruz": um coração em traço com uma cruz de
 * cuidado no centro. viewBox 0 0 32 32.
 * Usada pelo componente <Logo/>, pelo favicon e pela imagem Open Graph.
 */
export const LOGO_VIEWBOX = "0 0 32 32";
export const LOGO_HEART =
  "M16 27.2C8.4 21.6 4.2 17.4 4.2 12.3 4.2 8.9 6.8 6.4 10 6.4c2.3 0 4.4 1.2 6 3.4 1.6-2.2 3.7-3.4 6-3.4 3.2 0 5.8 2.5 5.8 5.9 0 5.1-4.2 9.3-11.8 14.9Z";
export const LOGO_PLUS = "M16 12.2V19M12.6 15.6H19.4";
export const LOGO_GRADIENT = { from: "#0F766E", to: "#D97706" };

/**
 * SVG da marca como string (para favicon, OG image e arquivos em public/).
 * `mono` desliga o gradiente; `background` desenha o quadrado arredondado atrás.
 */
export function logoIconSvg({
  size = 32,
  color = "#10201E",
  mono = false,
  background,
}: {
  size?: number;
  color?: string;
  mono?: boolean;
  background?: string;
} = {}): string {
  const plus = mono ? color : "url(#snmv-g)";
  const defs = mono
    ? ""
    : `<defs><linearGradient id="snmv-g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${LOGO_GRADIENT.from}"/><stop offset="1" stop-color="${LOGO_GRADIENT.to}"/></linearGradient></defs>`;
  const bg = background ? `<rect width="32" height="32" rx="7" fill="${background}"/>` : "";
  const inner = background ? `<g transform="translate(3.2 3.2) scale(0.8)">` : "<g>";
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="${LOGO_VIEWBOX}" role="img" aria-label="Saúde na Minha Vida">${defs}${bg}${inner}<path d="${LOGO_HEART}" stroke="${color}" stroke-width="2.6" stroke-linejoin="round" fill="none"/><path d="${LOGO_PLUS}" stroke="${plus}" stroke-width="2.8" stroke-linecap="round" fill="none"/></g></svg>`;
}
