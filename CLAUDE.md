## Categorização editorial

Categorias (`lib/types.ts`): `urgencias`, `demencia`, `alimentacao`, `rotina`, `direitos`,
`cuidador` e `indica`.

- **Indica** (`category: "indica"`): análise de produto que facilita o cuidado em casa
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

## Imagens de produto (categoria Indica)

Nunca usar gerador de imagem por IA para capa ou foto de produto: a IA erra marca e logo.
Use foto oficial do fabricante em `public/images/products/`, referenciada por `coverImage`,
e `node scripts/build-product-cover.mjs <entrada> <saida>` para fotos verticais.

## Botão de compra (categoria Indica)

```html
<div class="buy-btn">
  <a href="https://www.amazon.com.br/dp/<ASIN>?tag=<TAG-DE-AFILIADO>" rel="sponsored noopener noreferrer" target="_blank">Comprar <Produto> agora ↗</a>
</div>
```

A tag de afiliado ainda precisa ser criada no programa de associados da Amazon Brasil; até
lá, não publicar artigos da categoria Indica com link de compra.

## Deploy

Vercel (a configurar). Domínio previsto: `www.saudenaminhavida.com.br`. O workflow do GitHub
Pages é só preview auxiliar.

@AGENTS.md
