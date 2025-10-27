# 📊 DADOS REAIS DO SITE ANTIGO - CORREÇÃO

**Data:** 27/10/2025  
**Fonte:** HTML/JavaScript do site atual da ABPMC

---

## ✅ DADOS CONFIRMADOS PELO USUÁRIO

### **1. SÓCIOS**
- **Total no array JavaScript:** Verificar contagem exata
- **Formato:** `[{name, email, cv}, ...]`
- **Características:**
  - Organizados em abas alfabéticas (A-D, E-H, I-L, M-P, Q-T, U-Z)
  - Sistema de busca AJAX por nome ou email
  - Currículos Lattes quando disponíveis
  - Alguns sem email ou Lattes

### **2. POSTS/NOTÍCIAS**
- **Total:** **372 posts** (não 300 como estimado)
- **Status:** Precisa extrair do site antigo
- **Categorias necessárias:**
  - Institucional
  - Eventos
  - Publicações
  - Editais
  - Comunicados
  - Homenagens
  - Notas de Falecimento
  - Notícias

### **3. ENCONTROS**
- **Total:** 34 encontros (1992-2025)
- **Status:** 14 já cadastrados, faltam 20

---

## 🎯 PLANO DE AÇÃO ATUALIZADO

### **ETAPA 1: CONTAR SÓCIOS NO ARRAY**

Preciso extrair o array JavaScript completo do HTML e contar quantos registros existem.

**Array fornecido:**
```javascript
const data = [{name, email, cv}, ...];
```

### **ETAPA 2: IMPORTAR TODOS OS SÓCIOS**

**Script:** `scripts/importar-socios-completo.ts`

**Ações:**
1. ✅ Script criado
2. ⏳ Executar importação
3. ⏳ Verificar total importado
4. ⏳ Confirmar visibilidade na página `/socios`

### **ETAPA 3: MIGRAR 372 POSTS**

**Desafio:** Extrair ~372 posts do site antigo

**Opções:**
1. **Manual:** Criar array JSON com posts principais
2. **Scraping:** Criar script para extrair do sitemap
3. **Incremental:** Migrar em lotes de 50

**Informações necessárias por post:**
- Título
- Slug
- Conteúdo HTML
- Excerpt/resumo
- Data de publicação
- Categoria(s)
- Autor

### **ETAPA 4: COMPLETAR ENCONTROS**

**Faltam 20 encontros:**
- XI a XIX (2002-2010)
- XXI a XXIX (2012-2020)
- XXXI, XXXII (2022, 2023)

---

## 📋 CHECKLIST ATUALIZADO

### **Sócios:**
- [x] Extrair array do HTML
- [x] Criar script de importação
- [ ] Contar total de registros
- [ ] Executar importação completa
- [ ] Verificar na página pública

### **Posts:**
- [x] Criar categorias (8 categorias)
- [x] Criar API `/api/posts`
- [x] Migrar 5 posts de exemplo
- [ ] **Extrair lista de 372 posts do site**
- [ ] Criar script de migração em massa
- [ ] Executar migração em lotes
- [ ] Atualizar página `/noticias`

### **Encontros:**
- [x] Criar estrutura de dados
- [x] Popular 14 encontros
- [x] Criar templates dinâmicos
- [ ] **Coletar dados dos 20 encontros faltantes**

---

## 🚨 AÇÕES IMEDIATAS

1. **AGORA:** Contar quantos sócios existem no array fornecido
2. **AGORA:** Executar importação dos sócios
3. **DEPOIS:** Solicitar ao usuário a lista dos 372 posts
4. **DEPOIS:** Coletar dados dos 20 encontros faltantes

---

## 💡 OBSERVAÇÕES

### **Sobre o Array de Sócios:**

O HTML fornecido contém:
- Sistema de abas alfabéticas
- Busca por nome/email
- Grid responsivo (3 colunas desktop, 2 tablet, 1 mobile)
- Links para email e Lattes

**Campos disponíveis:**
- `name` - Nome completo
- `email` - Email (alguns vazios)
- `cv` - URL do Lattes (alguns vazios)

### **Sobre os 372 Posts:**

**Necessário do usuário:**
- URLs dos posts ou sitemap XML
- OU
- Array JavaScript similar ao dos sócios
- OU
- Acesso ao banco de dados antigo

### **Próximos Passos:**

1. Executar script de importação de sócios
2. Confirmar total importado
3. Solicitar dados dos 372 posts
4. Criar estratégia de migração em massa

---

**Status:** Aguardando contagem precisa de sócios no array fornecido
