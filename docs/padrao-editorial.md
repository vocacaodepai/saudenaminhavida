# Padrão editorial do Saúde na Minha Vida

Vale para todo artigo em `content/articles/<slug>.ts`. O script `npm run check:content`
confere a parte mecânica; o resto é responsabilidade de quem escreve.

## 1. Voz e propósito

- O blog ajuda **filhos, netos e cuidadores de pessoas idosas** (60+) a cuidar da saúde de
  quem amam: urgências e quedas, Alzheimer e demência, alimentação, rotina e casa, direitos
  e decisões, e o cuidado com o próprio cuidador. Nunca vira blog genérico de saúde.
- Tom: acolhedor e direto, de alguém que já passou por isso. Frases curtas, português do
  Brasil natural, zero jargão sem explicação. Sem julgamento: o cuidador já se sente
  culpado. O artigo tira peso, não coloca.
- Concreto sempre: o que fazer agora, em passos numerados; valores em R$ quando houver,
  prazos, números de telefone oficiais (SAMU 192, Disque 100, Ligue 180 quando couber).
- **Informa e orienta, nunca diagnostica nem receita.** Proibido: dose de medicamento,
  promessa de cura, "tratamento natural" para doença, substituir consulta.
- Honestidade:
  - Nenhuma estatística ou afirmação clínica sem fonte oficial no texto.
  - Fontes aceitas: Ministério da Saúde, OMS/OPAS, Sociedade Brasileira de Geriatria e
    Gerontologia (SBGG), Associação Brasileira de Alzheimer (Abraz), Sociedade Brasileira de
    Pediatria não se aplica aqui, SBD, SBC, Anvisa, INSS, gov.br, Estatuto da Pessoa Idosa
    (Lei 10.741/2003), publicações científicas indexadas.
  - Nenhuma alegação de teste pessoal que não aconteceu. Análises são análises.
  - Nenhuma URL inventada. Todo link externo é aberto e conferido antes de entrar.
  - Valores e regras de benefícios (BPC, aposentadoria) mudam: sempre "consulte o gov.br
    ou o INSS (135)" e data de verificação.

## 2. Segurança primeiro (YMYL)

- Todo artigo de urgência, sintoma ou medicação começa com um **callout-warn** dizendo
  quando ligar para o SAMU (192) ou ir ao pronto-socorro, antes de qualquer outra coisa.
- Todo artigo clínico traz um parágrafo "Quando procurar o médico".
- Revisão por profissional de saúde: quando houver revisor real, preencha `reviewedBy`
  (ou `author.reviewer` em `lib/author.ts`) com nome e registro. **Nunca invente revisor.**
  Sem revisor real, o selo simplesmente não aparece.

## 3. Proibições de estilo (o leitor percebe texto de máquina de longe)

- Travessão (—) nunca. Use dois-pontos, vírgula, parênteses ou ponto.
- Aberturas e fechos de assistente: "Claro!", "Em resumo", "É importante ressaltar",
  "Vale destacar", "Dito isso", "Espero ter ajudado".
- Estrutura "não é apenas X, é Y". Adjetivos vazios: incrível, essencial, fundamental.
- Frases-fórmula de link ("como já discutimos em"). Link entra natural na frase.
- Parágrafos com mais de 4 frases. Seções de um parágrafo só.
- Tratar o idoso como criança ("vovozinho"). Use "pessoa idosa", "idoso", "seu pai".

## 4. Estrutura do arquivo

```ts
import type { Article } from "@/lib/types";

export const article: Article = {
  slug: "keyword-principal-3-a-7-palavras",
  title: "Título com a keyword no início (50 a 65 caracteres)",
  seoTitle: "Versão curta para o Google (até 60 caracteres)",
  excerpt: "Resumo com a keyword e um verbo de ação (140 a 158 caracteres).",
  metaDescription: "Pode ser igual ao excerpt (140 a 158 caracteres).",
  category: "saude", // indica | rotina | tecnologia | atividades | direitos | cuidador | saude
  date: "AAAA-MM-DD", // hoje em America/Sao_Paulo, nunca futura
  readTime: 7,
  imageQuery: "elderly woman hands caregiver", // 3 a 4 palavras concretas em inglês (Pexels/Pixabay)
  seed: 1, // inteiro sequencial, maior que todos os existentes
  kind: "guia", // ou "review" (aí o campo review é obrigatório; só categoria indica)
  author: "Equipe Saúde na Minha Vida",
  keyPoints: ["Frase 1", "Frase 2", "Frase 3"],
  sources: [{ label: "Nome da fonte", url: "https://..." }],
  content: `...HTML...`,
  faq: [{ question: "Pergunta como a pessoa digita no Google?", answer: "40 a 80 palavras." }],
};
```

- `content` é um template literal: nada de crase nem `${}` dentro.
- Tags permitidas: p, h2, h3, h4, ul, ol, li, a, strong, em, br, hr, blockquote, table,
  thead, tbody, tr, th, td, div, span, img, figure, figcaption, small, mark, dl, dt, dd.
  Nada de `style=`, `<script>`, `<iframe>`, `<svg>`, handlers `on*=`.
- Caixas: `<div class="callout-box callout-warn"><span class="callout-label">Atenção</span><p>...</p></div>`
  com `callout-ok`, `callout-warn`, `callout-bad`, `callout-tip`. Máximo 3 por artigo.
- Checklist: `<ul class="checklist"><li>...</li></ul>`.

## 5. Estrutura do corpo

1. Abertura de 2 parágrafos, sem título. O primeiro (40 a 60 palavras) responde direto a
   intenção de busca e contém a keyword exata.
2. Em artigo de urgência/sintoma: callout-warn com sinais de alarme logo depois da abertura.
3. 5 a 8 seções `<h2>` com 150 a 250 palavras. O primeiro h2 é uma pergunta ou "O que é X".
4. Pelo menos um destes: passo a passo numerado, checklist ou tabela comparativa.
5. Um exemplo concreto (cena do dia a dia: "sua mãe levanta à noite e...").
6. Seção "Erros comuns" ou "O que não fazer".
7. Seção "Quando procurar o médico" (ou "Quando ligar para o SAMU").
8. Fechamento: um parágrafo acolhedor com CTA para a categoria ou um artigo relacionado.

Tamanho: 1.000 a 1.600 palavras de texto real (sem contar tags). O script exige mínimo 900.

## 6. Links

- Pelo menos 5 links internos distintos (`/artigos/<slug>`), só para slugs que existem
  (`ls content/articles`). Espalhados pelo corpo. Texto-âncora natural.
- 2 a 4 links externos para fontes primárias, sempre `https`, com
  `rel="noopener noreferrer"`. Link de afiliado leva `rel="sponsored noopener noreferrer"`
  e aviso visível. `sources` lista as mesmas fontes externas do corpo (2 a 5).

## 7. SEO on-page

- 1 keyword principal + 2 ou 3 secundárias definidas antes de escrever. Keyword no título,
  no slug, no primeiro parágrafo, em pelo menos um h2 e no excerpt.
- Títulos como a pessoa busca: "Idoso caiu: o que fazer e quando ir ao hospital".
- `faq`: 4 a 6 perguntas no formato de busca real, respostas de 40 a 80 palavras.
- `keyPoints`: 3 frases completas (aparecem no topo, "Em 3 pontos").

## 8. Produtos (categoria `indica`, `kind: "review"`)

- Só produtos reais vendidos na Amazon Brasil, com link de afiliado e aviso. Critérios
  públicos: segurança, facilidade, durabilidade, preço, avaliações reais. Nota de 0 a 10.
- Nunca gerar imagem de produto por IA; usar foto oficial do fabricante e
  `scripts/build-product-cover.mjs`.
- Botão de compra: `<div class="buy-btn"><a href="https://www.amazon.com.br/dp/<ASIN>?tag=SEU-TAG" rel="sponsored noopener noreferrer" target="_blank">Comprar ... agora ↗</a></div>`.

## 9. Antes de publicar

1. `npm run check:content` sem nenhum ERRO.
2. Reler como cuidador cansado às 2 da manhã: responde o que fazer agora? Está claro quando
   chamar ajuda? Alguém seguiria esse passo a passo sem se machucar?
3. Sem travessão, sem frases-fórmula, sem afirmação clínica sem fonte, sem dose de remédio.
