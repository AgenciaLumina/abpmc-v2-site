import type { Metadata } from "next";
import HeaderInterno from "@/components/layout/HeaderInterno";

export const metadata: Metadata = {
  title: "Sustentabilidade | ABPMC",
  description: "Iniciativas de sustentabilidade da ABPMC.",
};

export default function SustentabilidadePage() {
  return (
    <>
      <HeaderInterno titulo="Sustentabilidade" />
      <main className="bg-[#FEFEFE]">
        <section className="max-w-[1100px] mx-auto px-6 md:px-8 py-20 md:py-28">
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-700 text-lg mb-8">
              A ABPMC está comprometida com práticas sustentáveis e com a promoção da consciência ambiental.
            </p>
            
            <div className="bg-white rounded-2xl shadow-md p-8 md:p-10 mb-6">
              <h2 className="text-[#0B2E47] font-semibold text-2xl mb-4">
                Nosso Compromisso
              </h2>
              <p className="text-gray-700 mb-4">
                A Comissão de Sustentabilidade da ABPMC trabalha para implementar práticas sustentáveis em eventos e atividades da associação.
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-md p-8 md:p-10 mb-6">
              <h2 className="text-[#0B2E47] font-semibold text-2xl mb-4">
                Iniciativas
              </h2>
              <p className="text-gray-600">
                Informações sobre iniciativas específicas de sustentabilidade serão disponibilizadas em breve.
              </p>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
