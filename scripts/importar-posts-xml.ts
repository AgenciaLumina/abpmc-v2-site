import { PrismaClient } from "@prisma/client";
import { readFileSync, readdirSync } from "fs";
import { join } from "path";
import { parseStringPromise } from "xml2js";

const prisma = new PrismaClient();

// Diretório com os XMLs
const XML_DIR = "/Users/paulomedeiros/CascadeProjects/posts xml abpmc";

// Mapeamento de categorias XML -> Banco
const CATEGORY_MAP: Record<string, string> = {
  "artigos historicos": "Artigos Históricos",
  "encontros anuais": "Encontros Anuais",
  "eventos": "Eventos",
  "historias-e-personagens": "Histórias e Personagens",
  "noticias": "Notícias",
  "projetos": "Projetos",
  "sem-categoria": "Sem Categoria",
};

interface WordPressPost {
  title: string;
  slug: string;
  content: string;
  excerpt?: string;
  publishedAt?: Date;
  author?: string;
  categories: string[];
}

/**
 * Limpa HTML do WordPress (remove blocos wp:)
 */
function cleanWordPressHTML(html: string): string {
  if (!html) return "";
  
  // Remove comentários de bloco do Gutenberg
  let cleaned = html.replace(/<!--\s*\/?(wp:[^\s]+)[^>]*-->/g, "");
  
  // Remove tags vazias
  cleaned = cleaned.replace(/<p>\s*<\/p>/g, "");
  cleaned = cleaned.replace(/<div[^>]*>\s*<\/div>/g, "");
  
  return cleaned.trim();
}

/**
 * Extrai posts de um arquivo XML
 */
async function extractPostsFromXML(xmlPath: string, categoryName: string): Promise<WordPressPost[]> {
  const xmlContent = readFileSync(xmlPath, "utf-8");
  const result = await parseStringPromise(xmlContent);
  
  const items = result.rss?.channel?.[0]?.item || [];
  const posts: WordPressPost[] = [];
  
  for (const item of items) {
    // Verificar se é um post (não página ou attachment)
    const postType = item["wp:post_type"]?.[0];
    if (postType !== "post") continue;
    
    // Verificar se está publicado
    const status = item["wp:status"]?.[0];
    if (status !== "publish") continue;
    
    const title = item.title?.[0] || "Sem título";
    const slug = item["wp:post_name"]?.[0] || "";
    const content = item["content:encoded"]?.[0] || "";
    const excerpt = item["excerpt:encoded"]?.[0] || "";
    const author = item["dc:creator"]?.[0] || "abpmc";
    const pubDate = item.pubDate?.[0];
    
    // Extrair categorias
    const categories = [categoryName];
    if (item.category) {
      const catNames = item.category
        .map((cat: any) => cat._?.trim() || cat)
        .filter((c: string) => c && c !== categoryName);
      categories.push(...catNames);
    }
    
    posts.push({
      title: title.replace(/<!\[CDATA\[(.*?)\]\]>/g, "$1").trim(),
      slug: slug || title.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      content: cleanWordPressHTML(content),
      excerpt: excerpt ? cleanWordPressHTML(excerpt) : undefined,
      publishedAt: pubDate ? new Date(pubDate) : undefined,
      author,
      categories: Array.from(new Set(categories)), // Remove duplicatas
    });
  }
  
  return posts;
}

/**
 * Garante que uma categoria existe no banco
 */
async function ensureCategory(categoryName: string): Promise<number> {
  const slug = categoryName.toLowerCase().replace(/[^a-z0-9]+/g, "-");
  
  // Usar upsert para evitar erro de duplicata
  const category = await prisma.term.upsert({
    where: { slug },
    update: {},
    create: {
      taxonomy: "category",
      name: categoryName,
      slug,
    },
  });
  
  return category.id;
}

/**
 * Importa um post para o banco
 */
async function importPost(post: WordPressPost): Promise<{ created: boolean; title: string }> {
  // Verificar se já existe pelo slug
  const existing = await prisma.content.findUnique({
    where: { slug: post.slug },
  });
  
  if (existing) {
    return { created: false, title: post.title };
  }
  
  // Garantir que todas as categorias existem
  const categoryIds = await Promise.all(
    post.categories.map(cat => ensureCategory(cat))
  );
  
  // Criar o post
  const created = await prisma.content.create({
    data: {
      type: "POST",
      title: post.title,
      slug: post.slug,
      status: "publish",
      html: post.content,
      excerpt: post.excerpt,
      publishedAt: post.publishedAt || new Date(),
      author: post.author,
      terms: {
        create: categoryIds.map(termId => ({
          termId,
        })),
      },
    },
  });
  
  return { created: true, title: created.title };
}

/**
 * Processa todos os arquivos XML
 */
async function importAllPosts() {
  console.log("\n🚀 IMPORTAÇÃO COMPLETA DE POSTS DO WORDPRESS");
  console.log("=".repeat(70));
  
  const xmlFiles = readdirSync(XML_DIR).filter(f => f.endsWith(".xml"));
  
  let totalProcessed = 0;
  let totalCreated = 0;
  let totalSkipped = 0;
  
  for (const xmlFile of xmlFiles) {
    const categoryKey = xmlFile.replace(".xml", "");
    const categoryName = CATEGORY_MAP[categoryKey] || categoryKey;
    
    console.log(`\n📂 Processando: ${xmlFile} (${categoryName})`);
    
    try {
      const xmlPath = join(XML_DIR, xmlFile);
      const posts = await extractPostsFromXML(xmlPath, categoryName);
      
      console.log(`   ✅ Extraídos: ${posts.length} posts`);
      
      for (const post of posts) {
        const result = await importPost(post);
        totalProcessed++;
        
        if (result.created) {
          totalCreated++;
          console.log(`   ✨ Criado: ${result.title}`);
        } else {
          totalSkipped++;
        }
      }
      
    } catch (error) {
      console.error(`   ❌ Erro ao processar ${xmlFile}:`, error);
    }
  }
  
  console.log("\n" + "=".repeat(70));
  console.log("✅ IMPORTAÇÃO CONCLUÍDA!");
  console.log(`📊 Processados: ${totalProcessed} posts`);
  console.log(`✨ Criados: ${totalCreated} posts`);
  console.log(`⏭️  Ignorados (duplicados): ${totalSkipped} posts`);
  console.log("=".repeat(70) + "\n");
}

// Executar
importAllPosts()
  .then(() => {
    console.log("✅ Script finalizado com sucesso!\n");
    process.exit(0);
  })
  .catch((error) => {
    console.error("\n❌ Erro fatal:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
