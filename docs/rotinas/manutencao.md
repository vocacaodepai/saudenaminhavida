# Rotina: manutenção diária (erros e segurança do site)

Leia `docs/rotinas/comum.md` primeiro (clone próprio em /tmp, validação, publicar por PR e squash).
Esta rotina NÃO escreve conteúdo novo. Ela só procura e corrige defeitos e riscos. Se nada precisar de
correção, termine em silêncio: sem commit, sem PR, sem mensagem.

## 1. Checagem de erros (corrija sozinho)
1. `npm ci --silent`, `npm run check:content`, `npm run lint`, `npm run build`. Todo erro ou aviso
   novo é investigado e corrigido na causa (nunca silenciar regra, pular teste ou apagar conteúdo para passar).
2. Links: para os artigos e notícias publicados nos últimos 7 dias, abra os links externos com `curl -sIL`
   (ou WebFetch se o órgão bloquear curl). Link quebrado (404/410): troque por fonte oficial equivalente
   aberta e conferida, ou remova a afirmação que dependia dele. 403/503 de gov.br, Planalto e fabricantes
   costuma ser bloqueio do ambiente: confirme por WebFetch antes de mexer.
3. Links internos (`/artigos/<slug>`, `/noticias/<slug>`) apontam para slugs que existem.
4. Imagens: todo `coverImage.src` e `<img src>` local existe em `public/`; sem arquivo órfão novo enorme.
5. Afiliado: todo link Amazon tem `tag=saudenaminhavida-20` e `rel="sponsored noopener noreferrer"`;
   nenhuma alegação de teste pessoal em artigo da categoria `indica`; preço só como "faixa consultada na internet em <data>", nunca como "preço da Amazon", e nunca sem a data.
6. Estilo e escopo: sem travessão (—), sem conteúdo clínico fora da categoria `saude`.
7. Se a Vercel estiver configurada, olhe o último deploy de produção (ferramentas `mcp__Vercel__*`,
   se existirem) e os logs de erro de runtime; trate o que for do código do site.

## 2. Checagem de segurança (corrija o que for seguro corrigir)
1. `npm audit --omit=dev`. Vulnerabilidade alta ou crítica com correção sem quebra de versão maior:
   `npm audit fix` (sem `--force`), rode os testes de validação e inclua `package.json` e
   `package-lock.json` no PR. Se exigir salto de versão maior, NÃO force: descreva no relatório final.
2. Segredos: procure no repositório por chaves (`sk-`, `AKIA`, `-----BEGIN`, `api_key`, tokens de 32+
   caracteres) e confirme que `.env*` está no `.gitignore` e não rastreado (`git ls-files | grep -i env`).
3. Cabeçalhos de segurança em `next.config.ts` (CSP/HSTS/X-Frame-Options/Referrer-Policy etc.)
   continuam presentes; não enfraqueça nenhum.
4. Rotas de API e formulários (`app/api/**`): validação de entrada, limite de abuso e sanitização
   (o projeto usa `sanitize-html` para conteúdo). Sem `dangerouslySetInnerHTML` com dado não sanitizado
   fora do pipeline já existente.
5. Links externos em conteúdo: `rel="noopener noreferrer"`; nenhum `http://` sem TLS, nenhum domínio de
   encurtador ou suspeito. Consentimento do Google Analytics (`components/GoogleAnalytics.tsx`) continua
   ativando só após aceite.
6. Se a Vercel estiver configurada e o site tiver URL pública, confira com `curl -sI` que a página
   inicial responde 200 e traz os cabeçalhos de segurança.

## 3. Publicar
- Só mexa no que a checagem provou estar errado, com o menor diff possível (nada de refatoração).
- Valide de novo (`check:content`, `lint`, `build`), abra PR para a branch de produção com o título
  "Manutenção DD/MM: <resumo>", descreva o que achou e corrigiu, aguarde checks e mescle por squash.
- Problema que não dá para corrigir sem decisão do usuário (versão maior de dependência, mudança de
  política, segredo vazado): não force. Se for um segredo vazado, abra um PR/relato claro e avise o
  usuário em mensagem curta. Nos demais casos, registre no PR ou termine em silêncio se nada foi tocado.
- Remova o clone ao final e faça `git pull` do repositório em /home/user/saudenaminhavida.
