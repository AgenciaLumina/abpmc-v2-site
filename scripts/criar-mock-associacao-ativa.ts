import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🎭 Criando mock de associação ativa...\n');

  // 1. Buscar o associado
  const associado = await prisma.associado.findUnique({
    where: { email: 'associado@agencialumina.com.br' },
  });

  if (!associado) {
    console.error('❌ Associado não encontrado!');
    process.exit(1);
  }

  console.log('✅ Associado encontrado:', associado.nome);

  // 2. Criar ou atualizar plano anual
  console.log('\n📋 Criando plano anual...');
  const plano = await prisma.plano.upsert({
    where: { id: 1 },
    update: {
      nome: 'Associação Anual',
      descricao: 'Plano de associação anual com todos os benefícios',
      valor: 350.00,
      recorrente: true,
      duracaoDias: 365,
      ativo: true,
    },
    create: {
      nome: 'Associação Anual',
      descricao: 'Plano de associação anual com todos os benefícios',
      valor: 350.00,
      recorrente: true,
      duracaoDias: 365,
      ativo: true,
    },
  });
  console.log('✅ Plano criado:', plano.nome, '- R$', plano.valor);

  // 3. Atualizar associado com plano e dados completos
  console.log('\n👤 Atualizando dados do associado...');
  const dataAtual = new Date();
  const vencimento = new Date();
  vencimento.setFullYear(vencimento.getFullYear() + 1); // Vence daqui 1 ano

  const associadoAtualizado = await prisma.associado.update({
    where: { id: associado.id },
    data: {
      planoId: plano.id,
      status: 'ATIVO',
      vencimento: vencimento,
      emailVerificado: true,
      ultimoLogin: dataAtual,
      endereco: 'Rua das Flores, 123',
      cidade: 'São Paulo',
      estado: 'SP',
      cep: '01234-567',
      curriculoLattes: 'http://lattes.cnpq.br/1234567890123456',
      visivelNoSite: true,
    },
  });
  console.log('✅ Associado atualizado com sucesso!');

  // 4. Criar transação de pagamento aprovada
  console.log('\n💳 Criando transação de pagamento...');
  const dataPagamento = new Date();
  dataPagamento.setDate(dataPagamento.getDate() - 5); // Pago há 5 dias

  const transacao = await prisma.transacao.create({
    data: {
      associadoId: associado.id,
      planoId: plano.id,
      valor: plano.valor,
      status: 'APROVADO',
      metodo: 'mercadopago',
      paymentId: `MP-${Date.now()}`,
      preferenceId: `PREF-${Date.now()}`,
      dataPagamento: dataPagamento,
      dataVencimento: vencimento,
      descricao: `Pagamento de ${plano.nome} - Mock de teste`,
    },
  });
  console.log('✅ Transação criada:', transacao.id, '- Status:', transacao.status);

  // 5. Resumo final
  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('📊 RESUMO DA ASSOCIAÇÃO ATIVA');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('');
  console.log('👤 ASSOCIADO');
  console.log(`   Nome: ${associadoAtualizado.nome}`);
  console.log(`   Email: ${associadoAtualizado.email}`);
  console.log(`   CPF: ${associadoAtualizado.cpf}`);
  console.log(`   Status: ${associadoAtualizado.status}`);
  console.log(`   Email Verificado: ${associadoAtualizado.emailVerificado ? 'Sim' : 'Não'}`);
  console.log('');
  console.log('📋 PLANO');
  console.log(`   Nome: ${plano.nome}`);
  console.log(`   Valor: R$ ${plano.valor.toFixed(2)}`);
  console.log(`   Duração: ${plano.duracaoDias} dias`);
  console.log(`   Vencimento: ${vencimento.toLocaleDateString('pt-BR')}`);
  console.log('');
  console.log('💳 PAGAMENTO');
  console.log(`   ID: ${transacao.id}`);
  console.log(`   Status: ${transacao.status}`);
  console.log(`   Método: ${transacao.metodo}`);
  console.log(`   Valor: R$ ${transacao.valor.toFixed(2)}`);
  console.log(`   Data Pagamento: ${transacao.dataPagamento?.toLocaleDateString('pt-BR')}`);
  console.log('');
  console.log('📍 ENDEREÇO');
  console.log(`   ${associadoAtualizado.endereco}`);
  console.log(`   ${associadoAtualizado.cidade} - ${associadoAtualizado.estado}`);
  console.log(`   CEP: ${associadoAtualizado.cep}`);
  console.log('');
  console.log('🔗 CURRÍCULO LATTES');
  console.log(`   ${associadoAtualizado.curriculoLattes}`);
  console.log('');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('✅ Mock de associação ativa criado com sucesso!');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
}

main()
  .catch((e) => {
    console.error('❌ Erro ao criar mock:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
