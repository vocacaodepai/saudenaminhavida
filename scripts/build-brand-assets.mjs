#!/usr/bin/env node
/** Gera app/icon.svg e os SVGs de public/ a partir da geometria em lib/logo.ts. */
import { writeFileSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

const ROOT = resolve(new URL("..", import.meta.url).pathname);
const src = readFileSync(resolve(ROOT, "lib/logo.ts"), "utf8");
const heart = /LOGO_HEART =\s*"([^"]+)"/.exec(src)[1];
const plus = /LOGO_PLUS = "([^"]+)"/.exec(src)[1];

function svg({ color, mono, background, size = 32 }) {
  const fill = mono ? color : "url(#snmv-g)";
  const defs = mono ? "" : `<defs><linearGradient id="snmv-g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#1B4B8A"/><stop offset="1" stop-color="#C2410C"/></linearGradient></defs>`;
  const bg = background ? `<rect width="32" height="32" rx="7" fill="${background}"/>` : "";
  const g = background ? `<g transform="translate(3.2 3.2) scale(0.8)">` : "<g>";
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 32 32" role="img" aria-label="Saúde na Minha Vida">${defs}${bg}${g}<path d="${heart}" stroke="${color}" stroke-width="2.6" stroke-linejoin="round" fill="none"/><path d="${plus}" stroke="${fill}" stroke-width="2.8" stroke-linecap="round" fill="none"/></g></svg>`;
}

const out = {
  "app/icon.svg": svg({ color: "#FFFFFF", background: "#0F1B2D" }),
  "public/logo.svg": svg({ color: "#14213D", size: 512 }),
  "public/logo-dark.svg": svg({ color: "#FFFFFF", size: 512 }),
  "public/logo-mono.svg": svg({ color: "#14213D", mono: true, size: 512 }),
  "public/logo-icon.svg": svg({ color: "#14213D", size: 512 }),
  "public/logo-icon-dark.svg": svg({ color: "#FFFFFF", background: "#0F1B2D", size: 512 }),
};
for (const [f, c] of Object.entries(out)) writeFileSync(resolve(ROOT, f), c + "\n");
console.log("brand assets:", Object.keys(out).join(", "));
