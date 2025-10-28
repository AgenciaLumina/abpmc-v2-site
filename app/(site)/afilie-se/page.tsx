import type { Metadata } from "next";
import HeaderInterno from "@/components/layout/HeaderInterno";

export const metadata: Metadata = {
  title: "Afilie-se | ABPMC",
  description: "Processo de afiliação à ABPMC.",
};

export default function AfilieSePage() {
  return (
    <>
      <HeaderInterno titulo="Afilie-se à ABPMC" />
      <main className="bg-[#FEFEFE]">
        <section className="max-w-[1100px] mx-auto px-6 md:px-8 py-20 md:py-28">
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-700 text-lg mb-8">
              Torne-se um afiliado da ABPMC e fortaleça a rede de profissionais e instituições comprometidas com a Análise do Comportamento no Brasil.
            </p>
            
            <div className="bg-white rounded-2xl shadow-md p-8 md:p-10 mb-6">
              <h2 className="text-[#0B2E47] font-semibold text-2xl mb-4">
                O que é a Afiliação?
              </h2>
              <p className="text-gray-700 mb-4">
                A afiliação institucional permite que universidades, centros de pesquisa e outras instituições se conectem oficialmente à ABPMC, promovendo o desenvolvimento da Análise do Comportamento.
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-md p-8 md:p-10 mb-6">
              <h2 className="text-[#0B2E47] font-semibold text-2xl mb-4">
                Benefícios da Afiliação
              </h2>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Visibilidade institucional</li>
                <li>Participação em eventos da ABPMC</li>
                <li>Acesso a recursos e publicações</li>
                <li>Networking com outras instituições</li>
              </ul>
            </div>

            <div className="bg-white rounded-2xl shadow-md p-8 md:p-10 mb-6">
              <h2 className="text-[#0B2E47] font-semibold text-2xl mb-4">
                Como se Afiliar
              </h2>
              <p className="text-gray-700 mb-4">
                Para mais informações sobre o processo de afiliação, entre em contato conosco através do e-mail: <a href="mailto:abpmc@abpmc.org.br" className="text-[#01C2CE] hover:underline">abpmc@abpmc.org.br</a>
              </p>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
