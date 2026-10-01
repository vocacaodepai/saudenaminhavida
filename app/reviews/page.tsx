import type { Metadata } from "next";
import Link from "next/link";
import { ArticleCard } from "@/components/ArticleCard";
import { CategoryChips } from "@/components/CategoryChips";
import { Container } from "@/components/Container";
import { Sidebar } from "@/components/Sidebar";
import { JsonLd } from "@/components/listing/JsonLd";
import { ListingHeader } from "@/components/listing/ListingHeader";
import { ReviewCriteria } from "@/components/listing/ReviewCriteria";
import { listingMetadata } from "@/components/listing/metadata";
import { countLabel } from "@/components/listing/paginate";
import { getArticlesByCategory, getReviews, site } from "@/lib/articles";
import { absoluteUrl, breadcrumbJsonLd } from "@/lib/seo";

const PATH = "/reviews";
const TITLE = "Comparativos e análises de produtos";
const DESCRIPTION =
  "Análises independentes de produtos para o cuidado de idosos em casa, com nota de 0 a 10 por critérios públicos: segurança, facilidade, durabilidade, preço e avaliações reais.";

export const metadata: Metadata = listingMetadata({ title: TITLE, description: DESCRIPTION, path: PATH });

export default function ReviewsPage() {
  const reviews = getReviews();
  const meanwhile = reviews.length === 0 ? getArticlesByCategory("indica").slice(0, 6) : [];

  const collection = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: TITLE,
    description: DESCRIPTION,
    url: absoluteUrl(PATH),
    inLanguage: "pt-BR",
    isPartOf: { "@id": `${site.url}/#website` },
    publisher: { "@id": `${site.url}/#organization` },
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: reviews.length,
      itemListElement: reviews.map((a, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: a.title,
        url: absoluteUrl(`/artigos/${a.slug}`),
      })),
    },
  };

  return (
    <>
      <JsonLd data={collection} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Início", path: "/" },
          { name: "Comparativos", path: PATH },
        ])}
      />
      <Container className="py-10 sm:py-14">
        <ListingHeader
          label="Produtos"
          title={TITLE}
          description={DESCRIPTION}
          intro="Analisamos cada produto a partir da ficha técnica oficial e das avaliações reais de quem comprou, olhando primeiro a segurança do idoso. A nota resume a análise; o texto explica o porquê. Não alegamos teste físico que não aconteceu."
          count={countLabel(reviews.length, "análise", "análises")}
        />
        <CategoryChips active="reviews" className="mt-8 border-y border-border py-3" />
        <ReviewCriteria />
        <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,1fr)_320px]">
          <div className="min-w-0">
            {reviews.length > 0 ? (
              <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {reviews.map((article, i) => (
                  <ArticleCard key={article.slug} article={article} headingLevel="h2" priority={i < 3} />
                ))}
              </div>
            ) : (
              <>
                <section
                  aria-labelledby="reviews-vazio"
                  className="relative overflow-hidden rounded-xl border border-border bg-ink p-6 text-ink-foreground sm:p-8"
                >
                  <div className="hero-glow pointer-events-none absolute inset-0 opacity-60" aria-hidden="true" />
                  <div className="relative">
                    <p className="label-mono text-ink-foreground/70">Em produção</p>
                    <h2 id="reviews-vazio" className="mt-2 font-display text-2xl font-bold tracking-tight sm:text-3xl">
                      As primeiras análises estão sendo preparadas
                    </h2>
                    <p className="mt-3 max-w-2xl text-sm leading-relaxed text-ink-foreground/80 sm:text-base">
                      Cada análise confere ficha técnica, normas de segurança e avaliações reais antes de
                      ganhar nota. Quando a primeira for publicada, ela aparece aqui e no feed do site. Até
                      lá, os guias de compra abaixo já ajudam a escolher o que comprar.
                    </p>
                    <Link
                      href="/feed.xml"
                      className="mt-5 inline-flex h-9 items-center rounded-lg border border-ink-foreground/30 px-4 font-mono text-xs font-medium text-ink-foreground transition hover:border-ink-foreground/60"
                    >
                      Assinar o feed RSS →
                    </Link>
                  </div>
                </section>
                {meanwhile.length > 0 && (
                  <section aria-labelledby="enquanto-isso" className="mt-10">
                    <div className="mb-5 flex items-end justify-between gap-4">
                      <div>
                        <p className="label-mono text-accent">Enquanto isso</p>
                        <h2 id="enquanto-isso" className="mt-1 font-display text-xl font-bold tracking-tight sm:text-2xl">
                          Guias de compra
                        </h2>
                      </div>
                      <Link
                        href="/categoria/indica"
                        className="shrink-0 font-mono text-xs font-medium text-muted transition hover:text-accent"
                      >
                        Ver todos →
                      </Link>
                    </div>
                    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                      {meanwhile.map((article) => (
                        <ArticleCard key={article.slug} article={article} headingLevel="h3" />
                      ))}
                    </div>
                  </section>
                )}
              </>
            )}
          </div>
          <Sidebar />
        </div>
      </Container>
    </>
  );
}
