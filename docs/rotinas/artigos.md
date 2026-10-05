# Rotina: 5 artigos por dia (06:00 de Brasília)

Leia `docs/rotinas/comum.md` primeiro.

## Pautas
- 5 artigos por rodada, `kind: "guia"`, uma categoria por artigo, alternando o conjunto por dia:
  dias ímpares = `rotina`, `tecnologia`, `atividades`, `direitos`, `cuidador`; dias pares = `tecnologia`,
  `rotina`, `cuidador`, `direitos`, `atividades`. Nunca `saude`, nunca `indica` (tem rotina própria).
- Intenção de busca real de quem cuida de uma pessoa idosa em casa no Brasil: "como fazer", "como
  escolher", "o que fazer", "quanto custa", "passo a passo". Use WebSearch para checar o que mudou
  (regras, valores, serviços) e cite a fonte oficial.
- Não repita tema: rejeite a pauta se 3 ou mais palavras do slug novo já aparecem juntas em um slug
  existente (`ls content/articles` e `grep -h "title:" content/articles/*.ts`).
- Ideias de pauta (varie): organizar a rotina da semana do idoso; iluminação e piso seguro; como
  contratar cuidador (CLT, diarista, empresa) sem cair em armadilha; como pedir BPC passo a passo
  pelo Meu INSS; WhatsApp: aprender a mandar áudio e fotos; videochamada com a família;
  golpes do falso parente, do falso banco, do falso INSS; atividades por interesse (música,
  jardinagem, culinária, fotos); como conversar com os irmãos sobre dividir tarefas e custos;
  planilha de gastos com o idoso; checklist para a primeira semana de um cuidador novo.

## Escrever
- `npm run content:new -- artigo <slug> <categoria>` cria o esqueleto (data de hoje, seed sequencial).
- Preencha todos os campos: title (50 a 65 caracteres, keyword no início), seoTitle (até 60),
  excerpt e metaDescription (140 a 158), imageQuery (3 a 4 palavras em inglês), keyPoints (3),
  sources (2 a 4 fontes oficiais abertas e conferidas), content, faq (4 a 6), readTime.
- Corpo: 1.000 a 1.600 palavras de texto real, abertura de 2 parágrafos (o primeiro responde a busca
  em 40 a 60 palavras), 5 a 8 h2, tabela ou checklist ou passo a passo, exemplo concreto do dia a dia,
  seção de erros comuns, fechamento com CTA. No máximo 3 callouts.
- Links: pelo menos 5 (ideal 6 a 10) links internos distintos para slugs que existem e 2 a 4 links
  externos https com `rel="noopener noreferrer"` para fontes primárias.
- Linke, quando fizer sentido, os guias de compra da categoria `indica` (sem link de afiliado no
  texto de guia informativo).

## Informe final
Quantos artigos entraram e em quais categorias, se check/lint/build passaram, e o link
https://www.saudenaminhavida.com.br
