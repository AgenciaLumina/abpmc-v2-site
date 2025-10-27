import type { Metadata } from "next";
import HeaderInterno from "@/components/layout/HeaderInterno";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Eventos ABPMC | Associação Brasileira de Psicologia e Medicina Comportamental",
  description: "Confira os próximos eventos, congressos e encontros organizados pela ABPMC.",
};

// Dados temporários - futuramente virão do banco de dados
const eventosProximos = [
  {
    id: 1,
    slug: "encontro-abpmc-2025",
    titulo: "XXXIV Encontro Anual da ABPMC",
    tipo: "Congresso",
    data: "Novembro 2025",
    descricao: "O maior evento de Análise do Comportamento da América Latina, com palestras, simpósios e minicursos.",
    imagem: "/uploads/evento01.jpg",
  },
  {
    id: 2,
    slug: "jornada-regional-sp",
    titulo: "Jornada Regional ABPMC - São Paulo",
    tipo: "Jornada",
    data: "Agosto 2025",
    descricao: "Eventos regionais para integração e discussão de temas relevantes em Análise do Comportamento.",
    imagem: "/uploads/evento02.jpg",
  },
  {
    id: 3,
    slug: "congresso-infantil",
    titulo: "II Congresso de Análise do Comportamento Infantil",
    tipo: "Congresso",
    data: "Setembro 2025",
    descricao: "Encontro especializado em práticas baseadas em evidências para crianças e adolescentes.",
    imagem: "/uploads/evento03.jpg",
  },
  {
    id: 4,
    slug: "jornada-sul",
    titulo: "Jornada Regional ABPMC - Região Sul",
    tipo: "Jornada",
    data: "Outubro 2025",
    descricao: "Integração dos profissionais da região sul com apresentação de trabalhos e debates.",
    imagem: "/uploads/evento04.jpg",
  },
];

export default function EventosPage() {
  return (
    <>
      <HeaderInterno titulo="Eventos ABPMC" />
      
      <main className="bg-white">
        {/* Introdução */}
        <section className="py-20 px-6 md:px-16">
          <div className="max-w-5xl mx-auto text-center">
            <p className="text-lg leading-relaxed">
              Acompanhe os eventos e encontros promovidos pela ABPMC, voltados ao desenvolvimento científico e à disseminação da Análise do Comportamento no Brasil.
            </p>
          </div>
        </section>

        {/* Bloco Gradiente */}
        <section className="w-full bg-gradient-to-b from-[#0B2E47] to-[#163B56] py-[60px] text-center text-white">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-2xl font-semibold mb-2">Próximos Eventos</h2>
            <p className="max-w-3xl mx-auto text-base text-[#E8EEF3]">
              Participe de congressos, jornadas e encontros regionais organizados pela ABPMC.
            </p>
          </div>
        </section>

        {/* Grid de Eventos */}
        <section className="py-20 px-6 md:px-16">
          <div className="grid md:grid-cols-2 gap-10 max-w-6xl mx-auto">
            {eventosProximos.map((evento) => (
              <article 
                key={evento.id}
                className="bg-white border border-[#e6e8ef] rounded-2xl shadow-[0_10px_32px_rgba(2,12,27,.05)] overflow-hidden hover:shadow-[0_20px_50px_rgba(2,12,27,.1)] transition-shadow"
              >
                {/* Imagem do Evento */}
                <div className="relative w-full h-56 bg-gray-200">
                  <Image
                    src={evento.imagem}
                    alt={evento.titulo}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>

                {/* Conteúdo do Card */}
                <div className="p-6">
                  <span className="block text-sm text-[#2b4e6d] mb-2">
                    {evento.tipo} / {evento.data}
                  </span>
                  <h2 className="text-xl font-semibold text-[#0F265C] mb-3">
                    {evento.titulo}
                  </h2>
                  <p className="text-[#5a6575] mb-4 line-clamp-3">
                    {evento.descricao}
                  </p>
                  <Link 
                    href={`/eventos/${evento.slug}`}
                    className="inline-block bg-[#2b4e6d] hover:bg-[#22949e] text-white rounded-full px-6 py-2 text-sm font-medium transition-colors"
                  >
                    Saiba Mais
                  </Link>
                </div>
              </article>
            ))}
          </div>

          {/* Seção de Eventos Passados */}
          <div className="max-w-6xl mx-auto mt-20">
            <div className="border-t border-gray-200 pt-16">
              <h2 className="text-3xl font-semibold text-[#0F265C] mb-8 text-center">
                Eventos Anteriores
              </h2>
              <div className="bg-white border border-[#e6e8ef] rounded-2xl p-8 text-center">
                <p className="text-[#5a6575] mb-6">
                  Acesse os materiais, anais e gravações dos eventos anteriores da ABPMC.
                </p>
                <Link
                  href="/eventos/anteriores"
                  className="inline-block bg-[#2C74FF] hover:bg-[#22949e] text-white rounded-full px-8 py-3 font-medium text-sm transition-colors"
                >
                  Ver Eventos Passados
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
