import type { Metadata } from "next";
import HeaderInterno from "@/components/layout/HeaderInterno";

export const metadata: Metadata = {
  title: "Documentos Históricos | ABPMC",
  description: "Documentos históricos da ABPMC.",
};

export default function DocumentosHistoricosPage() {
  return (
    <>
      <HeaderInterno titulo="Documentos Históricos" />
      <main className="bg-[#FEFEFE]">
        <section className="max-w-[1100px] mx-auto px-6 md:px-8 py-20 md:py-28">
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-700 text-lg mb-8">
              Explore a história da ABPMC através de documentos que marcaram a trajetória da associação.
            </p>
            
            <div className="bg-white rounded-2xl shadow-md p-8 md:p-10 mb-6">
              <h2 className="text-[#0B2E47] font-semibold text-2xl mb-4">
                Acervo Histórico
              </h2>
              <p className="text-gray-600 mb-4">
                O acervo de documentos históricos da ABPMC está sendo digitalizado e será disponibilizado em breve.
              </p>
              <p className="text-gray-600">
                Incluirá atas de fundação, documentos de eventos históricos, correspondências e outros materiais relevantes para a história da Análise do Comportamento no Brasil.
              </p>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
