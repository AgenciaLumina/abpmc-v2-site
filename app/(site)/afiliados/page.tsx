import type { Metadata } from "next";
import HeaderInterno from "@/components/layout/HeaderInterno";

export const metadata: Metadata = {
  title: "Afiliados | ABPMC",
  description: "Lista de instituições afiliadas à ABPMC.",
};

export default function AfiliadosPage() {
  return (
    <>
      <HeaderInterno titulo="Instituições Afiliadas" />
      <main className="bg-[#FEFEFE]">
        <section className="max-w-[1100px] mx-auto px-6 md:px-8 py-20 md:py-28">
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-700 text-lg mb-8">
              Conheça as instituições afiliadas à ABPMC que contribuem para o fortalecimento da Análise do Comportamento no Brasil.
            </p>
            
            <div className="bg-white rounded-2xl shadow-md p-8 md:p-10 mb-6">
              <h2 className="text-[#0B2E47] font-semibold text-2xl mb-4">
                Instituições Afiliadas
              </h2>
              <p className="text-gray-600">
                A lista de instituições afiliadas será disponibilizada em breve.
              </p>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
