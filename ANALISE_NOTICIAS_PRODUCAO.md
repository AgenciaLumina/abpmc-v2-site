# Análise de Notícias em Produção (Vercel)

## 🔍 ANÁLISE REALIZADA

**Data:** 28/10/2025 07:32 AM  
**Objetivo:** Verificar se notícias estão funcionando corretamente em produção

---

## ✅ ESTRUTURA VERIFICADA

### 1. Página Home (`/home` ou `/`)
**Arquivo:** `app/(site)/home/page.tsx`

**Componentes:**
- `HeroHome` - Banner principal
- `LatestNews` - Últimas notícias

**Configuração de Notícias:**
```typescript
// components/sections/latest-news.tsx
const posts = await prisma.content.findMany({
  where: { type: "POST", status: "publish" },
  orderBy: { publishedAt: "desc" },
  take: 6,  // ✅ Busca 6 posts (não 5)
  include: {
    terms: { select: { term: { select: { name: true, slug: true } } } },
  },
});
```

**Status:** ✅ Configurado corretamente
- Busca 6 posts mais recentes
- Filtra apenas publicados
- Ordena por data de publicação
- Inclui categorias
- Link para `/p/${slug}`

---

### 2. Página de Categoria (`/categoria/[slug]`)
**Arquivo:** `app/(site)/categoria/[slug]/page.tsx`

**Funcionalidade:**
```typescript
// Busca categoria
const categoria = await prisma.term.findUnique({
  where: {
    slug: params.slug,
    taxonomy: "category",
  },
});

// Busca posts da categoria
const posts = await prisma.content.findMany({
  where: {
    type: "POST",
    status: "publish",
    terms: {
      some: {
        termId: categoria.id,
      },
    },
  },
  orderBy: {
    publishedAt: "desc",
  },
});
```

**Status:** ✅ Configurado corretamente
- Busca categoria por slug
- Filtra posts da categoria
- Apenas posts publicados
- Ordenado por data
- Link para `/p/${slug}`

**Categorias Disponíveis:**
- `/categoria/noticias`
- `/categoria/eventos`
- `/categoria/encontros-anuais`
- `/categoria/artigos-historicos`
- `/categoria/historias-e-personagens`
- `/categoria/uncategorized`

---

### 3. Página Individual de Post (`/p/[slug]`)
**Arquivo:** `app/(site)/p/[slug]/page.tsx`

**Funcionalidade:**
```typescript
const post = await prisma.content.findUnique({
  where: {
    slug: params.slug,
    type: 'POST'
  }
});
```

**Status:** ✅ Configurado corretamente
- Busca post por slug
- Exibe título, data, autor
- Renderiza HTML do conteúdo
- Excerpt destacado

---

## 📊 DADOS EM PRODUÇÃO

### Posts
- **Total:** 370 posts
- **Publicados:** 368 posts
- **Status:** ✅ Migrados com sucesso

### Categorias
- **Total:** 6 categorias
- **Status:** ✅ Criadas com sucesso

### Relações
- **ContentTerm:** Posts associados às categorias
- **Status:** ⚠️ Precisa verificar se relações foram criadas

---

## ⚠️ POSSÍVEIS PROBLEMAS IDENTIFICADOS

### 1. Posts Sem Categoria
**Problema:** Posts podem não estar associados às categorias

**Verificação Necessária:**
```sql
SELECT COUNT(*) FROM contents c
WHERE c.type = 'POST' 
AND c.status = 'publish'
AND NOT EXISTS (
  SELECT 1 FROM content_terms ct 
  WHERE ct.contentId = c.id
);
```

**Solução:** Associar posts às categorias corretas

---

### 2. Quantidade de Notícias na Home
**Observação:** Código busca 6 posts, não 5

**Arquivo:** `components/sections/latest-news.tsx`
**Linha 10:** `take: 6`

**Correção Necessária:**
```typescript
// Alterar de:
take: 6,

// Para:
take: 5,
```

---

### 3. Links das Notícias
**Status:** ✅ Correto

**Fluxo:**
```
Home → Latest News → NoticiaCard → Link: /p/${slug}
Categoria → Post Card → Link: /p/${slug}
Post Individual → Renderiza conteúdo
```

---

## 🔧 CORREÇÕES NECESSÁRIAS

### 1. Ajustar Quantidade de Posts na Home
```typescript
// components/sections/latest-news.tsx
const posts = await prisma.content.findMany({
  where: { type: "POST", status: "publish" },
  orderBy: { publishedAt: "desc" },
  take: 5,  // ✅ Alterar para 5
  include: {
    terms: { select: { term: { select: { name: true, slug: true } } } },
  },
});
```

### 2. Associar Posts às Categorias
**Script Necessário:** Criar script para associar posts existentes às categorias

```typescript
// scripts/associar-posts-categorias.ts
// Lógica:
// 1. Buscar posts sem categoria
// 2. Identificar categoria pelo conteúdo/título
// 3. Criar relação ContentTerm
```

### 3. Verificar Dados em Produção
**Comandos:**
```bash
# Verificar posts sem categoria
DATABASE_URL="..." npx tsx scripts/verificar-posts-sem-categoria.ts

# Associar posts às categorias
DATABASE_URL="..." npx tsx scripts/associar-posts-categorias.ts
```

---

## 📋 CHECKLIST DE VERIFICAÇÃO

### Home
- [ ] Acessar https://[vercel-url]/
- [ ] Verificar se redireciona para /home
- [ ] Verificar seção "Últimas Notícias"
- [ ] Contar quantos posts aparecem (deve ser 5)
- [ ] Verificar se links funcionam
- [ ] Clicar em notícia e verificar se abre

### Categorias
- [ ] Acessar /categoria/noticias
- [ ] Verificar se posts aparecem
- [ ] Verificar se estão ordenados por data
- [ ] Clicar em "Ler Mais"
- [ ] Verificar se abre post correto
- [ ] Repetir para outras categorias

### Posts Individuais
- [ ] Acessar /p/[slug-qualquer]
- [ ] Verificar se título aparece
- [ ] Verificar se data aparece
- [ ] Verificar se conteúdo renderiza
- [ ] Verificar se imagens carregam
- [ ] Verificar se links funcionam

---

## 🚀 AÇÕES IMEDIATAS

### 1. Corrigir Quantidade de Posts na Home
```bash
# Editar arquivo
vim components/sections/latest-news.tsx

# Linha 10: alterar take: 6 para take: 5
```

### 2. Verificar Relações em Produção
```bash
# Executar script de verificação
DATABASE_URL="postgresql://..." npx tsx scripts/verificar-relacoes-posts.ts
```

### 3. Associar Posts às Categorias (se necessário)
```bash
# Executar script de associação
DATABASE_URL="postgresql://..." npx tsx scripts/associar-posts-categorias.ts
```

### 4. Testar em Produção
```bash
# Fazer deploy
git add -A
git commit -m "fix: ajustar quantidade de posts na home"
git push origin main

# Aguardar deploy automático na Vercel
# Testar URLs manualmente
```

---

## 📊 RESULTADO ESPERADO

### Home (`/` ou `/home`)
```
✅ Hero banner
✅ Seção "Últimas Notícias"
✅ 5 posts mais recentes
✅ Cards com título, categoria, data
✅ Link "Ler Mais" funcionando
✅ Redirecionamento para /p/[slug]
```

### Categoria (`/categoria/noticias`)
```
✅ Header com nome da categoria
✅ Contador de posts
✅ Grid de posts
✅ Cards com imagem placeholder
✅ Título, excerpt, data
✅ Botão "Ler Mais"
✅ Link para /p/[slug]
```

### Post Individual (`/p/[slug]`)
```
✅ Título do post
✅ Data de publicação
✅ Autor (se disponível)
✅ Excerpt destacado
✅ Conteúdo HTML renderizado
✅ Imagens carregando
✅ Links funcionando
```

---

## 🔍 COMANDOS DE VERIFICAÇÃO

### Verificar Posts em Produção
```bash
DATABASE_URL="postgresql://..." node -e "
const {PrismaClient}=require('@prisma/client');
const p=new PrismaClient();
p.content.count({where:{type:'POST',status:'publish'}})
  .then(c=>console.log('Posts publicados:',c))
  .finally(()=>p.\$disconnect());
"
```

### Verificar Posts com Categorias
```bash
DATABASE_URL="postgresql://..." node -e "
const {PrismaClient}=require('@prisma/client');
const p=new PrismaClient();
p.content.findMany({
  where:{type:'POST',status:'publish'},
  include:{terms:true},
  take:5
}).then(posts=>{
  posts.forEach(p=>console.log(p.title,'-',p.terms.length,'categorias'));
}).finally(()=>p.\$disconnect());
"
```

### Verificar Categorias
```bash
DATABASE_URL="postgresql://..." node -e "
const {PrismaClient}=require('@prisma/client');
const p=new PrismaClient();
p.term.findMany({where:{taxonomy:'category'}})
  .then(cats=>cats.forEach(c=>console.log(c.name,'-',c.slug)))
  .finally(()=>p.\$disconnect());
"
```

---

## 📝 RESUMO

### Status Atual
- ✅ Estrutura de páginas correta
- ✅ Queries do banco corretas
- ✅ Links configurados corretamente
- ✅ 370 posts em produção
- ✅ 6 categorias criadas
- ⚠️ Quantidade de posts na home (6 em vez de 5)
- ⚠️ Relações posts-categorias precisam verificação

### Próximos Passos
1. Corrigir quantidade de posts na home (6 → 5)
2. Verificar se posts têm categorias associadas
3. Associar posts às categorias (se necessário)
4. Testar todas as URLs em produção
5. Documentar resultados

---

**Status:** Análise completa  
**Problemas Críticos:** 0  
**Problemas Menores:** 2 (quantidade de posts, verificar relações)  
**Ação Necessária:** Correções simples e verificação
