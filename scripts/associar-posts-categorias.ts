import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🔗 ASSOCIANDO POSTS ÀS CATEGORIAS\n');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  // 1. Buscar categoria "Notícias"
  const categoriaNoticias = await prisma.term.findUnique({
    where: { slug: 'noticias' }
  });

  if (!categoriaNoticias) {
    console.error('❌ Categoria "Notícias" não encontrada!');
    process.exit(1);
  }

  console.log(`✅ Categoria encontrada: ${categoriaNoticias.name} (ID: ${categoriaNoticias.id})\n`);

  // 2. Buscar todos os posts sem categoria
  const postsSemCategoria = await prisma.content.findMany({
    where: {
      type: 'POST',
      status: 'publish',
      terms: {
        none: {}
      }
    },
    select: {
      id: true,
      title: true,
    }
  });

  console.log(`📊 Posts sem categoria: ${postsSemCategoria.length}\n`);

  if (postsSemCategoria.length === 0) {
    console.log('✅ Todos os posts já têm categorias!\n');
    return;
  }

  // 3. Associar posts à categoria "Notícias"
  console.log('🔄 Associando posts...\n');

  let sucesso = 0;
  let erros = 0;

  for (const post of postsSemCategoria) {
    try {
      await prisma.contentTerm.create({
        data: {
          contentId: post.id,
          termId: categoriaNoticias.id,
        }
      });
      sucesso++;
      
      if (sucesso % 50 === 0) {
        console.log(`   Processados: ${sucesso}/${postsSemCategoria.length}`);
      }
    } catch (error: any) {
      console.error(`   ❌ Erro ao associar "${post.title}": ${error.message}`);
      erros++;
    }
  }

  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('📊 RESULTADO');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log(`   ✅ Associados com sucesso: ${sucesso}`);
  console.log(`   ❌ Erros: ${erros}`);
  console.log(`   📈 Taxa de sucesso: ${((sucesso/postsSemCategoria.length)*100).toFixed(1)}%`);
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  // 4. Verificar resultado
  const postsComCategoria = await prisma.content.count({
    where: {
      type: 'POST',
      status: 'publish',
      terms: {
        some: {}
      }
    }
  });

  console.log(`✅ Posts com categoria agora: ${postsComCategoria}\n`);

  // 5. Verificar últimos 5 posts
  const ultimosPosts = await prisma.content.findMany({
    where: { type: 'POST', status: 'publish' },
    orderBy: { publishedAt: 'desc' },
    take: 5,
    include: {
      terms: {
        include: {
          term: true
        }
      }
    }
  });

  console.log('📰 ÚLTIMOS 5 POSTS (verificação):\n');
  ultimosPosts.forEach((post, index) => {
    const categorias = post.terms.map(t => t.term.name).join(', ') || 'Sem categoria';
    console.log(`${index + 1}. ${post.title}`);
    console.log(`   Categoria: ${categorias}\n`);
  });

  console.log('✅ Associação concluída com sucesso!\n');
}

main()
  .catch((e) => {
    console.error('❌ Erro fatal:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
