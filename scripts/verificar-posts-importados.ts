import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function verificarPosts() {
  console.log("\n📊 VERIFICANDO POSTS NO BANCO DE DADOS\n");
  console.log("=" .repeat(60));

  // Contar posts por tipo
  const totalPosts = await prisma.content.count({
    where: { type: "POST" },
  });

  // Contar por categoria
  const postsPorCategoria = await prisma.$queryRaw<
    Array<{ name: string; _count: number }>
  >`
    SELECT t.name, COUNT(ct."contentId") as _count
    FROM terms t
    LEFT JOIN content_terms ct ON t.id = ct."termId"
    LEFT JOIN contents c ON ct."contentId" = c.id
    WHERE t.taxonomy = 'category' AND c.type = 'POST'
    GROUP BY t.id, t.name
    ORDER BY _count DESC
  `;

  console.log(`\n📝 Total de posts importados: ${totalPosts}`);
  console.log("\n📂 Posts por categoria:");
  
  if (postsPorCategoria.length > 0) {
    postsPorCategoria.forEach((cat) => {
      console.log(`   ${cat.name}: ${cat._count} posts`);
    });
  } else {
    console.log("   Nenhuma categoria com posts ainda.");
  }

  // Posts mais recentes
  const postsRecentes = await prisma.content.findMany({
    where: { type: "POST" },
    orderBy: { publishedAt: "desc" },
    take: 5,
    select: {
      title: true,
      publishedAt: true,
    },
  });

  console.log("\n📅 5 posts mais recentes:");
  postsRecentes.forEach((post) => {
    const data = post.publishedAt
      ? new Date(post.publishedAt).toLocaleDateString("pt-BR")
      : "Sem data";
    console.log(`   ${data} - ${post.title}`);
  });

  console.log("\n" + "=".repeat(60));
  console.log(`\n✅ Total no banco: ${totalPosts} posts`);
  console.log(`🎯 Total nos XMLs: 379 posts`);
  console.log(`📥 Faltam importar: ${379 - totalPosts} posts\n`);
}

verificarPosts()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("❌ Erro:", error);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
