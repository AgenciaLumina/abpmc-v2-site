import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import RenderHtml from '@/components/legacy/render-html'
import { Container } from '@/components/ui/container'
import PageWrapper from '@/components/layout/page-wrapper'

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
    }
  })

  if (!post) {
    notFound()
  }

  return (
    <PageWrapper>
      <Container className="py-8">
        <article>
          <header className="mb-8">
            <h1 className="font-outfit text-4xl font-bold mb-4 text-neutral-700">{post.title}</h1>
            
            <div className="text-neutral-500 text-sm mb-4">
              {post.publishedAt && (
                <span>
                  Publicado em {new Date(post.publishedAt).toLocaleDateString('pt-BR')}
                </span>
              )}
              {post.author && (
                <span className="ml-4">Por: {post.author}</span>
              )}
            </div>

            {post.excerpt && (
              <div className="text-lg text-neutral-600 italic border-l-4 border-primary-500 pl-4 mb-6">
                {post.excerpt}
              </div>
            )}
          </header>

          <RenderHtml html={post.html} />
        </article>
      </Container>
    </PageWrapper>
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
