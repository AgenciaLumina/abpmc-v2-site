import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🔍 VERIFICANDO DADOS NO BANCO DE PRODUÇÃO\n');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  try {
    // 1. Verificar Associados
    console.log('👥 ASSOCIADOS');
    const totalAssociados = await prisma.associado.count();
    const associadosAtivos = await prisma.associado.count({
      where: { status: 'ATIVO' }
    });
    const associados = await prisma.associado.findMany({
      select: {
        id: true,
        nome: true,
        email: true,
        role: true,
        status: true,
        visivelNoSite: true,
      },
      take: 10,
    });
    
    console.log(`   Total: ${totalAssociados}`);
    console.log(`   Ativos: ${associadosAtivos}`);
    console.log(`   Primeiros 10:`);
    associados.forEach(a => {
      console.log(`   - ${a.nome} (${a.email}) - ${a.role} - ${a.status}`);
    });
    console.log('');

    // 2. Verificar Posts (Notícias)
    console.log('📰 POSTS (NOTÍCIAS)');
    const totalPosts = await prisma.content.count({
      where: { type: 'POST' }
    });
    const postsPublicados = await prisma.content.count({
      where: { type: 'POST', status: 'publish' }
    });
    const posts = await prisma.content.findMany({
      where: { type: 'POST' },
      select: {
        id: true,
        title: true,
        slug: true,
        status: true,
        publishedAt: true,
      },
      take: 5,
      orderBy: { publishedAt: 'desc' }
    });
    
    console.log(`   Total: ${totalPosts}`);
    console.log(`   Publicados: ${postsPublicados}`);
    console.log(`   Últimos 5:`);
    posts.forEach(p => {
      console.log(`   - ${p.title} (${p.status}) - ${p.publishedAt?.toLocaleDateString('pt-BR') || 'Sem data'}`);
    });
    console.log('');

    // 3. Verificar Páginas
    console.log('📄 PÁGINAS');
    const totalPages = await prisma.content.count({
      where: { type: 'PAGE' }
    });
    const pagesPublicadas = await prisma.content.count({
      where: { type: 'PAGE', status: 'publish' }
    });
    const pages = await prisma.content.findMany({
      where: { type: 'PAGE' },
      select: {
        id: true,
        title: true,
        slug: true,
        status: true,
      },
      take: 5,
    });
    
    console.log(`   Total: ${totalPages}`);
    console.log(`   Publicadas: ${pagesPublicadas}`);
    console.log(`   Primeiras 5:`);
    pages.forEach(p => {
      console.log(`   - ${p.title} (${p.status})`);
    });
    console.log('');

    // 4. Verificar Categorias
    console.log('🏷️  CATEGORIAS');
    const totalCategorias = await prisma.term.count({
      where: { taxonomy: 'category' }
    });
    const categorias = await prisma.term.findMany({
      where: { taxonomy: 'category' },
      select: {
        id: true,
        name: true,
        slug: true,
      },
      take: 10,
    });
    
    console.log(`   Total: ${totalCategorias}`);
    console.log(`   Primeiras 10:`);
    categorias.forEach(c => {
      console.log(`   - ${c.name} (${c.slug})`);
    });
    console.log('');

    // 5. Verificar Planos
    console.log('💳 PLANOS');
    const totalPlanos = await prisma.plano.count();
    const planosAtivos = await prisma.plano.count({
      where: { ativo: true }
    });
    const planos = await prisma.plano.findMany({
      select: {
        id: true,
        nome: true,
        valor: true,
        ativo: true,
        _count: {
          select: {
            associados: true
          }
        }
      }
    });
    
    console.log(`   Total: ${totalPlanos}`);
    console.log(`   Ativos: ${planosAtivos}`);
    planos.forEach(p => {
      console.log(`   - ${p.nome} - R$ ${p.valor.toFixed(2)} (${p._count.associados} associados)`);
    });
    console.log('');

    // 6. Verificar Transações
    console.log('💰 TRANSAÇÕES');
    const totalTransacoes = await prisma.transacao.count();
    const transacoesAprovadas = await prisma.transacao.count({
      where: { status: 'APROVADO' }
    });
    const transacoes = await prisma.transacao.findMany({
      select: {
        id: true,
        valor: true,
        status: true,
        metodo: true,
        dataPagamento: true,
        associado: {
          select: {
            nome: true,
            email: true
          }
        }
      },
      take: 5,
      orderBy: { createdAt: 'desc' }
    });
    
    console.log(`   Total: ${totalTransacoes}`);
    console.log(`   Aprovadas: ${transacoesAprovadas}`);
    console.log(`   Últimas 5:`);
    transacoes.forEach(t => {
      console.log(`   - ${t.associado.nome} - R$ ${t.valor.toFixed(2)} (${t.status}) - ${t.dataPagamento?.toLocaleDateString('pt-BR') || 'Pendente'}`);
    });
    console.log('');

    // 7. Resumo Final
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('📊 RESUMO GERAL');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log(`   Associados: ${totalAssociados} (${associadosAtivos} ativos)`);
    console.log(`   Posts: ${totalPosts} (${postsPublicados} publicados)`);
    console.log(`   Páginas: ${totalPages} (${pagesPublicadas} publicadas)`);
    console.log(`   Categorias: ${totalCategorias}`);
    console.log(`   Planos: ${totalPlanos} (${planosAtivos} ativos)`);
    console.log(`   Transações: ${totalTransacoes} (${transacoesAprovadas} aprovadas)`);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

    // 8. Verificar se há dados suficientes
    console.log('⚠️  ALERTAS');
    if (totalPosts === 0) {
      console.log('   ❌ NENHUM POST ENCONTRADO - Precisa importar notícias!');
    }
    if (totalPages === 0) {
      console.log('   ❌ NENHUMA PÁGINA ENCONTRADA - Precisa importar páginas!');
    }
    if (totalCategorias === 0) {
      console.log('   ❌ NENHUMA CATEGORIA ENCONTRADA - Precisa importar categorias!');
    }
    if (totalAssociados === 0) {
      console.log('   ❌ NENHUM ASSOCIADO ENCONTRADO - Precisa criar usuários!');
    }
    
    if (totalPosts > 0 && totalPages > 0 && totalCategorias > 0 && totalAssociados > 0) {
      console.log('   ✅ Banco de dados contém dados em todas as tabelas principais!');
    }
    console.log('');

  } catch (error) {
    console.error('❌ Erro ao verificar dados:', error);
  }
}

main()
  .catch((e) => {
    console.error('❌ Erro fatal:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
