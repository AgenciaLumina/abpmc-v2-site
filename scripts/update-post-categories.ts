import { PrismaClient } from "@prisma/client";
import fs from "fs";
import { parse } from "csv-parse/sync";

const prisma = new PrismaClient();
const CSV_PATH = "/Volumes/Dock Station/abpmcdev/estatico/Posts-Export-2025-October-26-1200.csv";

async function main() {
  console.log("🚀 Iniciando atualização de categorias via CSV...");
  
  if (!fs.existsSync(CSV_PATH)) {
    console.error(`❌ Arquivo CSV não encontrado: ${CSV_PATH}`);
    process.exit(1);
  }

  const file = fs.readFileSync(CSV_PATH, "utf8");
  const posts = parse(file, { columns: true, skip_empty_lines: true });

  let count = 0;
  let skipped = 0;
  let created = 0;
  
  for (const post of posts) {
    const slug = post.post_name?.trim();
    const categoryName = post.post_category?.trim() || "Notícias";

    if (!slug) {
      skipped++;
      continue;
    }

    try {
      // Buscar o post
      const content = await prisma.content.findFirst({
        where: { slug, type: 'POST' }
      });

      if (!content) {
        console.log(`⚠ ${slug} não encontrado no banco`);
        continue;
      }

      // Buscar ou criar a categoria
      let term = await prisma.term.findFirst({
        where: { 
          name: categoryName,
          taxonomy: 'category'
        }
      });

      if (!term) {
        term = await prisma.term.create({
          data: {
            name: categoryName,
            slug: categoryName.toLowerCase().replace(/\s+/g, '-'),
            taxonomy: 'category'
          }
        });
        created++;
        console.log(`  ➕ Categoria criada: ${categoryName}`);
      }

      // Verificar se já existe a relação
      const existing = await prisma.contentTerm.findUnique({
        where: {
          contentId_termId: {
            contentId: content.id,
            termId: term.id
          }
        }
      });

      if (!existing) {
        await prisma.contentTerm.create({
          data: {
            contentId: content.id,
            termId: term.id
          }
        });
        count++;
        console.log(`✔ ${slug} → ${categoryName}`);
      } else {
        console.log(`  ⏭ ${slug} já tem categoria ${categoryName}`);
      }

    } catch (error) {
      console.error(`❌ Erro ao atualizar ${slug}:`, error);
    }
  }

  console.log(`\n✅ Categorias atribuídas para ${count} posts.`);
  console.log(`➕ ${created} categorias novas criadas.`);
  console.log(`⚠ ${skipped} posts ignorados (sem slug).`);
  
  await prisma.$disconnect();
}

main().catch((err) => {
  console.error("❌ Erro ao atualizar categorias:", err);
  prisma.$disconnect();
  process.exit(1);
});
