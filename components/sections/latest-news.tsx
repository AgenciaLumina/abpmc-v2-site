import { prisma } from "@/lib/prisma";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import NoticiaCard from "@/components/blog/NoticiaCard";

export default async function LatestNews() {
  const posts = await prisma.content.findMany({
    where: { type: "POST", status: "publish" },
    orderBy: { publishedAt: "desc" },
    take: 6,
    include: {
      terms: { select: { term: { select: { name: true, slug: true } } } },
    },
  });

  return (
    <section className="bg-neutral-50 py-14">
      <div className="mx-auto max-w-[1280px] px-6">
        {/* Fita "Informativos da ABPMC" */}
        <div className="flex justify-center">
          <span className="inline-block rounded-full bg-secondary-500/90 text-white px-4 py-1 text-sm font-semibold tracking-wide">
            INFORMATIVOS DA ABPMC
          </span>
        </div>

        <h2 className="mt-6 text-center text-3xl md:text-5xl font-extrabold text-[#0B1220]">
          Últimas Notícias & informações
        </h2>

        <div className="mt-10 flex flex-col gap-10">
          {posts.map((p: any) => {
            const cats = (p.terms || []).map((t: any) => t.term.name);
            const categoria = cats.length > 0 ? cats[0] : "Notícias";
            const data = p.publishedAt ? format(p.publishedAt, "MMMM d, yyyy", { locale: ptBR }) : "";

            return (
              <NoticiaCard
                key={p.id}
                titulo={p.title}
                categoria={categoria}
                data={data}
                link={`/p/${p.slug}`}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
