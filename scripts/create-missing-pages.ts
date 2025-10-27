import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const missingPages = [
  {
    title: "Histórias e personagens",
    slug: "historias-e-personagens",
    html: "<h1>Histórias e personagens</h1>\n<p>Conteúdo em desenvolvimento.</p>",
    excerpt: "Histórias e personagens da ABPMC"
  },
  {
    title: "Assuntos Profissionais, Legais e Éticos",
    slug: "assuntos-profissionais-legais-e-eticos",
    html: "<h1>Assuntos Profissionais, Legais e Éticos</h1>\n<p>Conteúdo em desenvolvimento.</p>",
    excerpt: "Informações sobre assuntos profissionais, legais e éticos"
  },
  {
    title: "Desenvolvimento Atípico",
    slug: "desenvolvimento-atipico",
    html: "<h1>Desenvolvimento Atípico</h1>\n<p>Conteúdo em desenvolvimento.</p>",
    excerpt: "Informações sobre desenvolvimento atípico"
  },
  {
    title: "Imprensa",
    slug: "imprensa",
    html: "<h1>Imprensa</h1>\n<p>Conteúdo em desenvolvimento.</p>",
    excerpt: "Área de imprensa da ABPMC"
  }
];

async function main() {
  console.log("📄 Criando páginas faltantes...\n");
  console.log("=".repeat(60));

  let created = 0;
  let updated = 0;
  let skipped = 0;

  for (const page of missingPages) {
    try {
      const existing = await prisma.content.findUnique({
        where: { slug: page.slug }
      });

      if (existing) {
        // Atualizar se já existir
        await prisma.content.update({
          where: { slug: page.slug },
          data: {
            title: page.title,
            html: page.html,
            excerpt: page.excerpt,
            status: 'publish',
            type: 'PAGE',
            updatedAt: new Date()
          }
        });
        updated++;
        console.log(`✏️  ATUALIZADA: ${page.title}`);
        console.log(`   Slug: /${page.slug}`);
      } else {
        // Criar nova
        await prisma.content.create({
          data: {
            type: 'PAGE',
            title: page.title,
            slug: page.slug,
            html: page.html,
            excerpt: page.excerpt,
            status: 'publish',
            createdAt: new Date(),
            publishedAt: new Date()
          }
        });
        created++;
        console.log(`✅ CRIADA: ${page.title}`);
        console.log(`   Slug: /${page.slug}`);
      }
      console.log("");
    } catch (error) {
      skipped++;
      console.error(`❌ ERRO ao processar "${page.title}":`, error);
      console.log("");
    }
  }

  console.log("=".repeat(60));
  console.log("\n📊 RESUMO:");
  console.log(`   Criadas: ${created}`);
  console.log(`   Atualizadas: ${updated}`);
  console.log(`   Erros: ${skipped}`);
  console.log(`   Total processadas: ${created + updated}`);

  // Verificar total de páginas
  const totalPages = await prisma.content.count({
    where: { type: 'PAGE' }
  });

  console.log(`\n📄 Total de páginas no banco: ${totalPages}`);
  console.log("");

  await prisma.$disconnect();
}

main().catch((error) => {
  console.error("❌ Erro:", error);
  prisma.$disconnect();
  process.exit(1);
});
