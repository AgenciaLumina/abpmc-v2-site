import type { Metadata } from "next";
import HeaderInterno from "@/components/layout/HeaderInterno";

export const metadata: Metadata = {
  title: "Comissão ABPMC Comunidade | ABPMC",
  description: "Comissão de Comunidade da ABPMC.",
};

export default function ComissaoComunidadePage() {
  return (
    <>
      <HeaderInterno titulo="Comissão ABPMC Comunidade" />
      <main className="bg-[#FEFEFE]">
        <section className="max-w-[1100px] mx-auto px-6 md:px-8 py-20 md:py-28">
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-700 text-lg mb-8">
              A Comissão ABPMC Comunidade promove ações que fortalecem a comunidade de analistas do comportamento.
            </p>
            
            <div className="bg-white rounded-2xl shadow-md p-8 md:p-10 mb-6">
              <h2 className="text-[#0B2E47] font-semibold text-2xl mb-4">
                Objetivos
              </h2>
              <p className="text-gray-700">
                Fortalecer os laços entre membros da comunidade ABPMC e promover iniciativas colaborativas.
              </p>
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
