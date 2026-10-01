import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { site, sortedArticles } from "@/lib/articles";
import { absoluteUrl, breadcrumbJsonLd } from "@/lib/seo";
import { ArticleListing } from "./ArticleListing";
import { JsonLd } from "./JsonLd";
import { listingMetadata, pagedTitle } from "./metadata";
import { ARTICLES_PER_PAGE, countPages, slicePage } from "./paginate";
import { pageHref } from "@/components/Pagination";

const BASE = "/artigos";
const TITLE = "Todos os artigos";
const DESCRIPTION =
  "Guias práticos para filhos e cuidadores de idosos: urgências e quedas, Alzheimer, alimentação 60+, rotina em casa, direitos e cuidado com quem cuida.";

export function artigosTotalPages(): number {
  return countPages(sortedArticles().length, ARTICLES_PER_PAGE);
}

export function artigosMetadata(page: number): Metadata {
  return listingMetadata({
    title: pagedTitle(TITLE, page),
    description: DESCRIPTION,
    path: pageHref(BASE, page),
  });
}

export function ArtigosPage({ page }: { page: number }) {
  const all = sortedArticles();
  const totalPages = countPages(all.length, ARTICLES_PER_PAGE);
  if (page > totalPages) notFound();
  const items = slicePage(all, page, ARTICLES_PER_PAGE);
  const path = pageHref(BASE, page);

  const collection = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: pagedTitle(TITLE, page),
    description: DESCRIPTION,
    url: absoluteUrl(path),
    inLanguage: "pt-BR",
    isPartOf: { "@id": `${site.url}/#website` },
    publisher: { "@id": `${site.url}/#organization` },
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: all.length,
      itemListElement: items.map((a, i) => ({
        "@type": "ListItem",
        position: (page - 1) * ARTICLES_PER_PAGE + i + 1,
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
          { name: TITLE, path: BASE },
        ])}
      />
      <ArticleListing
        label="Arquivo"
        title={TITLE}
        description={DESCRIPTION}
        items={items}
        total={all.length}
        page={page}
        totalPages={totalPages}
        basePath={BASE}
        active="todos"
      />
    </>
  );
}
