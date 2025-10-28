import { readFileSync } from 'fs';
import { parseString } from 'xml2js';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface XMLData {
  rss: {
    channel: [{
      'wp:category'?: any[];
      'wp:tag'?: any[];
      'wp:author'?: any[];
      item?: any[];
    }];
  };
}

async function main() {
  console.log('🔍 ANALISANDO XML COMPLETO DO WORDPRESS\n');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  // 1. Ler arquivo XML
  console.log('📂 Lendo arquivo XML...');
  const xmlPath = '/Volumes/Dock Station/abpmcdev/todo-conteudo.xml';
  const xmlContent = readFileSync(xmlPath, 'utf-8');
  console.log(`✅ Arquivo lido: ${(xmlContent.length / 1024 / 1024).toFixed(2)} MB\n`);

  // 2. Parse XML
  console.log('🔄 Fazendo parse do XML...');
  let xmlData: XMLData;
  
  parseString(xmlContent, (err, result) => {
    if (err) {
      console.error('❌ Erro ao fazer parse:', err);
      process.exit(1);
    }
    xmlData = result;
  });

  const channel = xmlData!.rss.channel[0];
  console.log('✅ Parse concluído\n');

  // 3. Analisar categorias
  console.log('📊 CATEGORIAS NO XML:');
  const categoriasXML = channel['wp:category'] || [];
  console.log(`   Total: ${categoriasXML.length}\n`);
  
  const categoriasMap = new Map();
  categoriasXML.forEach((cat: any) => {
    const nome = cat['wp:cat_name'][0];
    const slug = cat['wp:category_nicename'][0];
    const id = cat['wp:term_id'][0];
    categoriasMap.set(slug, { id, nome, slug });
    console.log(`   - ${nome} (${slug})`);
  });
  console.log('');

  // 4. Analisar tags
  console.log('🏷️  TAGS NO XML:');
  const tagsXML = channel['wp:tag'] || [];
  console.log(`   Total: ${tagsXML.length}\n`);

  // 5. Analisar autores
  console.log('👤 AUTORES NO XML:');
  const autoresXML = channel['wp:author'] || [];
  console.log(`   Total: ${autoresXML.length}`);
  autoresXML.forEach((autor: any) => {
    const login = autor['wp:author_login'][0];
    const email = autor['wp:author_email'][0];
    console.log(`   - ${login} (${email})`);
  });
  console.log('');

  // 6. Analisar items (posts e páginas)
  console.log('📝 ITEMS NO XML:');
  const items = channel.item || [];
  console.log(`   Total: ${items.length}\n`);

  let posts = 0;
  let pages = 0;
  let attachments = 0;
  let outros = 0;

  const postsPorCategoria = new Map<string, number>();

  items.forEach((item: any) => {
    const tipo = item['wp:post_type']?.[0] || 'unknown';
    const status = item['wp:status']?.[0] || 'unknown';
    
    if (tipo === 'post' && status === 'publish') {
      posts++;
      
      // Contar posts por categoria
      const categorias = item.category || [];
      categorias.forEach((cat: any) => {
        if (cat.$ && cat.$.domain === 'category') {
          const catSlug = cat.$.nicename;
          postsPorCategoria.set(catSlug, (postsPorCategoria.get(catSlug) || 0) + 1);
        }
      });
    } else if (tipo === 'page' && status === 'publish') {
      pages++;
    } else if (tipo === 'attachment') {
      attachments++;
    } else {
      outros++;
    }
  });

  console.log(`   Posts publicados: ${posts}`);
  console.log(`   Páginas publicadas: ${pages}`);
  console.log(`   Attachments: ${attachments}`);
  console.log(`   Outros: ${outros}\n`);

  // 7. Posts por categoria
  console.log('📊 POSTS POR CATEGORIA (XML):');
  postsPorCategoria.forEach((count, slug) => {
    const catInfo = categoriasMap.get(slug);
    const nome = catInfo ? catInfo.nome : slug;
    console.log(`   ${nome} (${slug}): ${count} posts`);
  });
  console.log('');

  // 8. Comparar com banco de dados atual
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('📊 COMPARAÇÃO COM BANCO DE DADOS ATUAL');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  // Categorias no banco
  const categoriasDB = await prisma.term.findMany({
    where: { taxonomy: 'category' }
  });
  
  console.log('CATEGORIAS:');
  console.log(`   XML: ${categoriasXML.length}`);
  console.log(`   Banco: ${categoriasDB.length}`);
  console.log(`   Diferença: ${categoriasXML.length - categoriasDB.length}\n`);

  // Posts no banco
  const postsDB = await prisma.content.count({
    where: { type: 'POST', status: 'publish' }
  });
  
  console.log('POSTS:');
  console.log(`   XML: ${posts}`);
  console.log(`   Banco: ${postsDB}`);
  console.log(`   Diferença: ${posts - postsDB}\n`);

  // Páginas no banco
  const pagesDB = await prisma.content.count({
    where: { type: 'PAGE', status: 'publish' }
  });
  
  console.log('PÁGINAS:');
  console.log(`   XML: ${pages}`);
  console.log(`   Banco: ${pagesDB}`);
  console.log(`   Diferença: ${pages - pagesDB}\n`);

  // Posts por categoria no banco
  console.log('POSTS POR CATEGORIA (BANCO):');
  for (const catDB of categoriasDB) {
    const count = await prisma.contentTerm.count({
      where: { termId: catDB.id }
    });
    console.log(`   ${catDB.name} (${catDB.slug}): ${count} posts`);
  }
  console.log('');

  // 9. Identificar categorias faltantes
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('⚠️  ANÁLISE DE DIFERENÇAS');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  const categoriasDBSlugs = new Set(categoriasDB.map(c => c.slug));
  const categoriasFaltantes = categoriasXML.filter((cat: any) => {
    const slug = cat['wp:category_nicename'][0];
    return !categoriasDBSlugs.has(slug);
  });

  if (categoriasFaltantes.length > 0) {
    console.log('CATEGORIAS FALTANTES NO BANCO:');
    categoriasFaltantes.forEach((cat: any) => {
      const nome = cat['wp:cat_name'][0];
      const slug = cat['wp:category_nicename'][0];
      const postsCount = postsPorCategoria.get(slug) || 0;
      console.log(`   - ${nome} (${slug}) - ${postsCount} posts`);
    });
    console.log('');
  } else {
    console.log('✅ Todas as categorias do XML estão no banco\n');
  }

  // 10. Resumo final
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('📊 RESUMO FINAL');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log(`   Categorias no XML: ${categoriasXML.length}`);
  console.log(`   Categorias no Banco: ${categoriasDB.length}`);
  console.log(`   Categorias faltantes: ${categoriasFaltantes.length}`);
  console.log(`   Posts no XML: ${posts}`);
  console.log(`   Posts no Banco: ${postsDB}`);
  console.log(`   Páginas no XML: ${pages}`);
  console.log(`   Páginas no Banco: ${pagesDB}`);
  console.log(`   Tags no XML: ${tagsXML.length}`);
  console.log(`   Autores no XML: ${autoresXML.length}`);
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  if (categoriasFaltantes.length > 0 || posts > postsDB || pages > pagesDB) {
    console.log('⚠️  AÇÕES NECESSÁRIAS:');
    if (categoriasFaltantes.length > 0) {
      console.log(`   - Importar ${categoriasFaltantes.length} categorias faltantes`);
    }
    if (posts > postsDB) {
      console.log(`   - Importar ${posts - postsDB} posts faltantes`);
    }
    if (pages > pagesDB) {
      console.log(`   - Importar ${pages - pagesDB} páginas faltantes`);
    }
    console.log('');
  } else {
    console.log('✅ Todos os dados do XML estão no banco!\n');
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
