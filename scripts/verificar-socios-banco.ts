import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function verificarSocios() {
  console.log("\n📊 VERIFICANDO SÓCIOS NO BANCO\n");
  console.log("=".repeat(60));

  const total = await prisma.associado.count();
  const visiveis = await prisma.associado.count({
    where: { visivelNoSite: true },
  });
  const ativos = await prisma.associado.count({
    where: { status: "ATIVO" },
  });

  console.log(`\n📈 Total de sócios: ${total}`);
  console.log(`👁️  Visíveis no site: ${visiveis}`);
  console.log(`✅ Ativos: ${ativos}`);

  // Listar 5 sócios
  const exemplos = await prisma.associado.findMany({
    take: 5,
    select: {
      id: true,
      nome: true,
      email: true,
      visivelNoSite: true,
      status: true,
    },
  });

  console.log("\n📝 Exemplos de sócios:");
  exemplos.forEach((s) => {
    console.log(`   ${s.nome} (${s.email})`);
    console.log(`      Visível: ${s.visivelNoSite}, Status: ${s.status}`);
  });

  console.log("\n" + "=".repeat(60) + "\n");
}

verificarSocios()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("❌ Erro:", error);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
