import type { Metadata } from "next";
import HeaderInterno from "@/components/layout/HeaderInterno";

export const metadata: Metadata = {
  title: "Transparência | ABPMC",
  description: "Informações de transparência da ABPMC.",
};

export default function TransparenciaPage() {
  return (
    <>
      <HeaderInterno titulo="Transparência" />
      <main className="bg-[#FEFEFE]">
        <section className="max-w-[1100px] mx-auto px-6 md:px-8 py-20 md:py-28">
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-700 text-lg mb-8">
              A ABPMC preza pela transparência em suas ações e gestão. Confira abaixo as informações institucionais.
            </p>
            
            <div className="bg-white rounded-2xl shadow-md p-8 md:p-10 mb-6">
              <h2 className="text-[#0B2E47] font-semibold text-2xl mb-4">
                Documentos e Relatórios
              </h2>
              <p className="text-gray-600 mb-4">
                Em breve disponibilizaremos relatórios financeiros, atas de reuniões e outros documentos de transparência.
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-md p-8 md:p-10 mb-6">
              <h2 className="text-[#0B2E47] font-semibold text-2xl mb-4">
                Prestação de Contas
              </h2>
              <p className="text-gray-600">
                Informações sobre prestação de contas serão disponibilizadas em breve.
              </p>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
