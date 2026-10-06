import Link from "next/link";

const CRITERIA = [
  { label: "Segurança", text: "Reduz de verdade o risco de queda, engasgo ou erro de medicação? Tem certificação ou norma quando aplicável." },
  { label: "Facilidade", text: "Um idoso ou um cuidador cansado consegue usar sem manual e sem ajuda técnica?" },
  { label: "Construção", text: "Material, peso suportado, regulagens e acabamento, conforme a ficha técnica oficial do fabricante." },
  { label: "Garantia e suporte", text: "Prazo de garantia, canal de atendimento e manual em português disponíveis no site do fabricante." },
  { label: "Transparência", text: "O fabricante informa medidas, normas e certificações com clareza, sem prometer efeito que o produto não tem." },
];

/** Bloco "Como avaliamos": critérios públicos das notas das análises. */
export function ReviewCriteria() {
  return (
    <section aria-labelledby="como-avaliamos" className="mt-8 rounded-xl border border-border bg-surface p-5 sm:p-6">
      <p className="label-mono text-muted">Como avaliamos</p>
      <h2 id="como-avaliamos" className="mt-1 font-display text-xl font-bold tracking-tight sm:text-2xl">
        Nota de 0 a 10, por critérios públicos
      </h2>
      <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted sm:text-base">
        Cada análise recebe uma nota final de 0 a 10, calculada a partir de cinco critérios avaliados
        separadamente. Quando houve teste prático, dizemos por quantos dias usamos o produto. Sem teste,
        a análise se apresenta como análise. Links de afiliado, quando existem, são sempre sinalizados no próprio artigo e não
        mudam a nota.
      </p>
      <ol className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        {CRITERIA.map((c, i) => (
          <li key={c.label} className="rounded-lg border border-border bg-background p-4">
            <span className="font-mono text-xs font-semibold text-accent">{String(i + 1).padStart(2, "0")}</span>
            <p className="mt-1 font-display text-sm font-semibold">{c.label}</p>
            <p className="mt-1 text-xs leading-relaxed text-muted">{c.text}</p>
          </li>
        ))}
      </ol>
      <p className="mt-4 font-mono text-xs text-muted">
        Leia a{" "}
        <Link href="/politica-editorial" className="text-accent hover:underline">
          política editorial
        </Link>{" "}
        e a página de{" "}
        <Link href="/publicidade-e-afiliados" className="text-accent hover:underline">
          publicidade e afiliados
        </Link>
        .
      </p>
    </section>
  );
}
