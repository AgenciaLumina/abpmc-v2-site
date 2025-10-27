import Image from "next/image";
import Link from "next/link";

interface PostCardProps {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  image: string;
}

export default function PostCard({
  slug,
  title,
  excerpt,
  category,
  date,
  image,
}: PostCardProps) {
  return (
    <article className="bg-white border border-[#e6e8ef] rounded-2xl shadow-[0_10px_32px_rgba(2,12,27,.05)] overflow-hidden hover:shadow-[0_20px_50px_rgba(2,12,27,.1)] transition-shadow">
      {/* Imagem do Post */}
      <Link href={`/noticias/${slug}`} className="block relative w-full h-56 bg-gray-200">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-300 hover:scale-105"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </Link>

      {/* Conteúdo do Card */}
      <div className="p-6">
        <span className="block text-sm text-[#2b4e6d] mb-2">
          [{category}] / {date}
        </span>
        <Link href={`/noticias/${slug}`}>
          <h2 className="text-xl font-semibold text-[#0F265C] mb-3 hover:text-[#22949e] transition-colors">
            {title}
          </h2>
        </Link>
        <p className="text-[#5a6575] mb-4 line-clamp-3">
          {excerpt}
        </p>
        <Link 
          href={`/noticias/${slug}`}
          className="inline-block bg-[#2b4e6d] hover:bg-[#22949e] text-white rounded-full px-6 py-2 text-sm font-medium transition-colors"
        >
          Ler Mais
        </Link>
      </div>
    </article>
  );
}
