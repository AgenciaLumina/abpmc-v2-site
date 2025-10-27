import type { Metadata } from "next";
import HeaderInterno from "@/components/layout/HeaderInterno";

export const metadata: Metadata = {
  title: "Publicações ABPMC | Associação Brasileira de Psicologia e Medicina Comportamental",
  description: "Confira as publicações, livros e cartilhas produzidos e apoiados pela ABPMC. Todos disponíveis para download gratuito.",
};

const livros = [
  {
    titulo: "Ensinar e Aprender – Desafios para Educação do Século XXI",
    descricao: "Obra organizada por Aline Beckmann Menezes, com contribuições de grandes nomes da Análise do Comportamento voltadas à educação contemporânea.",
    url: "https://abpmc.org.br/wp-content/uploads/2022/09/LIVRO-ENSINAR-E-APRENDER.pdf",
  },
  {
    titulo: "Contribuições das Ciências do Comportamento em Tempos de Pandemia",
    descricao: "Coletânea organizada por Simone Martin Oliani e equipe, com intervenções e reflexões comportamentais no contexto da pandemia.",
    url: "https://abpmc.org.br/wp-content/uploads/2021/12/Contribuições-das-ciências-do-Comportamento-em-tempos-de-pandemia-2021-Ed-ABPMC.pdf",
  },
];

const cartilhas = [
  {
    titulo: "Ele é Autista: Como Posso Ajudar na Intervenção?",
    descricao: "Cartilha elaborada por Marilu Borba e Romariz Barros, com orientações práticas para familiares e profissionais que atuam com TEA.",
    url: "https://abpmc.org.br/wp-content/uploads/2021/08/1521132529400bef4bf.pdf",
  },
  {
    titulo: "Como Fazer Eventos de Análise do Comportamento?",
    descricao: "Produzida pela Comissão de JACs e Eventos Regionais da ABPMC, com orientações passo a passo para organização de jornadas e encontros.",
    url: "https://abpmc.org.br/wp-content/uploads/2021/08/14388938562b5ca36b.pdf",
  },
];

export default function PublicacoesPage() {
  return (
    <>
      <HeaderInterno titulo="Publicações ABPMC" />
      
      <main className="bg-white">
        {/* Introdução */}
        <section className="py-20 px-6 md:px-16">
          <div className="max-w-5xl mx-auto">
            <div className="bg-white border border-[#e6e8ef] rounded-2xl p-8 shadow-[0_12px_40px_rgba(16,24,40,.06)] text-[#5a6575] text-lg leading-relaxed">
              A ABPMC tem editado e apoiado a publicação de livros e cartilhas voltadas à Análise do Comportamento. Todas as obras estão disponíveis para download gratuito.
            </div>
          </div>
        </section>

        {/* Bloco Gradiente */}
        <section className="w-full bg-gradient-to-b from-[#0B2E47] to-[#163B56] py-[60px] text-center text-white">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-2xl font-semibold mb-2">Produção Científica Aberta</h2>
            <p className="max-w-3xl mx-auto text-base text-[#E8EEF3]">
              Confira abaixo livros e cartilhas publicados pela ABPMC e parceiros, com acesso gratuito para profissionais, estudantes e interessados na Análise do Comportamento.
            </p>
          </div>
        </section>

        {/* Conteúdo */}
        <section className="py-20 px-6 md:px-16">
          <div className="max-w-5xl mx-auto space-y-16">
            
            {/* Livros */}
            <div>
              <h2 className="text-3xl font-semibold text-[#0F265C] mb-6">Livros</h2>
              <div className="space-y-8">
                {livros.map((livro, index) => (
                  <div 
                    key={index}
                    className="flex flex-col md:flex-row justify-between items-center gap-6 bg-white border border-[#e6e8ef] rounded-2xl p-8 shadow-[0_22px_50px_rgba(2,12,27,.07)]"
                  >
                    <div>
                      <h3 className="text-xl font-semibold text-[#0f172a] mb-2">
                        {livro.titulo}
                      </h3>
                      <p className="text-[#5a6575] text-sm leading-relaxed">
                        {livro.descricao}
                      </p>
                    </div>
                    <a 
                      href={livro.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-[#2b4e6d] hover:bg-[#22949e] text-white rounded-full px-6 py-3 text-sm font-medium transition-colors whitespace-nowrap"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 384 512">
                        <path d="M64 0C28.7 0 0 28.7 0 64V448c0 35.3 28.7 64 64 64H320c35.3 0 64-28.7 64-64V160H256c-17.7 0-32-14.3-32-32V0H64zM256 0V128H384L256 0zM112 256H272c8.8 0 16 7.2 16 16s-7.2 16-16 16H112c-8.8 0-16-7.2-16-16s7.2-16 16-16zm0 64H272c8.8 0 16 7.2 16 16s-7.2 16-16 16H112c-8.8 0-16-7.2-16-16s7.2-16 16-16zm0 64H272c8.8 0 16 7.2 16 16s-7.2 16-16 16H112c-8.8 0-16-7.2-16-16s7.2-16 16-16z"/>
                      </svg>
                      Download
                    </a>
                  </div>
                ))}
              </div>
            </div>

            {/* Cartilhas */}
            <div>
              <h2 className="text-3xl font-semibold text-[#0F265C] mb-6">Cartilhas</h2>
              <div className="space-y-8">
                {cartilhas.map((cartilha, index) => (
                  <div 
                    key={index}
                    className="flex flex-col md:flex-row justify-between items-center gap-6 bg-white border border-[#e6e8ef] rounded-2xl p-8 shadow-[0_22px_50px_rgba(2,12,27,.07)]"
                  >
                    <div>
                      <h3 className="text-xl font-semibold text-[#0f172a] mb-2">
                        {cartilha.titulo}
                      </h3>
                      <p className="text-[#5a6575] text-sm leading-relaxed">
                        {cartilha.descricao}
                      </p>
                    </div>
                    <a 
                      href={cartilha.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-[#2b4e6d] hover:bg-[#22949e] text-white rounded-full px-6 py-3 text-sm font-medium transition-colors whitespace-nowrap"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 384 512">
                        <path d="M64 0C28.7 0 0 28.7 0 64V448c0 35.3 28.7 64 64 64H320c35.3 0 64-28.7 64-64V160H256c-17.7 0-32-14.3-32-32V0H64zM256 0V128H384L256 0zM112 256H272c8.8 0 16 7.2 16 16s-7.2 16-16 16H112c-8.8 0-16-7.2-16-16s7.2-16 16-16zm0 64H272c8.8 0 16 7.2 16 16s-7.2 16-16 16H112c-8.8 0-16-7.2-16-16s7.2-16 16-16zm0 64H272c8.8 0 16 7.2 16 16s-7.2 16-16 16H112c-8.8 0-16-7.2-16-16s7.2-16 16-16z"/>
                      </svg>
                      Download
                    </a>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </section>
      </main>
    </>
  );
}
