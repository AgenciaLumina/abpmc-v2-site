import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🔐 Criando usuários de teste...\n');

  const senha = 'Sucesso102030#';
  const hashedPassword = await bcrypt.hash(senha, 10);

  // 1. Criar Super Admin
  console.log('👤 Criando Super Admin...');
  const admin = await prisma.associado.upsert({
    where: { email: 'paulo@agencialumina.com.br' },
    update: {
      senhaHash: hashedPassword,
      role: 'ADMIN',
      status: 'ATIVO',
    },
    create: {
      nome: 'Paulo Medeiros',
      email: 'paulo@agencialumina.com.br',
      senhaHash: hashedPassword,
      cpf: '000.000.000-00',
      telefone: '(00) 00000-0000',
      role: 'ADMIN',
      status: 'ATIVO',
      visivelNoSite: false,
    },
  });
  console.log('✅ Super Admin criado:', admin.email);

  // 2. Criar Associado de Teste
  console.log('\n👤 Criando Associado de Teste...');
  const associado = await prisma.associado.upsert({
    where: { email: 'associado@agencialumina.com.br' },
    update: {
      senhaHash: hashedPassword,
      role: 'ASSOCIADO',
      status: 'ATIVO',
    },
    create: {
      nome: 'Associado Teste',
      email: 'associado@agencialumina.com.br',
      senhaHash: hashedPassword,
      cpf: '111.111.111-11',
      telefone: '(11) 11111-1111',
      role: 'ASSOCIADO',
      status: 'ATIVO',
      visivelNoSite: true,
      curriculoLattes: 'http://lattes.cnpq.br/1234567890',
    },
  });
  console.log('✅ Associado criado:', associado.email);

  console.log('\n📋 RESUMO DOS USUÁRIOS CRIADOS:\n');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('🔑 SUPER ADMIN');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log(`   Email: paulo@agencialumina.com.br`);
  console.log(`   Senha: Sucesso102030#`);
  console.log(`   Role:  ADMIN`);
  console.log(`   URL:   http://localhost:3002/auth/admin`);
  console.log('');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('👤 ASSOCIADO TESTE');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log(`   Email: associado@agencialumina.com.br`);
  console.log(`   Senha: Sucesso102030#`);
  console.log(`   Role:  ASSOCIADO`);
  console.log(`   URL:   http://localhost:3002/auth/associado`);
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
}

main()
  .catch((e) => {
    console.error('❌ Erro ao criar usuários:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
