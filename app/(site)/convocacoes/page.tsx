import type { Metadata } from "next";
import HeaderInterno from "@/components/layout/HeaderInterno";

export const metadata: Metadata = {
  title: "Convocações | ABPMC",
  description: "Convocações oficiais da ABPMC.",
};

export default function ConvocacoesPage() {
  return (
    <>
      <HeaderInterno titulo="Convocações" />
      <main className="bg-[#FEFEFE]">
        <section className="max-w-[1100px] mx-auto px-6 md:px-8 py-20 md:py-28">
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-700 text-lg mb-8">
              Acompanhe as convocações oficiais da Associação Brasileira de Psicologia e Medicina Comportamental.
            </p>
            
            <div className="bg-white rounded-2xl shadow-md p-8 md:p-10 mb-6">
              <h2 className="text-[#0B2E47] font-semibold text-2xl mb-4">
                Convocações Recentes
              </h2>
              <p className="text-gray-600">
                Nenhuma convocação disponível no momento. Esta página será atualizada com novas convocações quando disponíveis.
              </p>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
