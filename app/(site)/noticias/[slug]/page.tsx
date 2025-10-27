import type { Metadata } from "next";
import HeaderInterno from "@/components/layout/HeaderInterno";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

// Dados temporários - futuramente virão do banco de dados
const posts = [
  {
    id: 1,
    slug: "titulo-da-noticia",
    title: "Título da Notícia ou Artigo",
    excerpt: "Resumo breve do conteúdo, para incentivar o clique e a leitura completa da notícia.",
    category: "Categoria",
    date: "Agosto 20, 2025",
    image: "/uploads/noticia-01.jpg",
    content: `
      <p>Este é o conteúdo completo da notícia. Aqui você pode incluir parágrafos detalhados, imagens, citações e outros elementos necessários para uma matéria completa.</p>
      
      <p>A ABPMC tem como missão promover o desenvolvimento da Análise do Comportamento no Brasil, através de eventos, publicações científicas e ações de integração da comunidade acadêmica e profissional.</p>
      
      <h2>Subtítulo da Seção</h2>
      <p>Mais conteúdo relevante sobre o tema abordado na notícia. Este é um exemplo de como o conteúdo será estruturado nas páginas de notícias individuais.</p>
      
      <p>Para mais informações, entre em contato conosco através do email institucional.</p>
    `,
  },
  {
    id: 2,
    slug: "outra-noticia",
    title: "Outra Notícia Importante",
    excerpt: "Resumo breve do artigo, mantendo consistência de layout e acessibilidade visual.",
    category: "Categoria",
    date: "Julho 28, 2025",
    image: "/uploads/noticia-02.jpg",
    content: `
      <p>Conteúdo completo da segunda notícia...</p>
    `,
  },
];

// Gerar metadata dinâmico
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = posts.find((p) => p.slug === params.slug);
  
  if (!post) {
    return {
      title: "Post não encontrado | ABPMC",
    };
  }

  return {
    title: `${post.title} | ABPMC`,
    description: post.excerpt,
  };
}

export default function PostPage({ params }: { params: { slug: string } }) {
  const post = posts.find((p) => p.slug === params.slug);

  if (!post) {
    notFound();
  }

  return (
    <>
      <HeaderInterno titulo={post.title} />
      
      <main className="bg-white">
        {/* Conteúdo do Post */}
        <article className="py-20 px-6 md:px-16">
          <div className="max-w-4xl mx-auto">
            
            {/* Metadados */}
            <div className="text-center mb-8">
              <span className="inline-block text-sm text-[#2b4e6d] font-medium mb-4">
                [{post.category}] • {post.date}
              </span>
            </div>

            {/* Imagem Destaque */}
            <div className="relative w-full h-[400px] rounded-2xl overflow-hidden mb-12 bg-gray-200">
              <Image
                src={post.image}
                alt={post.title}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 1024px) 100vw, 1024px"
              />
            </div>

            {/* Conteúdo Principal */}
            <div 
              className="prose prose-lg max-w-none
                prose-headings:text-[#0F265C] prose-headings:font-semibold
                prose-p:text-[#222] prose-p:leading-relaxed prose-p:mb-6
                prose-a:text-[#2b4e6d] prose-a:no-underline hover:prose-a:text-[#22949e]
                prose-strong:text-[#0F265C]
                prose-ul:text-[#222]
                prose-ol:text-[#222]
              "
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {/* Botão Voltar */}
            <div className="mt-16 pt-8 border-t border-gray-200">
              <Link 
                href="/noticias"
                className="inline-flex items-center text-[#2b4e6d] hover:text-[#22949e] font-medium transition-colors"
              >
                <svg 
                  className="w-5 h-5 mr-2" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M10 19l-7-7m0 0l7-7m-7 7h18" 
                  />
                </svg>
                Voltar para Notícias
              </Link>
            </div>
          </div>
        </article>

        {/* Posts Relacionados */}
        <section className="bg-[#f8f9fa] py-20 px-6 md:px-16">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-semibold text-[#0F265C] mb-8 text-center">
              Outras Notícias
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              {posts
                .filter((p) => p.slug !== post.slug)
                .slice(0, 3)
                .map((relatedPost) => (
                  <Link
                    key={relatedPost.id}
                    href={`/noticias/${relatedPost.slug}`}
                    className="group bg-white border border-[#e6e8ef] rounded-xl overflow-hidden hover:shadow-lg transition-shadow"
                  >
                    <div className="relative w-full h-48 bg-gray-200">
                      <Image
                        src={relatedPost.image}
                        alt={relatedPost.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="text-lg font-semibold text-[#0F265C] mb-2 group-hover:text-[#22949e] transition-colors line-clamp-2">
                        {relatedPost.title}
                      </h3>
                      <p className="text-sm text-[#5a6575] line-clamp-2">
                        {relatedPost.excerpt}
                      </p>
                    </div>
                  </Link>
                ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
