import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("📊 VERIFICANDO CONTEÚDO NO BANCO DE DADOS\n");
  console.log("=".repeat(50));
  
  // Contar páginas
  const pagesCount = await prisma.content.count({
    where: { type: 'PAGE' }
  });
  
  const pagesPublished = await prisma.content.count({
    where: { type: 'PAGE', status: 'publish' }
  });
  
  // Contar posts/notícias
  const postsCount = await prisma.content.count({
    where: { type: 'POST' }
  });
  
  const postsPublished = await prisma.content.count({
    where: { type: 'POST', status: 'publish' }
  });
  
  // Total geral
  const totalContent = await prisma.content.count();
  
  console.log("\n📄 PÁGINAS:");
  console.log(`   Total: ${pagesCount}`);
  console.log(`   Publicadas: ${pagesPublished}`);
  
  console.log("\n📰 NOTÍCIAS/POSTS:");
  console.log(`   Total: ${postsCount}`);
  console.log(`   Publicadas: ${postsPublished}`);
  
  console.log("\n📊 RESUMO GERAL:");
  console.log(`   Total de conteúdos: ${totalContent}`);
  console.log(`   Páginas + Notícias: ${pagesCount} + ${postsCount} = ${pagesCount + postsCount}`);
  
  console.log("\n" + "=".repeat(50));
  
  // Listar algumas páginas
  console.log("\n📋 PÁGINAS CADASTRADAS (primeiras 10):");
  const pages = await prisma.content.findMany({
    where: { type: 'PAGE' },
    select: { slug: true, title: true, status: true },
    take: 10,
    orderBy: { createdAt: 'desc' }
  });
  
  pages.forEach((p, i) => {
    console.log(`   ${i + 1}. [${p.status}] ${p.title} (/${p.slug})`);
  });
  
  // Categorias
  console.log("\n🏷️  CATEGORIAS:");
  const categories = await prisma.term.findMany({
    where: { taxonomy: 'category' },
    select: { name: true, _count: { select: { contents: true } } }
  });
  
  categories.forEach(cat => {
    console.log(`   - ${cat.name}: ${cat._count.contents} posts`);
  });
  
  await prisma.$disconnect();
}

main().catch(console.error);
