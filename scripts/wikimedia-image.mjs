#!/usr/bin/env node
/**
 * Busca e baixa fotos do Wikimedia Commons (PRIMEIRA fonte de imagens do site).
 *
 *   node scripts/wikimedia-image.mjs "<busca em inglês>"                    lista candidatos livres
 *   node scripts/wikimedia-image.mjs "<busca>" --pick 2 --slug <slug-artigo>  baixa o candidato 2 em
 *                                                                           public/images/capas/<slug>.jpg
 *                                                                           e imprime o bloco coverImage
 *
 * Só aceita licenças livres que permitem uso comercial e modificação: CC0, domínio público,
 * CC BY e CC BY-SA. Recusa NC, ND, GFDL-only e "fair use". A atribuição (autor + licença + link da
 * página do arquivo) vai no `credit`/`creditUrl`. Respeita Retry-After em caso de 429.
 */
import { writeFileSync, mkdirSync, existsSync } from "node:fs";
import { resolve } from "node:path";

const ROOT = resolve(new URL("..", import.meta.url).pathname);
const UA = "SaudeNaMinhaVidaBot/1.0 (https://www.saudenaminhavida.com.br; contato@saudenaminhavida.com.br)";
const args = process.argv.slice(2);
const query = args.find((a) => !a.startsWith("--"));
const flag = (n) => {
  const i = args.indexOf(`--${n}`);
  return i >= 0 ? args[i + 1] : undefined;
};
const pick = flag("pick");
const slug = flag("slug");
const WIDTH = 1600;

if (!query) {
  console.error('uso: node scripts/wikimedia-image.mjs "<busca>" [--pick N --slug <slug>]');
  process.exit(1);
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function get(url, binary = false) {
  for (let attempt = 0; attempt < 5; attempt++) {
    const res = await fetch(url, { headers: { "User-Agent": UA } });
    if (res.status === 429 || res.status === 503) {
      const wait = Math.max(Number(res.headers.get("retry-after")) || 0, 2 ** attempt * 2) * 1000;
      await sleep(wait);
      continue;
    }
    if (!res.ok) throw new Error(`HTTP ${res.status} em ${url.slice(0, 90)}`);
    return binary ? Buffer.from(await res.arrayBuffer()) : res.json();
  }
  throw new Error("limite de requisições do Commons persistente; tente de novo em alguns minutos");
}

const strip = (s = "") => s.replace(/<[^>]+>/g, "").replace(/&amp;/g, "&").replace(/\s+/g, " ").trim();

function freeLicense(short = "", url = "") {
  const s = short.toLowerCase();
  if (/(\bnc\b|-nc|\bnd\b|-nd|fair use|gfdl|non-?commercial|no derivatives)/.test(s)) return null;
  if (s.includes("cc0") || s.includes("public domain") || s.includes("pdm") || s.includes("pd-")) return { name: short, attribution: false };
  if (/^cc[- ]by(-sa)?[- ]\d/.test(s) || /^cc by(-sa)? \d/.test(s)) return { name: short, attribution: true };
  return null;
}

const params = new URLSearchParams({
  action: "query",
  format: "json",
  generator: "search",
  gsrnamespace: "6",
  gsrsearch: `filetype:bitmap ${query}`,
  gsrlimit: "30",
  prop: "imageinfo",
  iiprop: "url|size|mime|extmetadata",
  iiurlwidth: String(WIDTH),
});
const data = await get(`https://commons.wikimedia.org/w/api.php?${params}`);
const pages = Object.values(data.query?.pages ?? {}).sort((a, b) => (a.index ?? 0) - (b.index ?? 0));

const out = [];
for (const p of pages) {
  const ii = p.imageinfo?.[0];
  if (!ii || !/image\/jpeg/.test(ii.mime) || ii.width < 1400 || ii.width < ii.height) continue;
  const m = ii.extmetadata ?? {};
  const lic = freeLicense(strip(m.LicenseShortName?.value), strip(m.LicenseUrl?.value));
  if (!lic) continue;
  const artist = strip(m.Artist?.value) || "Autor não informado";
  if (artist.length > 80) continue; // crédito ilegível: descarta
  out.push({
    title: p.title.replace(/^File:/, ""),
    page: ii.descriptionurl,
    thumb: ii.thumburl,
    width: ii.thumbwidth ?? WIDTH,
    height: ii.thumbheight,
    license: lic.name,
    artist,
    desc: strip(m.ImageDescription?.value).slice(0, 110),
  });
}

if (!pick) {
  if (!out.length) console.log("Nenhum candidato livre encontrado. Refine a busca (em inglês).");
  out.slice(0, 10).forEach((c, i) => console.log(`${i + 1}. ${c.title}\n   ${c.width}x${c.height} | ${c.license} | ${c.artist}\n   ${c.desc}\n   ${c.page}`));
  process.exit(0);
}

const c = out[Number(pick) - 1];
if (!c) {
  console.error(`candidato ${pick} não existe (${out.length} disponíveis)`);
  process.exit(1);
}
if (!slug) {
  console.error("--slug é obrigatório com --pick");
  process.exit(1);
}
const dir = resolve(ROOT, "public/images/capas");
if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
const file = resolve(dir, `${slug}.jpg`);
writeFileSync(file, await get(c.thumb, true));
console.log(`baixado: public/images/capas/${slug}.jpg (${c.width}x${c.height})\n`);
console.log(`  coverImage: {
    url: "/images/capas/${slug}.jpg",
    width: ${c.width},
    height: ${c.height},
    credit: "${c.artist.replace(/"/g, "'")} / Wikimedia Commons (${c.license})",
    creditUrl: "${c.page}",
    fit: "cover",
  },`);
