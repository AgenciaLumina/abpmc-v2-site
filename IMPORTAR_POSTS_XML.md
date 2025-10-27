# 📥 IMPORTAÇÃO DE POSTS DO WORDPRESS (XML)

## ✅ **ANÁLISE COMPLETA**

### **Posts nos XMLs:**

| Arquivo | Posts |
|---------|-------|
| `artigos historicos.xml` | 64 posts |
| `encontros anuais.xml` | 33 posts |
| `eventos.xml` | 4 posts |
| `historias-e-personagens.xml` | 20 posts |
| `noticias.xml` | 256 posts |
| `projetos.xml` | 1 post |
| `sem-categoria.xml` | 1 post |
| **TOTAL** | **379 posts** |

### **Status Atual:**
- ✅ Já importados: **370 posts**
- 📥 Faltam: **9 posts**

---

## 🚀 **COMO EXECUTAR A IMPORTAÇÃO**

### **Comando:**

```bash
cd "/Volumes/Dock Station/abpmcdev/abpmc-v2"
npx tsx scripts/importar-posts-xml.ts
```

### **O que o script faz:**

1. ✅ Lê todos os arquivos XML do diretório
2. ✅ Extrai posts publicados (ignora rascunhos)
3. ✅ Cria categorias automaticamente se não existirem
4. ✅ Verifica duplicatas pelo slug
5. ✅ Associa posts às categorias corretas
6. ✅ Importa conteúdo HTML limpo
7. ✅ Preserva data de publicação original

---

## 📊 **CATEGORIAS CRIADAS**

As seguintes categorias serão criadas automaticamente:

- ✅ Artigos Históricos
- ✅ Encontros Anuais
- ✅ Eventos
- ✅ Histórias e Personagens
- ✅ Notícias
- ✅ Projetos
- ✅ Sem Categoria

---

## 🎯 **RESULTADO ESPERADO**

Após executar o script, você verá:

```
✅ IMPORTAÇÃO CONCLUÍDA!
📊 Processados: 379 posts
✨ Criados: 9 posts
⏭️  Ignorados (duplicados): 370 posts
```

---

## ✨ **PRÓXIMO PASSO: PAINEL ADMIN**

Após importar os posts, você terá:

1. ✅ **379 posts** no banco de dados
2. ✅ **7 categorias** configuradas
3. ✅ **Conteúdo HTML** limpo e pronto
4. ✅ **Datas de publicação** preservadas

**Agora vamos criar o painel administrativo** para gerenciar tudo isso! 🚀

---

## 📁 **ARQUIVOS CRIADOS**

| Arquivo | Descrição |
|---------|-----------|
| `scripts/importar-posts-xml.ts` | Script principal de importação |
| `scripts/verificar-posts-importados.ts` | Verifica posts já importados |
| `scripts/analisar-posts-xml.py` | Analisa XMLs (contagem) |

---

## ⚠️ **TROUBLESHOOTING**

### **Erro: "Cannot find module 'xml2js'"**

```bash
npm install xml2js --save-dev
npm install --save-dev @types/xml2js
```

### **Erro: "Arquivo XML não encontrado"**

Verifique se o caminho está correto no script:
```typescript
const XML_DIR = "/Users/paulomedeiros/CascadeProjects/posts xml abpmc";
```

### **Posts duplicados**

O script ignora posts com slugs duplicados automaticamente.
Não haverá duplicação de conteúdo.

---

**Status:** ✅ Pronto para executar!
