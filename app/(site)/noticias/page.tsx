import type { Metadata } from "next";
import HeaderInterno from "@/components/layout/HeaderInterno";
import Image from "next/image";
import Link from "next/link";
import { prisma } from "@/lib/prisma";

export const metadata: Metadata = {
  title: "Notícias e Artigos | ABPMC",
  description: "Acompanhe as últimas notícias, artigos e comunicados oficiais da ABPMC.",
};

export default async function NoticiasPage() {
  // Buscar posts do banco de dados
  const posts = await prisma.content.findMany({
    where: {
      type: "POST",
      status: "publish",
    },
    include: {
      terms: {
        include: {
          term: true,
        },
      },
    },
    orderBy: {
      publishedAt: "desc",
    },
    take: 20,
  });

  const formatDate = (date: Date | null) => {
    if (!date) return "";
    return new Date(date).toLocaleDateString("pt-BR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };
  return (
    <>
      <HeaderInterno titulo="Notícias e Artigos" />
      
      <main className="bg-white">
        {/* Introdução */}
        <section className="py-20 px-6 md:px-16">
          <div className="max-w-5xl mx-auto text-center">
            <p className="text-lg leading-relaxed">
              Acompanhe as principais novidades da ABPMC, atualizações institucionais, artigos científicos e comunicados oficiais.
            </p>
          </div>
        </section>

        {/* Bloco Gradiente */}
        <section className="w-full bg-gradient-to-b from-[#0B2E47] to-[#163B56] py-[60px] text-center text-white">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-2xl font-semibold mb-2">Últimas Publicações</h2>
            <p className="max-w-3xl mx-auto text-base text-[#E8EEF3]">
              Confira abaixo os conteúdos mais recentes da Associação Brasileira de Psicologia e Medicina Comportamental.
            </p>
          </div>
        </section>

        {/* Listagem de Posts */}
        <section className="py-20 px-6 md:px-16">
          {posts.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-lg text-gray-600">Nenhuma notícia publicada ainda.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-10 max-w-6xl mx-auto">
              {posts.map((post) => {
                const categoria = post.terms.length > 0 ? post.terms[0].term.name : "Notícias";
                
                return (
                  <article 
                    key={post.id}
                    className="bg-white border border-[#e6e8ef] rounded-2xl shadow-[0_10px_32px_rgba(2,12,27,.05)] overflow-hidden hover:shadow-[0_20px_50px_rgba(2,12,27,.1)] transition-shadow"
                  >
                    {/* Imagem do Post - Placeholder por enquanto */}
                    <div className="relative w-full h-56 bg-gradient-to-br from-[#0B2E47] to-[#22949e] flex items-center justify-center">
                      <svg className="w-16 h-16 text-white/30" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"/>
                      </svg>
                    </div>

                    {/* Conteúdo do Card */}
                    <div className="p-6">
                      <span className="block text-sm text-[#2b4e6d] mb-2">
                        [{categoria}] / {formatDate(post.publishedAt)}
                      </span>
                      <h2 className="text-xl font-semibold text-[#0F265C] mb-3">
                        {post.title}
                      </h2>
                      {post.excerpt && (
                        <p className="text-[#5a6575] mb-4 line-clamp-3">
                          {post.excerpt}
                        </p>
                      )}
                      <Link 
                        href={`/p/${post.slug}`}
                        className="inline-block bg-[#2b4e6d] hover:bg-[#22949e] text-white rounded-full px-6 py-2 text-sm font-medium transition-colors"
                      >
                        Ler Mais
                      </Link>
                    </div>
                  </article>
                );
              })}
            </div>
          )}

          {/* Mensagem se houver mais posts */}
          {posts.length === 20 && (
            <div className="text-center mt-16">
              <p className="text-gray-600 text-sm">
                Mostrando as 20 notícias mais recentes
              </p>
            </div>
          )}
        </section>
      </main>
    </>
  );
}
