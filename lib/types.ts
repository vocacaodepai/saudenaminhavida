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
    slug: "indica",
    label: "Melhores Produtos",
    description:
      "Guias de compra e comparativos de produtos que facilitam o cuidado em casa: cadeira de banho, barra de apoio, andador, organizador de remédio, sensor de queda e mais.",
  },
  {
    slug: "rotina",
    label: "Casa e Rotina",
    description:
      "Como adaptar a casa, organizar remédios, banho, sono e mobilidade com segurança, de um jeito simples e barato.",
  },
  {
    slug: "tecnologia",
    label: "Tecnologia para Idosos",
    description:
      "Celular, WhatsApp, videochamada e como não cair em golpes: tutoriais pacientes e guias de compra para quem ensina e para quem aprende.",
  },
  {
    slug: "atividades",
    label: "Atividades e Lazer",
    description:
      "Jogos, música, artesanato e conversa: ideias práticas para ocupar o dia da pessoa idosa com prazer e convivência.",
  },
  {
    slug: "direitos",
    label: "Direitos e Burocracia",
    description:
      "Cuidador, clínica ou casa de repouso, BPC, aposentadoria, plano de saúde 60+ e como dividir o cuidado na família.",
  },
  {
    slug: "cuidador",
    label: "Dia a Dia do Cuidador",
    description:
      "Cansaço, culpa, organização e limites: como pedir ajuda e cuidar do seu pai ou da sua mãe sem abandonar a sua própria vida.",
  },
  {
    slug: "saude",
    label: "Saúde e Urgências",
    description:
      "Guias de apoio sobre quedas, engasgo, confusão, Alzheimer e alimentação, baseados em fontes oficiais. Informam e orientam, não substituem o médico.",
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
  coverImage?: {
    url: string;
    width: number;
    height: number;
    credit: string;
    creditUrl: string;
    /** "contain" (padrão) para foto de produto sem cortar; "cover" para foto editorial que preenche o quadro. */
    fit?: "cover" | "contain";
  };
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
  /**
   * Fora do índice do Google (noindex) e do sitemap/RSS. Usado em guias clínicos de apoio
   * (saúde e urgências) enquanto o site não tem revisão profissional.
   */
  noindex?: boolean;
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
