# 📥 GUIA DE IMPORTAÇÃO DOS SÓCIOS

## ✅ Script Criado e Pronto

O script `scripts/importar-socios-html.ts` está configurado e testado.

---

## 🚀 COMO EXECUTAR

### **Passo 1:** Salvar o HTML

Salve o HTML completo dos sócios do WordPress em **um dos seguintes locais**:

```
/tmp/socios-wordpress.html
ou
/Volumes/Dock Station/abpmcdev/abpmc-v2/socios-wordpress.html
```

### **Passo 2:** Executar o Script

```bash
cd /Volumes/Dock\ Station/abpmcdev/abpmc-v2
npm run script scripts/importar-socios-html.ts
```

ou com tsx:

```bash
npx tsx scripts/importar-socios-html.ts
```

---

## 📊 O QUE O SCRIPT FAZ

1. ✅ **Extrai dados** do HTML: nome, email, Currículo Lattes
2. ✅ **Verifica duplicados** por email
3. ✅ **Atualiza** sócios existentes (nome + Lattes)
4. ✅ **Cria** novos sócios com senha padrão
5. ✅ **Marca como visível** no site (`visivelNoSite = true`)

---

## 🔐 SENHA PADRÃO

Novos sócios criados terão a senha:

```
MudarSenha@2025
```

**IMPORTANTE:** Os sócios devem alterar essa senha no primeiro acesso!

---

## 📋 CAMPOS IMPORTADOS

| Campo | Descrição |
|-------|-----------|
| `nome` | Nome completo do sócio |
| `email` | Email (usado como chave única) |
| `curriculoLattes` | URL do Lattes (se disponível) |
| `visivelNoSite` | `true` (aparece na página pública) |
| `status` | `ATIVO` (para novos sócios) |
| `role` | `ASSOCIADO` |

---

## ✨ RESULTADOS ESPERADOS

Após a execução, você verá:

```
✅ IMPORTAÇÃO CONCLUÍDA!
📊 Novos sócios: 320
🔄 Atualizados: 380
❌ Erros: 0
📈 Total processado: 700
```

---

## 🌐 VERIFICAR RESULTADO

Após importar, acesse:

```
http://localhost:3000/socios
```

**Você verá:**
- ✅ Lista de todos os sócios
- ✅ Busca funcionando
- ✅ Links para Lattes
- ✅ Ordem alfabética

---

## ⚠️ TROUBLESHOOTING

### **Erro: "Arquivo HTML não encontrado"**

**Solução:** Verifique se salvou o HTML em um dos locais indicados.

### **Erro: "curriculoLattes does not exist"**

**Solução:** Execute:
```bash
npx prisma generate
```

### **Alguns sócios não foram importados**

**Causa:** Falta de email no HTML

**Solução:** O script pula sócios sem email automaticamente.

---

## 📝 PRÓXIMOS PASSOS

Após importar os sócios:

1. ✅ Testar a página `/socios`
2. ✅ Criar página com abas alfabéticas
3. ✅ Implementar busca AJAX
4. ✅ Estilizar conforme o design fornecido

---

## 🔄 RE-EXECUTAR

Você pode executar o script múltiplas vezes:
- Sócios existentes serão **atualizados**
- Novos sócios serão **criados**
- Nenhum dado será **perdido**

---

**Status:** ✅ Pronto para executar!
