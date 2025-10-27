import type { Metadata } from "next";
import HeaderInterno from "@/components/layout/HeaderInterno";

export const metadata: Metadata = {
  title: "Comissão de Sustentabilidade | ABPMC",
  description: "Conheça as ações sustentáveis promovidas pela Comissão de Sustentabilidade da ABPMC, incluindo o Prêmio ABPMC Sustentabilidade e Inovação.",
};

export default function ComissaoSustentabilidadePage() {
  return (
    <>
      <HeaderInterno titulo="Comissão de Sustentabilidade" />
      
      <main className="bg-white">
        {/* Conteúdo Principal */}
        <section className="py-20 px-6 md:px-16">
          <div className="max-w-4xl mx-auto text-lg leading-relaxed space-y-6">
            <p>
              A Comissão de Sustentabilidade da ABPMC tem como objetivo fomentar ações sustentáveis entre associados e congressistas, antes, durante e após o Encontro Anual. Muitas dessas iniciativas são desenvolvidas em parceria com a Comissão de Estudantes da ABPMC.
            </p>
            <p>
              Em 2016 foi criado o <strong>Prêmio ABPMC Sustentabilidade e Inovação</strong>, que busca incentivar a elaboração de projetos de pesquisa e intervenção em Análise Aplicada do Comportamento relacionados a Desenvolvimento Sustentável e Inovação.
            </p>
            <p>
              Em breve teremos mais novidades e informações sobre essas ações promovidas pela Comissão de Sustentabilidade da ABPMC. Fique de olho em nosso site e acompanhe nossos canais oficiais nas redes sociais!
            </p>
          </div>
        </section>

        {/* Bloco Gradiente com CTA */}
        <section className="w-full bg-gradient-to-b from-[#0B2E47] to-[#163B56] py-[60px] text-center text-white">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-2xl font-semibold mb-6">
              Acesse o regulamento do Prêmio Sustentabilidade
            </h2>
            <a 
              href="https://abpmc.org.br/wp-content/uploads/2021/08/premioabpmc_2016.pdf" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-white text-[#0B2E47] font-semibold px-8 py-3 rounded-full shadow-md hover:bg-[#e6f0f5] transition-colors"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 384 512">
                <path d="M64 0C28.7 0 0 28.7 0 64V448c0 35.3 28.7 64 64 64H320c35.3 0 64-28.7 64-64V160H256c-17.7 0-32-14.3-32-32V0H64zM256 0V128H384L256 0zM112 256H272c8.8 0 16 7.2 16 16s-7.2 16-16 16H112c-8.8 0-16-7.2-16-16s7.2-16 16-16zm0 64H272c8.8 0 16 7.2 16 16s-7.2 16-16 16H112c-8.8 0-16-7.2-16-16s7.2-16 16-16zm0 64H272c8.8 0 16 7.2 16 16s-7.2 16-16 16H112c-8.8 0-16-7.2-16-16s7.2-16 16-16z"/>
              </svg>
              Ler regulamento
            </a>
          </div>
        </section>
      </main>
    </>
  );
}
