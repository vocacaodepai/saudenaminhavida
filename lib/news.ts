/**
 * API de leitura das notícias.
 *
 * Cada notícia é um arquivo em content/news/<slug>.ts, reunido por
 * content/news/index.ts (gerado por scripts/build-content-index.mjs).
 * Notícias nunca são apagadas: URL indexada é URL que continua no ar.
 */
import { news as allNews } from "@/content/news";
import type { NewsItem } from "@/lib/types";

export type { NewsItem, NewsFaqItem, NewsQuizQuestion } from "@/lib/types";

/** Todas as notícias, mais recentes primeiro (ordem definida pelo índice gerado). */
export const news: NewsItem[] = allNews;

const bySlug = new Map(news.map((n) => [n.slug, n]));

export function getNewsBySlug(slug: string): NewsItem | undefined {
  return bySlug.get(slug);
}

export function sortedNews(): NewsItem[] {
  return [...news].sort((a, b) => b.date.localeCompare(a.date) || a.slug.localeCompare(b.slug));
}

/** Agrupa por dia, mantendo a ordem (mais recente primeiro). */
export function groupNewsByDay(items: NewsItem[]): { date: string; items: NewsItem[] }[] {
  const groups: { date: string; items: NewsItem[] }[] = [];
  for (const n of items) {
    const last = groups[groups.length - 1];
    if (last && last.date === n.date) last.items.push(n);
    else groups.push({ date: n.date, items: [n] });
  }
  return groups;
}

const STOP = new Set(
  "a o e de da do das dos em no na nos nas um uma por para com sem que se ao aos à às os as ia e-ia como sobre mais menos após entre contra".split(" ")
);

function tokens(text: string): Set<string> {
  return new Set(
    text
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .split(/[^a-z0-9]+/)
      .filter((t) => t.length > 2 && !STOP.has(t))
  );
}

/** Notícias relacionadas por sobreposição de termos do título, desempate por recência. */
export function getRelatedNews(current: NewsItem, limit = 4): NewsItem[] {
  const base = tokens(current.title);
  return sortedNews()
    .filter((n) => n.slug !== current.slug)
    .map((n) => {
      let score = 0;
      for (const t of tokens(n.title)) if (base.has(t)) score++;
      return { n, score };
    })
    .sort((a, b) => b.score - a.score || b.n.date.localeCompare(a.n.date))
    .slice(0, limit)
    .map((x) => x.n);
}
