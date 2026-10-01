import Link from "next/link";
import { LOGO_GRADIENT, LOGO_HEART, LOGO_PLUS, LOGO_VIEWBOX } from "@/lib/logo";

/** Ícone da marca (coração com cruz de cuidado). Herda a cor do texto; a cruz usa o gradiente. */
export function LogoIcon({
  size = 28,
  className = "",
  mono = false,
  id = "snmv",
}: {
  size?: number;
  className?: string;
  mono?: boolean;
  /** Prefixo único quando houver mais de um ícone na página (gradiente por id). */
  id?: string;
}) {
  const gradientId = `${id}-logo-gradient`;
  const nodeFill = mono ? "currentColor" : `url(#${gradientId})`;
  return (
    <svg
      width={size}
      height={size}
      viewBox={LOGO_VIEWBOX}
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      {!mono && (
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor={LOGO_GRADIENT.from} />
            <stop offset="1" stopColor={LOGO_GRADIENT.to} />
          </linearGradient>
        </defs>
      )}
      <path d={LOGO_HEART} stroke="currentColor" strokeWidth="2.6" strokeLinejoin="round" fill="none" />
      <path d={LOGO_PLUS} stroke={nodeFill} strokeWidth="2.8" strokeLinecap="round" fill="none" />
    </svg>
  );
}

/** Marca horizontal: ícone + "Saúde na Minha Vida" (com "Minha Vida" em gradiente). */
export function Logo({
  size = 28,
  className = "",
  href = "/",
  mono = false,
  id = "snmv",
  priority = false,
}: {
  size?: number;
  className?: string;
  href?: string | null;
  mono?: boolean;
  id?: string;
  /** Usa <h1>-like peso visual no header; só estilo, não muda a semântica. */
  priority?: boolean;
}) {
  const inner = (
    <>
      <LogoIcon size={size} mono={mono} id={id} className="shrink-0" />
      <span
        className={`font-display font-bold tracking-tight ${priority ? "text-[20px]" : "text-[18px]"}`}
      >
        Saúde na{" "}
        <span className={mono ? "" : "text-gradient"}>Minha Vida</span>
      </span>
    </>
  );
  const cls = `inline-flex shrink-0 items-center gap-2 whitespace-nowrap text-foreground ${className}`;
  if (href === null) return <span className={cls}>{inner}</span>;
  return (
    <Link href={href} className={cls} aria-label="Saúde na Minha Vida, página inicial">
      {inner}
    </Link>
  );
}
