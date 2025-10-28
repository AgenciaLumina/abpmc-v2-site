import { PrismaClient } from '@prisma/client';

// Banco LOCAL (origem)
const prismaLocal = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL_LOCAL || process.env.DATABASE_URL
    }
  }
});

// Banco PRODUÇÃO (destino)
const prismaProducao = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL_PRODUCAO
    }
  }
});

async function main() {
  console.log('🚀 INICIANDO MIGRAÇÃO DE DADOS\n');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  try {
    // 1. Migrar Categorias (Terms)
    console.log('📋 Migrando Categorias...');
    const categoriasLocal = await prismaLocal.term.findMany({
      where: { taxonomy: 'category' }
    });
    
    for (const cat of categoriasLocal) {
      await prismaProducao.term.upsert({
        where: { id: cat.id },
        update: {
          name: cat.name,
          slug: cat.slug,
          taxonomy: cat.taxonomy,
        },
        create: {
          id: cat.id,
          name: cat.name,
          slug: cat.slug,
          taxonomy: cat.taxonomy,
        }
      });
    }
    console.log(`✅ ${categoriasLocal.length} categorias migradas\n`);

    // 2. Migrar Tags
    console.log('🏷️  Migrando Tags...');
    const tagsLocal = await prismaLocal.term.findMany({
      where: { taxonomy: 'post_tag' }
    });
    
    for (const tag of tagsLocal) {
      await prismaProducao.term.upsert({
        where: { id: tag.id },
        update: {
          name: tag.name,
          slug: tag.slug,
          taxonomy: tag.taxonomy,
        },
        create: {
          id: tag.id,
          name: tag.name,
          slug: tag.slug,
          taxonomy: tag.taxonomy,
        }
      });
    }
    console.log(`✅ ${tagsLocal.length} tags migradas\n`);

    // 3. Migrar Páginas
    console.log('📄 Migrando Páginas...');
    const paginasLocal = await prismaLocal.content.findMany({
      where: { type: 'PAGE' },
      include: {
        terms: {
          include: {
            term: true
          }
        }
      }
    });
    
    for (const pagina of paginasLocal) {
      // Criar/atualizar página
      await prismaProducao.content.upsert({
        where: { id: pagina.id },
        update: {
          type: pagina.type,
          title: pagina.title,
          slug: pagina.slug,
          status: pagina.status,
          html: pagina.html,
          excerpt: pagina.excerpt,
          publishedAt: pagina.publishedAt,
          author: pagina.author,
        },
        create: {
          id: pagina.id,
          type: pagina.type,
          title: pagina.title,
          slug: pagina.slug,
          status: pagina.status,
          html: pagina.html,
          excerpt: pagina.excerpt,
          publishedAt: pagina.publishedAt,
          author: pagina.author,
        }
      });

      // Migrar relações com termos
      for (const contentTerm of pagina.terms) {
        await prismaProducao.contentTerm.upsert({
          where: {
            contentId_termId: {
              contentId: pagina.id,
              termId: contentTerm.termId
            }
          },
          update: {},
          create: {
            contentId: pagina.id,
            termId: contentTerm.termId
          }
        });
      }
    }
    console.log(`✅ ${paginasLocal.length} páginas migradas\n`);

    // 4. Migrar Posts
    console.log('📰 Migrando Posts...');
    const postsLocal = await prismaLocal.content.findMany({
      where: { type: 'POST' },
      include: {
        terms: {
          include: {
            term: true
          }
        }
      }
    });
    
    for (const post of postsLocal) {
      // Criar/atualizar post
      await prismaProducao.content.upsert({
        where: { id: post.id },
        update: {
          type: post.type,
          title: post.title,
          slug: post.slug,
          status: post.status,
          html: post.html,
          excerpt: post.excerpt,
          publishedAt: post.publishedAt,
          author: post.author,
        },
        create: {
          id: post.id,
          type: post.type,
          title: post.title,
          slug: post.slug,
          status: post.status,
          html: post.html,
          excerpt: post.excerpt,
          publishedAt: post.publishedAt,
          author: post.author,
        }
      });

      // Migrar relações com termos
      for (const contentTerm of post.terms) {
        await prismaProducao.contentTerm.upsert({
          where: {
            contentId_termId: {
              contentId: post.id,
              termId: contentTerm.termId
            }
          },
          update: {},
          create: {
            contentId: post.id,
            termId: contentTerm.termId
          }
        });
      }
    }
    console.log(`✅ ${postsLocal.length} posts migrados\n`);

    // 5. Resumo Final
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('📊 RESUMO DA MIGRAÇÃO');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log(`   Categorias: ${categoriasLocal.length}`);
    console.log(`   Tags: ${tagsLocal.length}`);
    console.log(`   Páginas: ${paginasLocal.length}`);
    console.log(`   Posts: ${postsLocal.length}`);
    console.log(`   Total: ${categoriasLocal.length + tagsLocal.length + paginasLocal.length + postsLocal.length} registros`);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

    console.log('✅ MIGRAÇÃO CONCLUÍDA COM SUCESSO!\n');

  } catch (error) {
    console.error('❌ Erro durante a migração:', error);
    throw error;
  }
}

main()
  .catch((e) => {
    console.error('❌ Erro fatal:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prismaLocal.$disconnect();
    await prismaProducao.$disconnect();
  });
