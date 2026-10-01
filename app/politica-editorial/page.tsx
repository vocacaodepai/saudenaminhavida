import type { Metadata } from "next";
import Link from "next/link";
import { InstitutionalPage, institutionalMetadata } from "@/components/InstitutionalPage";
import { site } from "@/lib/articles";
import { author } from "@/lib/author";

const PATH = "/politica-editorial";
const TITLE = "Política editorial";
const DESCRIPTION =
  "Como o Saúde na Minha Vida escolhe pautas, usa fontes oficiais, trata revisão por profissional de saúde, avalia produtos com nota de 0 a 10, corrige erros e lida com imagens.";

export const metadata: Metadata = institutionalMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH,
});

export default function PoliticaEditorialPage() {
  return (
    <InstitutionalPage
      label="Institucional"
      title={TITLE}
      lead="O Saúde na Minha Vida informa e orienta, mas não diagnostica nem substitui o médico. Esta página explica como cada texto é feito, o que a redação nunca faz e o padrão que cada artigo precisa cumprir antes de ir ao ar."
      path={PATH}
    >
      <h2 id="quem-responde">1. Quem responde pelo conteúdo</h2>
      <p>
        Todo o conteúdo do {site.name} é produzido e assinado pela{" "}
        <Link href={author.url}>{author.name}</Link>. Não inventamos nomes nem credenciais: se um
        texto tiver autor, revisor ou colaborador identificado, o nome aparece na página. A redação
        responde por cada erro e por cada correção.
      </p>

      <h2 id="limites">2. O que o site faz e o que nunca faz</h2>
      <p>O site existe para explicar, organizar e orientar. Por isso, nunca:</p>
      <ul>
        <li>diagnostica ou sugere que alguém tem determinada doença;</li>
        <li>indica dose, troca ou suspensão de remédio;</li>
        <li>promete cura, &quot;tratamento natural&quot; para doença ou resultado garantido;</li>
        <li>substitui consulta, exame ou atendimento de urgência.</li>
      </ul>
      <p>
        Todo artigo de urgência, sintoma ou medicação começa com o aviso de quando ligar para o SAMU
        (192) ou ir ao pronto-socorro. Em emergência, não leia: ligue.
      </p>

      <h2 id="pautas">3. Como as pautas são escolhidas</h2>
      <p>Uma pauta entra no site quando responde a pelo menos uma destas perguntas:</p>
      <ul>
        <li>É uma dúvida real de quem cuida de uma pessoa idosa e não tem resposta clara em português?</li>
        <li>Ajuda a família a agir numa situação concreta, como uma queda, uma crise ou uma decisão de rotina?</li>
        <li>Explica um direito, um benefício ou uma regra que mudou, com valores e prazos quando houver?</li>
        <li>É um produto que as famílias estão comprando ou pensando em comprar e que merece uma análise honesta?</li>
      </ul>
      <p>
        Sugestões de leitores contam muito: mande pela página de <Link href="/contato">contato</Link>.
        Não entram pautas compradas, textos enviados por empresas para publicação como se fossem do
        site nem conteúdo feito só para ranquear uma palavra-chave sem ajudar quem lê.
      </p>

      <h2 id="fontes">4. Fontes e checagem</h2>
      <p>
        Todo texto parte de fontes oficiais: Ministério da Saúde, OMS e OPAS, Sociedade Brasileira de
        Geriatria e Gerontologia (SBGG), Associação Brasileira de Alzheimer (Abraz), Anvisa, gov.br,
        INSS e Estatuto da Pessoa Idosa (Lei 10.741/2003), além de publicações científicas indexadas.
        Afirmações clínicas e números sempre apontam para a fonte, listada ao fim do texto em
        &quot;Fontes consultadas&quot;.
      </p>
      <p>
        Valores e regras de benefícios mudam. Por isso, textos sobre direitos indicam a data da
        verificação e mandam o leitor confirmar no gov.br ou no INSS (135).
      </p>

      <h2 id="revisao-profissional">5. Revisão por profissional de saúde</h2>
      <p>
        Quando um artigo for revisado por um profissional de saúde, o nome e o registro profissional
        dele aparecem na própria página, em um selo de revisão. Isso só acontece quando existe uma
        pessoa real que de fato revisou aquele texto.
      </p>
      <p>
        Enquanto o selo não aparece, o artigo não foi revisado por profissional de saúde. É a
        redação, apoiada em fontes oficiais, que responde pelo texto. Preferimos dizer isso com todas
        as letras a sugerir uma revisão que não existiu.
      </p>

      <h2 id="ferramentas-de-escrita">6. Ferramentas de apoio à escrita</h2>
      <p>
        A redação pode usar ferramentas automatizadas de apoio à escrita para organizar ideias,
        montar o primeiro rascunho ou apontar erros de gramática. Nada sai assim para o leitor: todo
        texto é lido, checado contra as fontes, corrigido e aprovado por uma pessoa da redação, que
        assume a responsabilidade editorial pelo que foi publicado. Se um texto sair errado, a culpa
        não é da ferramenta.
      </p>

      <h2 id="padrao-minimo">7. Padrão mínimo de cada artigo</h2>
      <p>Um artigo novo só é publicado se cumprir estes requisitos:</p>
      <ul>
        <li>
          <strong>Resposta direta no começo</strong>: a pergunta que motivou o artigo é respondida nos
          primeiros parágrafos, com os pontos principais em destaque.
        </li>
        <li>
          <strong>Passo a passo</strong>: o que fazer agora, em etapas curtas, com números de
          telefone oficiais quando couber (SAMU 192, Disque 100, Ligue 180).
        </li>
        <li>
          <strong>Quando procurar o médico</strong>: todo artigo clínico diz em que situações é
          preciso buscar atendimento.
        </li>
        <li>
          <strong>Fontes</strong>: afirmações verificáveis apontam para a fonte oficial, e todo link
          externo é aberto e conferido antes de entrar.
        </li>
        <li>
          <strong>Linguagem simples e sem culpa</strong>: frases curtas, sem jargão sem explicação e
          sem julgar quem cuida. O texto tira peso, não coloca.
        </li>
        <li>
          <strong>Sem promessas</strong>: nada de cura, tratamento milagroso ou resultado garantido.
        </li>
      </ul>
      <p>
        Artigos antigos que não atendem a esse padrão são reescritos aos poucos. Quando um deles é
        reformado, recebe a data de atualização.
      </p>

      <h2 id="reviews">8. Como os produtos são analisados</h2>
      <p>
        As análises de produto da categoria <Link href="/categoria/indica">Indica</Link> e da página{" "}
        <Link href="/reviews">produtos testados</Link> seguem critérios públicos, cada um com nota de
        0 a 10: segurança, facilidade de uso, durabilidade, preço e avaliações reais de quem já
        comprou. A nota final é a média desses critérios, exibida junto com prós, contras, para quem
        serve e o link do produto.
      </p>
      <p>
        Não alegamos teste pessoal que não aconteceu. Quando a análise se baseia em especificações do
        fabricante, normas, documentação oficial e avaliações de compradores, o texto diz isso. Nenhuma
        nota é vendida, negociada ou influenciada por anunciante, programa de afiliado ou pedido do
        fabricante. Se o produto mudar de forma relevante, a análise é revisada e a nota pode mudar.
      </p>

      <h2 id="noticias">9. Notícias</h2>
      <p>
        Cada notícia é escrita a partir de uma fonte identificada, com link para a matéria ou o ato
        oficial original. O site não copia matérias: resume o fato, explica o contexto e o que aquilo
        muda para a família. Se um fato for corrigido pela fonte, a notícia é atualizada com a
        correção indicada.
      </p>

      <h2 id="correcoes">10. Correções públicas</h2>
      <p>
        Erros acontecem. Quem encontrar um pode escrever para{" "}
        <a href={`mailto:${author.email}`}>{author.email}</a> com o link da página e o trecho. Erros
        confirmados são corrigidos em até 5 dias úteis. Correções de fato (um número errado, uma
        regra desatualizada, uma afirmação incorreta) recebem a marcação &quot;Atualizado em&quot;
        com a nova data e, quando o erro for relevante, uma nota explicando o que mudou. Ajustes de
        forma (erro de digitação, link quebrado) são feitos sem marcação. Um texto que se mostre
        errado no todo é reescrito ou retirado, e a URL passa a explicar o motivo em vez de sumir.
      </p>

      <h2 id="independencia">11. Independência editorial</h2>
      <p>
        O site se sustenta com anúncios do Google AdSense e com links de afiliado da Amazon, só na
        categoria Indica. Anunciante não escolhe pauta, não lê texto antes da publicação e não recebe
        nota ou menção em troca de investimento. Como compromisso editorial, não colocamos anúncio
        dentro de conteúdo de urgência. As regras completas estão em{" "}
        <Link href="/publicidade-e-afiliados">publicidade e afiliados</Link>.
      </p>

      <h2 id="imagens">12. Uso de imagens</h2>
      <p>
        As fotos de capa vêm dos bancos Pexels e Pixabay, dentro das licenças deles, e cada uma traz
        o crédito do fotógrafo com link. O site não usa imagens artificiais como se fossem fotos
        reais e não usa capturas de tela de terceiros sem indicar a origem. A imagem de
        compartilhamento (a que aparece em redes sociais e mensageiros) é gerada pelo próprio site,
        com o título do texto e a marca.
      </p>

      <h2 id="datas">13. Datas de publicação e atualização</h2>
      <p>
        Toda página mostra a data de publicação. Quando há revisão de conteúdo, mostra também a data
        de atualização, e essa data é a que vai para os mecanismos de busca. Datas seguem o horário
        de Brasília; um texto nunca é publicado com data futura.
      </p>

      <h2 id="conflitos">14. Conflitos de interesse</h2>
      <p>
        A redação não tem participação, emprego ou contrato com fabricantes, clínicas ou marcas dos
        produtos analisados. O único vínculo comercial é o programa de afiliados da Amazon, descrito
        em publicidade e afiliados. Se isso mudar, o conflito é declarado nesta página e nos textos
        afetados.
      </p>

      <p>
        Versão desta política: 1 de outubro de 2026. Veja também{" "}
        <Link href="/sobre">sobre o site</Link> e a{" "}
        <Link href="/politica-de-privacidade">política de privacidade</Link>.
      </p>
    </InstitutionalPage>
  );
}
