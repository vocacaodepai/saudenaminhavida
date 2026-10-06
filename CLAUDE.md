## Categorização editorial

Categorias (`lib/types.ts`): `indica` (Melhores Produtos), `rotina`, `tecnologia`, `atividades`,
`direitos`, `cuidador` e `saude`.

O foco do blog é PRODUTOS e rotina em casa (monetização por afiliado), tecnologia e atividades
para idosos. Os guias de `saude` (urgências, Alzheimer, alimentação) são vitrine de confiança,
com fontes oficiais e aviso médico; só publique novos se houver fonte oficial clara.

- **Melhores Produtos** (`category: "indica"`): guia de compra ("como escolher") ou análise de produto que facilita o cuidado em casa
  (barra de apoio, cadeira de banho, organizador de remédio, sensor de queda), sempre com
  link de afiliado Amazon, `kind: "review"` e nota por critério.
- As demais são guias informativos, sem link de compra.

O padrão editorial completo está em `docs/padrao-editorial.md`. Leia antes de escrever.

## Regras de segurança do conteúdo (saúde é YMYL)

- O site informa e orienta. Nunca diagnostica, nunca indica dose de medicamento, nunca
  promete cura e nunca substitui consulta.
- Artigo de urgência ou sintoma começa com aviso de quando ligar para o SAMU (192).
- Toda afirmação clínica tem fonte oficial (Ministério da Saúde, OMS/OPAS, SBGG, Abraz,
  Anvisa, gov.br). Todo link externo é aberto e conferido antes de entrar.
- Nunca invente revisor médico. `author.reviewer` em `lib/author.ts` fica vazio até existir
  um profissional real (nome + registro); com ele vazio, o selo de revisão não aparece.

## Imagens de capa: a que melhor se encaixa

Regra permanente do usuário: use a foto que MELHOR se encaixa no artigo, de qualquer fonte. Procure
primeiro no Wikimedia Commons (`node scripts/wikimedia-image.mjs`), mas escolha a melhor entre as fontes
(Commons, Unsplash, Pexels/Pixabay). Só licenças livres e sempre com crédito (autor, licença e link).
Detalhes em `docs/rotinas/comum.md`.

## Imagens de produto (categoria Indica)

Nunca usar gerador de imagem por IA para capa ou foto de produto: a IA erra marca e logo.
Use foto oficial do fabricante em `public/images/products/`, referenciada por `coverImage`,
e `node scripts/build-product-cover.mjs <entrada> <saida>` para fotos verticais.

## Botão de compra (categoria Indica)

```html
<div class="buy-btn">
  <a href="https://www.amazon.com.br/dp/<ASIN>?tag=saudenaminhavida-20" rel="sponsored noopener noreferrer" target="_blank">Comprar <Produto> agora ↗</a>
</div>
```

A tag de afiliado do site é `saudenaminhavida-20` (ver a seção "Tag de afiliado Amazon").

## Tag de afiliado Amazon

Tag de afiliado Amazon: saudenaminhavida-20

(Se um dia esta linha voltar a dizer PENDENTE, nenhuma rotina publica link de compra.)

## Escopo: só tema de leigo

O site não tem médico por trás e não finge ter. Só publicamos temas que um leigo pode fazer com
curadoria, experiência e fonte oficial (produtos, casa e rotina, tecnologia, atividades, direitos
e burocracia, dia a dia do cuidador). Nada de sintoma, doença, tratamento, remédio, dose, primeiros
socorros ou promessa terapêutica. Os 9 guias da categoria `saude` ficam com `noindex: true` e não
crescem. Detalhes em `docs/padrao-editorial.md` (seção 0).

## Rotina editorial diária (mesma estratégia do Portal da IA)

Três rotinas automáticas, cada uma com roteiro em `docs/rotinas/` (leia `comum.md` antes):

- **5 artigos por dia** (`docs/rotinas/artigos.md`, 06:00 Brasília): guias informativos das categorias
  `rotina`, `tecnologia`, `atividades`, `direitos` e `cuidador`. Sem link de afiliado.
- **5 produtos por dia** (`docs/rotinas/indica.md`, 06:30 Brasília): sempre `category: "indica"`, 3
  comparativos + 2 reviews de produto real (ASIN conferido por busca na Amazon Brasil), SÓ de marcas
  conhecidas com site oficial (ficha técnica e foto oficial do fabricante), link de afiliado (tag
  `saudenaminhavida-20`). A página da Amazon não abre no ambiente: o site não afirma preço nem nota de
  compradores ("Consulte na Amazon"). Sem produto viável, a rodada termina em silêncio.
- **Notícias com fonte** (`docs/rotinas/noticias.md`, a cada 3 horas, no máximo 1 por rodada): fatos
  verificáveis sobre benefícios, golpes, regulação e produtos, com `sourceUrl` conferida.

Todas validam (`check:content`, `lint`, `build`), abrem PR para a branch de produção e mesclam por
squash sozinhas (autorizado pelo usuário, como no Portal da IA).

## Deploy

Vercel (a configurar). Domínio previsto: `www.saudenaminhavida.com.br`. O workflow do GitHub
Pages é só preview auxiliar.

@AGENTS.md
