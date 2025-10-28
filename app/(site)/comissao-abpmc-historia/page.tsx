import type { Metadata } from "next";
import HeaderInterno from "@/components/layout/HeaderInterno";

export const metadata: Metadata = {
  title: "Comissão ABPMC História | ABPMC",
  description: "Comissão de História da ABPMC.",
};

export default function ComissaoHistoriaPage() {
  return (
    <>
      <HeaderInterno titulo="Comissão ABPMC História" />
      <main className="bg-[#FEFEFE]">
        <section className="max-w-[1100px] mx-auto px-6 md:px-8 py-20 md:py-28">
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-700 text-lg mb-8">
              A Comissão ABPMC História trabalha para preservar e divulgar a história da Análise do Comportamento no Brasil.
            </p>
            
            <div className="bg-white rounded-2xl shadow-md p-8 md:p-10 mb-6">
              <h2 className="text-[#0B2E47] font-semibold text-2xl mb-4">
                Objetivos
              </h2>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Preservar a memória histórica da ABPMC</li>
                <li>Documentar eventos e marcos importantes</li>
                <li>Promover o conhecimento da história da Análise do Comportamento</li>
              </ul>
            </div>

            <div className="bg-white rounded-2xl shadow-md p-8 md:p-10 mb-6">
              <h2 className="text-[#0B2E47] font-semibold text-2xl mb-4">
                Contato
              </h2>
              <p className="text-gray-700">
                Para mais informações, entre em contato: <a href="mailto:abpmc@abpmc.org.br" className="text-[#01C2CE] hover:underline">abpmc@abpmc.org.br</a>
              </p>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
