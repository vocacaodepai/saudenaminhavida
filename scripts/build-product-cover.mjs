#!/usr/bin/env node
/**
 * Gera uma capa 1600x900 a partir de uma foto de produto vertical (ou que não
 * seja 16:9), preenchendo as laterais com a cor de fundo da própria foto
 * (amostrada dos cantos) em vez de deixar espaço vazio ou usar blur.
 *
 *   node scripts/build-product-cover.mjs <foto-de-entrada> <arquivo-de-saida>
 *
 * Nunca usar gerador de imagem por IA (ElevenLabs ou qualquer outro) para
 * compor capa de produto: já testamos e o resultado errava marca/logo dos
 * produtos reais (ver CLAUDE.md). Esta técnica (cor de fundo real da própria
 * foto + produto nítido centralizado) é 100% local, gratuita e não inventa
 * nenhum pixel do produto.
 */
import sharp from "sharp";
import { resolve } from "node:path";

const [, , input, output] = process.argv;
if (!input || !output) {
  console.error("uso: node scripts/build-product-cover.mjs <foto-de-entrada> <arquivo-de-saida>");
  process.exit(1);
}

const W = 1600;
const H = 900;
const SRC = resolve(input);
const OUT = resolve(output);

/**
 * Amostra a cor de fundo real da foto a partir da moldura (borda fina em
 * volta da imagem inteira), usando a MEDIANA por canal em vez da média: em
 * fotos de produto o objeto às vezes encosta num canto, e a mediana ignora
 * esses pixels do produto que aparecem em minoria na borda.
 */
async function backgroundColor(path) {
  const { data, info } = await sharp(path).raw().toBuffer({ resolveWithObject: true });
  const { width, height, channels } = info;
  const ring = Math.max(2, Math.round(Math.min(width, height) * 0.015));
  const rs = [], gs = [], bs = [];
  const push = (x, y) => {
    const i = (y * width + x) * channels;
    rs.push(data[i]);
    gs.push(data[i + 1]);
    bs.push(data[i + 2]);
  };
  for (let y = 0; y < height; y++) {
    for (let t = 0; t < ring; t++) {
      push(t, y);
      push(width - 1 - t, y);
    }
  }
  for (let x = 0; x < width; x++) {
    for (let t = 0; t < ring; t++) {
      push(x, t);
      push(x, height - 1 - t);
    }
  }
  const median = (arr) => {
    arr.sort((a, b) => a - b);
    return arr[Math.floor(arr.length / 2)];
  };
  return { r: median(rs), g: median(gs), b: median(bs) };
}

const bg = await backgroundColor(SRC);

const productH = H - 80;
const product = await sharp(SRC)
  .resize(null, productH, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
  .png()
  .toBuffer();
const productMeta = await sharp(product).metadata();
const left = Math.round((W - productMeta.width) / 2);
const top = Math.round((H - productMeta.height) / 2);

await sharp({
  create: { width: W, height: H, channels: 3, background: bg },
})
  .composite([{ input: product, left, top }])
  .jpeg({ quality: 92 })
  .toFile(OUT);

console.log(`build-product-cover: gerado ${output} (${W}x${H}, fundo rgb(${bg.r},${bg.g},${bg.b}))`);
