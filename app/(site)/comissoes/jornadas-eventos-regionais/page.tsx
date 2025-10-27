import type { Metadata } from "next";
import HeaderInterno from "@/components/layout/HeaderInterno";

export const metadata: Metadata = {
  title: "Comissão de Jornadas e Eventos Regionais | ABPMC",
  description: "Conheça os membros da Comissão de Jornadas e Eventos Regionais da ABPMC.",
};

export default function ComissaoJornadasPage() {
  return (
    <>
      <HeaderInterno titulo="Comissão de Jornadas e Eventos Regionais" />
      
      <main className="bg-white">
        {/* Introdução */}
        <section className="py-20 px-6 md:px-16">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-lg text-[#222] leading-relaxed">
              A Comissão de Jornadas e Eventos Regionais da ABPMC é responsável por coordenar e apoiar os eventos regionais promovidos pela associação, incentivando o compartilhamento de conhecimento e o fortalecimento da comunidade científica em todo o Brasil.
            </p>
          </div>
        </section>

        {/* Bloco Gradiente */}
        <section className="w-full bg-gradient-to-b from-[#0B2E47] to-[#163B56] py-[60px] text-center text-white">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-2xl font-semibold mb-2">Integração e Desenvolvimento</h2>
            <p className="max-w-3xl mx-auto text-base text-[#E8EEF3]">
              A comissão trabalha para facilitar a comunicação entre as regionais e promover encontros que valorizam a diversidade e o crescimento coletivo.
            </p>
          </div>
        </section>

        {/* Coordenação e Membros */}
        <section className="py-20 px-6 md:px-16">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-semibold text-[#0F265C] mb-6 text-center">
              Coordenação e Membros
            </h2>
            <ul className="space-y-3 text-lg text-[#222] text-center">
              <li>
                <strong>Daniela Negreli Cassaniga</strong> — Coordenadora
              </li>
              <li>Rafaela de Medeiros Ribeiro</li>
              <li>Leonardo Cordeiro Svidzinski de Paulo</li>
              <li>Jamerson José Inácio Nascimento</li>
            </ul>
          </div>
        </section>

        {/* Contato */}
        <section className="pb-20 px-6 md:px-16">
          <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-[0_4px_20px_rgba(0,0,0,0.08)] p-8 text-center">
            <h3 className="text-xl font-semibold text-[#0F265C] mb-2">Contato</h3>
            <p className="text-[#444]">
              <strong>E-mail:</strong>{" "}
              <a 
                href="mailto:eventosregionais@abpmc.org.br" 
                className="text-[#2b4e6d] hover:text-[#22949e] underline"
              >
                eventosregionais@abpmc.org.br
              </a>
            </p>
          </div>
        </section>
      </main>
    </>
  );
}
