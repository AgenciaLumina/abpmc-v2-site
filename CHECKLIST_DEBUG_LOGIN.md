# Checklist de Debug - Problema de Login em Produção

## ❌ PROBLEMA IDENTIFICADO
- Login não funciona em produção (Vercel)
- Nem admin nem associado conseguem logar
- Precisa verificar conexão com banco e NextAuth

---

## ✅ CHECKLIST DE VERIFICAÇÃO

### 1. VARIÁVEIS DE AMBIENTE NA VERCEL

#### 1.1 Verificar DATABASE_URL
```bash
vercel env ls
```

**Verificar:**
- [ ] DATABASE_URL existe
- [ ] Aponta para Neon PostgreSQL
- [ ] Tem formato correto: `postgresql://user:pass@host/db?sslmode=require`
- [ ] Está configurada para Production, Preview e Development

#### 1.2 Verificar NEXTAUTH_SECRET
```bash
vercel env ls | grep NEXTAUTH
```

**Verificar:**
- [ ] NEXTAUTH_SECRET existe
- [ ] Tem pelo menos 32 caracteres
- [ ] Está configurada para Production

#### 1.3 Verificar NEXTAUTH_URL
**Verificar:**
- [ ] NEXTAUTH_URL existe
- [ ] Aponta para URL de produção da Vercel
- [ ] Formato: `https://[seu-projeto].vercel.app`

---

### 2. CONEXÃO COM BANCO DE DADOS

#### 2.1 Testar Conexão Direta
```bash
DATABASE_URL="postgresql://..." node -e "const {PrismaClient}=require('@prisma/client');const p=new PrismaClient();p.$connect().then(()=>console.log('✅ Conectado')).catch(e=>console.error('❌',e)).finally(()=>p.$disconnect());"
```

**Verificar:**
- [ ] Conexão estabelecida com sucesso
- [ ] Sem erros de SSL
- [ ] Sem timeout

#### 2.2 Verificar Usuários no Banco
```bash
DATABASE_URL="postgresql://..." npx prisma studio
```

**Verificar:**
- [ ] Tabela `associados` existe
- [ ] Usuários admin e associado existem
- [ ] Campo `senhaHash` está preenchido
- [ ] Campo `email` está correto
- [ ] Campo `role` está correto (ADMIN/ASSOCIADO)

---

### 3. NEXTAUTH CONFIGURAÇÃO

#### 3.1 Verificar Arquivo de Configuração
**Arquivo:** `app/api/auth/[...nextauth]/route.ts`

**Verificar:**
- [ ] Arquivo existe
- [ ] Providers configurados corretamente
- [ ] Callbacks implementados
- [ ] Session strategy definida

#### 3.2 Verificar Credenciais Provider
**Verificar:**
- [ ] `authorize` function implementada
- [ ] Busca usuário no banco
- [ ] Compara senha com bcrypt
- [ ] Retorna objeto de usuário correto

---

### 4. PRISMA CLIENT

#### 4.1 Verificar Geração
**Verificar:**
- [ ] `prisma generate` executado no build
- [ ] Sem erros de schema
- [ ] Client gerado corretamente

#### 4.2 Verificar Singleton
**Arquivo:** `lib/prisma.ts`

**Verificar:**
- [ ] Singleton pattern implementado
- [ ] Não cria múltiplas instâncias
- [ ] Usa variável de ambiente correta

---

### 5. LOGS E ERROS

#### 5.1 Verificar Logs da Vercel
```bash
vercel logs [url-do-deploy] --since 1h
```

**Procurar por:**
- [ ] Erros de conexão com banco
- [ ] Erros de NextAuth
- [ ] Erros de Prisma
- [ ] Timeouts
- [ ] Erros 500

#### 5.2 Verificar Console do Browser
**Verificar:**
- [ ] Erros de CORS
- [ ] Erros de fetch
- [ ] Erros de autenticação
- [ ] Redirects incorretos

---

### 6. ROTAS E ENDPOINTS

#### 6.1 Verificar Rota de Login
**Testar:**
```bash
curl -X POST https://[seu-projeto].vercel.app/api/auth/callback/credentials \
  -H "Content-Type: application/json" \
  -d '{"email":"paulo@agencialumina.com.br","password":"Sucesso102030#"}'
```

**Verificar:**
- [ ] Endpoint responde
- [ ] Não retorna 404
- [ ] Não retorna 500
- [ ] Headers corretos

#### 6.2 Verificar Session
```bash
curl https://[seu-projeto].vercel.app/api/auth/session
```

**Verificar:**
- [ ] Endpoint responde
- [ ] Retorna estrutura de session
- [ ] Sem erros

---

### 7. BCRYPT E SENHAS

#### 7.1 Verificar Hash no Banco
**Verificar:**
- [ ] `senhaHash` começa com `$2a$` ou `$2b$`
- [ ] Tem 60 caracteres
- [ ] Foi gerado com bcrypt

#### 7.2 Testar Comparação Local
```bash
node -e "const bcrypt=require('bcryptjs');const hash='[hash-do-banco]';bcrypt.compare('Sucesso102030#',hash).then(r=>console.log(r?'✅ Match':'❌ No match'));"
```

**Verificar:**
- [ ] Senha bate com hash
- [ ] bcrypt instalado
- [ ] Versão compatível

---

### 8. CORS E HEADERS

#### 8.1 Verificar CORS
**Verificar:**
- [ ] CORS configurado no NextAuth
- [ ] Headers permitidos
- [ ] Credentials permitidos

#### 8.2 Verificar Cookies
**Verificar:**
- [ ] Cookies sendo setados
- [ ] SameSite configurado
- [ ] Secure flag correto
- [ ] Domain correto

---

### 9. DEPLOY E BUILD

#### 9.1 Verificar Build Logs
**Verificar:**
- [ ] Build completou sem erros
- [ ] Prisma generate executado
- [ ] Sem warnings críticos
- [ ] Todas as rotas compiladas

#### 9.2 Verificar Arquivos Deployados
**Verificar:**
- [ ] `app/api/auth/[...nextauth]/route.ts` deployado
- [ ] `lib/prisma.ts` deployado
- [ ] `.env` não foi deployado (segurança)
- [ ] Variáveis de ambiente configuradas

---

### 10. TESTES MANUAIS

#### 10.1 Teste de Login Admin
1. [ ] Acessar `/auth/admin`
2. [ ] Preencher email: `paulo@agencialumina.com.br`
3. [ ] Preencher senha: `Sucesso102030#`
4. [ ] Clicar em Login
5. [ ] Verificar console do browser
6. [ ] Verificar Network tab
7. [ ] Verificar se redireciona

#### 10.2 Teste de Login Associado
1. [ ] Acessar `/auth/associado`
2. [ ] Preencher email: `associado@agencialumina.com.br`
3. [ ] Preencher senha: `Sucesso102030#`
4. [ ] Clicar em Login
5. [ ] Verificar console do browser
6. [ ] Verificar Network tab
7. [ ] Verificar se redireciona

---

## 🔧 COMANDOS DE DIAGNÓSTICO

### Verificar Variáveis de Ambiente
```bash
vercel env ls
vercel env pull .env.vercel.check
cat .env.vercel.check | grep -E "DATABASE_URL|NEXTAUTH"
```

### Testar Conexão com Banco
```bash
DATABASE_URL="postgresql://neondb_owner:npg_F0xNd9matZKy@ep-super-hill-acjm1msd-pooler.sa-east-1.aws.neon.tech/neondb?sslmode=require" \
npx prisma db execute --stdin <<< "SELECT COUNT(*) FROM associados;"
```

### Verificar Usuários
```bash
DATABASE_URL="postgresql://..." \
node -e "const {PrismaClient}=require('@prisma/client');const p=new PrismaClient();p.associado.findMany({select:{id:true,email:true,role:true,status:true}}).then(u=>console.log(u)).finally(()=>p.$disconnect());"
```

### Ver Logs em Tempo Real
```bash
vercel logs --follow
```

---

## 🚨 PROBLEMAS COMUNS

### 1. NEXTAUTH_SECRET não configurado
**Sintoma:** Erro de "secret is required"  
**Solução:** Adicionar NEXTAUTH_SECRET nas env vars

### 2. NEXTAUTH_URL incorreto
**Sintoma:** Redirect loops  
**Solução:** Configurar URL correta da Vercel

### 3. DATABASE_URL incorreto
**Sintoma:** Erro de conexão  
**Solução:** Verificar string de conexão

### 4. Prisma Client não gerado
**Sintoma:** "Cannot find module @prisma/client"  
**Solução:** Adicionar `prisma generate` no build

### 5. Senha hash incompatível
**Sintoma:** Login sempre falha  
**Solução:** Recriar usuários com hash correto

### 6. CORS bloqueando
**Sintoma:** Erro de CORS no console  
**Solução:** Configurar CORS no NextAuth

### 7. Cookies não sendo setados
**Sintoma:** Session não persiste  
**Solução:** Verificar configuração de cookies

---

## 📋 PRÓXIMOS PASSOS

1. [ ] Executar todos os itens do checklist
2. [ ] Anotar quais falharam
3. [ ] Corrigir problemas encontrados
4. [ ] Testar novamente
5. [ ] Documentar solução

---

**Criado em:** 28/10/2025  
**Objetivo:** Diagnosticar problema de login em produção  
**Status:** Aguardando execução do checklist
