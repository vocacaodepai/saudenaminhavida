# Rotina: 5 produtos por dia, categoria `indica` (06:30 de Brasília)

Leia `docs/rotinas/comum.md` primeiro. Reproduz a rotina de produtos do Portal da IA, ajustada ao que é
verificável neste ambiente (ver "Limites de verificação").

## Pré-requisito: tag de afiliado
A tag de afiliado Amazon do site fica no `CLAUDE.md`, linha "Tag de afiliado Amazon:". Se estiver
como `PENDENTE`, NÃO publique artigos com link de compra: termine em silêncio, sem commit.

## Limites de verificação (decisão do usuário em 2026-10-06)
- As páginas de produto da Amazon Brasil NÃO abrem no ambiente (WebFetch retorna erro). Portanto o site
  NÃO afirma preço, nota de compradores, número de avaliações, nem estoque. Preço: "Consulte na Amazon".
- A busca na web (WebSearch com `allowed_domains: ["amazon.com.br"]`) devolve URLs reais `/dp/<ASIN>`: use
  isso para confirmar que o ASIN existe e o nome do anúncio. Copie o ASIN exatamente da URL; nunca invente.
- Só escolha produtos de MARCAS CONHECIDAS com site oficial do fabricante (onde estão ficha técnica, manual,
  garantia e foto oficial). Marcas genéricas de marketplace sem site próprio ficam de fora.
- Toda característica citada (medidas, material, peso suportado, regulagens, garantia) vem da página do
  FABRICANTE aberta com WebFetch. O que não estiver lá não entra no texto.

## Pautas (5 por rodada)
- 3 comparativos (`kind: "guia"`): 2 ou 3 produtos reais da MESMA categoria, de marcas com site oficial, com
  tabela comparativa por ficha técnica e uma seção por produto. Varie a categoria a cada rodada.
- 2 reviews de produto único (`kind: "review"`): um produto só, real, de marca com site oficial, com o
  campo `review` completo (nota por critério, ver abaixo).
- Categorias de produto (escopo de leigo: conforto, segurança doméstica, organização, tecnologia):
  cadeira de banho, banco de chuveiro, barra de apoio, assento sanitário elevado, tapete antiderrapante,
  andador, bengala, organizador de comprimidos semanal, relógio despertador de letra grande, telefone
  fixo de teclas grandes, celular simples, caixa de som para TV, luminária com sensor, abridor de potes,
  talheres e copos adaptados, lupa, travesseiro e almofada, protetor de colchão impermeável, carrinho de
  apoio, sensor de presença para corredor. NÃO use: oxímetro, aparelho de pressão, termômetro,
  glicosímetro, suplemento ou qualquer item que meça ou trate condição de saúde.
- Não repita produto nem categoria de produto coberta recentemente (`grep -rl 'category: "indica"'
  content/articles/*.ts`). Os guias de compra "como escolher" já existentes não contam como comparativo
  de modelos: linke-os.

## Imagens (regra crítica)
- NUNCA gerador de imagem por IA para produto. Só foto oficial do fabricante (nunca capturada da página da
  Amazon), baixada do site do FABRICANTE para `public/images/products/<slug-do-produto>.<ext>`. Sem foto
  oficial utilizável, o produto não entra.
- Comparativo: card branco com sombra suave por produto e o nome do modelo escrito por você, sobre fundo com
  leve gradiente (técnica com `sharp`, como em `scripts/build-product-cover.mjs`).
- Review único com foto vertical: `node scripts/build-product-cover.mjs <entrada> <saida>`.
- Preencha `coverImage` (`url`, `width`, `height`, `credit`: "<Fabricante> (imagem oficial do produto)",
  `creditUrl`: página oficial do produto, sem `fit` ou `fit: "contain"`).

## Escrever
- `npm run content:new -- artigo <slug> indica`. Corpo de 1.200 a 1.800 palavras, 5 a 8 h2, 6 a 10 links
  internos, tom humano e direto. Descreva função, medida, material, segurança de uso e garantia; nunca
  prometa efeito terapêutico.
- Critérios da nota (0 a 10, média): segurança, facilidade de uso, construção (ficha técnica), garantia e
  suporte, transparência do fabricante. NÃO há critério de preço nem de avaliações de compradores.
- `review.price`: `"Consulte na Amazon"` (nunca um valor). `review.url`: link de afiliado. `affiliate: true`.
  `testedDays`: vazio (não houve teste físico).
- Link de afiliado: `https://www.amazon.com.br/dp/<ASIN real>?tag=<TAG do CLAUDE.md>` com
  `rel="sponsored noopener noreferrer"` e `target="_blank"`. Botão `buy-btn` abaixo da foto de cada produto
  no comparativo e pelo menos um no meio do review. O texto do botão não cita preço.
- Callout de transparência no topo: Associado da Amazon, comissão sem custo extra, o preço muda (confira na
  Amazon antes de comprar). Diga que a análise é feita a partir da ficha técnica oficial do fabricante, sem
  teste físico pessoal e sem avaliações de compradores.

## Se não houver produto viável na rodada
Termine em silêncio (sem commit) se nenhuma marca atender aos limites acima, e diga isso em uma frase.

## Informe final
Quais produtos entraram (comparativos e reviews), se check/lint/build passaram, e o link
https://www.saudenaminhavida.com.br
