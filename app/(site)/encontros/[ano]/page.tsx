import type { Metadata } from "next";
import HeaderInterno from "@/components/layout/HeaderInterno";
import { getEncontroByAno, getAllEncontros } from "@/lib/encontros-data";
import { notFound } from "next/navigation";
import Link from "next/link";

type Props = {
  params: { ano: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const encontro = getEncontroByAno(params.ano);
  
  if (!encontro) {
    return {
      title: "Encontro não encontrado | ABPMC",
    };
  }
  
  return {
    title: `${encontro.numeroRomano}º Encontro ABPMC - ${encontro.ano} | ABPMC`,
    description: `${encontro.tema}. Realizado em ${encontro.local}.`,
  };
}

export async function generateStaticParams() {
  const encontros = getAllEncontros();
  return encontros.map((encontro) => ({
    ano: encontro.ano,
  }));
}

export default function EncontroPage({ params }: Props) {
  const encontro = getEncontroByAno(params.ano);
  
  if (!encontro) {
    notFound();
  }

  return (
    <>
      <HeaderInterno titulo={`${encontro.numeroRomano}º Encontro ABPMC - ${encontro.ano}`} />
      
      <main className="bg-white">
        {/* Informações do Encontro */}
        <section className="py-20 px-6 md:px-16">
          <div className="max-w-5xl mx-auto space-y-8">
            
            {/* Card Principal */}
            <div className="bg-white border border-[#e6e8ef] rounded-2xl p-8 shadow-md">
              <h2 className="text-2xl font-semibold text-[#0B2E47] mb-6">
                {encontro.tema}
              </h2>
              
              <div className="grid md:grid-cols-2 gap-6 text-lg">
                <div className="space-y-3">
                  <p className="text-[#5a6575]">
                    <strong className="text-[#0B2E47]">Local:</strong>{" "}
                    {encontro.local}
                  </p>
                  <p className="text-[#5a6575]">
                    <strong className="text-[#0B2E47]">Data:</strong>{" "}
                    {encontro.data}
                  </p>
                </div>
                {encontro.participantes && (
                  <div className="space-y-3">
                    <p className="text-[#5a6575]">
                      <strong className="text-[#0B2E47]">Participantes:</strong>{" "}
                      {encontro.participantes}
                    </p>
                  </div>
                )}
              </div>

              {encontro.descricao && (
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <p className="text-[#5a6575] leading-relaxed">
                    {encontro.descricao}
                  </p>
                </div>
              )}
            </div>

            {/* Anais (se disponível) */}
            {encontro.anaisUrl ? (
              <div className="bg-gradient-to-br from-[#f8f9fa] to-[#e8eef3] rounded-2xl p-8 text-center">
                <h3 className="text-xl font-semibold text-[#0B2E47] mb-4">
                  Anais do Encontro
                </h3>
                <p className="text-[#5a6575] mb-6">
                  Acesse os anais completos com todos os trabalhos apresentados neste encontro.
                </p>
                <a 
                  href={encontro.anaisUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#2b4e6d] hover:bg-[#22949e] text-white px-8 py-3 rounded-full font-medium transition-colors"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 384 512">
                    <path d="M64 0C28.7 0 0 28.7 0 64V448c0 35.3 28.7 64 64 64H320c35.3 0 64-28.7 64-64V160H256c-17.7 0-32-14.3-32-32V0H64zM256 0V128H384L256 0zM112 256H272c8.8 0 16 7.2 16 16s-7.2 16-16 16H112c-8.8 0-16-7.2-16-16s7.2-16 16-16zm0 64H272c8.8 0 16 7.2 16 16s-7.2 16-16 16H112c-8.8 0-16-7.2-16-16s7.2-16 16-16zm0 64H272c8.8 0 16 7.2 16 16s-7.2 16-16 16H112c-8.8 0-16-7.2-16-16s7.2-16 16-16z"/>
                  </svg>
                  Baixar Anais
                </a>
              </div>
            ) : (
              <div className="bg-gray-50 border border-gray-200 rounded-2xl p-8 text-center">
                <p className="text-[#5a6575]">
                  Anais deste encontro ainda não disponíveis para download.
                </p>
              </div>
            )}

            {/* Link para histórico */}
            <div className="text-center pt-6">
              <Link
                href="/encontros/historico"
                className="inline-flex items-center gap-2 text-[#2b4e6d] hover:text-[#22949e] font-medium transition-colors"
              >
                ← Voltar para Histórico de Encontros
              </Link>
            </div>

          </div>
        </section>

        {/* Bloco Gradiente */}
        <section className="w-full bg-gradient-to-b from-[#0B2E47] to-[#163B56] py-[60px] text-center text-white">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-2xl font-semibold mb-3">
              Preservando a História da ABPMC
            </h2>
            <p className="max-w-2xl mx-auto text-[#E8EEF3]">
              Desde 1992, a ABPMC promove encontros que reúnem profissionais e pesquisadores da Análise do Comportamento, fortalecendo a comunidade científica brasileira.
            </p>
          </div>
        </section>
      </main>
    </>
  );
}
