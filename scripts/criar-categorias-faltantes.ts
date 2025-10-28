import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const CATEGORIAS_FALTANTES = [
  { name: 'Projetos', slug: 'projetos' },
  { name: 'Sem categoria', slug: 'sem-categoria' },
  { name: 'Slider', slug: 'slider' },
];

async function main() {
  console.log('🏷️  CRIANDO CATEGORIAS FALTANTES\n');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  let criadas = 0;
  let jaExistentes = 0;

  for (const cat of CATEGORIAS_FALTANTES) {
    try {
      const existe = await prisma.term.findUnique({
        where: { slug: cat.slug }
      });

      if (existe) {
        console.log(`⏭️  ${cat.name} (${cat.slug}) - Já existe`);
        jaExistentes++;
      } else {
        await prisma.term.create({
          data: {
            name: cat.name,
            slug: cat.slug,
            taxonomy: 'category',
          }
        });
        console.log(`✅ ${cat.name} (${cat.slug}) - Criada`);
        criadas++;
      }
    } catch (error: any) {
      console.error(`❌ Erro ao criar ${cat.name}: ${error.message}`);
    }
  }

  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('📊 RESULTADO');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log(`   ✅ Criadas: ${criadas}`);
  console.log(`   ⏭️  Já existentes: ${jaExistentes}`);
  console.log(`   📈 Total: ${CATEGORIAS_FALTANTES.length}`);
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  // Listar todas as categorias
  const todasCategorias = await prisma.term.findMany({
    where: { taxonomy: 'category' },
    orderBy: { name: 'asc' }
  });

  console.log(`📋 TODAS AS CATEGORIAS (${todasCategorias.length}):\n`);
  todasCategorias.forEach((cat, index) => {
    console.log(`${index + 1}. ${cat.name} (${cat.slug})`);
  });
  console.log('');
}

main()
  .catch((e) => {
    console.error('❌ Erro:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
