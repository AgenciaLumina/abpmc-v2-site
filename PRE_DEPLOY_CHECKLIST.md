# 🚀 PRE-DEPLOY CHECKLIST - ABPMC V2
## Análise Completa de Engenharia Senior - Vercel Deploy

**Data:** 27/10/2025  
**Status:** ⚠️ REVISÃO EM ANDAMENTO  
**Engenheiro:** Sistema de Análise Automatizada

---

## 📋 ÍNDICE

1. [Segurança](#segurança)
2. [Arquivos Duplicados](#arquivos-duplicados)
3. [Links e Navegação](#links-e-navegação)
4. [Responsividade](#responsividade)
5. [Arquivos de Mídia](#arquivos-de-mídia)
6. [Performance](#performance)
7. [SEO](#seo)
8. [Banco de Dados](#banco-de-dados)
9. [Variáveis de Ambiente](#variáveis-de-ambiente)
10. [Build e Deploy](#build-e-deploy)

---

## 🔐 1. SEGURANÇA

### ✅ Boas Práticas Implementadas:
- ✅ `.env` no `.gitignore`
- ✅ `.env.example` criado para referência
- ✅ NextAuth configurado
- ✅ Bcrypt para hash de senhas
- ✅ Prisma ORM (previne SQL injection)

### ⚠️ CRÍTICO - Ações Necessárias:

#### **A. Variáveis de Ambiente**
```bash
# OBRIGATÓRIO antes do deploy:
NEXTAUTH_SECRET=      # Gerar: openssl rand -base64 32
NEXTAUTH_URL=         # https://abpmc.com.br (produção)
DATABASE_URL=         # PostgreSQL produção (Vercel Postgres ou externo)
```

#### **B. Autenticação - Vulnerabilidades Identificadas:**

**🔴 ALTO RISCO:**
- Rotas admin sem middleware de autenticação
- APIs `/api/admin/*` acessíveis sem verificação de sessão
- Conteúdos restritos sem controle de acesso implementado

**Solução Requerida:**
```typescript
// middleware.ts - CRIAR URGENTE
import { withAuth } from "next-auth/middleware";

export default withAuth({
  callbacks: {
    authorized: ({ token, req }) => {
      if (req.nextUrl.pathname.startsWith("/admin")) {
        return token?.role === "ADMIN" || token?.role === "SUPERADMIN";
      }
      if (req.nextUrl.pathname.startsWith("/api/admin")) {
        return token?.role === "ADMIN" || token?.role === "SUPERADMIN";
      }
      return !!token;
    },
  },
});

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*", "/associados/:path*"],
};
```

#### **C. Proteção de Dados Sensíveis:**
- ✅ Senhas com bcrypt (12 rounds)
- ⚠️ Implementar rate limiting em rotas de login
- ⚠️ CORS não configurado para APIs públicas
- ⚠️ Headers de segurança não configurados

**Headers Recomendados (next.config.js):**
```javascript
async headers() {
  return [
    {
      source: '/:path*',
      headers: [
        { key: 'X-Frame-Options', value: 'DENY' },
        { key: 'X-Content-Type-Options', value: 'nosniff' },
        { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        { key: 'X-XSS-Protection', value: '1; mode=block' },
      ],
    },
  ];
}
```

---

## 📂 2. ARQUIVOS DUPLICADOS

### ⚠️ ENCONTRADOS - REMOVER ANTES DO DEPLOY:

#### **Backups desnecessários (.bak):**
```
❌ app/(site)/layout.tsx.bak
❌ app/(site)/p/[slug]/page.tsx.bak
❌ app/(site)/p/[slug]/page.tsx.bak3
❌ app/(site)/p/[slug]/page.tsx.bak4
❌ app/(site)/p/page.tsx.bak
❌ app/(site)/pagina/[slug]/page.tsx.bak (6 versões!)
❌ components/layout/HeaderInterno.tsx.bak (3 versões + .broken)
❌ components/navigation/menu-data.ts.bak (2 versões)
```

**Ação:** Deletar TODOS os arquivos .bak

**Impacto:**
- ⚠️ Aumenta tamanho do deploy desnecessariamente
- ⚠️ Pode causar confusão no versionamento
- ⚠️ Reduz performance do build

**Comando de limpeza:**
```bash
find . -name "*.bak*" -type f -delete
find . -name "*.broken" -type f -delete
```

---

## 🔗 3. LINKS E NAVEGAÇÃO

### ❌ PROBLEMAS CRÍTICOS IDENTIFICADOS:

#### **A. Links Quebrados no Menu:**

**Mega Menu (A ABPMC):**
```typescript
// ❌ LINKS QUEBRADOS:
"/pagina/quem-somos"              → ⚠️ Verificar se página existe
"/pagina/documentos"              → ✅ Existe mas deve ser /documentos
"/pagina/associe-se"              → ⚠️ Verificar
"/pagina/afiliacao"               → ⚠️ Verificar
"/pagina/comportamento-em-foco"   → ❌ Deve ser /comportamento-em-foco
"/pagina/encontros-anuais"        → ⚠️ Verificar vs /encontros/historico
"/p"                              → ⚠️ Deve ser /noticias

// ✅ CORREÇÕES NECESSÁRIAS:
{ label: "Notícias", href: "/noticias" },  // Não "/p"
{ label: "Comportamento em Foco", href: "/comportamento-em-foco" },
{ label: "Documentos", href: "/documentos" },
```

#### **B. Inconsistência de Rotas:**

**Rotas Dinâmicas Implementadas:**
- ✅ `/p/[slug]` - Post individual
- ✅ `/noticias` - Lista de notícias
- ✅ `/comportamento-em-foco` - Categoria especial
- ✅ `/categoria/[slug]` - Categorias dinâmicas
- ✅ `/documentos` - Documentos dinâmicos

**Rotas Estáticas (/pagina/[slug]):**
- ⚠️ Verificar quais existem realmente
- ⚠️ Migrar para rotas dinâmicas se necessário

#### **C. Menu Mobile:**
- ❌ Não implementado (apenas botão)
- ❌ Sem funcionalidade
- ❌ Péssima experiência móvel

**Solução:** Implementar drawer/sidebar móvel

---

## 📱 4. RESPONSIVIDADE

### ⚠️ PROBLEMAS IDENTIFICADOS:

#### **A. Header/Navbar:**
```typescript
// ❌ PROBLEMA: Menu mobile não funcional
<button className="md:hidden..." aria-label="Abrir menu">
  <span className="material-symbols-outlined">menu</span>
</button>
// Sem estado, sem drawer, sem funcionalidade
```

**Status:** 
- ✅ Desktop OK
- ❌ Mobile CRÍTICO - Menu não abre

#### **B. Mega Menu:**
```typescript
// ⚠️ Problema: Mega menu em mobile
// Ocupa muito espaço, difícil navegação em telas pequenas
```

**Recomendação:**
- Mega menu desktop apenas
- Mobile: accordion/collapse menu

#### **C. Tabelas Admin:**
- ⚠️ Scroll horizontal pode quebrar em mobile
- ⚠️ Verificar todas as páginas admin

#### **D. Cards de Notícias:**
```typescript
// ✅ Responsivo implementado:
<div className="grid md:grid-cols-2 gap-10">
```

**Status:** ✅ OK

---

## 🖼️ 5. ARQUIVOS DE MÍDIA

### ⚠️ ANÁLISE CRÍTICA:

#### **A. Estrutura Atual:**
```
/public/
  /images_estrutura/
    - abpmc-logo-white-text.png   ⚠️ Path correto?
    - site-logo-90px.png          ✅ OK
  /uploads/                       ⚠️ Vazio?
  /downloads/                     ⚠️ Vazio?
```

#### **B. Problemas:**

**🔴 CRÍTICO:**
- ❌ Logo branco com erro: "isn't a valid image for /images_estrutura/abpmc-logo-white-text.png received text/html"
- ❌ Indica que arquivo não existe ou path está errado
- ⚠️ Placeholders de imagens em posts (gradiente temporário)
- ⚠️ Sem sistema de upload implementado

**Verificações Necessárias:**
```bash
# Verificar se arquivos existem:
ls -la /Volumes/Dock Station/abpmcdev/abpmc-v2/public/images_estrutura/
ls -la /Volumes/Dock Station/abpmcdev/abpmc-v2/public/uploads/
ls -la /Volumes/Dock Station/abpmcdev/abpmc-v2/public/downloads/
```

#### **C. Documentos:**
- ⚠️ Sistema de documentos criado mas sem arquivos
- ⚠️ Anexos esperados em `/downloads/` ou URLs externas
- ⚠️ Necessário popular com arquivos reais

---

## ⚡ 6. PERFORMANCE

### ✅ Otimizações Implementadas:
- ✅ Next.js 14 (App Router)
- ✅ Image component do Next.js
- ✅ Prisma ORM (eficiente)
- ✅ Server Components por padrão

### ⚠️ Melhorias Necessárias:

#### **A. Imagens:**
```typescript
// ❌ Problema: Placeholder gradiente (CSS) em vez de imagens otimizadas
<div className="relative w-full h-56 bg-gradient-to-br from-[#0B2E47] to-[#22949e]">
```

**Impacto:** 
- Layout OK, mas sem imagens reais
- Implementar upload ou migrar imagens do site antigo

#### **B. Banco de Dados:**
- ⚠️ 373 posts carregados
- ⚠️ Queries sem limit em algumas rotas
- ✅ Paginação implementada no admin

**Recomendação:**
```typescript
// Sempre usar take/limit:
const posts = await prisma.content.findMany({
  take: 20,  // ✅
  skip: (page - 1) * 20,
});
```

#### **C. Caching:**
- ⚠️ Não configurado
- ⚠️ Revalidation padrão do Next.js

**Adicionar em produção:**
```typescript
export const revalidate = 3600; // 1 hora
```

---

## 🔍 7. SEO

### ✅ Implementado:
- ✅ Metadata export em páginas
- ✅ Títulos descritivos

### ⚠️ Faltando:

#### **A. Meta Tags:**
```typescript
// ❌ Faltam em posts individuais:
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getPost(params.slug);
  
  return {
    title: `${post.title} | ABPMC`,
    description: post.excerpt || "ABPMC",
    openGraph: {
      title: post.title,
      description: post.excerpt,
      // images: [post.thumbnailUrl],  // Quando implementar
    },
  };
}
```

#### **B. Sitemap:**
- ❌ Não implementado
- ❌ Necessário para SEO

**Criar:**
```typescript
// app/sitemap.ts
export default async function sitemap() {
  const posts = await prisma.content.findMany({
    where: { status: 'publish', type: 'POST' },
    select: { slug: true, updatedAt: true },
  });

  return [
    { url: 'https://abpmc.com.br', changeFrequency: 'daily' },
    { url: 'https://abpmc.com.br/noticias', changeFrequency: 'daily' },
    ...posts.map(p => ({
      url: `https://abpmc.com.br/p/${p.slug}`,
      lastModified: p.updatedAt,
    })),
  ];
}
```

#### **C. robots.txt:**
```
# public/robots.txt - CRIAR
User-agent: *
Allow: /
Disallow: /admin
Disallow: /associados
Disallow: /api/

Sitemap: https://abpmc.com.br/sitemap.xml
```

---

## 🗄️ 8. BANCO DE DADOS

### ✅ Status Atual:
- ✅ Prisma configurado
- ✅ 373 posts migrados
- ✅ 37 páginas migradas
- ✅ 15 categorias organizadas
- ✅ Schema completo (associados, planos, transações, conteúdos)

### ⚠️ Deploy Vercel:

#### **A. Opções de Database:**

**Opção 1: Vercel Postgres (Recomendado)**
```bash
# Instalar:
npm i @vercel/postgres

# Configurar DATABASE_URL automaticamente
```

**Opção 2: Database Externa**
- Neon (https://neon.tech) - Grátis
- Supabase
- Railway
- PlanetScale

#### **B. Migrations:**
```bash
# Antes do deploy:
npx prisma migrate deploy

# Ou no primeiro deploy:
npx prisma db push
```

#### **C. Connection Pooling:**
⚠️ Vercel Serverless → Connection limits

**Solução:**
```prisma
// schema.prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
  directUrl = env("DIRECT_URL")  // Para migrations
}
```

---

## 🔧 9. VARIÁVEIS DE AMBIENTE

### 📋 Checklist Completo:

#### **Desenvolvimento (.env):**
```bash
✅ DATABASE_URL="postgresql://..."
✅ NEXTAUTH_SECRET="..."
✅ NEXTAUTH_URL="http://localhost:3000"
```

#### **Produção (Vercel):**
```bash
🔴 DATABASE_URL=          # PostgreSQL produção
🔴 NEXTAUTH_SECRET=       # DIFERENTE de dev!
🔴 NEXTAUTH_URL=          # https://abpmc.com.br
⚠️ MERCADO_PAGO_ACCESS_TOKEN=  # Se usar pagamentos
⚠️ MAIL_HOST=            # SMTP produção
⚠️ MAIL_USER=
⚠️ MAIL_PASS=
```

### ⚠️ CRÍTICO:
- Nunca commitar `.env`
- Nunca usar mesmas chaves em prod/dev
- Usar Vercel Environment Variables

---

## 🚀 10. BUILD E DEPLOY

### A. Teste Local:

```bash
# 1. Build local:
npm run build

# Verificar erros de:
# - TypeScript
# - Links quebrados
# - Imports inválidos

# 2. Testar produção:
npm run start

# 3. Verificar:
# - Todas as páginas carregam
# - Sem erros no console
# - Links funcionam
```

### B. Configuração Vercel:

#### **vercel.json** - CRIAR:
```json
{
  "buildCommand": "prisma generate && next build",
  "framework": "nextjs",
  "installCommand": "npm install",
  "env": {
    "DATABASE_URL": "@database-url",
    "NEXTAUTH_SECRET": "@nextauth-secret",
    "NEXTAUTH_URL": "@nextauth-url"
  },
  "regions": ["gru1"]
}
```

#### **next.config.js** - VERIFICAR:
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost'],
    // Adicionar domínios externos se usar CDN
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
```

### C. Passos Deploy:

```bash
# 1. Conectar GitHub à Vercel
# 2. Import repository
# 3. Configurar variáveis de ambiente
# 4. Deploy

# OU via CLI:
npm i -g vercel
vercel login
vercel --prod
```

---

## ✅ CHECKLIST FINAL PRÉ-DEPLOY

### 🔴 CRÍTICO (OBRIGATÓRIO):
- [ ] Remover TODOS os arquivos .bak
- [ ] Criar middleware.ts para proteger rotas admin
- [ ] Configurar variáveis de ambiente produção
- [ ] Configurar DATABASE_URL produção
- [ ] Gerar novo NEXTAUTH_SECRET
- [ ] Corrigir link logo branco (erro 404)
- [ ] Testar `npm run build` localmente sem erros
- [ ] Criar robots.txt
- [ ] Configurar headers de segurança

### ⚠️ IMPORTANTE (RECOMENDADO):
- [ ] Implementar menu mobile funcional
- [ ] Corrigir links do menu (
/noticias, /comportamento-em-foco)
- [ ] Adicionar sitemap.xml
- [ ] Implementar rate limiting em login
- [ ] Adicionar metadata dinâmica em posts
- [ ] Verificar responsividade em todas as páginas admin
- [ ] Popular /uploads com imagens reais
- [ ] Popular /downloads com documentos

### 💡 MELHORIAS FUTURAS:
- [ ] Sistema de upload de imagens
- [ ] Editor rich text (TipTap)
- [ ] Biblioteca de mídia
- [ ] Analytics (Google Analytics ou Vercel Analytics)
- [ ] Monitoramento de erros (Sentry)
- [ ] CDN para imagens
- [ ] Caching avançado

---

## 📊 RESUMO EXECUTIVO

### ✅ Pontos Fortes:
- Arquitetura sólida (Next.js 14 + Prisma)
- 373 posts migrados e prontos
- CMS admin funcional
- Design responsivo (desktop)
- Sistema de categorias implementado

### 🔴 Bloqueadores para Deploy:
1. **Segurança:** Rotas admin desprotegidas
2. **Arquivos:** 17+ arquivos .bak para remover
3. **Links:** Menu com links quebrados
4. **Mobile:** Menu não funcional
5. **Imagens:** Logo com erro 404

### ⏱️ Tempo Estimado de Correção:
- **Críticos:** 2-3 horas
- **Importantes:** 4-6 horas
- **Total para deploy seguro:** 6-9 horas

### 🎯 Prioridade de Ação:
1. ✅ **Agora:** Limpar arquivos .bak
2. 🔴 **Hoje:** Implementar middleware de segurança
3. ⚠️ **Hoje:** Corrigir links do menu
4. ⚠️ **Amanhã:** Menu mobile
5. 💡 **Semana 1:** Melhorias de UX

---

**🔥 CONCLUSÃO:**

O projeto está **80% pronto** para deploy, mas os **20% restantes são CRÍTICOS** para segurança e experiência do usuário. 

**NÃO faça deploy sem:**
1. Proteger rotas admin
2. Remover arquivos duplicados
3. Corrigir links quebrados
4. Implementar menu mobile

**Recomendação:** Dedicar 1 dia de trabalho focado para correções antes do deploy em produção.

---

**Próximo Passo:** Executar correções automatizadas agora ↓
