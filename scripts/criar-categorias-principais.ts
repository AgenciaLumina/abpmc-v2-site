import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const CATEGORIAS = [
  { name: 'Notícias', slug: 'noticias' },
  { name: 'Eventos', slug: 'eventos' },
  { name: 'Encontros Anuais', slug: 'encontros-anuais' },
  { name: 'Artigos Históricos', slug: 'artigos-historicos' },
  { name: 'Histórias e Personagens', slug: 'historias-e-personagens' },
  { name: 'Uncategorized', slug: 'uncategorized' },
];

async function main() {
  console.log('🏷️  Criando categorias principais...\n');

  for (const cat of CATEGORIAS) {
    const categoria = await prisma.term.upsert({
      where: { slug: cat.slug },
      update: {
        name: cat.name,
      },
      create: {
        name: cat.name,
        slug: cat.slug,
        taxonomy: 'category',
      },
    });
    console.log(`✅ ${categoria.name} (${categoria.slug})`);
  }

  console.log(`\n✅ ${CATEGORIAS.length} categorias criadas com sucesso!\n`);
}

main()
  .catch((e) => {
    console.error('❌ Erro:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
