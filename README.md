# Saúde na Minha Vida

Blog brasileiro para filhos e cuidadores de pessoas idosas (www.saudenaminhavida.com.br).
Foco: guias de compra de produtos para cuidar em casa (afiliado), casa e rotina, tecnologia e
atividades para idosos, direitos e burocracia, dia a dia do cuidador e guias de saúde de apoio
com fontes oficiais. Estrutura técnica replicada do Portal da AI, preparada para o Google
AdSense.

## Stack

- Next.js 16 (App Router, TypeScript estrito, React 19)
- Tailwind CSS 4 com tokens de design em `app/globals.css` (tema claro/escuro automático)
- Conteúdo em arquivos TypeScript (`content/`), sem banco de dados
- Capas via Pexels (principal) e Pixabay (segunda opção), com fallback ilustrado
- Hospedagem e deploy na Vercel; Vercel Web Analytics (sem cookies)

## Rodando localmente

```bash
npm install
cp .env.example .env.local   # preencha as chaves que tiver
npm run check:content        # gera os índices e valida o conteúdo
npm run dev
```

Acesse `http://localhost:3000`.

## Scripts

| Script | O que faz |
| --- | --- |
| `npm run dev` | Servidor de desenvolvimento |
| `npm run content:index` | Regenera `content/articles/index.ts` e `content/news/index.ts` |
| `npm run check:content` | Regenera os índices e valida todos os artigos e notícias (roda antes de todo build) |
| `npm run content:new -- artigo <slug> <categoria>` | Cria o esqueleto de um artigo com data de hoje (America/Sao_Paulo) e seed sequencial |
| `npm run content:new -- noticia <slug>` | Cria o esqueleto de uma notícia |
| `npm run lint` | ESLint + `check:content` |
| `npm run build` | Build de produção (Vercel). Roda `check:content` antes |
| `npm run build:gh-pages` | Build estático para o GitHub Pages (só preview manual) |

## Estrutura de conteúdo

Um arquivo por item, índice gerado. Nunca edite os `index.ts` à mão.

```
content/
  articles/
    <slug>.ts        # export const article: Article = { ... }
    index.ts         # gerado por scripts/build-content-index.mjs
  news/
    <slug>.ts        # export const item: NewsItem = { ... }
    index.ts         # gerado
lib/
  types.ts           # Article, NewsItem, ReviewData, categorias
  articles.ts        # site, categorias e consultas (sortedArticles, getReviews...)
  news.ts            # consultas de notícias
  author.ts          # dados da redação e do revisor profissional
  seo.ts             # safeJsonLd, absoluteUrl, metaDescription, formatDate...
  html.ts            # prepara o HTML do artigo (ids nos h2, tabelas, quebras de anúncio)
```

Para publicar um artigo:

1. `npm run content:new -- artigo meu-slug ferramentas`
2. Preencha `title`, `excerpt`, `content` (HTML), `keyPoints`, `sources`, `faq`
   e, para reviews, `kind: "review"` e o bloco `review` (nota de 0 a 10 por critério).
3. `npm run check:content`. O script bloqueia: tags não permitidas, atributos
   `on*`/`style`, `<script>`, data futura, slug diferente do nome do arquivo e,
   para artigos novos, menos de 900 palavras, menos de 10 links internos ou
   ausência de keyPoints/FAQ.
4. Commit e push na branch de produção. A Vercel faz o deploy.

Categorias válidas: `iniciantes`, `monetizacao`, `negocios`, `ferramentas`,
`carreira`, `futuro`. O padrão editorial completo está publicado em
`/politica-editorial`.

Notícias nunca são apagadas: URL indexada é URL que continua no ar.

## Rotas

- `/` home, `/artigos` (12 por página, `/artigos/pagina/n`), `/noticias`
  (30 por página, agrupadas por dia), `/reviews`, `/categoria/<slug>`
  (paginada), `/artigos/<slug>`, `/noticias/<slug>`, `/autor/bruno-danello`,
  `/busca` (noindex, índice em `/search-index.json`)
- Institucionais: `/sobre`, `/contato`, `/politica-editorial`,
  `/publicidade-e-afiliados`, `/politica-de-privacidade`, `/termos-de-uso`
  (todas em `components/InstitutionalPage.tsx`, sem anúncio)
- Gerados: `/sitemap.xml` (com imagens OG dos artigos), `/robots.txt`,
  `/manifest.webmanifest`, `/feed.xml` (RSS), `/opengraph-image` e a OG de
  cada artigo

Toda página define `title`, `description` (até 158 caracteres), canonical
próprio e Open Graph. JSON-LD sempre via `safeJsonLd` (`lib/seo.ts`).

## Variáveis de ambiente

Copie `.env.example` para `.env.local`. Na Vercel, cadastre em
Settings > Environment Variables (Production).

| Variável | Uso |
| --- | --- |
| `PEXELS_API_KEY` | Fotos de capa (tentado primeiro) |
| `PIXABAY_API_KEY` | Fotos de capa (segunda opção) |
| `NEXT_PUBLIC_ADSENSE_CLIENT` | ID do publisher AdSense (`ca-pub-XXXXXXXXXXXXXXXX`). Vazio = site sem anúncios e sem aviso de cookies |
| `NEXT_PUBLIC_ADSENSE_SLOT_LEADERBOARD` | ID da unidade horizontal (home e fim de artigo) |
| `NEXT_PUBLIC_ADSENSE_SLOT_RECTANGLE` | ID da unidade da sidebar |
| `NEXT_PUBLIC_ADSENSE_SLOT_IN_ARTICLE` | ID da unidade dentro do texto |
| `NEXT_PUBLIC_ADSENSE_SLOT_ANCHOR` | ID da unidade ancorada (mobile) |
| `CSP_REPORT_ONLY` | `true` troca a Content-Security-Policy para modo de relatório (útil na primeira semana com anúncios) |

Sem nenhuma chave de imagem, o site usa capas ilustradas geradas localmente.
Sem `NEXT_PUBLIC_ADSENSE_CLIENT`, nenhum bloco de anúncio é renderizado
(nada de caixa vazia "Publicidade").

## Ativando o Google AdSense, passo a passo

Faça na ordem. O site já tem tudo o que a revisão procura (páginas
institucionais, política de privacidade com LGPD e cookies, aviso de
consentimento, robots, sitemap, canonical por página); o que falta é o ID.

1. **Antes de pedir a revisão**: confirme no Search Console que
   `https://www.portaldaai.com.br/sitemap.xml` foi enviado e que a maioria das
   URLs está indexada. Confirme que `contato@portaldaai.com.br` recebe e-mail.
2. **Crie a conta** no AdSense com o domínio `portaldaai.com.br` (o AdSense
   normaliza o `www`). Anote o ID do publisher, formato `ca-pub-XXXXXXXXXXXXXXXX`.
3. **Cadastre `NEXT_PUBLIC_ADSENSE_CLIENT`** na Vercel (Production) com esse ID
   e faça um redeploy. Com isso o site passa a: emitir a meta
   `google-adsense-account` em todas as páginas, mostrar o aviso de cookies
   (LGPD) e carregar o script `adsbygoogle.js` só depois da escolha do
   visitante (quem recusa recebe anúncios não personalizados).
4. **Crie `public/ads.txt`** com exatamente uma linha e quebra de linha final,
   trocando os X pelo seu ID sem o prefixo `ca-`:

   ```
   google.com, pub-XXXXXXXXXXXXXXXX, DIRECT, f08c47fec0942fa0
   ```

   Faça o deploy e abra `https://www.portaldaai.com.br/ads.txt` no navegador:
   tem que responder como texto puro (o `next.config.ts` já força o
   Content-Type). O arquivo não existe no repositório de propósito: ele é
   criado quando o ID existir.
5. **Peça a verificação** no painel do AdSense. Ele reconhece a meta tag ou o
   `ads.txt`. Aguarde a revisão (dias a semanas).
6. **Depois da aprovação**, no painel: em "Privacidade e mensagens", ative a
   mensagem de consentimento (GDPR para EEA/Reino Unido/Suíça e "outras
   regulamentações" para o Brasil). Em "Anúncios > Por unidade", crie as
   unidades (display horizontal, retângulo, in-article e âncora) e cadastre
   os IDs numéricos nas variáveis `NEXT_PUBLIC_ADSENSE_SLOT_*`. Cada formato só
   aparece quando o seu ID existir.
7. **Primeira semana com anúncios**: defina `CSP_REPORT_ONLY=true` na Vercel e
   acompanhe o console do navegador; se algum domínio do Google for bloqueado,
   adicione à lista `googleAds` em `next.config.ts`. Depois remova a variável
   para a CSP voltar ao modo bloqueante.
8. Acompanhe o "Centro de políticas" do AdSense semanalmente.

Regras que o código já aplica e que não devem ser quebradas: nenhum anúncio
acima do h1, nenhum em `/contato`, `/busca`, 404 e institucionais, nenhum
in-article em notícias curtas, sidebar de anúncio não sticky.

## Deploy

O deploy de produção é feito pela Vercel (projeto `portaldaai`, time
`portal-da-ai`), automático a cada push na branch de produção
(`claude/portal-ai-blog-iujjht`). Domínio principal `www.portaldaai.com.br`;
`portaldaai.com.br` redireciona para ele. `site.url` em `lib/articles.ts` usa
o `www`, e dele derivam canonical, sitemap, robots, OG e JSON-LD.

`next.config.ts` aplica cabeçalhos de segurança (CSP compatível com AdSense,
HSTS, nosniff, Referrer-Policy, Permissions-Policy) no deploy da Vercel.

O workflow `.github/workflows/deploy-gh-pages.yml` (GitHub Pages) é só um
preview auxiliar, disparado manualmente (`workflow_dispatch`), com export
estático e `basePath`. Não é o deploy de referência e não deve ser
automatizado.

## Rotinas automáticas

Rotinas agendadas (Claude Code) rodam em outro checkout do repositório e:

- criam artigos diários em `content/articles/<slug>.ts` e notícias em
  `content/news/<slug>.ts` com `npm run content:new`;
- rodam `npm run check:content` antes de qualquer commit (data futura, tags
  proibidas, padrão mínimo de artigo novo);
- abrem PR ou fazem push na branch de produção, o que dispara o deploy.

Toda rotina segue o padrão publicado em `/politica-editorial`: rascunho com
apoio de IA, verificação automática, revisão e assinatura do editor. Datas
sempre em `America/Sao_Paulo`.

## Validação antes de commitar

```bash
npx tsc --noEmit
npx eslint .
npm run check:content
```
