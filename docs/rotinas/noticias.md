# Rotina: notícias do dia com fonte (a cada 2 horas, das 06:20 às 22:20 de Brasília)

Leia `docs/rotinas/comum.md` primeiro. Meta: publicar TODAS as notícias do dia que tenham a ver com o tema do site, sem teto por rodada.
Se não houver notícia nova de verdade, termine em silêncio, sem commit e sem mensagem.

## O que buscar (escopo de leigo)
- WebSearch (3 a 6 buscas, em português) por notícias DO DIA (publicadas hoje, no fuso de Brasília; ontem só se ainda não foi coberta e for muito relevante) que interessem a quem
  cuida de idosos em casa: benefícios e regras (INSS, BPC, aposentadoria, Meu INSS), leis e programas
  (Estatuto da Pessoa Idosa, gratuidades, prioridade), golpes e fraudes contra idosos, regulação de
  planos de saúde e de casas de repouso (decisões da ANS e da Anvisa sobre serviços e produtos),
  recolhimento (recall) de produtos domésticos, lançamentos de tecnologia para idosos, serviços
  públicos para cuidadores.
- NÃO publique pesquisa médica, estudo clínico, novo tratamento, vacina ou remédio.
- Só fato verificável com `sourceUrl` real de veículo ou órgão oficial que você abriu (WebFetch) e
  conferiu. Nunca invente, nunca reescreva boato. Compare com `content/news` (títulos e `sourceUrl`):
  nunca a mesma notícia ou fonte duas vezes. Não há limite de notícias por rodada: publique cada fato novo, verificado e do dia que atenda ao tema,
  um arquivo por notícia. Faça 6 a 10 buscas variadas para cobrir os temas. Com 3 ou mais notícias na
  rodada, escreva-as em paralelo (um agente por notícia) e valide tudo num PR só. Qualidade antes de
  quantidade: sem fonte aberta e conferida, a notícia não entra.

## Escrever
- `npm run content:new -- noticia <slug>`. Campos: title (55 a 75 caracteres, factual), summary (140 a
  158), sourceName, sourceUrl (https), author "Equipe Saúde na Minha Vida", content, faq opcional.
- content: mínimo 900 palavras em HTML (p, h2, h3, ul, ol, li, a, strong, em, table, blockquote,
  div.callout-box) com pelo menos 3 h2: o fato em 2 parágrafos (fonte citada no texto com link
  `rel="noopener noreferrer nofollow"`), contexto, "O que muda para a sua família" (análise própria
  para o cuidador) e o que observar a seguir. 3 a 6 links internos para artigos ou notícias existentes.
  Sem opinião inventada como fato.

## Informe
Só quando publicar: 1 ou 2 frases dizendo o que entrou, com o link https://www.saudenaminhavida.com.br.
