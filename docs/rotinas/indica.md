# Rotina: 5 produtos por dia, categoria `indica` (06:30 de Brasília)

Leia `docs/rotinas/comum.md` primeiro. Reproduz a rotina de produtos do Portal da IA.

## Pré-requisito: tag de afiliado
A tag de afiliado Amazon do site fica no `CLAUDE.md`, linha "Tag de afiliado Amazon:". Se estiver
como `PENDENTE`, NÃO publique artigos com link de compra: termine em silêncio, sem commit.

## Pautas (5 por rodada)
- 3 comparativos (`kind: "guia"`): 2 ou 3 produtos reais da MESMA categoria, vendidos de verdade na
  Amazon Brasil, com tabela e nota por critério. Varie a categoria a cada rodada.
- 2 reviews de produto único (`kind: "review"`): um produto só, real, com o campo `review` completo.
- Categorias de produto (escopo de leigo: conforto, segurança doméstica, organização, tecnologia):
  cadeira de banho, banco de chuveiro, barra de apoio, assento sanitário elevado, tapete antiderrapante,
  andador, bengala, organizador de comprimidos semanal, relógio despertador de letra grande, telefone
  fixo de teclas grandes, celular simples, caixa de som para TV, luminária com sensor, abridor de potes,
  talheres e copos adaptados, lupa, travesseiro e almofada, protetor de colchão impermeável, carrinho de
  apoio, sensor de presença para corredor. NÃO use: oxímetro, aparelho de pressão, termômetro,
  glicosímetro, suplemento ou qualquer item que meça ou trate condição de saúde.
- WebSearch para achar produtos reais bem avaliados na Amazon Brasil (muitas avaliações, nota alta).
  Nunca invente produto, preço ou especificação. Abra a página oficial do fabricante (WebFetch) para
  confirmar o nome exato do modelo, a ficha técnica e a foto oficial.

## Imagens (regra crítica)
- NUNCA gerador de imagem por IA para produto. Só foto oficial do fabricante (nunca capturada da
  página da Amazon), salva em `public/images/products/<slug-do-produto>.<ext>`.
- Comparativo: card branco com sombra suave por produto e o nome do modelo escrito por você, sobre
  fundo com leve gradiente (técnica com `sharp`, como em `scripts/build-product-cover.mjs`).
- Review único com foto vertical: `node scripts/build-product-cover.mjs <entrada> <saida>`.
- Preencha `coverImage` (`url`, `width`, `height`, `credit`: "<Fabricante> (imagem oficial do produto)",
  `creditUrl`: página oficial do produto, sem `fit` ou `fit: "contain"`).

## Escrever
- `npm run content:new -- artigo <slug> indica`. Corpo de 1.200 a 1.800 palavras, 5 a 8 h2, 6 a 10 links
  internos, tom humano e direto. Descreva função, medida, material, segurança de uso e preço; nunca
  prometa efeito terapêutico.
- Link de afiliado: `https://www.amazon.com.br/dp/<ASIN real>?tag=<TAG do CLAUDE.md>` com
  `rel="sponsored noopener noreferrer"` e `target="_blank"`; review: `review.url` no mesmo formato e
  `affiliate: true`. Botão `buy-btn` abaixo da foto de cada produto no comparativo e pelo menos um no
  meio do review. Confirme que o ASIN existe na Amazon Brasil antes de publicar. Preço só com
  "verificado em dd/mm/aaaa".
- Callout de transparência no topo: Associado da Amazon, comissão sem custo extra, preço muda, confira
  antes de comprar. Nunca alegue teste físico pessoal: é análise de ficha técnica oficial e avaliações
  reais de compradores.

## Informe final
Quais 5 produtos entraram (3 comparativos + 2 reviews), se check/lint/build passaram, e o link
https://www.saudenaminhavida.com.br
