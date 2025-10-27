import { PrismaClient, UserRole, AssociadoStatus } from "@prisma/client";
import { hashPassword } from "../lib/auth";

const prisma = new PrismaClient();

async function main() {
  const senha = "Sucesso102030";
  const senhaHash = await hashPassword(senha);

  console.log("🔐 Atualizando/criando usuários padrão...");

  const superadmin = await prisma.associado.upsert({
    where: { email: "admin@abpmc.org.br" },
    update: {
      nome: "Administrador ABPMC",
      role: UserRole.SUPERADMIN,
      status: AssociadoStatus.ATIVO,
      emailVerificado: true,
      senhaHash,
    },
    create: {
      nome: "Administrador ABPMC",
      email: "admin@abpmc.org.br",
      senhaHash,
      role: UserRole.SUPERADMIN,
      status: AssociadoStatus.ATIVO,
      emailVerificado: true,
    },
  });

  const associado = await prisma.associado.upsert({
    where: { email: "associado@abpmc.org.br" },
    update: {
      nome: "Associado ABPMC",
      role: UserRole.ASSOCIADO,
      status: AssociadoStatus.ATIVO,
      emailVerificado: true,
      senhaHash,
    },
    create: {
      nome: "Associado ABPMC",
      email: "associado@abpmc.org.br",
      senhaHash,
      role: UserRole.ASSOCIADO,
      status: AssociadoStatus.ATIVO,
      emailVerificado: true,
    },
  });

  console.log("✅ Usuário superadmin:", superadmin.email);
  console.log("✅ Usuário associado:", associado.email);
  console.log("📌 Senha definida para ambos:", senha);
}

main()
  .catch((error) => {
    console.error("❌ Erro ao atualizar usuários:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
