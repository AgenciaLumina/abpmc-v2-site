import type { Metadata } from "next";
import HeaderInterno from "@/components/layout/HeaderInterno";

export const metadata: Metadata = {
  title: "Comissão de Ética | ABPMC",
  description: "A Comissão de Ética da ABPMC atua na análise de condutas e na preservação dos princípios éticos da atuação profissional em Análise do Comportamento.",
};

export default function ComissaoEticaPage() {
  return (
    <>
      <HeaderInterno titulo="Comissão de Ética" />
      
      <main className="bg-white">
        {/* Conteúdo Principal */}
        <section className="py-20 px-6 md:px-16">
          <div className="max-w-4xl mx-auto text-lg leading-relaxed space-y-6">
            
            <p>
              A Comissão de Ética da ABPMC é responsável por analisar e orientar sobre condutas éticas relacionadas à prática profissional em Análise do Comportamento, zelando pelo respeito aos princípios científicos e deontológicos da área.
            </p>

            {/* Coordenação e Membros */}
            <div className="mt-10">
              <h2 className="text-2xl font-semibold text-[#0B2E47] mb-4">
                Coordenação e Membros
              </h2>
              <ul className="list-disc list-inside text-[#333] space-y-1">
                <li><strong>Ana Paula Souza</strong> (Coordenadora)</li>
                <li>Bruno Ricardo Andrade</li>
                <li>Mariana Lopes Pereira</li>
                <li>Fernanda Teixeira</li>
                <li>Ricardo Oliveira</li>
              </ul>
            </div>

            {/* Contato */}
            <div className="mt-10">
              <p className="font-semibold">Contato:</p>
              <p>
                <a 
                  href="mailto:etica@abpmc.org.br" 
                  className="text-[#2b4e6d] underline hover:text-[#22949e] transition-colors"
                >
                  etica@abpmc.org.br
                </a>
              </p>
            </div>

          </div>
        </section>

        {/* Bloco Gradiente */}
        <section className="w-full bg-gradient-to-b from-[#0B2E47] to-[#163B56] py-[60px] text-center text-white">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-2xl font-semibold mb-3">
              Envie seu relato com sigilo e responsabilidade
            </h2>
            <p className="max-w-2xl mx-auto text-[#E8EEF3]">
              A ABPMC garante a confidencialidade de todas as comunicações encaminhadas à Comissão de Ética.{" "}
              <a 
                href="https://abpmc.org.br/contato" 
                className="text-white underline hover:text-[#b6e6ff] transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                Saiba mais
              </a>.
            </p>
          </div>
        </section>
      </main>
    </>
  );
}
