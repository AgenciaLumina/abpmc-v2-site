import type { Metadata } from "next";
import HeaderInterno from "@/components/layout/HeaderInterno";

export const metadata: Metadata = {
  title: "Projetos Comunidade | ABPMC",
  description: "Projetos da comunidade ABPMC.",
};

export default function ProjetosComunidadePage() {
  return (
    <>
      <HeaderInterno titulo="Projetos Comunidade" />
      <main className="bg-[#FEFEFE]">
        <section className="max-w-[1100px] mx-auto px-6 md:px-8 py-20 md:py-28">
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-700 text-lg mb-8">
              Conheça os projetos desenvolvidos pela comunidade ABPMC para promover a Análise do Comportamento.
            </p>
            
            <div className="bg-white rounded-2xl shadow-md p-8 md:p-10 mb-6">
              <h2 className="text-[#0B2E47] font-semibold text-2xl mb-4">
                Iniciativas Comunitárias
              </h2>
              <p className="text-gray-700 mb-4">
                A ABPMC apoia e promove diversos projetos que visam fortalecer a comunidade de analistas do comportamento no Brasil.
              </p>
              <p className="text-gray-600">
                Informações sobre projetos específicos serão disponibilizadas em breve.
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-md p-8 md:p-10 mb-6">
              <h2 className="text-[#0B2E47] font-semibold text-2xl mb-4">
                Como Participar
              </h2>
              <p className="text-gray-700">
                Para saber mais sobre como participar dos projetos comunitários, entre em contato através do e-mail: <a href="mailto:abpmc@abpmc.org.br" className="text-[#01C2CE] hover:underline">abpmc@abpmc.org.br</a>
              </p>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
