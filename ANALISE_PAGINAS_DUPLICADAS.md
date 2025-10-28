# Análise de Páginas Duplicadas - Sócios vs Associados

## 🔍 PÁGINAS ENCONTRADAS

### 1. `/app/(site)/socios/page.tsx` ✅ MANTER
- **Link no menu:** `/socios` (mega menu - Associação)
- **Tipo:** Client component ("use client")
- **Funcionalidade:** Página completa com busca, filtros por letra, paginação
- **API:** Usa `/api/socios`
- **Interface:** Própria (Socio com id, nome, email, curriculoLattes)
- **Tamanho:** 184 linhas - implementação completa

### 2. `/app/(site)/associados/page.tsx` ❌ REMOVER
- **Link no menu:** Nenhum (página órfã)
- **Tipo:** Server component
- **Funcionalidade:** Apenas wrapper para componente SociosGrid
- **Componente:** Usa `<SociosGrid />` 
- **Tamanho:** 20 linhas - apenas wrapper

### 3. `/components/sections/socios/SociosGrid.tsx` ❌ REMOVER
- **Usado por:** Apenas pela página `/associados` (que será removida)
- **Interface:** Diferente (Socio com name, email, cv)
- **API:** Usa `/api/socios` (mesma API)
- **Problema:** Interface incompatível com a API

## 📊 COMPARAÇÃO

| Aspecto | `/socios` | `/associados` |
|---------|-----------|---------------|
| **No Menu** | ✅ Sim | ❌ Não |
| **Implementação** | ✅ Completa | ❌ Wrapper |
| **Interface** | ✅ Correta | ❌ Incompatível |
| **Funcionalidades** | ✅ Busca + Filtros | ❌ Básica |
| **Manutenção** | ✅ Ativa | ❌ Órfã |

## 🎯 DECISÃO

**MANTER:** `/app/(site)/socios/page.tsx`
- Está no menu (mega menu - Associação)
- Implementação completa e funcional
- Interface correta com a API
- Funcionalidades avançadas (busca, filtros)

**REMOVER:**
1. `/app/(site)/associados/page.tsx` - Página órfã
2. `/components/sections/socios/SociosGrid.tsx` - Componente não usado

## 🔧 AÇÕES REALIZADAS

### 1. Verificação do Menu
```typescript
// components/navigation/menu-data.ts - linha 57
{ label: "Sócios", href: "/socios" }
```

### 2. Análise da API
- `/api/socios` retorna: `{ socios: Socio[] }`
- Interface correta: `{ id, nome, email, curriculoLattes }`

### 3. Remoção Segura
- Verificar dependências antes de remover
- Manter apenas arquivos referenciados no menu

## ⚠️ VERIFICAÇÕES ADICIONAIS

### Outras páginas relacionadas encontradas:
- `/app/admin/associados/page.tsx` - ✅ MANTER (admin)
- `/app/admin/socios/page.tsx` - ✅ MANTER (admin)
- `/api/socios/route.ts` - ✅ MANTER (API)

### Links no código:
- Todos os links internos apontam para `/socios`
- Nenhuma referência a `/associados` no menu
- Componente SociosGrid usado apenas na página órfã

## 📝 CONCLUSÃO

A página `/socios` é a oficial e deve ser mantida. A página `/associados` é uma duplicata órfã que pode ser removida com segurança, junto com o componente SociosGrid que só ela usa.

---

**Data:** Outubro 2025  
**Status:** Análise concluída - Pronto para remoção
