# Regras comuns das rotinas automáticas (leia antes de qualquer rotina)

Repositório: `vocacaodepai/saudenaminhavida`. Branch de produção: `claude/saude-na-minha-vida-blog`
(deploy na Vercel quando configurada). Sem perguntar nada ao usuário, siga sozinho até o fim.

- **Ambiente isolado:** faça todo o trabalho num clone próprio em `/tmp/<rotina>-$(date +%s)` (clone
  da URL do GitHub) para não colidir com outras rotinas em paralelo, e remova o clone ao final.
- **Leia primeiro:** `CLAUDE.md`, `docs/padrao-editorial.md` (inclui a seção 0, o ESCOPO DE LEIGO),
  `lib/types.ts` e 2 arquivos recentes como modelo de formato.
- **Escopo de leigo (inegociável):** nada de sintoma, doença, diagnóstico, tratamento, remédio,
  dose, primeiros socorros ou promessa terapêutica. Nenhuma rotina escreve na categoria `saude`.
- **Honestidade:** nenhuma alegação de teste pessoal que não aconteceu; nenhum preço sem "verificado em
  dd/mm/aaaa"; nenhuma URL ou ASIN inventado; toda URL externa aberta e conferida com WebFetch.
- **Estilo:** sem travessão (—), sem "Em resumo", sem "É importante ressaltar", sem crase nem `${}`
  no content, atributos HTML sempre entre aspas duplas, sem mencionar IA, modelo ou "gerado por".
- **Validar:** `npm ci --silent`, `npm run check:content` (zero ERRO), `npm run lint`, `npm run build`.
  Corrija sozinho até passar.
- **Segurança do diff:** `git diff --stat` só com arquivos de `content/`, `public/images/` e os índices
  gerados. Nenhum segredo (chaves de API, tags privadas) em texto. `.env.local` fora do git.
- **Publicar (autorizado pelo usuário para estas rotinas, como no Portal da IA):** commit em português
  (sem citar modelo ou IA, com a atribuição padrão no rodapé), push da branch da rodada, PR para a
  branch de produção, aguardar os checks de status se existirem (Vercel, quando configurada; se não
  houver nenhum check, o critério é check:content + lint + build locais verdes) e mesclar por squash
  sozinho. Só finalize depois de `merged: true`, ou se não houver pauta viável.
- **Capas dos artigos: regra permanente do usuário = a foto que MELHOR se encaixa no artigo, de qualquer fonte.**
  Procure primeiro no Wikimedia Commons, mas não se prenda a ele: se a melhor foto estiver no Unsplash,
  Pexels ou Pixabay, use essa. O critério é o encaixe com o tema do artigo, não a fonte.
  - **Commons:** `node scripts/wikimedia-image.mjs "<busca em inglês>"` lista candidatos de licença livre
    (CC0, domínio público, CC BY, CC BY-SA; nunca NC, ND ou fair use). Para usar um:
    `node scripts/wikimedia-image.mjs "<busca>" --pick N --slug <slug-do-artigo>` baixa para
    `public/images/capas/<slug>.jpg` (1600 px) e imprime o bloco `coverImage` com autor, licença e link da
    página do arquivo. O script já espera o `Retry-After`; não faça rajadas.
  - **Unsplash:** `mcp__Unsplash__search_photos` (baixar para `public/images/capas/<slug>.jpg`, crédito
    "Nome / Unsplash" com `creditUrl` com utm). **Pexels/Pixabay:** só por chave de API, se existir.
  - Compare os candidatos das fontes que buscou e escolha o melhor. Sem foto boa em nenhuma, omita `coverImage`.
  - Critérios em qualquer fonte: pessoa idosa com dignidade, sem marca visível, sem texto na imagem, sem cena
    de sofrimento, sem pessoa caída ou engasgada, nunca repetir foto já usada (`md5sum public/images/capas/*.jpg`).
    Olhe a imagem baixada antes de aplicar. Foto de PRODUTO continua a regra própria (foto oficial do fabricante).
  - As capas já publicadas não são trocadas em massa; só se uma for claramente ruim.
