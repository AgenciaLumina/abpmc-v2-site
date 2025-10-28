# Mock de Associação Ativa - Dados de Teste

## 👤 USUÁRIO ASSOCIADO

### Credenciais de Login
- **Email:** `associado@agencialumina.com.br`
- **Senha:** `Sucesso102030#`
- **URL Login:** https://abpmc-v2-lto5u0jn2-luminas-projects-465e05f0.vercel.app/auth/associado

### Status da Conta
- ✅ **Status:** ATIVO
- ✅ **Email Verificado:** Sim
- ✅ **Último Login:** Hoje
- ✅ **Role:** ASSOCIADO
- ✅ **Visível no Site:** Sim (aparece na página de sócios)

---

## 📋 DADOS DO PLANO

### Plano Contratado
- **Nome:** Associação Anual
- **Descrição:** Plano de associação anual com todos os benefícios
- **Valor:** R$ 350,00
- **Tipo:** Recorrente
- **Duração:** 365 dias
- **Status:** Ativo

### Vigência
- **Data de Início:** 23/10/2025
- **Data de Vencimento:** 28/10/2026
- **Dias Restantes:** ~365 dias

---

## 💳 TRANSAÇÃO DE PAGAMENTO

### Detalhes do Pagamento
- **ID da Transação:** #2 (produção)
- **Status:** APROVADO ✅
- **Método:** Mercado Pago
- **Valor Pago:** R$ 350,00
- **Data do Pagamento:** 23/10/2025
- **Payment ID:** MP-[timestamp]
- **Preference ID:** PREF-[timestamp]

### Descrição
```
Pagamento de Associação Anual - Mock de teste
```

---

## 📍 DADOS PESSOAIS

### Informações Básicas
- **Nome Completo:** Associado Teste
- **CPF:** 111.111.111-11
- **Telefone:** (11) 11111-1111
- **Email:** associado@agencialumina.com.br

### Endereço Completo
```
Rua das Flores, 123
São Paulo - SP
CEP: 01234-567
```

### Currículo Acadêmico
- **Lattes:** http://lattes.cnpq.br/1234567890123456

---

## 🎯 FUNCIONALIDADES DISPONÍVEIS

### Área do Associado (Dashboard)
- ✅ Visualizar dados da associação
- ✅ Ver histórico de pagamentos
- ✅ Atualizar dados pessoais
- ✅ Acessar conteúdo restrito
- ✅ Baixar comprovantes
- ✅ Ver status da associação

### Benefícios Ativos
- ✅ Acesso a eventos exclusivos
- ✅ Desconto em publicações
- ✅ Acesso à biblioteca digital
- ✅ Participação em grupos de trabalho
- ✅ Certificados de participação

---

## 🧪 CENÁRIOS DE TESTE

### 1. Login e Acesso
```
✅ Fazer login com as credenciais
✅ Verificar redirecionamento para dashboard
✅ Confirmar dados exibidos corretamente
```

### 2. Visualização de Dados
```
✅ Ver informações do plano
✅ Verificar data de vencimento
✅ Conferir status ATIVO
✅ Ver histórico de transações
```

### 3. Dados Pessoais
```
✅ Visualizar endereço completo
✅ Ver CPF e telefone
✅ Verificar link do Lattes
✅ Confirmar email verificado
```

### 4. Transações
```
✅ Ver transação aprovada
✅ Verificar valor pago
✅ Conferir método de pagamento
✅ Ver data do pagamento
```

### 5. Conteúdo Restrito
```
✅ Acessar área exclusiva
✅ Baixar materiais
✅ Ver eventos disponíveis
```

---

## 🔄 COMO RECRIAR O MOCK

### Executar Script Localmente
```bash
npx tsx scripts/criar-mock-associacao-ativa.ts
```

### Executar em Produção
```bash
DATABASE_URL="postgresql://..." npx tsx scripts/criar-mock-associacao-ativa.ts
```

### O Script Faz:
1. ✅ Busca o associado pelo email
2. ✅ Cria/atualiza plano anual (R$ 350,00)
3. ✅ Atualiza dados do associado:
   - Define plano ativo
   - Define vencimento (1 ano)
   - Verifica email
   - Adiciona endereço completo
   - Adiciona Lattes
4. ✅ Cria transação aprovada:
   - Status: APROVADO
   - Método: Mercado Pago
   - Data: 5 dias atrás
5. ✅ Exibe resumo completo

---

## 📊 ESTRUTURA DO BANCO

### Tabela: associados
```sql
id: 2
nome: "Associado Teste"
email: "associado@agencialumina.com.br"
senhaHash: [bcrypt hash]
cpf: "111.111.111-11"
telefone: "(11) 11111-1111"
endereco: "Rua das Flores, 123"
cidade: "São Paulo"
estado: "SP"
cep: "01234-567"
planoId: 1
status: "ATIVO"
vencimento: "2026-10-28"
emailVerificado: true
role: "ASSOCIADO"
curriculoLattes: "http://lattes.cnpq.br/1234567890123456"
visivelNoSite: true
```

### Tabela: planos
```sql
id: 1
nome: "Associação Anual"
descricao: "Plano de associação anual com todos os benefícios"
valor: 350.00
recorrente: true
duracaoDias: 365
ativo: true
```

### Tabela: transacoes
```sql
id: 2
associadoId: 2
planoId: 1
valor: 350.00
status: "APROVADO"
metodo: "mercadopago"
paymentId: "MP-[timestamp]"
preferenceId: "PREF-[timestamp]"
dataPagamento: "2025-10-23"
dataVencimento: "2026-10-28"
descricao: "Pagamento de Associação Anual - Mock de teste"
```

---

## ⚠️ IMPORTANTE

### Dados de Teste
- ⚠️ Estes são dados fictícios para teste
- ⚠️ CPF e endereço não são reais
- ⚠️ Transação é simulada (não há pagamento real)
- ⚠️ Link do Lattes é exemplo

### Uso Recomendado
- ✅ Testes de interface
- ✅ Validação de fluxos
- ✅ Demonstrações
- ✅ Desenvolvimento

### Não Usar Para
- ❌ Produção real
- ❌ Dados de clientes reais
- ❌ Transações financeiras reais

---

## 🔗 LINKS ÚTEIS

### Produção
- **Login:** https://abpmc-v2-lto5u0jn2-luminas-projects-465e05f0.vercel.app/auth/associado
- **Dashboard:** https://abpmc-v2-lto5u0jn2-luminas-projects-465e05f0.vercel.app/associado/dashboard
- **Perfil:** https://abpmc-v2-lto5u0jn2-luminas-projects-465e05f0.vercel.app/associado/perfil

### Local
- **Login:** http://localhost:3002/auth/associado
- **Dashboard:** http://localhost:3002/associado/dashboard
- **Perfil:** http://localhost:3002/associado/perfil

---

**Criado em:** 28/10/2025  
**Última atualização:** 28/10/2025  
**Script:** `scripts/criar-mock-associacao-ativa.ts`  
**Status:** ✅ Ativo e funcionando
