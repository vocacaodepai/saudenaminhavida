/**
 * Tipos compartilhados do conteúdo editorial.
 * Os artigos vivem em content/articles/<slug>.ts (um arquivo por artigo) e
 * são reunidos pelo índice gerado em content/articles/index.ts.
 */
export type FaqItem = { question: string; answer: string };

export type QuizQuestion = {
  question: string;
  options: string[];
  answer: number; // índice da opção correta
  explanation: string;
};

export const categories = [
  {
    slug: "urgencias",
    label: "Urgências e Quedas",
    description:
      "O que fazer quando o idoso cai, engasga, fica confuso de repente ou passa mal, e quando ligar para o SAMU (192).",
  },
  {
    slug: "demencia",
    label: "Alzheimer e Demência",
    description:
      "Sinais, diagnóstico e convivência no dia a dia com quem tem Alzheimer ou outra demência, com orientação prática para a família.",
  },
  {
    slug: "alimentacao",
    label: "Alimentação 60+",
    description:
      "Nutrição na terceira idade: falta de apetite, proteína, hidratação, dificuldade de mastigar e engasgos, diabetes e pressão alta.",
  },
  {
    slug: "rotina",
    label: "Rotina e Casa",
    description:
      "Como organizar remédios, adaptar a casa, cuidar do banho, do sono e da mobilidade com segurança e sem sofrimento.",
  },
  {
    slug: "direitos",
    label: "Direitos e Decisões",
    description:
      "Cuidador, clínica ou casa de repouso, custos, BPC, aposentadoria, plano de saúde 60+ e como dividir o cuidado na família.",
  },
  {
    slug: "cuidador",
    label: "Cuidar de Quem Cuida",
    description:
      "Cansaço, culpa, burnout e limites: como pedir ajuda e cuidar do seu pai ou da sua mãe sem abandonar a sua própria vida.",
  },
  {
    slug: "indica",
    label: "Indica",
    description:
      "Produtos que facilitam o cuidado em casa (barras de apoio, cadeira de banho, organizadores de remédio), comparados com nota por critério e link para comprar.",
  },
] as const;

export type Category = (typeof categories)[number]["slug"];

/** Dados estruturados de um review de produto (artigos com kind: "review"). */
export type ReviewData = {
  /** Nome do produto avaliado. */
  tool: string;
  /** Nota final de 0 a 10, com uma casa decimal. */
  score: number;
  /** Critérios avaliados, cada um com nota de 0 a 10. */
  criteria: { label: string; score: number }[];
  pros: string[];
  cons: string[];
  /** Preço em texto, ex.: "Grátis" ou "US$ 20/mês". */
  price: string;
  /** Para quem o produto é ideal, em uma frase. */
  bestFor: string;
  /** Link de compra/afiliado do produto (https). */
  url: string;
  /** Quantos dias o produto foi testado antes do review (só se o teste aconteceu de fato). */
  testedDays?: number;
  /** Se há links de afiliado no artigo (exibe o aviso). Padrão: false. */
  affiliate?: boolean;
  /** Texto do botão principal. Padrão: "Conhecer {tool}". */
  ctaLabel?: string;
};

export type Article = {
  slug: string;
  title: string;
  /** Título curto para a tag <title> (até ~60 caracteres). Padrão: title. */
  seoTitle?: string;
  excerpt: string;
  /** Meta description (120-160 caracteres). Padrão: excerpt. */
  metaDescription?: string;
  category: Category;
  date: string; // ISO (AAAA-MM-DD)
  /** Data da última atualização editorial (AAAA-MM-DD). */
  updated?: string;
  /** Minutos de leitura declarados; o site recalcula pelo texto (ver readingTime). */
  readTime: number;
  imageQuery: string;
  seed: number;
  /**
   * Foto real do produto (self-hosted em /public/images/products), usada no lugar do
   * banco de imagens só para reviews de produto físico (categoria ai-indica).
   */
  coverImage?: { url: string; width: number; height: number; credit: string; creditUrl: string };
  content: string; // HTML
  /** Tipo do artigo. Padrão: "guia". */
  kind?: "guia" | "review";
  /** Voz autoral do blog. Padrão: a redação do site (lib/author.ts). */
  author?: string;
  /** Resumo em 3 pontos exibido logo após a capa. */
  keyPoints?: string[];
  /** Dados do review (só para kind: "review"). */
  review?: ReviewData;
  /** Perguntas frequentes exibidas em acordeão ao fim do artigo. */
  faq?: FaqItem[];
  /** Quiz curto pra fixar o aprendizado, exibido ao fim do artigo. */
  quiz?: QuizQuestion[];
  /** Fontes primárias citadas no texto (diretrizes, órgãos de saúde, sociedades médicas). */
  sources?: { label: string; url: string }[];
  /** Profissional que revisou o conteúdo (nome e registro), exibido no topo do artigo. */
  reviewedBy?: string;
};

export type NewsFaqItem = FaqItem;
export type NewsQuizQuestion = QuizQuestion;

export type NewsItem = {
  slug: string;
  title: string;
  /** Resumo curto (também vira meta description, cortada em ~158 caracteres). */
  summary: string;
  author: string;
  sourceName: string;
  sourceUrl: string;
  date: string; // ISO (AAAA-MM-DD)
  /**
   * Texto completo da notícia (HTML), escrito a partir da fonte e exibido em
   * /noticias/[slug]. Opcional só nas notícias antigas; todo item novo deve ter.
   */
  content?: string;
  /** Perguntas frequentes exibidas em acordeão ao fim da matéria. */
  faq?: NewsFaqItem[];
  /** Quiz curto pra fixar o aprendizado, exibido ao fim da matéria. */
  quiz?: NewsQuizQuestion[];
};
