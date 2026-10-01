import Link from "next/link";
import { categories } from "@/lib/articles";
import { Logo } from "./Logo";
import { ThemeToggle } from "./ThemeToggle";
import { SearchDialog } from "./SearchDialog";
import { MobileMenu } from "./MobileMenu";

export const PRIMARY_NAV = [
  { href: "/noticias", label: "Notícias" },
  { href: "/artigos", label: "Artigos" },
  { href: "/reviews", label: "Comparativos" },
  { href: "/categoria/indica", label: "Melhores Produtos" },
  { href: "/sobre", label: "Sobre" },
];

export const INSTITUTIONAL_NAV = [
  { href: "/sobre", label: "Sobre o Saúde na Minha Vida" },
  { href: "/autor/equipe-editorial", label: "Quem escreve" },
  { href: "/contato", label: "Contato" },
  { href: "/politica-editorial", label: "Política editorial" },
  { href: "/publicidade-e-afiliados", label: "Publicidade e afiliados" },
  { href: "/politica-de-privacidade", label: "Política de privacidade" },
  { href: "/termos-de-uso", label: "Termos de uso" },
];

export function Header() {
  const categoryItems = categories
    .filter((c) => c.slug !== "indica")
    .map((c) => ({
      href: `/categoria/${c.slug}`,
      label: c.label,
      description: c.description,
    }));

  return (
    <header className="sticky top-0 z-40 border-b border-border/80 bg-surface/85 backdrop-blur-md supports-[backdrop-filter]:bg-surface/75">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center gap-4 px-4 sm:px-6 lg:px-8">
        <Logo priority className="mr-2" />

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Principal">
          {PRIMARY_NAV.slice(0, 4).map((i) => (
            <Link
              key={i.href}
              href={i.href}
              className="whitespace-nowrap rounded-lg px-3 py-2 text-sm font-medium text-muted transition hover:bg-surface-2 hover:text-foreground"
            >
              {i.label}
            </Link>
          ))}

          <div className="group relative">
            <button
              type="button"
              className="inline-flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium text-muted transition hover:bg-surface-2 hover:text-foreground group-focus-within:text-foreground"
            >
              Categorias
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="m6 9 6 6 6-6" />
              </svg>
            </button>
            <div className="invisible absolute left-0 top-full z-50 w-[520px] translate-y-1 pt-2 opacity-0 transition group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
              <div className="grid grid-cols-2 gap-1 rounded-xl border border-border bg-surface p-2 shadow-xl">
                {categoryItems.map((c) => (
                  <Link
                    key={c.href}
                    href={c.href}
                    className="rounded-lg px-3 py-2.5 transition hover:bg-surface-2"
                  >
                    <span className="block text-sm font-semibold">{c.label}</span>
                    <span className="mt-0.5 line-clamp-2 block text-xs leading-snug text-muted">
                      {c.description}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <Link
            href="/sobre"
            className="whitespace-nowrap rounded-lg px-3 py-2 text-sm font-medium text-muted transition hover:bg-surface-2 hover:text-foreground"
          >
            Sobre
          </Link>
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <SearchDialog />
          <ThemeToggle className="hidden lg:inline-flex" />
          <Link
            href="/categoria/indica"
            className="hidden h-9 items-center whitespace-nowrap rounded-lg bg-cta px-3.5 text-sm font-semibold text-cta-foreground transition hover:opacity-90 lg:inline-flex"
          >
            Guias de compra
          </Link>
          <MobileMenu
            primary={PRIMARY_NAV}
            categories={categoryItems}
            institutional={INSTITUTIONAL_NAV}
          />
        </div>
      </div>
    </header>
  );
}
