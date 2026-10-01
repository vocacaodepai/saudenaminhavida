import type { Metadata } from "next";
import Link from "next/link";
import { InstitutionalPage, institutionalMetadata } from "@/components/InstitutionalPage";
import { site } from "@/lib/articles";
import { author } from "@/lib/author";

const PATH = "/publicidade-e-afiliados";
const TITLE = "Publicidade e afiliados";
const DESCRIPTION =
  "Como o Saúde na Minha Vida se sustenta: anúncios do Google AdSense e links de afiliado da Amazon na categoria Indica, sempre sinalizados e sem mudar nota nem opinião.";

function ExternalLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  );
}

export const metadata: Metadata = institutionalMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH,
});

export default function PublicidadeEAfiliadosPage() {
  return (
    <InstitutionalPage
      label="Institucional"
      title={TITLE}
      lead="O acesso ao Saúde na Minha Vida é gratuito. Esta página explica de onde vem o dinheiro que mantém o site no ar, como cada anúncio ou link comercial é identificado e por que nada disso muda o que é escrito."
      path={PATH}
    >
      <h2 id="como-o-site-se-sustenta">1. Como o site se sustenta</h2>
      <p>
        O {site.name} não cobra assinatura, não vende curso, suplemento nem tratamento e não tem área paga. A receita vem de
        duas fontes:
      </p>
      <ul>
        <li>
          <strong>Google AdSense</strong> (a ser ativado): anúncios servidos pelo Google nas páginas do
          site. O Google escolhe o anúncio, não a redação. O site recebe uma fração pequena do que o
          anunciante paga.
        </li>
        <li>
          <strong>Programa de Associados da Amazon</strong>: nas análises de produto da categoria{" "}
          <Link href="/categoria/indica">Indica</Link>, o link para comprar o produto na Amazon é um
          link de afiliado e pode gerar comissão para o site, sem custo adicional para você. Como
          Associado da Amazon, o {site.name} ganha com compras qualificadas.
        </li>
      </ul>
      <p>Não há conteúdo patrocinado, publieditorial nem &quot;matéria paga&quot;, e não haverá. Como compromisso editorial, também não colocamos anúncio dentro de conteúdo de urgência, como os guias sobre quedas e emergências.</p>

      <h2 id="como-os-anuncios-sao-identificados">2. Como os anúncios são identificados</h2>
      <p>
        Todo bloco de anúncio é rotulado como &quot;Publicidade&quot; e fica visualmente separado do
        texto. Anúncios nunca aparecem acima do título da página, nunca se disfarçam de link do
        conteúdo e não são exibidos em páginas sem conteúdo editorial, como a de contato, a de erro
        404, a busca e estas páginas institucionais. Quando não há anúncio configurado, não há
        caixa vazia: o espaço simplesmente não existe.
      </p>
      <p>
        A redação não vê nem aprova cada anúncio individualmente: eles são escolhidos pelo Google. Se
        um anúncio parecer enganoso, ofensivo ou inadequado, avise pelo e-mail{" "}
        <a href={`mailto:${author.email}`}>{author.email}</a> com uma captura de tela, para que ele
        seja bloqueado nas configurações do AdSense.
      </p>

      <h2 id="afiliados-nao-mudam-a-nota">3. Afiliado não muda nota nem opinião</h2>
      <p>
        A ordem é sempre esta: primeiro a análise, com nota e opinião fechadas pelos critérios da{" "}
        <Link href="/politica-editorial">política editorial</Link>; só depois se verifica se o
        produto tem link de afiliado. Um produto com comissão não ganha nota
        melhor, não aparece mais vezes e não deixa de ter os contras listados. Um produto sem
        comissão não deixa de ser recomendado por isso. Se o produto mais indicado para um caso for
        outro, sem link de afiliado, o texto diz que é esse outro.
      </p>

      <h2 id="sinalizacao">4. Como um link de afiliado é sinalizado</h2>
      <ul>
        <li>
          Toda análise com link de afiliado traz um aviso visível no topo, antes do texto, dizendo
          que a página contém esse tipo de link e que ele pode gerar comissão.
        </li>
        <li>
          Os links levam o atributo <code>rel=&quot;sponsored&quot;</code>, que informa aos
          mecanismos de busca que se trata de um link comercial, além de{" "}
          <code>noopener</code> por segurança.
        </li>
        <li>
          O preço informado é o preço público do produto no momento da escrita da análise, sem
          inflar para justificar a comissão. Preço muda com frequência na Amazon; o valor exato
          sempre aparece atualizado na própria página do produto.
        </li>
        <li>
          Um link de afiliado só aparece na categoria Indica. Nunca em notícia, em conteúdo de urgência, em artigo sobre saúde ou fora do contexto de uma análise de produto.
        </li>
        <li>
          As imagens usadas nas análises de produto são fotos oficiais divulgadas pelo próprio
          fabricante em seu site, nunca capturadas da página de venda da Amazon.
        </li>
      </ul>

      <h2 id="cookies">5. Cookies de anúncio e como recusar</h2>
      <p>
        Os anúncios do Google podem usar cookies para medir exibições e, com o seu consentimento,
        para personalizar o que é mostrado. Na primeira visita com anúncios ativos aparece um aviso
        com as opções de aceitar ou recusar. Quem recusa continua vendo anúncios, mas não
        personalizados. A escolha pode ser mudada a qualquer momento pelo link &quot;Preferências
        de cookies&quot; no rodapé. Os detalhes, incluindo os links do Google para gerenciar a
        personalização, estão na <Link href="/politica-de-privacidade">política de privacidade</Link>.
      </p>

      <h2 id="conformidade">6. Regras que o site segue</h2>
      <ul>
        <li>
          <ExternalLink href="https://support.google.com/adsense/answer/48182">
            Políticas do programa Google AdSense
          </ExternalLink>
          , incluindo as regras de posicionamento e de rotulagem de anúncios.
        </li>
        <li>
          <ExternalLink href="https://developers.google.com/search/docs/essentials/spam-policies">
            Políticas de spam da Busca do Google
          </ExternalLink>
          , em especial sobre links pagos e conteúdo em escala.
        </li>
        <li>
          Código Brasileiro de Autorregulamentação Publicitária do{" "}
          <ExternalLink href="https://conar.org.br/">CONAR</ExternalLink>: publicidade identificável
          como tal e separada do conteúdo editorial.
        </li>
        <li>
          Código de Defesa do Consumidor, que exige que a publicidade seja veiculada de forma que o
          consumidor a identifique fácil e imediatamente (art. 36).
        </li>
        <li>
          Lei Geral de Proteção de Dados, para o consentimento de cookies de publicidade.
        </li>
      </ul>

      <h2 id="o-que-nao-e-aceito">7. O que não é aceito</h2>
      <ul>
        <li>Pagamento por nota, por posição em ranking ou por menção em artigo.</li>
        <li>Texto enviado por empresa para publicar como se fosse do site.</li>
        <li>Links inseridos em artigos antigos mediante pagamento (&quot;link building&quot;).</li>
        <li>Anúncios que imitem o layout do site ou o rótulo de conteúdo editorial.</li>
      </ul>

      <h2 id="propostas">8. Propostas comerciais</h2>
      <p>
        Propostas de parceria podem ser enviadas pela página de{" "}
        <Link href="/contato">contato</Link>, com o assunto &quot;Parceria&quot;. Só são
        consideradas as que cabem nas regras acima.
      </p>

      <p>
        Versão desta página: 29 de setembro de 2026. Veja também os{" "}
        <Link href="/termos-de-uso">termos de uso</Link>.
      </p>
    </InstitutionalPage>
  );
}
