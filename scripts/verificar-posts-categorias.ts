import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🔍 VERIFICANDO POSTS E CATEGORIAS\n');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  // 1. Total de posts
  const totalPosts = await prisma.content.count({
    where: { type: 'POST', status: 'publish' }
  });
  console.log(`📊 Total de posts publicados: ${totalPosts}\n`);

  // 2. Posts sem categoria
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
      slug: true,
    },
    take: 10
  });

  console.log(`⚠️  Posts SEM categoria: ${postsSemCategoria.length}\n`);
  if (postsSemCategoria.length > 0) {
    console.log('Primeiros 10 posts sem categoria:');
    postsSemCategoria.forEach(p => {
      console.log(`   - ${p.title} (${p.slug})`);
    });
    console.log('');
  }

  // 3. Posts com categoria
  const postsComCategoria = await prisma.content.count({
    where: {
      type: 'POST',
      status: 'publish',
      terms: {
        some: {}
      }
    }
  });
  console.log(`✅ Posts COM categoria: ${postsComCategoria}\n`);

  // 4. Últimos 5 posts para a home
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

  console.log('📰 ÚLTIMOS 5 POSTS (para a home):\n');
  ultimosPosts.forEach((post, index) => {
    const categorias = post.terms.map(t => t.term.name).join(', ') || 'Sem categoria';
    console.log(`${index + 1}. ${post.title}`);
    console.log(`   Categorias: ${categorias}`);
    console.log(`   Data: ${post.publishedAt?.toLocaleDateString('pt-BR') || 'Sem data'}`);
    console.log(`   Link: /p/${post.slug}\n`);
  });

  // 5. Categorias e quantidade de posts
  const categorias = await prisma.term.findMany({
    where: { taxonomy: 'category' },
    include: {
      _count: {
        select: {
          contents: true
        }
      }
    }
  });

  console.log('🏷️  CATEGORIAS E POSTS:\n');
  categorias.forEach(cat => {
    console.log(`   ${cat.name} (${cat.slug}): ${cat._count.contents} posts`);
  });
  console.log('');

  // 6. Resumo
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('📊 RESUMO');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log(`   Total de posts: ${totalPosts}`);
  console.log(`   Com categoria: ${postsComCategoria} (${((postsComCategoria/totalPosts)*100).toFixed(1)}%)`);
  console.log(`   Sem categoria: ${postsSemCategoria.length} (${((postsSemCategoria.length/totalPosts)*100).toFixed(1)}%)`);
  console.log(`   Total de categorias: ${categorias.length}`);
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  if (postsSemCategoria.length > 0) {
    console.log('⚠️  AÇÃO NECESSÁRIA:');
    console.log(`   ${postsSemCategoria.length} posts precisam ser associados a categorias`);
    console.log('   Execute: npx tsx scripts/associar-posts-categorias.ts\n');
  } else {
    console.log('✅ Todos os posts têm categorias associadas!\n');
  }
}

main()
  .catch((e) => {
    console.error('❌ Erro:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
