import Link from "next/link";
import type { NewsItem } from "@/lib/news";

function shortDate(iso: string) {
  return new Date(`${iso}T12:00:00-03:00`).toLocaleDateString("pt-BR", {
    timeZone: "America/Sao_Paulo",
    day: "2-digit",
    month: "short",
  });
}

/** Linha de notícia: data em mono à esquerda, título forte, fonte abaixo. */
export function NewsRow({
  item,
  showDate = true,
  headingLevel = "h3",
}: {
  item: NewsItem;
  showDate?: boolean;
  headingLevel?: "h2" | "h3";
}) {
  const Heading = headingLevel;
  return (
    <article className="group flex gap-4 border-b border-border py-3.5 last:border-b-0">
      {showDate && (
        <time
          dateTime={item.date}
          className="w-14 shrink-0 pt-0.5 font-mono text-[11px] uppercase tracking-wider text-muted"
        >
          {shortDate(item.date)}
        </time>
      )}
      <div className="min-w-0">
        <Heading className="font-display text-[15px] font-semibold leading-snug">
          <Link href={`/noticias/${item.slug}`} className="transition group-hover:text-accent">
            {item.title}
          </Link>
        </Heading>
        <p className="mt-1 font-mono text-[11px] text-muted">via {item.sourceName}</p>
      </div>
    </article>
  );
}

export function NewsList({
  items,
  columns = 1,
  headingLevel = "h3",
}: {
  items: NewsItem[];
  columns?: 1 | 2;
  headingLevel?: "h2" | "h3";
}) {
  return (
    <div className={columns === 2 ? "grid gap-x-10 md:grid-cols-2" : ""}>
      {items.map((n) => (
        <NewsRow key={n.slug} item={n} headingLevel={headingLevel} />
      ))}
    </div>
  );
}
