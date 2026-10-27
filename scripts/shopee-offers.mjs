#!/usr/bin/env node
/**
 * Consulta a API de Afiliados da Shopee (GraphQL) e imprime os anúncios em JSON enxuto.
 * Credenciais SÓ por variável de ambiente (nunca no repositório):
 *   SHOPEE_APP_ID e SHOPEE_SECRET
 * Uso:
 *   node scripts/shopee-offers.mjs "<palavra-chave>" [--limit 20] [--sort 5] [--mall] [--min-sales 50]
 *   node scripts/shopee-offers.mjs --item <itemId> --shop <shopId>
 * --sort: 1 relevância, 2 mais vendidos, 3 preço decrescente, 4 preço crescente, 5 comissão decrescente.
 * --mall: só lojas Shopee Mall (shopType contém 1 = loja oficial).
 */
import { createHash } from "node:crypto";

const appId = process.env.SHOPEE_APP_ID;
const secret = process.env.SHOPEE_SECRET;
if (!appId || !secret) {
  console.error("Defina SHOPEE_APP_ID e SHOPEE_SECRET no ambiente (não grave no repositório).");
  process.exit(2);
}

const args = process.argv.slice(2);
const flag = (n) => args.includes(n);
const val = (n, d) => (args.includes(n) ? args[args.indexOf(n) + 1] : d);
const keyword = args.find((a, i) => !a.startsWith("--") && !(i > 0 && args[i - 1].startsWith("--") && !["--mall"].includes(args[i - 1])));
const item = val("--item");
const shop = val("--shop");
const limit = Number(val("--limit", "20"));
const sort = Number(val("--sort", "2"));
const minSales = Number(val("--min-sales", "0"));

const filters = [];
if (item) filters.push(`itemId:${Number(item)}`);
if (shop) filters.push(`shopId:${Number(shop)}`);
if (keyword && !item) filters.push(`keyword:${JSON.stringify(keyword)}`);
filters.push(`limit:${limit}`, `sortType:${sort}`);

const query = `{ productOfferV2(${filters.join(", ")}) { nodes { productName itemId shopId shopName shopType price priceMin priceMax ratingStar sales commissionRate imageUrl offerLink productLink } } }`;
const payload = JSON.stringify({ query });
const ts = String(Math.floor(Date.now() / 1000));
const signature = createHash("sha256").update(appId + ts + payload + secret).digest("hex");

const res = await fetch("https://open-api.affiliate.shopee.com.br/graphql", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization: `SHA256 Credential=${appId}, Timestamp=${ts}, Signature=${signature}`,
  },
  body: payload,
});
const json = await res.json();
if (json.errors) {
  console.error(JSON.stringify(json.errors));
  process.exit(1);
}
let nodes = json.data.productOfferV2.nodes;
if (flag("--mall")) nodes = nodes.filter((n) => (n.shopType || []).includes(1));
nodes = nodes.filter((n) => Number(n.sales) >= minSales);
console.log(JSON.stringify(nodes, null, 2));
