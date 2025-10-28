import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import RenderHtml from '@/components/legacy/render-html'
import HeaderInterno from '@/components/layout/HeaderInterno'
import type { Metadata } from 'next'
import Link from 'next/link'

export const dynamic = 'force-dynamic';

interface PostPageProps {
  params: {
    slug: string
  }
}

export default async function PostPage({ params }: PostPageProps) {
  const post = await prisma.content.findUnique({
    where: {
      slug: params.slug,
      type: 'POST'
    },
    include: {
      terms: {
        include: {
          term: true
        }
      }
    }
  })

  if (!post) {
    notFound()
  }

  const formatDate = (date: Date | null) => {
    if (!date) return '';
    return new Date(date).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
  };

  const categories = post.terms.filter(t => t.term.taxonomy === 'category');

  return (
    <>
      <HeaderInterno titulo={post.title} />
      
      <main className="bg-white">
        {/* Meta informações */}
        <section className="bg-gradient-to-b from-gray-50 to-white py-8 border-b border-gray-100">
          <div className="max-w-4xl mx-auto px-6">
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
              {/* Data */}
              {post.publishedAt && (
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span>{formatDate(post.publishedAt)}</span>
                </div>
              )}
              
              {/* Autor */}
              {post.author && (
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <span>{post.author}</span>
                </div>
              )}
              
              {/* Categorias */}
              {categories.length > 0 && (
                <div className="flex items-center gap-2 flex-wrap">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                  </svg>
                  {categories.map((cat, index) => (
                    <span key={cat.term.id}>
                      <Link
                        href={`/categoria/${cat.term.slug}`}
                        className="text-[#22949e] hover:underline"
                      >
                        {cat.term.name}
                      </Link>
                      {index < categories.length - 1 && <span className="mx-1">,</span>}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Excerpt */}
        {post.excerpt && (
          <section className="bg-blue-50 border-l-4 border-[#22949e] py-6">
            <div className="max-w-4xl mx-auto px-6">
              <p className="text-lg text-gray-700 italic leading-relaxed">
                {post.excerpt}
              </p>
            </div>
          </section>
        )}

        {/* Imagem Destacada */}
        {/* @ts-ignore - featuredImage será adicionado após migration */}
        {post.featuredImage && (
          <section className="py-8">
            <div className="max-w-4xl mx-auto px-6">
              {/* @ts-ignore */}
              <img
                src={post.featuredImage}
                alt={post.title}
                className="w-full h-auto rounded-lg shadow-lg"
              />
            </div>
          </section>
        )}

        {/* Conteúdo */}
        <article className="max-w-4xl mx-auto px-6 py-12">
          <div className="prose prose-lg max-w-none text-[#222] font-outfit leading-relaxed">
            <RenderHtml html={post.html} />
          </div>
        </article>

        {/* Voltar */}
        <section className="border-t border-gray-200 py-8">
          <div className="max-w-4xl mx-auto px-6">
            <Link
              href="/noticias"
              className="inline-flex items-center gap-2 text-[#2b4e6d] hover:text-[#22949e] transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Voltar para Notícias
            </Link>
          </div>
        </section>
      </main>
    </>
  )
}

// export async function generateStaticParams() {
//   const posts = await prisma.content.findMany({
//     where: {
//       type: 'POST',
//       status: 'publish'
//     },
//     select: {
//       slug: true
//     }
//   })

//   return posts.map((post) => ({
//     slug: post.slug,
//   }))
// }
