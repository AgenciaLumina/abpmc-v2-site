import type { Metadata } from "next";
import HeaderInterno from "@/components/layout/HeaderInterno";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Em Breve | ABPMC",
  description: "Conteúdo em breve disponível nesta seção da ABPMC.",
};

export default function EmBrevePage() {
  return (
    <>
      <HeaderInterno titulo="Em Breve" />
      
      <main className="bg-white">
        {/* Conteúdo Central */}
        <section className="py-32 flex justify-center items-center text-center">
          <h2 className="text-[#021228] text-[46px] md:text-[56px] font-medium">
            Em Breve
          </h2>
        </section>

        {/* Bloco Gradiente */}
        <section className="w-full bg-gradient-to-b from-[#0B2E47] to-[#163B56] py-[60px] text-center text-white">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-2xl font-semibold mb-3">
              Estamos preparando novidades
            </h2>
            <p className="max-w-2xl mx-auto text-[#E8EEF3]">
              Em breve você encontrará aqui novos conteúdos e atualizações sobre as atividades da ABPMC.{" "}
              <Link 
                href="/contato" 
                className="text-white underline hover:text-[#b6e6ff] transition-colors"
              >
                Fale conosco
              </Link>
              {" "}se desejar mais informações.
            </p>
          </div>
        </section>
      </main>
    </>
  );
}
