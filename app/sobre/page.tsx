import type { Metadata } from "next";
import Link from "next/link";
import { InstitutionalPage, institutionalMetadata } from "@/components/InstitutionalPage";
import { categories, site } from "@/lib/articles";
import { author } from "@/lib/author";

const PATH = "/sobre";
const TITLE = "Sobre o Saúde na Minha Vida";
const DESCRIPTION =
  "O Saúde na Minha Vida é um blog independente para filhos e cuidadores de pessoas idosas: guias de compra de produtos, casa e rotina, tecnologia, atividades, direitos e o cuidado com quem cuida.";

export const metadata: Metadata = institutionalMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH,
});

export default function SobrePage() {
  return (
    <InstitutionalPage
      label="Institucional"
      title={TITLE}
      lead="Um blog em português do Brasil para filhos, netos e cuidadores de pessoas idosas, com informação clara, passo a passo e sem culpa."
      path={PATH}
    >
      <h2 id="o-que-e">O que é o Saúde na Minha Vida</h2>
      <p>
        O {site.name} é escrito pela <Link href={author.url}>{author.name}</Link> para quem cuida de
        uma pessoa idosa (60+) e, de uma hora para outra, precisa decidir o que fazer. Qual cadeira de banho comprar, como
        deixar a casa segura, como ensinar o pai a usar o WhatsApp sem cair em golpe, a conta que
        não fecha, o cansaço de quem cuida sozinho. Aqui a proposta é explicar com calma, em
        linguagem simples, e dizer com clareza quando é hora de chamar um profissional.
      </p>
      <p>
        O conteúdo se divide em três frentes: <Link href="/artigos">artigos</Link> (guias e passo a
        passo), <Link href="/noticias">notícias</Link> (o que mudou em regras, benefícios e saúde,
        explicado para a família) e <Link href="/reviews">comparativos de produtos</Link>, com
        critérios públicos e nota de 0 a 10. A prioridade do blog são os guias de compra e o dia a
        dia em casa; os guias de saúde são textos de apoio com fontes oficiais.
      </p>

      <h2 id="para-quem">Para quem escrevemos</h2>
      <p>
        Para filhos, netos, cônjuges e cuidadores, de família ou profissionais, que querem cuidar
        bem sem precisar virar especialistas. Também para a própria pessoa idosa que prefere ler
        sozinha. As categorias do site refletem as situações mais comuns:
      </p>
      <ul>
        {categories.map((c) => (
          <li key={c.slug}>
            <Link href={`/categoria/${c.slug}`}>{c.label}</Link>: {c.description}
          </li>
        ))}
      </ul>

      <h2 id="como-o-conteudo-e-feito">Como o conteúdo é feito</h2>
      <p>
        Cada texto parte de fontes oficiais, como Ministério da Saúde, OMS e OPAS, Sociedade
        Brasileira de Geriatria e Gerontologia (SBGG), Associação Brasileira de Alzheimer (Abraz),
        Anvisa, gov.br e Estatuto da Pessoa Idosa. As fontes ficam listadas ao fim do artigo. O texto
        é escrito, checado e aprovado pela redação, que responde por ele.
      </p>
      <p>
        Um ponto importante, dito com transparência: quando um artigo for revisado por profissional
        de saúde, o nome e o registro dele aparecem na própria página. Enquanto esse selo não
        aparece, o artigo não passou por revisão de um profissional. Quando um texto é corrigido ou
        ampliado, ele ganha a marcação &quot;Atualizado em&quot; com a nova data. Os detalhes estão
        na <Link href="/politica-editorial">política editorial</Link>.
      </p>

      <h2 id="o-que-o-site-nao-faz">O que o site não faz</h2>
      <ul>
        <li>
          Não diagnostica, não indica dose de remédio, não promete cura e não substitui consulta
          médica.
        </li>
        <li>Não vende curso, mentoria, suplemento nem tratamento.</li>
        <li>Não publica conteúdo pago disfarçado de artigo ou de análise de produto.</li>
        <li>
          Não responde dúvidas clínicas individuais nem faz teleorientação. Em emergência, ligue
          para o SAMU 192.
        </li>
      </ul>

      <h2 id="como-o-site-se-sustenta">Como o site se sustenta</h2>
      <p>
        O acesso é gratuito. A receita vem (ou virá) de anúncios do Google AdSense e de links de
        afiliado da Amazon, que aparecem somente na categoria{" "}
        <Link href="/categoria/indica">Melhores Produtos</Link>, sempre sinalizados. Anúncio e afiliado não
        interferem em pauta, nota ou opinião. Explicamos tudo em{" "}
        <Link href="/publicidade-e-afiliados">publicidade e afiliados</Link>.
      </p>

      <h2 id="como-falar-conosco">Como falar com a gente</h2>
      <p>
        Encontrou um erro, tem uma sugestão de pauta ou quer propor uma parceria? Escreva para{" "}
        <a href={`mailto:${author.email}`}>{author.email}</a>. Respondemos em até 5 dias úteis. A
        página de <Link href="/contato">contato</Link> explica o que mandar em cada caso, incluindo
        pedidos relacionados aos seus dados pessoais.
      </p>
    </InstitutionalPage>
  );
}
