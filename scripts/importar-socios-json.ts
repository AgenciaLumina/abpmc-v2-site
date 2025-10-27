import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import * as fs from "fs";
import * as path from "path";

const prisma = new PrismaClient();

async function importarSociosDeJSON() {
  // Ler arquivo JSON
  const jsonPath = path.join(__dirname, "socios-completos.json");
  
  if (!fs.existsSync(jsonPath)) {
    console.error("❌ Arquivo socios-completos.json não encontrado!");
    console.log("📝 Por favor, crie o arquivo com todos os sócios.");
    return;
  }
  
  const sociosData = JSON.parse(fs.readFileSync(jsonPath, "utf-8"));
  
  console.log(`🚀 Iniciando importação de ${sociosData.length} sócios...`);
  
  let importados = 0;
  let atualizados = 0;
  let erros = 0;
  
  // Senha padrão para todos (DEVE SER ALTERADA NO PRIMEIRO LOGIN)
  const senhaTemporaria = "MudarSenha@2025";
  const senhaHash = await bcrypt.hash(senhaTemporaria, 10);
  
  for (const socio of sociosData) {
    try {
      const resultado = await prisma.associado.upsert({
        where: { email: socio.email },
        update: {
          nome: socio.name,
          curriculoLattes: socio.cv || null,
          visivelNoSite: true,
        },
        create: {
          nome: socio.name,
          email: socio.email,
          senhaHash: senhaHash,
          curriculoLattes: socio.cv || null,
          visivelNoSite: true,
          status: "ATIVO",
          emailVerificado: false,
          role: "ASSOCIADO",
        },
      });
      
      // Verificar se é novo ou atualizado
      const isNovo = resultado.createdAt.getTime() === resultado.updatedAt.getTime();
      
      if (isNovo) {
        importados++;
        console.log(`✅ [${importados + atualizados}/${sociosData.length}] NOVO: ${socio.name}`);
      } else {
        atualizados++;
        console.log(`🔄 [${importados + atualizados}/${sociosData.length}] ATUALIZADO: ${socio.name}`);
      }
    } catch (error: any) {
      erros++;
      console.error(`❌ ERRO em ${socio.name} (${socio.email}): ${error.message}`);
    }
  }
  
  console.log("\n" + "=".repeat(60));
  console.log("📊 RESUMO DA IMPORTAÇÃO:");
  console.log("=".repeat(60));
  console.log(`✅ Novos sócios importados: ${importados}`);
  console.log(`🔄 Sócios atualizados: ${atualizados}`);
  console.log(`❌ Erros: ${erros}`);
  console.log(`📈 Total processado: ${importados + atualizados + erros}/${sociosData.length}`);
  console.log("=".repeat(60));
  console.log("\n⚠️  IMPORTANTE: Senha padrão de todos os sócios:");
  console.log(`   ${senhaTemporaria}`);
  console.log("   Os sócios devem alterar a senha no primeiro login!\n");
  console.log("\n✨ Acesse o painel admin para gerenciar:");
  console.log("   http://localhost:3000/admin/socios\n");
}

importarSociosDeJSON()
  .then(async () => {
    await prisma.$disconnect();
    console.log("✅ Importação concluída com sucesso!");
    process.exit(0);
  })
  .catch(async (error) => {
    console.error("❌ Erro fatal:", error);
    await prisma.$disconnect();
    process.exit(1);
  });
