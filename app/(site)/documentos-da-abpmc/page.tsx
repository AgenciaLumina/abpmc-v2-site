import type { Metadata } from "next";
import HeaderInterno from "@/components/layout/HeaderInterno";

export const metadata: Metadata = {
  title: "Documentos da ABPMC | ABPMC",
  description: "Repositório de documentos oficiais da ABPMC.",
};

export default function DocumentosABPMCPage() {
  return (
    <>
      <HeaderInterno titulo="Documentos da ABPMC" />
      <main className="bg-[#FEFEFE]">
        <section className="max-w-[1100px] mx-auto px-6 md:px-8 py-20 md:py-28">
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-700 text-lg mb-8">
              Acesse os documentos oficiais da Associação Brasileira de Psicologia e Medicina Comportamental.
            </p>
            
            <div className="bg-white rounded-2xl shadow-md p-8 md:p-10 mb-6">
              <h2 className="text-[#0B2E47] font-semibold text-2xl mb-4">
                Documentos Institucionais
              </h2>
              <div className="space-y-4">
                <div className="border-b pb-4">
                  <h3 className="text-lg font-semibold text-[#0B2E47] mb-2">Estatuto</h3>
                  <p className="text-gray-600 mb-2">Estatuto oficial da ABPMC</p>
                  <a href="/estatuto" className="text-[#01C2CE] hover:underline">Ver documento</a>
                </div>
                <div className="border-b pb-4">
                  <h3 className="text-lg font-semibold text-[#0B2E47] mb-2">Regimento Interno</h3>
                  <p className="text-gray-600">Regimento interno da associação (em breve)</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-md p-8 md:p-10 mb-6">
              <h2 className="text-[#0B2E47] font-semibold text-2xl mb-4">
                Atas e Relatórios
              </h2>
              <p className="text-gray-600">
                Atas de reuniões e relatórios serão disponibilizados em breve.
              </p>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
