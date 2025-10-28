import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function createUsers() {
  try {
    console.log('🔄 Criando usuários...');

    // Hash da senha
    const password = 'Sucesso102030#';
    const hashedPassword = await bcrypt.hash(password, 12);

    // 1. Criar Super Admin (usando model Associado com role SUPERADMIN)
    const superAdmin = await prisma.associado.upsert({
      where: { email: 'paulo@agencialumina.com.br' },
      update: {
        senhaHash: hashedPassword,
        nome: 'Paulo Medeiros',
        role: 'SUPERADMIN',
        status: 'ATIVO',
        visivelNoSite: false, // Admin não aparece na lista pública
      },
      create: {
        email: 'paulo@agencialumina.com.br',
        senhaHash: hashedPassword,
        nome: 'Paulo Medeiros',
        cpf: '111.111.111-11', // CPF fictício para admin
        telefone: '(11) 99999-0001',
        endereco: 'Endereço Admin',
        cidade: 'São Paulo',
        estado: 'SP',
        cep: '01000-001',
        role: 'SUPERADMIN',
        status: 'ATIVO',
        visivelNoSite: false, // Admin não aparece na lista pública
      },
    });

    console.log('✅ Super Admin criado:', {
      id: superAdmin.id,
      email: superAdmin.email,
      role: superAdmin.role,
    });

    // 2. Criar Associado de Teste
    const associado = await prisma.associado.upsert({
      where: { email: 'teste@agencialumina.com.br' },
      update: {
        senhaHash: hashedPassword,
        nome: 'Usuário Teste',
        role: 'ASSOCIADO',
        status: 'ATIVO',
        visivelNoSite: false,
      },
      create: {
        email: 'teste@agencialumina.com.br',
        senhaHash: hashedPassword,
        nome: 'Usuário Teste',
        cpf: '000.000.000-00', // CPF fictício para teste
        telefone: '(11) 99999-9999',
        endereco: 'Endereço de Teste',
        cidade: 'São Paulo',
        estado: 'SP',
        cep: '01000-000',
        role: 'ASSOCIADO',
        status: 'ATIVO',
        visivelNoSite: false, // Não aparece na lista pública
      },
    });

    console.log('✅ Associado criado:', {
      id: associado.id,
      email: associado.email,
      nome: associado.nome,
      status: associado.status,
    });

    console.log('\n🎉 Usuários criados com sucesso!');
    console.log('\n📋 Credenciais:');
    console.log('Super Admin Dashboard:');
    console.log('  Email: paulo@agencialumina.com.br');
    console.log('  Senha: Sucesso102030#');
    console.log('  Acesso: /admin');
    console.log('\nÁrea do Sócio:');
    console.log('  Email: teste@agencialumina.com.br');
    console.log('  Senha: Sucesso102030#');
    console.log('  Acesso: /socios (área restrita)');

  } catch (error) {
    console.error('❌ Erro ao criar usuários:', error);
  } finally {
    await prisma.$disconnect();
  }
}

createUsers();
