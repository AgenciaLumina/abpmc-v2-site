import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function testar() {
  console.log("\n🧪 TESTANDO CONSULTA DE SÓCIOS\n");
  
  // Teste 1: Total no banco
  const total = await prisma.associado.count();
  console.log(`✅ Total no banco: ${total}`);
  
  // Teste 2: Com filtros (igual à API)
  const sociosAPI = await prisma.associado.findMany({
    where: {
      visivelNoSite: true,
      status: "ATIVO",
    },
    select: {
      id: true,
      nome: true,
      email: true,
      curriculoLattes: true,
    },
    take: 5,
  });
  
  console.log(`✅ Com filtros (API): ${sociosAPI.length} sócios`);
  console.log("\n📝 Primeiros 5:");
  sociosAPI.forEach(s => {
    console.log(`   - ${s.nome} (${s.email})`);
  });
  
  // Teste 3: Verificar status e visibilidade
  const stats = await prisma.associado.groupBy({
    by: ["visivelNoSite", "status"],
    _count: true,
  });
  
  console.log("\n📊 Estatísticas:");
  stats.forEach(s => {
    console.log(`   ${s.status} / Visível: ${s.visivelNoSite} = ${s._count} sócios`);
  });
  
  console.log("\n");
}

testar()
  .then(() => process.exit(0))
  .catch(error => {
    console.error("❌ Erro:", error);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
