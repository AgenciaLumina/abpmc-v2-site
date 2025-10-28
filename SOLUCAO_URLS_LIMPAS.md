# Solução: URLs Limpas (sem /pagina/)

## 🎯 OBJETIVO

Usar URLs limpas como `/quem-somos` em vez de `/pagina/quem-somos` mantendo compatibilidade com páginas do banco de dados.

## ✅ SOLUÇÃO IMPLEMENTADA

### Opção 1: Páginas Dedicadas (Implementada para Quem Somos)

Criar páginas específicas que buscam conteúdo do banco:

```tsx
// app/(site)/quem-somos/page.tsx
export default async function QuemSomosPage() {
  const page = await prisma.content.findUnique({
    where: {
      slug: 'quem-somos',
      type: 'PAGE',
    },
  });
  
  return <RenderHtml html={page.html} />;
}
```

**Vantagens:**
- ✅ URLs limpas
- ✅ Controle total sobre cada página
- ✅ Metadata específica
- ✅ Sem redirects

**Desvantagens:**
- ❌ Precisa criar arquivo para cada página do banco

### Opção 2: Middleware com Rewrites (RECOMENDADA)

Criar rewrites no `next.config.mjs` para redirecionar internamente:

```js
// next.config.mjs
async rewrites() {
  return [
    {
      source: '/quem-somos',
      destination: '/pagina/quem-somos',
    },
    // Adicionar outras páginas conforme necessário
  ];
}
```

**Vantagens:**
- ✅ URLs limpas
- ✅ Não precisa criar arquivos
- ✅ Rewrite interno (usuário não vê)
- ✅ Fácil manutenção

**Desvantagens:**
- ❌ Precisa listar todas as páginas
- ❌ Metadata genérica

### Opção 3: Catch-All Route (MAIS FLEXÍVEL)

Criar uma rota catch-all que tenta buscar em `/pagina/` se não encontrar:

```tsx
// app/(site)/[slug]/page.tsx
export default async function DynamicPage({ params }) {
  // Tentar buscar página diretamente
  let page = await prisma.content.findUnique({
    where: { slug: params.slug, type: 'PAGE' }
  });
  
  if (!page) {
    notFound();
  }
  
  return <RenderHtml html={page.html} />;
}
```

**Vantagens:**
- ✅ URLs limpas automáticas
- ✅ Funciona para todas as páginas do banco
- ✅ Não precisa configurar cada página

**Desvantagens:**
- ❌ Pode conflitar com outras rotas
- ❌ Precisa cuidado com prioridade de rotas

## 🔧 IMPLEMENTAÇÃO ATUAL

### Páginas com URLs Limpas Criadas:
- ✅ `/quem-somos` - Página dedicada criada

### Páginas que Ainda Usam /pagina/:
- Nenhuma no menu (todas foram ajustadas)

### Páginas Criadas Diretamente:
- ✅ `/convocacoes`
- ✅ `/editais`
- ✅ `/transparencia`
- ✅ `/afilie-se`
- ✅ `/afiliados`
- ✅ `/documentos-da-abpmc`
- ✅ `/documentos-historicos`
- ✅ `/projetos-comunidade`
- ✅ `/sustentabilidade`
- ✅ `/releases`
- ✅ `/comissao-abpmc-historia`
- ✅ `/comissao-abpmc-comunidade`

## 📋 CHECKLIST DE PÁGINAS

### Páginas do Banco (precisam de página dedicada ou rewrite)
- ✅ `/quem-somos` - Criada
- ⏳ Verificar outras páginas no banco de dados

### Páginas Criadas Manualmente
- ✅ Todas as páginas de comissões
- ✅ Todas as páginas de documentos
- ✅ Todas as páginas de projetos

### Rotas Dinâmicas (funcionam)
- ✅ `/categoria/[slug]` - Para categorias
- ✅ `/pagina/[slug]` - Fallback para páginas antigas

## 🎯 RECOMENDAÇÃO FINAL

**Para este projeto, usar Opção 1 (Páginas Dedicadas):**

1. ✅ Criar página dedicada para cada página importante do banco
2. ✅ Manter `/pagina/[slug]` como fallback para páginas antigas
3. ✅ URLs limpas no menu
4. ✅ Controle total sobre metadata e layout

**Páginas a criar:**
- ✅ `/quem-somos` - CRIADA
- Verificar no banco se há outras páginas importantes

## 📝 PRÓXIMOS PASSOS

1. ✅ Criar `/quem-somos` - FEITO
2. ⏳ Verificar no banco quais outras páginas existem
3. ⏳ Criar páginas dedicadas para as importantes
4. ⏳ Manter `/pagina/[slug]` para compatibilidade
5. ⏳ Documentar todas as URLs

---

**Data**: Outubro 2025  
**Status**: Solução implementada para Quem Somos
