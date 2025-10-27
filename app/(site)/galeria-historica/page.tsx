import type { Metadata } from "next";
import HeaderInterno from "@/components/layout/HeaderInterno";

export const metadata: Metadata = {
  title: "Galeria Histórica | ABPMC",
  description: "Conheça registros, selos comemorativos e materiais históricos dos Encontros Anuais da ABPMC desde sua fundação.",
};

const registrosHistoricos = [
  {
    id: 1,
    titulo: "Pasta do I Encontro da ABPMC",
    descricao: "Realizado na UERJ, Rio de Janeiro, de 20 a 22 de novembro de 1992.",
  },
  {
    id: 2,
    titulo: "Homenagem a Roberto Banaco",
    descricao: "Realizada pelos monitores do VI Encontro da ABPMC, em Santos, setembro de 1997.",
  },
  {
    id: 3,
    titulo: "Banner comemorativo dos 18 anos da ABPMC",
    descricao: "Material produzido em celebração institucional.",
  },
  {
    id: 4,
    titulo: "Selo comemorativo do XVII Encontro",
    descricao: "Evento realizado em Campinas, 2008.",
  },
];

export default function GaleriaHistoricaPage() {
  return (
    <>
      <HeaderInterno titulo="Galeria Histórica ABPMC" />
      
      <main className="bg-white">
        {/* Grid de Registros Históricos */}
        <section className="py-20 px-6 md:px-16">
          <div className="max-w-5xl mx-auto grid gap-8">
            
            {registrosHistoricos.map((registro) => (
              <div 
                key={registro.id}
                className="bg-white border border-[#e6e8ef] rounded-2xl p-8 shadow-md hover:shadow-lg transition-shadow"
              >
                <h3 className="text-xl font-semibold text-[#0B2E47] mb-2">
                  {registro.titulo}
                </h3>
                <p className="text-[#555]">
                  {registro.descricao}
                </p>
              </div>
            ))}

          </div>
        </section>

        {/* Bloco Gradiente */}
        <section className="w-full bg-gradient-to-b from-[#0B2E47] to-[#163B56] py-[60px] text-center text-white">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-2xl font-semibold mb-3">
              Preservando a memória da Análise do Comportamento
            </h2>
            <p className="max-w-2xl mx-auto text-[#E8EEF3]">
              A ABPMC mantém viva a história da Análise do Comportamento no Brasil por meio de registros e eventos memoráveis.
            </p>
          </div>
        </section>
      </main>
    </>
  );
}
