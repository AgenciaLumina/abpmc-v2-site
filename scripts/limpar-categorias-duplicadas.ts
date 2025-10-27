import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🧹 Limpando categorias duplicadas...\n");

  // 1. Buscar todas as categorias
  const categories = await prisma.term.findMany({
    where: { taxonomy: "category" },
    include: {
      contents: true,
    },
    orderBy: { name: "asc" },
  });

  console.log(`📊 Total de categorias: ${categories.length}\n`);

  // 2. Agrupar por nome normalizado
  const grouped = new Map<string, typeof categories>();

  for (const cat of categories) {
    const normalized = cat.name
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^\w\s]/g, "")
      .trim();

    if (!grouped.has(normalized)) {
      grouped.set(normalized, []);
    }
    grouped.get(normalized)!.push(cat);
  }

  console.log("🔍 Categorias agrupadas por nome normalizado:\n");

  let totalMerged = 0;

  for (const [normalized, cats] of Array.from(grouped.entries())) {
    if (cats.length > 1) {
      console.log(`\n📁 "${normalized}" tem ${cats.length} duplicatas:`);
      cats.forEach((c) => {
        console.log(`   - ID: ${c.id}, Nome: "${c.name}", Slug: "${c.slug}", Posts: ${c.contents.length}`);
      });

      // Escolher qual manter (o que tem mais posts ou o primeiro)
      const sortedByPosts = [...cats].sort((a, b) => b.contents.length - a.contents.length);
      const keepCat = sortedByPosts[0];
      const removeCats = sortedByPosts.slice(1);

      console.log(`   ✅ Mantendo: ID ${keepCat.id} - "${keepCat.name}" (${keepCat.contents.length} posts)`);
      console.log(`   ❌ Removendo: ${removeCats.map((c) => `ID ${c.id}`).join(", ")}`);

      // Mover todos os posts das duplicatas para a categoria principal
      for (const removeCat of removeCats) {
        if (removeCat.contents.length > 0) {
          console.log(`      → Movendo ${removeCat.contents.length} posts de ID ${removeCat.id} para ID ${keepCat.id}...`);

          for (const contentTerm of removeCat.contents) {
            // Verificar se já existe essa associação
            const exists = await prisma.contentTerm.findUnique({
              where: {
                contentId_termId: {
                  contentId: contentTerm.contentId,
                  termId: keepCat.id,
                },
              },
            });

            if (!exists) {
              await prisma.contentTerm.create({
                data: {
                  contentId: contentTerm.contentId,
                  termId: keepCat.id,
                },
              });
            }
          }

          // Remover associações antigas
          await prisma.contentTerm.deleteMany({
            where: { termId: removeCat.id },
          });
        }

        // Deletar categoria duplicada
        await prisma.term.delete({
          where: { id: removeCat.id },
        });

        totalMerged++;
      }
    } else {
      console.log(`✅ "${cats[0].name}" - única (${cats[0].contents.length} posts)`);
    }
  }

  console.log(`\n\n✅ Limpeza concluída!`);
  console.log(`📊 ${totalMerged} categorias duplicadas foram mescladas/removidas.\n`);

  // Listar categorias finais
  const finalCategories = await prisma.term.findMany({
    where: { taxonomy: "category" },
    include: {
      _count: {
        select: { contents: true },
      },
    },
    orderBy: { name: "asc" },
  });

  console.log("📁 Categorias finais:\n");
  finalCategories.forEach((cat) => {
    console.log(`   - ${cat.name} (${cat._count.contents} posts) - /${cat.slug}`);
  });

  console.log(`\n📊 Total final: ${finalCategories.length} categorias\n`);
}

main()
  .catch((error) => {
    console.error("❌ Erro:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
