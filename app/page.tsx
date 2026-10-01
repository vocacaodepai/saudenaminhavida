import type { Metadata } from "next";
import Link from "next/link";
import { AdSlot } from "@/components/AdSlot";
import { ArticleCard } from "@/components/ArticleCard";
import { CategoryChips } from "@/components/CategoryChips";
import { Container } from "@/components/Container";
import { NewsList } from "@/components/NewsRow";
import { NewsTicker } from "@/components/NewsTicker";
import { SectionHeading } from "@/components/SectionHeading";
import { FeaturedList, Sidebar } from "@/components/Sidebar";
import {
  type Article,
  type Category,
  articles,
  categories,
  getArticlesByCategory,
  getPopularArticles,
  getReviews,
  site,
  sortedArticles,
} from "@/lib/articles";
import { news, sortedNews } from "@/lib/news";
import { absoluteUrl, metaDescription, safeJsonLd, alternatesFor } from "@/lib/seo";

const HOME_TITLE = "Saúde na Minha Vida: produtos e dicas para cuidar de idosos em casa";
const HOME_DESCRIPTION = metaDescription(site.description);

export const metadata: Metadata = {
  title: { absolute: HOME_TITLE },
  description: HOME_DESCRIPTION,
  alternates: alternatesFor("/"),
  openGraph: {
    type: "website",
    url: site.url,
    siteName: site.name,
    locale: site.locale,
    title: HOME_TITLE,
    description: HOME_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: HOME_TITLE,
    description: HOME_DESCRIPTION,
  },
};

/** Títulos curtos das seções por categoria (a description completa é longa demais para um título). */
const CATEGORY_TITLES: Record<Category, string> = {
  indica: "O que comprar para cuidar em casa",
  rotina: "Uma casa e uma rotina seguras",
  tecnologia: "Celular, WhatsApp e golpes",
  atividades: "Ideias para o dia a dia",
  direitos: "Direitos, custos e decisões",
  cuidador: "Cuidar de quem cuida",
  saude: "Saúde e urgências: guias de apoio",
};

/** Quantos artigos por bloco de categoria e por seção de reviews. */
const PER_SECTION = 3;
const PRODUCT_SECTION = 6;

/** Mesma seleção que a FeaturedList faz, para o hero e a sidebar não repetirem itens. */
function featuredSlugs(exclude: string[], limit = 5): string[] {
  return getPopularArticles(limit + exclude.length)
    .filter((a) => !exclude.includes(a.slug))
    .slice(0, limit)
    .map((a) => a.slug);
}

function CategoryBlock({ category, items }: { category: (typeof categories)[number]; items: Article[] }) {
  return (
    <section aria-label={category.label}>
      <SectionHeading
        label={category.label}
        title={CATEGORY_TITLES[category.slug] ?? category.label}
        href={`/categoria/${category.slug}`}
        linkText="Ver categoria"
      />
      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {items.map((a) => (
          <ArticleCard key={a.slug} article={a} />
        ))}
      </div>
    </section>
  );
}

export default function Home() {
  const all = sortedArticles();
  const [lead, ...others] = all;
  const secondary = others.slice(0, 2);
  const heroSlugs = [lead, ...secondary].filter(Boolean).map((a) => a.slug);
  const heroFeatured = featuredSlugs(heroSlugs);

  // Tudo o que já apareceu acima da dobra não se repete nos blocos de baixo.
  const shown = new Set<string>(heroSlugs);
  const reviews = getReviews()
    .filter((a) => a.category !== "indica")
    .filter((a) => !shown.has(a.slug))
    .slice(0, PER_SECTION);
  for (const r of reviews) shown.add(r.slug);

  const aiIndicaPicks = getArticlesByCategory("indica")
    .filter((a) => !shown.has(a.slug))
    .slice(0, PRODUCT_SECTION);
  for (const p of aiIndicaPicks) shown.add(p.slug);

  const categoryBlocks = categories
    .filter((c) => c.slug !== "indica")
    .map((c) => ({
      category: c,
      items: getArticlesByCategory(c.slug)
        .filter((a) => !shown.has(a.slug))
        .slice(0, PER_SECTION),
    }))
    .filter((b) => b.items.length > 0);

  const latestNews = sortedNews().slice(0, 8);
  const sidebarExclude = [...heroSlugs, ...heroFeatured];

  // Os 8 artigos do topo: os 3 do hero + os 5 de "Comece por aqui".
  const topArticles = [
    ...[lead, ...secondary].filter(Boolean),
    ...heroFeatured.map((slug) => all.find((a) => a.slug === slug)).filter((a): a is Article => Boolean(a)),
  ];

  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Destaques do Saúde na Minha Vida",
    numberOfItems: topArticles.length,
    itemListElement: topArticles.map((a, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: a.title,
      url: absoluteUrl(`/artigos/${a.slug}`),
    })),
  };

  return (
    <>
      <h1 className="sr-only">{HOME_TITLE}</h1>

      <NewsTicker />

      {/* Hero: destaque 8/4 com um único brilho ao fundo */}
      {lead && (
        <Container as="section" className="pt-6 sm:pt-8">
          <div className="relative isolate">
            <div
              aria-hidden="true"
              className="hero-glow pointer-events-none absolute inset-x-0 -top-8 -z-10 h-3/4 opacity-30 blur-3xl"
            />
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
              <div className="lg:col-span-8">
                <ArticleCard article={lead} variant="featured" priority headingLevel="h2" />
              </div>
              <div className="flex flex-col gap-4 lg:col-span-4">
                {secondary.map((a) => (
                  <ArticleCard key={a.slug} article={a} variant="horizontal" />
                ))}
                <FeaturedList exclude={heroSlugs} />
              </div>
            </div>
          </div>
        </Container>
      )}

      <Container className="mt-8">
        <CategoryChips />
      </Container>

      <Container className="mt-6">
        <AdSlot format="leaderboard" />
      </Container>

      {/* Notícias de hoje */}
      {latestNews.length > 0 && (
        <Container as="section" className="mt-12">
          <SectionHeading label="Últimas" title="Notícias de saúde" href="/noticias" linkText="Ver todas" />
          <div className="rounded-xl border border-border bg-surface px-5 sm:px-6">
            <NewsList items={latestNews} columns={2} />
          </div>
        </Container>
      )}

      {/* Grid principal: blocos editoriais + sidebar */}
      <Container className="mt-12 grid gap-10 lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-12">
        <div className="min-w-0 space-y-12">
          {aiIndicaPicks.length > 0 && (
            <section aria-label="Melhores produtos">
              <SectionHeading
                label="Melhores produtos"
                title="O que comprar para cuidar em casa"
                href="/categoria/indica"
                linkText="Ver todos os guias de compra"
              />
              <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {aiIndicaPicks.map((a) => (
                  <ArticleCard key={a.slug} article={a} />
                ))}
              </div>
            </section>
          )}

          {reviews.length > 0 && (
            <section aria-label="Comparativos">
              <SectionHeading
                label="Analisamos"
                title="Comparativos de produtos"
                href="/reviews"
                linkText="Todos os comparativos"
              />
              <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {reviews.map((a) => (
                  <ArticleCard key={a.slug} article={a} />
                ))}
              </div>
            </section>
          )}

          {categoryBlocks.map((b) => (
            <CategoryBlock key={b.category.slug} category={b.category} items={b.items} />
          ))}
        </div>

        <Sidebar exclude={sidebarExclude} featuredTitle="Destaques" />
      </Container>

      {/* Faixa final */}
      <section className="mt-16 bg-ink text-ink-foreground">
        <Container className="py-14">
          <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-8">
              <p className="label-mono text-ink-foreground/60">{site.name}</p>
              <h2 className="mt-3 font-display text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl">
                Cuidar em casa fica mais leve com o produto certo
              </h2>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink-foreground/80 sm:text-lg">
                {site.description}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/categoria/indica"
                  className="inline-flex h-11 items-center rounded-lg bg-cta px-5 text-sm font-semibold text-cta-foreground transition hover:opacity-90"
                >
                  Ver guias de compra
                </Link>
                <Link
                  href="/artigos"
                  className="inline-flex h-11 items-center rounded-lg border border-white/40 px-5 text-sm font-semibold text-white transition hover:border-white hover:bg-white/5"
                >
                  Ver todos os artigos
                </Link>
              </div>
            </div>
            <dl className="grid grid-cols-3 gap-4 lg:col-span-4">
              <div className="border-l border-white/15 pl-4">
                <dt className="label-mono text-ink-foreground/60">Guias</dt>
                <dd className="mt-1 font-mono text-2xl font-semibold text-white">{articles.length}</dd>
              </div>
              <div className="border-l border-white/15 pl-4">
                <dt className="label-mono text-ink-foreground/60">Notícias</dt>
                <dd className="mt-1 font-mono text-2xl font-semibold text-white">{news.length}</dd>
              </div>
              <div className="border-l border-white/15 pl-4">
                <dt className="label-mono text-ink-foreground/60">Categorias</dt>
                <dd className="mt-1 font-mono text-2xl font-semibold text-white">{categories.length}</dd>
              </div>
            </dl>
          </div>
        </Container>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(itemListJsonLd) }} />
    </>
  );
}
