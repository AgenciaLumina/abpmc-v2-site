import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("\n" + "=".repeat(60));
  console.log("📊 RELATÓRIO COMPLETO DO BANCO DE DADOS - ABPMC v2");
  console.log("=".repeat(60) + "\n");
  
  // PÁGINAS
  const pages = await prisma.content.findMany({
    where: { type: 'PAGE' },
    select: { slug: true, title: true, status: true },
    orderBy: { title: 'asc' }
  });
  
  console.log(`📄 PÁGINAS: ${pages.length} total\n`);
  pages.forEach((p, i) => {
    const status = p.status === 'publish' ? '✅' : '⚠️';
    console.log(`   ${String(i + 1).padStart(2, '0')}. ${status} ${p.title}`);
  });
  
  // POSTS
  const postsTotal = await prisma.content.count({ where: { type: 'POST' } });
  const postsPublished = await prisma.content.count({ 
    where: { type: 'POST', status: 'publish' } 
  });
  
  console.log(`\n📰 NOTÍCIAS/POSTS: ${postsTotal} total (${postsPublished} publicadas)\n`);
  
  // Posts por ano
  const postsByYear = await prisma.$queryRaw<Array<{year: number, count: bigint}>>`
    SELECT 
      EXTRACT(YEAR FROM "publishedAt") as year,
      COUNT(*) as count
    FROM contents
    WHERE type = 'POST' AND "publishedAt" IS NOT NULL
    GROUP BY year
    ORDER BY year DESC
  `;
  
  console.log("   📅 Distribuição por ano:");
  postsByYear.forEach(row => {
    console.log(`      ${row.year}: ${row.count} posts`);
  });
  
  // Categorias
  const categories = await prisma.term.findMany({
    where: { taxonomy: 'category' },
    select: { 
      name: true, 
      _count: { select: { contents: true } } 
    },
    orderBy: { name: 'asc' }
  });
  
  console.log(`\n🏷️  CATEGORIAS: ${categories.length} total\n`);
  categories.forEach((cat, i) => {
    console.log(`   ${String(i + 1).padStart(2, '0')}. ${cat.name}: ${cat._count.contents} posts`);
  });
  
  // Estatísticas
  console.log("\n" + "=".repeat(60));
  console.log("📊 ESTATÍSTICAS FINAIS:");
  console.log("=".repeat(60));
  console.log(`   Páginas:           ${pages.length}`);
  console.log(`   Notícias:          ${postsTotal}`);
  console.log(`   Total:             ${pages.length + postsTotal}`);
  console.log(`   Categorias:        ${categories.length}`);
  console.log("=".repeat(60) + "\n");
  
  await prisma.$disconnect();
}

main().catch(console.error);
