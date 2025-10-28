import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { parseString } from 'xml2js';
import { PrismaClient } from '@prisma/client';
import https from 'https';
import http from 'http';
import { join } from 'path';

const prisma = new PrismaClient();

interface XMLData {
  rss: {
    channel: [{
      item?: any[];
    }];
  };
}

// Mapear IDs de attachments para URLs
const attachmentMap = new Map<string, string>();

// Mapear posts para thumbnail IDs
const postThumbnailMap = new Map<string, string>();

async function downloadImage(url: string, filepath: string): Promise<boolean> {
  return new Promise((resolve) => {
    const protocol = url.startsWith('https') ? https : http;
    
    protocol.get(url, (response) => {
      if (response.statusCode === 200) {
        const fileStream = require('fs').createWriteStream(filepath);
        response.pipe(fileStream);
        fileStream.on('finish', () => {
          fileStream.close();
          resolve(true);
        });
      } else {
        console.log(`   ❌ Erro ao baixar: ${response.statusCode}`);
        resolve(false);
      }
    }).on('error', (err) => {
      console.log(`   ❌ Erro: ${err.message}`);
      resolve(false);
    });
  });
}

async function main() {
  console.log('🖼️  IMPORTAR IMAGENS DESTACADAS DOS POSTS\n');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  // 1. Ler XML
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

  const items = xmlData!.rss.channel[0].item || [];
  console.log(`✅ ${items.length} items encontrados\n`);

  // 3. Mapear attachments (imagens)
  console.log('🗺️  Mapeando attachments...');
  let attachmentCount = 0;

  items.forEach((item: any) => {
    const tipo = item['wp:post_type']?.[0];
    
    if (tipo === 'attachment') {
      const id = item['wp:post_id']?.[0];
      const url = item['wp:attachment_url']?.[0];
      
      if (id && url) {
        attachmentMap.set(id, url);
        attachmentCount++;
      }
    }
  });

  console.log(`✅ ${attachmentCount} attachments mapeados\n`);

  // 4. Mapear posts para thumbnail IDs
  console.log('🗺️  Mapeando posts para thumbnails...');
  let postCount = 0;

  items.forEach((item: any) => {
    const tipo = item['wp:post_type']?.[0];
    const status = item['wp:status']?.[0];
    
    if (tipo === 'post' && status === 'publish') {
      const slug = item['wp:post_name']?.[0];
      const postmeta = item['wp:postmeta'] || [];
      
      // Buscar _thumbnail_id
      const thumbnailMeta = postmeta.find((meta: any) => 
        meta['wp:meta_key']?.[0] === '_thumbnail_id'
      );
      
      if (thumbnailMeta && slug) {
        const thumbnailId = thumbnailMeta['wp:meta_value']?.[0];
        if (thumbnailId) {
          postThumbnailMap.set(slug, thumbnailId);
          postCount++;
        }
      }
    }
  });

  console.log(`✅ ${postCount} posts com thumbnails encontrados\n`);

  // 5. Criar diretório de uploads
  const uploadsDir = join(process.cwd(), 'public', 'uploads', 'posts');
  if (!existsSync(uploadsDir)) {
    mkdirSync(uploadsDir, { recursive: true });
    console.log(`✅ Diretório criado: ${uploadsDir}\n`);
  }

  // 6. Processar posts
  console.log('📥 Baixando e atualizando imagens...\n');
  
  let processados = 0;
  let baixados = 0;
  let atualizados = 0;
  let erros = 0;

  for (const [slug, thumbnailId] of Array.from(postThumbnailMap.entries())) {
    processados++;
    
    // Buscar URL do attachment
    const imageUrl = attachmentMap.get(thumbnailId);
    
    if (!imageUrl) {
      console.log(`${processados}. ⚠️  ${slug} - Thumbnail ID ${thumbnailId} não encontrado`);
      erros++;
      continue;
    }

    // Buscar post no banco
    const post = await prisma.content.findUnique({
      where: { slug },
    });

    if (!post) {
      console.log(`${processados}. ⚠️  ${slug} - Post não encontrado no banco`);
      erros++;
      continue;
    }

    // Extrair extensão da imagem
    const ext = imageUrl.split('.').pop()?.split('?')[0] || 'jpg';
    const filename = `${slug}.${ext}`;
    const filepath = join(uploadsDir, filename);
    const publicPath = `/uploads/posts/${filename}`;

    // Verificar se já existe
    if (existsSync(filepath)) {
      console.log(`${processados}. ⏭️  ${slug} - Imagem já existe`);
      
      // Atualizar banco se necessário
      // @ts-ignore - featuredImage será adicionado após migration
      if (post.featuredImage !== publicPath) {
        await prisma.content.update({
          where: { id: post.id },
          // @ts-ignore
          data: { featuredImage: publicPath },
        });
        atualizados++;
      }
      continue;
    }

    // Baixar imagem
    console.log(`${processados}. 📥 ${slug} - Baixando...`);
    const success = await downloadImage(imageUrl, filepath);

    if (success) {
      // Atualizar banco
      await prisma.content.update({
        where: { id: post.id },
        // @ts-ignore
        data: { featuredImage: publicPath },
      });
      
      baixados++;
      atualizados++;
      console.log(`   ✅ Baixado e atualizado`);
    } else {
      erros++;
    }

    // Delay para não sobrecarregar
    await new Promise(resolve => setTimeout(resolve, 100));
  }

  // 7. Resumo
  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
  console.log('📊 RESUMO:\n');
  console.log(`   Posts processados: ${processados}`);
  console.log(`   Imagens baixadas: ${baixados}`);
  console.log(`   Posts atualizados: ${atualizados}`);
  console.log(`   Erros: ${erros}`);
  console.log('\n✅ Importação concluída!\n');

  await prisma.$disconnect();
}

main().catch((error) => {
  console.error('❌ Erro:', error);
  process.exit(1);
});
