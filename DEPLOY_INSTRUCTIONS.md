# Instruções de Deploy - Vercel

## ❌ PROBLEMA ENCONTRADO

Deploy falhou com erro:
```
Error: Environment variable not found: DIRECT_URL
```

## 🔧 SOLUÇÃO

A variável `DIRECT_URL` precisa ser adicionada nas configurações de ambiente da Vercel.

### O que é DIRECT_URL?

- `DATABASE_URL`: Conexão via pooler (PgBouncer) para runtime
- `DIRECT_URL`: Conexão direta para migrations e operações administrativas

### Como Adicionar

#### Opção 1: Via Dashboard Vercel (RECOMENDADO)

1. Acesse: https://vercel.com/dashboard
2. Selecione o projeto `abpmc-v2`
3. Vá em **Settings** → **Environment Variables**
4. Adicione nova variável:
   - **Name**: `DIRECT_URL`
   - **Value**: String de conexão PostgreSQL direta (sem pooler)
   - **Environments**: Production, Preview, Development

**Formato da DIRECT_URL:**
```
postgresql://user:password@host:5432/database
```

**Diferença do DATABASE_URL:**
```
DATABASE_URL=postgresql://user:password@host:5432/database?pgbouncer=true
DIRECT_URL=postgresql://user:password@host:5432/database
```

#### Opção 2: Via CLI

```bash
# Production
vercel env add DIRECT_URL production

# Preview
vercel env add DIRECT_URL preview

# Development
vercel env add DIRECT_URL development
```

## 📋 VARIÁVEIS NECESSÁRIAS

### Banco de Dados
- ✅ `DATABASE_URL` - Já configurada
- ❌ `DIRECT_URL` - **FALTA ADICIONAR**

### Outras (já configuradas)
- `NEXTAUTH_SECRET`
- `NEXTAUTH_URL`
- `MERCADO_PAGO_ACCESS_TOKEN`
- `MERCADO_PAGO_PUBLIC_KEY`
- Etc.

## 🚀 PASSOS PARA DEPLOY

### 1. Adicionar DIRECT_URL na Vercel
```bash
# Via dashboard ou CLI
vercel env add DIRECT_URL production
```

### 2. Fazer Deploy
```bash
# Build local (opcional, para testar)
npm run build

# Deploy para produção
vercel --prod
```

### 3. Verificar Deploy
```bash
# Ver logs
vercel logs

# Ver status
vercel ls
```

## 🔍 VERIFICAÇÃO

### Build Local Funcionou ✅
```
Route (app)                                Size       First Load JS
├ ○ /quem-somos                            744 B      162 kB
├ ○ /transparencia                         1.14 kB    88.7 kB
└ ... (todas as rotas compiladas)
```

### Deploy Vercel Falhou ❌
```
Error: Environment variable not found: DIRECT_URL
```

## 📝 PRÓXIMOS PASSOS

1. ⏳ **Adicionar DIRECT_URL** via dashboard Vercel
2. ⏳ **Refazer deploy** com `vercel --prod`
3. ⏳ **Verificar migrations** rodaram corretamente
4. ⏳ **Testar aplicação** em produção

## 💡 DICA

Para evitar esse problema no futuro, sempre configure AMBAS as variáveis:
- `DATABASE_URL` - Para queries normais (via pooler)
- `DIRECT_URL` - Para migrations e admin

## 🔗 LINKS ÚTEIS

- Dashboard Vercel: https://vercel.com/dashboard
- Docs Prisma + Vercel: https://www.prisma.io/docs/guides/deployment/deployment-guides/deploying-to-vercel
- Docs PgBouncer: https://www.prisma.io/docs/guides/performance-and-optimization/connection-management/configure-pg-bouncer

---

**Data**: Outubro 2025  
**Status**: Aguardando configuração de DIRECT_URL
