import type { Metadata } from "next";
import HeaderInterno from "@/components/layout/HeaderInterno";

export const metadata: Metadata = {
  title: "ABPMC Comunidade | ABPMC",
  description: "Projeto ABPMC Comunidade — A Análise do Comportamento a serviço da sociedade, promovendo conhecimento e qualidade de vida.",
};

export default function ABPMCComunidadePage() {
  return (
    <>
      <HeaderInterno titulo="ABPMC Comunidade" />
      <main className="py-20 px-6 md:px-16">
        <div className="max-w-5xl mx-auto text-[#333] space-y-6 leading-relaxed">
          <p>
            <strong>Análise do Comportamento para a sociedade</strong>
          </p>

          <p>
            A Análise do Comportamento como área de saber e aplicação tem produzido diversos conhecimentos e tecnologias úteis na busca por uma melhor qualidade de vida da população.
            Contudo, nem sempre esses conhecimentos chegam ao grande público, e a Associação Brasileira de Psicologia e Medicina Comportamental (ABPMC), como grande representante da área no Brasil, tem como proposta compartilhar este conhecimento com a comunidade externa.
          </p>

          <p>
            O projeto <strong>ABPMC Comunidade</strong> vem sendo realizado desde 2002, com o objetivo de levar a ABPMC para além dos seus associados, promovendo a divulgação da área e proporcionando a aquisição de conhecimentos úteis para o público geral.
          </p>

          <p>
            Historicamente, o projeto é realizado por meio de palestras durante o Encontro Brasileiro de Psicologia e Medicina Comportamental, dentro de uma programação especial para o público leigo, sempre na mesma cidade do evento.
          </p>

          <p>
            Em 2015, o projeto foi ampliado, com palestras programadas para diferentes cidades do país ao longo do ano e com a publicação de textos voltados ao público leigo em Análise do Comportamento.
          </p>

          <p>
            Além disso, textos e vídeos são produzidos e disponibilizados no site da ABPMC e, mensalmente, também no site da Receita Federal de Foz do Iguaçu e da Escola de Magistratura do Paraná — parcerias que visam levar temas de interesse a servidores dessas instituições em artigos produzidos por analistas do comportamento.
          </p>

          <p>
            Para saber sobre as datas das palestras e ter acesso aos textos, acompanhe o site da ABPMC e as redes sociais oficiais.
          </p>

          <p>
            Caso você seja um profissional interessado em doar uma palestra para a população de sua cidade, entre em contato pelo e-mail:{" "}
            <a
              href="mailto:comunidades@abpmc.org.br"
              className="text-[#2b4e6d] hover:text-[#22949e] font-medium transition-colors"
            >
              comunidades@abpmc.org.br
            </a>
          </p>
        </div>

        <div className="h-[400px] mt-20 bg-gradient-to-b from-transparent to-[#136FEF14] rounded-t-xl"></div>
      </main>
    </>
  );
}
