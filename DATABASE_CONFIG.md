# 🗄️ CONFIGURAÇÃO DE DATABASE - PRISMA

**Data:** 27/10/2025 20:36 UTC-3  
**Status:** ✅ **CONFIGURADO**

---

## 🎯 PROBLEMA RESOLVIDO

### **Antes:**
```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

**Problema:**
- Migrations falhavam com connection pooling (PgBouncer/Neon)
- Erro: "prepared statement already exists"
- Incompatibilidade entre pooler e migrations

---

### **Depois:**
```prisma
datasource db {
  provider  = "postgresql"
  url       = env("DATABASE_URL")   // pooler para runtime
  directUrl = env("DIRECT_URL")     // conexão direta para migrations
}
```

**Solução:**
- ✅ `DATABASE_URL` usa pooler para queries em runtime (performance)
- ✅ `DIRECT_URL` usa conexão direta para migrations (compatibilidade)
- ✅ Melhor dos dois mundos

---

## 📝 VARIÁVEIS DE AMBIENTE

### **Para Neon (Recomendado):**

```bash
# .env ou Vercel Environment Variables

# Pooled connection (para runtime - queries rápidas)
DATABASE_URL="postgresql://user:password@ep-xxx.pooler.neon.tech/neondb?sslmode=require"

# Direct connection (para migrations)
DIRECT_URL="postgresql://user:password@ep-xxx.neon.tech/neondb?sslmode=require"
```

**Diferença:**
- `DATABASE_URL`: usa `.pooler.neon.tech` (PgBouncer)
- `DIRECT_URL`: usa `.neon.tech` (conexão direta)

---

### **Para Vercel Postgres:**

```bash
# Pooled connection
DATABASE_URL="postgres://default:xxx@xxx-pooler.postgres.vercel-storage.com/verceldb?sslmode=require"

# Direct connection
DIRECT_URL="postgres://default:xxx@xxx.postgres.vercel-storage.com/verceldb?sslmode=require"
```

**Diferença:**
- `DATABASE_URL`: usa `-pooler.` no hostname
- `DIRECT_URL`: sem `-pooler.` no hostname

---

### **Para Supabase:**

```bash
# Pooled connection (Transaction mode)
DATABASE_URL="postgresql://postgres:xxx@db.xxx.supabase.co:6543/postgres?pgbouncer=true"

# Direct connection
DIRECT_URL="postgresql://postgres:xxx@db.xxx.supabase.co:5432/postgres"
```

**Diferença:**
- `DATABASE_URL`: porta 6543 + `?pgbouncer=true`
- `DIRECT_URL`: porta 5432 (padrão PostgreSQL)

---

## 🚀 COMO USAR

### **1. Desenvolvimento Local:**

```bash
# .env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/abpmc"
DIRECT_URL="postgresql://postgres:postgres@localhost:5432/abpmc"
```

Ambas podem ser iguais em desenvolvimento local.

---

### **2. Produção (Vercel):**

#### **Opção A: Via Dashboard**
1. Ir em **Settings → Environment Variables**
2. Adicionar:
   - `DATABASE_URL` = URL com pooler
   - `DIRECT_URL` = URL direta

#### **Opção B: Via CLI**
```bash
vercel env add DATABASE_URL production
# Colar URL com pooler

vercel env add DIRECT_URL production
# Colar URL direta
```

---

### **3. Executar Migrations:**

```bash
# Desenvolvimento
npx prisma migrate dev

# Produção (após deploy)
npx prisma migrate deploy
```

Prisma usará automaticamente:
- `DIRECT_URL` para migrations
- `DATABASE_URL` para queries em runtime

---

## 🔍 COMO OBTER AS URLs

### **Neon:**

1. Acesse https://console.neon.tech
2. Selecione seu projeto
3. Vá em **Dashboard → Connection Details**
4. Copie:
   - **Pooled connection** → `DATABASE_URL`
   - **Direct connection** → `DIRECT_URL`

### **Vercel Postgres:**

1. Acesse https://vercel.com/dashboard
2. Vá em **Storage → Postgres**
3. Selecione seu database
4. Em **Connection String**:
   - `.env.local` tab → copia `POSTGRES_URL_NON_POOLING` → `DIRECT_URL`
   - `.env.local` tab → copia `POSTGRES_URL` → `DATABASE_URL`

### **Supabase:**

1. Acesse https://app.supabase.com
2. Selecione seu projeto
3. Vá em **Settings → Database**
4. Em **Connection string**:
   - **Transaction mode** (porta 6543) → `DATABASE_URL`
   - **Session mode** (porta 5432) → `DIRECT_URL`

---

## ✅ BENEFÍCIOS

### **DATABASE_URL (Pooled):**
- ✅ Conexões reutilizadas (pool)
- ✅ Melhor performance em produção
- ✅ Suporta mais requisições simultâneas
- ✅ Menor latência

### **DIRECT_URL (Direct):**
- ✅ Compatível com migrations
- ✅ Suporta prepared statements
- ✅ Necessário para `prisma migrate`
- ✅ Evita erros de pooling

---

## 🧪 TESTAR CONFIGURAÇÃO

### **1. Validar Schema:**
```bash
npx prisma validate
```

Deve retornar: `✔ The schema is valid`

### **2. Testar Conexão:**
```bash
npx prisma db pull
```

Deve conectar sem erros.

### **3. Gerar Client:**
```bash
npx prisma generate
```

Deve gerar o Prisma Client.

### **4. Executar Migration:**
```bash
npx prisma migrate deploy
```

Deve aplicar migrations usando `DIRECT_URL`.

---

## 📊 EXEMPLO COMPLETO

### **.env (Desenvolvimento):**
```bash
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/abpmc"
DIRECT_URL="postgresql://postgres:postgres@localhost:5432/abpmc"
NEXTAUTH_SECRET="dev-secret-min-32-characters-long"
NEXTAUTH_URL="http://localhost:3000"
```

### **Vercel Environment Variables (Produção):**
```bash
DATABASE_URL="postgresql://user:pass@ep-xxx.pooler.neon.tech/neondb?sslmode=require"
DIRECT_URL="postgresql://user:pass@ep-xxx.neon.tech/neondb?sslmode=require"
NEXTAUTH_SECRET="prod-secret-generated-with-openssl"
NEXTAUTH_URL="https://abpmc-v2.vercel.app"
```

---

## ⚠️ IMPORTANTE

### **Nunca commitar:**
- ❌ `.env` (está no .gitignore)
- ❌ Senhas ou tokens reais
- ❌ URLs de produção

### **Sempre usar:**
- ✅ `.env.example` para documentar
- ✅ Vercel Environment Variables para produção
- ✅ Secrets diferentes entre dev/prod

---

## 🔧 TROUBLESHOOTING

### **Erro: "prepared statement already exists"**
**Causa:** Usando pooler para migrations  
**Solução:** Adicionar `DIRECT_URL` sem pooler

### **Erro: "Can't reach database server"**
**Causa:** URL incorreta ou firewall  
**Solução:** Verificar URL e whitelist de IPs

### **Erro: "SSL connection required"**
**Causa:** Falta `?sslmode=require` na URL  
**Solução:** Adicionar parâmetro SSL

### **Migrations lentas na Vercel**
**Causa:** Usando pooler para migrations  
**Solução:** Configurar `DIRECT_URL` corretamente

---

## 📚 REFERÊNCIAS

- [Prisma Connection Pooling](https://www.prisma.io/docs/guides/performance-and-optimization/connection-management#pgbouncer)
- [Neon Connection Pooling](https://neon.tech/docs/connect/connection-pooling)
- [Vercel Postgres](https://vercel.com/docs/storage/vercel-postgres)
- [Supabase Connection Pooling](https://supabase.com/docs/guides/database/connecting-to-postgres#connection-pooler)

---

**Status:** 🟢 **CONFIGURAÇÃO OTIMIZADA PARA PRODUÇÃO**

**Arquivos modificados:**
- ✅ `prisma/schema.prisma` - Adicionado `directUrl`
- ✅ `.env.example` - Adicionado `DIRECT_URL`
