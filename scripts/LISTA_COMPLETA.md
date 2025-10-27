# 📋 INSTRUÇÕES PARA IMPORTAÇÃO COMPLETA

## ⚠️ IMPORTANTE

O script atual (`importar-todos-direto.ts`) contém apenas **52 sócios de exemplo**.

Você forneceu uma lista com **700+ sócios** no código JavaScript.

## 🔧 COMO IMPORTAR TODOS OS SÓCIOS:

### Opção 1: Editar o Script Diretamente

1. Abra o arquivo: `/scripts/importar-todos-direto.ts`
2. Substitua a linha 7 que contém `const sociosCompletos = [...]` 
3. Cole TODO o array de dados que está no código JavaScript

### Opção 2: Usar o Painel Admin

1. Acesse: `http://localhost:3000/admin/socios`
2. Adicione cada sócio manualmente
3. Defina visibilidade e URL do Lattes

### Opção 3: Copiar do Código Original

No código JavaScript fornecido, há um array `data` com todos os sócios. Copie esse array completo:

```javascript
const data = [
  {"name": "...", "email": "...", "cv": "..."},
  // ... todos os 700+ sócios
];
```

E cole no script TypeScript substituindo `sociosCompletos`.

## 📊 STATUS ATUAL:

✅ **52 sócios já importados**
- Sistema funcionando
- Banco de dados configurado
- APIs criadas
- Interfaces prontas

⏳ **Faltam ~650 sócios para importar**

## 🚀 PRÓXIMO PASSO:

Cole a lista completa dos 700+ sócios no array `sociosCompletos` e execute novamente:

```bash
npx ts-node scripts/importar-todos-direto.ts
```

---

**NOTA:** Os 52 sócios atuais já foram atualizados com sucesso no banco de dados.
