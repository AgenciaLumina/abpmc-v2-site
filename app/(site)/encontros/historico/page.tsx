import type { Metadata } from "next";
import HeaderInterno from "@/components/layout/HeaderInterno";
import { getAllEncontros } from "@/lib/encontros-data";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Histórico de Encontros | ABPMC",
  description: "Conheça o histórico dos Encontros Anuais da ABPMC desde 1992.",
};

export default function HistoricoEncontrosPage() {
  const encontros = getAllEncontros();
  
  return (
    <>
      <HeaderInterno titulo="Histórico de Encontros ABPMC" />
      
      <main className="bg-white">
        {/* Introdução */}
        <section className="py-20 px-6 md:px-16">
          <div className="max-w-5xl mx-auto text-center mb-16">
            <p className="text-lg leading-relaxed">
              Desde 1992, a ABPMC promove encontros anuais que se tornaram o maior evento de Análise do Comportamento da América Latina. Conheça nossa história através dos {encontros.length} encontros já realizados.
            </p>
          </div>
        </section>

        {/* Bloco Gradiente */}
        <section className="w-full bg-gradient-to-b from-[#0B2E47] to-[#163B56] py-[60px] text-center text-white">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-2xl font-semibold mb-2">
              {encontros.length} Encontros Realizados
            </h2>
            <p className="max-w-3xl mx-auto text-base text-[#E8EEF3]">
              Mais de três décadas promovendo o desenvolvimento científico e profissional da Análise do Comportamento no Brasil.
            </p>
          </div>
        </section>

        {/* Timeline de Encontros */}
        <section className="py-20 px-6 md:px-16">
          <div className="max-w-4xl mx-auto">
            
            <div className="space-y-6">
              {encontros.map((encontro, index) => (
                <Link
                  key={encontro.ano}
                  href={`/encontros/${encontro.ano}`}
                  className="block group"
                >
                  <div className="flex gap-6 items-start bg-white border border-[#e6e8ef] rounded-2xl p-6 hover:shadow-lg hover:border-[#2b4e6d] transition-all duration-300">
                    
                    {/* Ano e Número */}
                    <div className="flex-shrink-0 text-center min-w-[80px]">
                      <div className="text-3xl font-bold text-[#2b4e6d] group-hover:text-[#22949e] transition-colors">
                        {encontro.numeroRomano}
                      </div>
                      <div className="text-sm text-[#5a6575] mt-1">
                        {encontro.ano}
                      </div>
                    </div>

                    {/* Conteúdo */}
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-[#0B2E47] mb-2 group-hover:text-[#22949e] transition-colors">
                        {encontro.tema}
                      </h3>
                      <div className="space-y-1 text-sm text-[#5a6575]">
                        <p>
                          <strong>Local:</strong> {encontro.local}
                        </p>
                        <p>
                          <strong>Data:</strong> {encontro.data}
                        </p>
                        {encontro.participantes && (
                          <p>
                            <strong>Participantes:</strong> {encontro.participantes}
                          </p>
                        )}
                      </div>

                      {encontro.anaisUrl && (
                        <div className="mt-3">
                          <span className="inline-flex items-center gap-2 text-[#2b4e6d] text-sm font-medium">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 384 512">
                              <path d="M64 0C28.7 0 0 28.7 0 64V448c0 35.3 28.7 64 64 64H320c35.3 0 64-28.7 64-64V160H256c-17.7 0-32-14.3-32-32V0H64zM256 0V128H384L256 0z"/>
                            </svg>
                            Anais disponíveis
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Seta */}
                    <div className="flex-shrink-0">
                      <svg 
                        className="w-6 h-6 text-[#2b4e6d] group-hover:text-[#22949e] group-hover:translate-x-1 transition-all" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>

                  </div>
                </Link>
              ))}
            </div>

          </div>
        </section>

        {/* CTA */}
        <section className="w-full bg-gradient-to-b from-[#0B2E47] to-[#163B56] py-[60px] text-center text-white">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-2xl font-semibold mb-4">
              Faça parte da nossa história
            </h2>
            <p className="max-w-2xl mx-auto text-[#E8EEF3] mb-8">
              Participe dos próximos encontros e contribua para o desenvolvimento da Análise do Comportamento no Brasil.
            </p>
            <Link
              href="/eventos"
              className="inline-block bg-white text-[#0B2E47] font-semibold px-8 py-4 rounded-full shadow-lg hover:bg-[#e6f0f5] transition-colors"
            >
              Ver Próximos Eventos
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
