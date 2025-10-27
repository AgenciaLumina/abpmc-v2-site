import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const categorias = [
  { name: "Institucional", slug: "institucional" },
  { name: "Eventos", slug: "eventos" },
  { name: "Publicações", slug: "publicacoes" },
  { name: "Editais", slug: "editais" },
  { name: "Comunicados", slug: "comunicados" },
  { name: "Homenagens", slug: "homenagens" },
  { name: "Notas de Falecimento", slug: "notas-de-falecimento" },
  { name: "Notícias", slug: "noticias" },
];

async function criarCategorias() {
  console.log("\n🏷️  CRIAÇÃO DE CATEGORIAS");
  console.log("=".repeat(50));
  
  let criadas = 0;
  let existentes = 0;
  
  for (const categoria of categorias) {
    try {
      const existe = await prisma.term.findUnique({
        where: { slug: categoria.slug },
      });
      
      if (existe) {
        console.log(`⏭️  Categoria "${categoria.name}" já existe`);
        existentes++;
      } else {
        await prisma.term.create({
          data: {
            taxonomy: "category",
            name: categoria.name,
            slug: categoria.slug,
          },
        });
        console.log(`✅ Categoria "${categoria.name}" criada`);
        criadas++;
      }
    } catch (error: any) {
      console.error(`❌ Erro ao criar "${categoria.name}":`, error.message);
    }
  }
  
  console.log("\n" + "=".repeat(50));
  console.log(`📊 RESUMO:`);
  console.log(`✅ Categorias criadas: ${criadas}`);
  console.log(`⏭️  Já existiam: ${existentes}`);
  console.log(`📈 Total: ${criadas + existentes}/${categorias.length}`);
  console.log("=".repeat(50) + "\n");
}

criarCategorias()
  .then(async () => {
    await prisma.$disconnect();
    console.log("✅ Processo concluído!");
    process.exit(0);
  })
  .catch(async (error) => {
    console.error("❌ Erro fatal:", error);
    await prisma.$disconnect();
    process.exit(1);
  });
