import type { Metadata } from "next";
import HeaderInterno from "@/components/layout/HeaderInterno";

export const metadata: Metadata = {
  title: "Releases | ABPMC",
  description: "Releases para imprensa da ABPMC.",
};

export default function ReleasesPage() {
  return (
    <>
      <HeaderInterno titulo="Releases para Imprensa" />
      <main className="bg-[#FEFEFE]">
        <section className="max-w-[1100px] mx-auto px-6 md:px-8 py-20 md:py-28">
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-700 text-lg mb-8">
              Acesse os comunicados oficiais e releases para imprensa da ABPMC.
            </p>
            
            <div className="bg-white rounded-2xl shadow-md p-8 md:p-10 mb-6">
              <h2 className="text-[#0B2E47] font-semibold text-2xl mb-4">
                Comunicados Recentes
              </h2>
              <p className="text-gray-600">
                Nenhum release disponível no momento. Esta página será atualizada com novos comunicados quando publicados.
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-md p-8 md:p-10 mb-6">
              <h2 className="text-[#0B2E47] font-semibold text-2xl mb-4">
                Contato para Imprensa
              </h2>
              <p className="text-gray-700">
                Para mais informações ou solicitações de entrevistas, entre em contato através do e-mail: <a href="mailto:abpmc@abpmc.org.br" className="text-[#01C2CE] hover:underline">abpmc@abpmc.org.br</a>
              </p>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
