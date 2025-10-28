import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';

const prismaLocal = new PrismaClient();
const prismaProducao = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL_PRODUCAO
    }
  }
});

async function main() {
  console.log('🚀 ANÁLISE E MIGRAÇÃO COMPLETA PARA PRODUÇÃO\n');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  const relatorio = {
    local: {} as any,
    producao: {} as any,
    migrados: {} as any,
    erros: [] as string[],
  };

  try {
    // 1. ANÁLISE DO BANCO LOCAL
    console.log('📊 ANALISANDO BANCO LOCAL...\n');
    
    relatorio.local.associados = await prismaLocal.associado.count();
    relatorio.local.posts = await prismaLocal.content.count({ where: { type: 'POST' } });
    relatorio.local.pages = await prismaLocal.content.count({ where: { type: 'PAGE' } });
    relatorio.local.categorias = await prismaLocal.term.count({ where: { taxonomy: 'category' } });
    relatorio.local.tags = await prismaLocal.term.count({ where: { taxonomy: 'post_tag' } });
    relatorio.local.planos = await prismaLocal.plano.count();
    relatorio.local.transacoes = await prismaLocal.transacao.count();

    console.log('LOCAL:');
    console.log(`   Associados: ${relatorio.local.associados}`);
    console.log(`   Posts: ${relatorio.local.posts}`);
    console.log(`   Páginas: ${relatorio.local.pages}`);
    console.log(`   Categorias: ${relatorio.local.categorias}`);
    console.log(`   Tags: ${relatorio.local.tags}`);
    console.log(`   Planos: ${relatorio.local.planos}`);
    console.log(`   Transações: ${relatorio.local.transacoes}\n`);

    // 2. ANÁLISE DO BANCO PRODUÇÃO
    console.log('📊 ANALISANDO BANCO PRODUÇÃO...\n');
    
    relatorio.producao.associados = await prismaProducao.associado.count();
    relatorio.producao.posts = await prismaProducao.content.count({ where: { type: 'POST' } });
    relatorio.producao.pages = await prismaProducao.content.count({ where: { type: 'PAGE' } });
    relatorio.producao.categorias = await prismaProducao.term.count({ where: { taxonomy: 'category' } });
    relatorio.producao.tags = await prismaProducao.term.count({ where: { taxonomy: 'post_tag' } });
    relatorio.producao.planos = await prismaProducao.plano.count();
    relatorio.producao.transacoes = await prismaProducao.transacao.count();

    console.log('PRODUÇÃO:');
    console.log(`   Associados: ${relatorio.producao.associados}`);
    console.log(`   Posts: ${relatorio.producao.posts}`);
    console.log(`   Páginas: ${relatorio.producao.pages}`);
    console.log(`   Categorias: ${relatorio.producao.categorias}`);
    console.log(`   Tags: ${relatorio.producao.tags}`);
    console.log(`   Planos: ${relatorio.producao.planos}`);
    console.log(`   Transações: ${relatorio.producao.transacoes}\n`);

    // 3. MIGRAR CATEGORIAS
    if (relatorio.local.categorias > relatorio.producao.categorias) {
      console.log('📋 Migrando Categorias...');
      const categorias = await prismaLocal.term.findMany({
        where: { taxonomy: 'category' }
      });
      
      let migradas = 0;
      for (const cat of categorias) {
        try {
          await prismaProducao.term.upsert({
            where: { slug: cat.slug },
            update: { name: cat.name, taxonomy: cat.taxonomy },
            create: { name: cat.name, slug: cat.slug, taxonomy: cat.taxonomy }
          });
          migradas++;
        } catch (e: any) {
          relatorio.erros.push(`Categoria ${cat.slug}: ${e.message}`);
        }
      }
      relatorio.migrados.categorias = migradas;
      console.log(`✅ ${migradas}/${categorias.length} categorias migradas\n`);
    }

    // 4. MIGRAR TAGS
    if (relatorio.local.tags > relatorio.producao.tags) {
      console.log('🏷️  Migrando Tags...');
      const tags = await prismaLocal.term.findMany({
        where: { taxonomy: 'post_tag' }
      });
      
      let migradas = 0;
      for (const tag of tags) {
        try {
          await prismaProducao.term.upsert({
            where: { slug: tag.slug },
            update: { name: tag.name, taxonomy: tag.taxonomy },
            create: { name: tag.name, slug: tag.slug, taxonomy: tag.taxonomy }
          });
          migradas++;
        } catch (e: any) {
          relatorio.erros.push(`Tag ${tag.slug}: ${e.message}`);
        }
      }
      relatorio.migrados.tags = migradas;
      console.log(`✅ ${migradas}/${tags.length} tags migradas\n`);
    }

    // 5. MIGRAR PÁGINAS
    if (relatorio.local.pages > relatorio.producao.pages) {
      console.log('📄 Migrando Páginas...');
      const pages = await prismaLocal.content.findMany({
        where: { type: 'PAGE' },
        include: { terms: true }
      });
      
      let migradas = 0;
      for (const page of pages) {
        try {
          await prismaProducao.content.upsert({
            where: { slug: page.slug },
            update: {
              type: page.type,
              title: page.title,
              status: page.status,
              html: page.html,
              excerpt: page.excerpt,
              publishedAt: page.publishedAt,
              author: page.author,
            },
            create: {
              type: page.type,
              title: page.title,
              slug: page.slug,
              status: page.status,
              html: page.html,
              excerpt: page.excerpt,
              publishedAt: page.publishedAt,
              author: page.author,
            }
          });
          migradas++;
        } catch (e: any) {
          relatorio.erros.push(`Página ${page.slug}: ${e.message}`);
        }
      }
      relatorio.migrados.pages = migradas;
      console.log(`✅ ${migradas}/${pages.length} páginas migradas\n`);
    }

    // 6. MIGRAR POSTS
    if (relatorio.local.posts > relatorio.producao.posts) {
      console.log('📰 Migrando Posts...');
      const posts = await prismaLocal.content.findMany({
        where: { type: 'POST' },
        include: { terms: true }
      });
      
      let migrados = 0;
      for (const post of posts) {
        try {
          await prismaProducao.content.upsert({
            where: { slug: post.slug },
            update: {
              type: post.type,
              title: post.title,
              status: post.status,
              html: post.html,
              excerpt: post.excerpt,
              publishedAt: post.publishedAt,
              author: post.author,
            },
            create: {
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
          migrados++;
        } catch (e: any) {
          relatorio.erros.push(`Post ${post.slug}: ${e.message}`);
        }
      }
      relatorio.migrados.posts = migrados;
      console.log(`✅ ${migrados}/${posts.length} posts migrados\n`);
    }

    // 7. MIGRAR ASSOCIADOS (exceto os de teste que já existem)
    if (relatorio.local.associados > 2) {
      console.log('👥 Migrando Associados...');
      const associados = await prismaLocal.associado.findMany({
        where: {
          email: {
            notIn: ['paulo@agencialumina.com.br', 'associado@agencialumina.com.br']
          }
        }
      });
      
      let migrados = 0;
      for (const assoc of associados) {
        try {
          await prismaProducao.associado.upsert({
            where: { email: assoc.email },
            update: {
              nome: assoc.nome,
              senhaHash: assoc.senhaHash,
              cpf: assoc.cpf,
              telefone: assoc.telefone,
              endereco: assoc.endereco,
              cidade: assoc.cidade,
              estado: assoc.estado,
              cep: assoc.cep,
              status: assoc.status,
              role: assoc.role,
              visivelNoSite: assoc.visivelNoSite,
              curriculoLattes: assoc.curriculoLattes,
            },
            create: {
              nome: assoc.nome,
              email: assoc.email,
              senhaHash: assoc.senhaHash,
              cpf: assoc.cpf,
              telefone: assoc.telefone,
              endereco: assoc.endereco,
              cidade: assoc.cidade,
              estado: assoc.estado,
              cep: assoc.cep,
              status: assoc.status,
              role: assoc.role,
              visivelNoSite: assoc.visivelNoSite,
              curriculoLattes: assoc.curriculoLattes,
            }
          });
          migrados++;
        } catch (e: any) {
          relatorio.erros.push(`Associado ${assoc.email}: ${e.message}`);
        }
      }
      relatorio.migrados.associados = migrados;
      console.log(`✅ ${migrados}/${associados.length} associados migrados\n`);
    }

    // 8. RELATÓRIO FINAL
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('📊 RELATÓRIO FINAL DA MIGRAÇÃO');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
    
    console.log('MIGRADOS:');
    console.log(`   Categorias: ${relatorio.migrados.categorias || 0}`);
    console.log(`   Tags: ${relatorio.migrados.tags || 0}`);
    console.log(`   Páginas: ${relatorio.migrados.pages || 0}`);
    console.log(`   Posts: ${relatorio.migrados.posts || 0}`);
    console.log(`   Associados: ${relatorio.migrados.associados || 0}\n`);

    if (relatorio.erros.length > 0) {
      console.log(`⚠️  ${relatorio.erros.length} ERROS ENCONTRADOS:\n`);
      relatorio.erros.slice(0, 10).forEach(erro => console.log(`   - ${erro}`));
      if (relatorio.erros.length > 10) {
        console.log(`   ... e mais ${relatorio.erros.length - 10} erros\n`);
      }
    } else {
      console.log('✅ NENHUM ERRO!\n');
    }

    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

    // Salvar relatório
    const reportPath = path.join(process.cwd(), 'reports', 'migracao-completa.json');
    fs.mkdirSync(path.dirname(reportPath), { recursive: true });
    fs.writeFileSync(reportPath, JSON.stringify(relatorio, null, 2));
    console.log(`📄 Relatório salvo em: ${reportPath}\n`);

  } catch (error) {
    console.error('❌ Erro durante migração:', error);
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
