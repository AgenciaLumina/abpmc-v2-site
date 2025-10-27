import type { Metadata } from "next";
import HeaderInterno from "@/components/layout/HeaderInterno";

export const metadata: Metadata = {
  title: "Editora ABPMC | ABPMC",
  description: "Conheça a Editora ABPMC, acesse normas, estatutos e formulários para submissão de livros e publicações.",
};

export default function EditoraPage() {
  return (
    <>
      <HeaderInterno titulo="Editora ABPMC" />
      
      <main className="bg-white">
        {/* Cards de Documentos */}
        <section className="py-20 px-6 md:px-16">
          <div className="max-w-5xl mx-auto space-y-10">
            
            {/* Card 1 - Normas */}
            <div className="flex flex-col md:flex-row justify-between items-center gap-6 bg-white border border-[#e6e8ef] rounded-2xl shadow-md p-8">
              <div>
                <h3 className="text-2xl font-semibold text-[#0B2E47] mb-2">
                  Normas para Publicação de Livros
                </h3>
                <p className="text-[#5a6575]">
                  Manual de normas para submissão de propostas de livros.
                </p>
              </div>
              <a 
                href="https://dev.agencialumina.com.br/abpmc_dev/wp-content/uploads/2021/08/15984690018744b45814.pdf" 
                download 
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-[#3273ff] text-white px-8 py-3 rounded-full font-semibold hover:bg-[#265fcc] transition-colors whitespace-nowrap"
              >
                📘 Baixar PDF
              </a>
            </div>

            {/* Card 2 - Ficha */}
            <div className="flex flex-col md:flex-row justify-between items-center gap-6 bg-white border border-[#e6e8ef] rounded-2xl shadow-md p-8">
              <div>
                <h3 className="text-2xl font-semibold text-[#0B2E47] mb-2">
                  Ficha de Proposta de Livro
                </h3>
                <p className="text-[#5a6575]">
                  Preencha e envie sua proposta conforme as normas da Editora.
                </p>
              </div>
              <a 
                href="https://dev.agencialumina.com.br/abpmc_dev/wp-content/uploads/2021/08/159846917592c110adb3.docx" 
                download 
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-[#3273ff] text-white px-8 py-3 rounded-full font-semibold hover:bg-[#265fcc] transition-colors whitespace-nowrap"
              >
                📄 Baixar DOCX
              </a>
            </div>

            {/* Card 3 - Estatuto */}
            <div className="flex flex-col md:flex-row justify-between items-center gap-6 bg-white border border-[#e6e8ef] rounded-2xl shadow-md p-8">
              <div>
                <h3 className="text-2xl font-semibold text-[#0B2E47] mb-2">
                  Estatuto da Editora ABPMC
                </h3>
                <p className="text-[#5a6575]">
                  Define a Editora, seus membros e o funcionamento institucional.
                </p>
              </div>
              <a 
                href="https://dev.agencialumina.com.br/abpmc_dev/wp-content/uploads/2021/08/e15895413002010fbc3cd46-pdf.jpg" 
                download 
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-[#3273ff] text-white px-8 py-3 rounded-full font-semibold hover:bg-[#265fcc] transition-colors whitespace-nowrap"
              >
                📘 Baixar Estatuto
              </a>
            </div>

          </div>
        </section>

        {/* Bloco Gradiente com CTA */}
        <section className="w-full bg-gradient-to-b from-[#0B2E47] to-[#163B56] py-[60px] text-center text-white">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-2xl font-semibold mb-3">
              Dúvidas ou interesse em publicar?
            </h2>
            <p className="max-w-2xl mx-auto text-[#E8EEF3]">
              Entre em contato com nossa equipe editorial e saiba como participar das próximas publicações da ABPMC.{" "}
              <a 
                href="https://abpmc.org.br/contato" 
                className="text-white underline hover:text-[#b6e6ff] transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                Fale conosco
              </a>.
            </p>
          </div>
        </section>
      </main>
    </>
  );
}
