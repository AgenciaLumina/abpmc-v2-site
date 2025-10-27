import { PrismaClient, UserRole, AssociadoStatus } from "@prisma/client";
import { hashPassword } from "../lib/auth";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Iniciando seed do banco de dados...");

  // Criar planos de anuidade
  console.log("📦 Criando planos de anuidade...");

  const planoEstudante = await prisma.plano.upsert({
    where: { id: 1 },
    update: {},
    create: {
      nome: "Estudante",
      descricao: "Plano para estudantes de graduação e pós-graduação",
      valor: 150.0,
      recorrente: true,
      duracaoDias: 365,
      ativo: true,
    },
  });

  const planoAssociado = await prisma.plano.upsert({
    where: { id: 2 },
    update: {},
    create: {
      nome: "Associado",
      descricao: "Plano padrão para profissionais associados",
      valor: 300.0,
      recorrente: true,
      duracaoDias: 365,
      ativo: true,
    },
  });

  const planoInstitucional = await prisma.plano.upsert({
    where: { id: 3 },
    update: {},
    create: {
      nome: "Institucional",
      descricao: "Plano para instituições e empresas",
      valor: 500.0,
      recorrente: true,
      duracaoDias: 365,
      ativo: true,
    },
  });

  console.log(`✓ Criados 3 planos: ${planoEstudante.nome}, ${planoAssociado.nome}, ${planoInstitucional.nome}`);

  // Criar usuário admin de teste
  console.log("👤 Criando usuário admin de teste...");

  const senhaAdmin = await hashPassword("admin123");
  const vencimentoAdmin = new Date();
  vencimentoAdmin.setFullYear(vencimentoAdmin.getFullYear() + 1);

  const admin = await prisma.associado.upsert({
    where: { email: "admin@abpmc.org.br" },
    update: {},
    create: {
      nome: "Administrador ABPMC",
      email: "admin@abpmc.org.br",
      senhaHash: senhaAdmin,
      cpf: "00000000000",
      telefone: "(11) 99999-9999",
      role: UserRole.SUPERADMIN,
      status: AssociadoStatus.ATIVO,
      emailVerificado: true,
      planoId: planoInstitucional.id,
      vencimento: vencimentoAdmin,
    },
  });

  console.log(`✓ Admin criado: ${admin.email} (senha: admin123)`);

  // Criar associado de teste
  console.log("👤 Criando associado de teste...");

  const senhaAssociado = await hashPassword("teste123");
  const vencimentoAssociado = new Date();
  vencimentoAssociado.setDate(vencimentoAssociado.getDate() + 15); // Vence em 15 dias

  const associadoTeste = await prisma.associado.upsert({
    where: { email: "associado@teste.com" },
    update: {},
    create: {
      nome: "Associado Teste",
      email: "associado@teste.com",
      senhaHash: senhaAssociado,
      cpf: "11111111111",
      telefone: "(11) 98888-8888",
      role: UserRole.ASSOCIADO,
      status: AssociadoStatus.ATIVO,
      emailVerificado: true,
      planoId: planoAssociado.id,
      vencimento: vencimentoAssociado,
    },
  });

  console.log(`✓ Associado criado: ${associadoTeste.email} (senha: teste123)`);

  // Criar conteúdos restritos de exemplo
  console.log("📚 Criando conteúdos restritos de exemplo...");

  await prisma.conteudoRestrito.upsert({
    where: { id: 1 },
    update: {},
    create: {
      titulo: "Manual do Associado ABPMC 2024",
      corpo: "Conteúdo completo do manual do associado com todas as orientações e benefícios.",
      categoria: "Documentação",
      tipo: "DOWNLOAD",
      visivelApenas: "ASSOCIADOS",
      anexoUrl: "/downloads/manual-associado-2024.pdf",
      ativo: true,
    },
  });

  await prisma.conteudoRestrito.upsert({
    where: { id: 2 },
    update: {},
    create: {
      titulo: "Artigo: Avanços em Terapia Comportamental",
      corpo: "Artigo científico exclusivo sobre os últimos avanços em terapia comportamental.",
      categoria: "Artigos Científicos",
      tipo: "ARTIGO",
      visivelApenas: "ASSOCIADOS",
      ativo: true,
    },
  });

  console.log("✓ Criados 2 conteúdos restritos");

  // Criar configurações do sistema
  console.log("⚙️ Criando configurações do sistema...");

  await prisma.configuracaoSistema.upsert({
    where: { chave: "site_name" },
    update: {},
    create: {
      chave: "site_name",
      valor: "ABPMC",
      tipo: "string",
      descricao: "Nome do site",
    },
  });

  await prisma.configuracaoSistema.upsert({
    where: { chave: "email_avisos_enabled" },
    update: {},
    create: {
      chave: "email_avisos_enabled",
      valor: "true",
      tipo: "boolean",
      descricao: "Habilitar envio de emails de aviso de vencimento",
    },
  });

  await prisma.configuracaoSistema.upsert({
    where: { chave: "dias_aviso_vencimento" },
    update: {},
    create: {
      chave: "dias_aviso_vencimento",
      valor: "30,15,7,3",
      tipo: "string",
      descricao: "Dias antes do vencimento para enviar avisos (separados por vírgula)",
    },
  });

  console.log("✓ Criadas 3 configurações do sistema");

  console.log("\n✅ Seed concluído com sucesso!");
  console.log("\n📝 Credenciais de acesso:");
  console.log("   Admin: admin@abpmc.org.br / admin123");
  console.log("   Associado: associado@teste.com / teste123\n");
}

main()
  .catch((e) => {
    console.error("❌ Erro no seed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
