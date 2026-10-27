# Rotina: produtos da Shopee, 2 rodadas por dia (11:37 e 15:37 de Brasília), 10 por rodada = 20 por dia (10 comparativos + 10 reviews), categoria `indica`

Pedido do dono em 27/10: a mesma quantidade de artigos de produto que a Amazon, agora também com produtos da
Shopee, em ADIÇÃO à rotina da Amazon (`docs/rotinas/indica.md`). Leia `docs/rotinas/comum.md` e `docs/rotinas/indica.md`
primeiro: todas as regras de escopo, ficha técnica oficial, foto oficial, nota por critério, sem teste pessoal e
sem efeito terapêutico valem igual. Aqui ficam só as diferenças da Shopee.

## Credenciais (NUNCA no repositório)
- A API de Afiliados da Shopee usa `SHOPEE_APP_ID` e `SHOPEE_SECRET`, lidos só do ambiente. Os valores ficam em um
  arquivo privado fora do repositório (na sessão do dono: `shopee.env` no diretório scratchpad). Nunca grave,
  imprima, comite nem cole o segredo em arquivo do repo, PR, commit, comentário ou relatório. Sem as variáveis, termine em silêncio.
- Consulta: `SHOPEE_APP_ID=... SHOPEE_SECRET=... node scripts/shopee-offers.mjs "<palavra-chave>" --mall --limit 20 --min-sales 20`
  (ver cabeçalho do script). Devolve nome, loja, `shopType`, preço, nota (`ratingStar`), vendas e `offerLink`.

## Escolha do produto (mais rígida que a Amazon)
- Só loja Shopee Mall (`shopType` contém `1`, a loja oficial da marca ou revendedor oficial). Loja comum, de
  revendedor sem selo, pirata ou "importado" fica de fora.
- Só MARCA CONHECIDA com site oficial do fabricante (ficha técnica, manual, garantia e foto oficial), como na Amazon.
- O anúncio da Shopee precisa ter o MESMO modelo da ficha oficial (nome e código no título). Divergiu, descarte.
- Pelo menos 20 vendas e nota de 4,0 ou mais no anúncio, para o preço e a nota serem representativos.
- Não repita produto já coberto (Amazon ou Shopee). Um produto só pode ter artigo da Shopee se ainda não tiver artigo.
- Na 2ª rodada do dia, não repita marca nem categoria de produto da 1ª rodada da Shopee nem das rodadas da Amazon do mesmo dia.

## Preço e nota (vêm da própria Shopee, via API)
- `review.price`: `"R$ X (preço anunciado na Shopee em dd/mm/aaaa)"`, ou `"R$ X a R$ Y (...)"` quando o anúncio tem
  `priceMin` e `priceMax` diferentes. Sempre com a data da consulta (hoje) e o aviso de que o preço muda.
- Nota de compradores: `ratingStar` e `sales` do anúncio ("nota X de 5 na Shopee, mais de N vendas"). Cite que
  vem da Shopee e que é de um anúncio só. Nunca invente.
- No comparativo: colunas "Preço na Shopee" e "Nota na Shopee" e seção h2 "Variação de preço".

## Link de afiliado
- Use o `offerLink` devolvido pela API (`https://s.shopee.com.br/...`), sem alterar. Botão:
  `<div class="buy-btn"><a href="<offerLink>" rel="sponsored noopener noreferrer" target="_blank">Comprar <Modelo> na Shopee agora ↗</a></div>`.
- `review.url` = o mesmo `offerLink`, `affiliate: true`. Botão abaixo da foto de cada produto no comparativo e pelo
  menos um no meio do review.
- Callout de transparência no topo: link de afiliado da Shopee, comissão sem custo extra, preço e nota vêm da
  Shopee e mudam, análise pela ficha oficial do fabricante, sem teste físico pessoal.

## Pautas, imagens, escrita e informe
Iguais a `docs/rotinas/indica.md` (5 comparativos de 2 a 3 produtos da mesma marca e categoria + 5 reviews, fotos
oficiais do fabricante, nunca a imagem da Shopee nem gerada por IA, corpo de 1.200 a 1.800 palavras). Sem produto
viável na rodada, termine em silêncio. Informe final: quais produtos entraram, se check/lint/build passaram e
https://www.saudenaminhavida.com.br
