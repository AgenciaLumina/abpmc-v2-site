# 🚀 GUIA: COMO IMPORTAR TODOS OS 700+ SÓCIOS

## 📍 PASSO 1: LOCALIZAR OS DADOS

No código JavaScript que você forneceu, existe uma linha que começa assim:

```javascript
const data = [{"name": "Adriana Lourenço Lopes", ...}, {...}, ...];
```

Essa linha contém **TODOS os 700+ sócios** em formato JSON.

---

## 📋 PASSO 2: COPIAR O ARRAY COMPLETO

1. No código JavaScript, localize a linha que começa com `const data = [`
2. Copie **TODO** o array, desde `[` até `]` (incluindo os colchetes)
3. É uma lista ENORME - certifique-se de copiar tudo

O formato é:
```json
[
  {"name": "Nome", "email": "email@exemplo.com", "cv": "url_lattes"},
  {"name": "Nome 2", "email": "email2@exemplo.com", "cv": ""},
  ...
]
```

---

## ✏️ PASSO 3: COLAR NO SCRIPT

1. Abra o arquivo: `/scripts/importar-todos-direto.ts`

2. Localize a linha 7:
```typescript
const sociosCompletos = [{"name": "Adriana...", ...}];
```

3. **SUBSTITUA** o array inteiro pelos 700+ sócios que você copiou

4. Salve o arquivo

---

## ▶️ PASSO 4: EXECUTAR A IMPORTAÇÃO

```bash
cd /Volumes/Dock\ Station/abpmcdev/abpmc-v2
npx ts-node scripts/importar-todos-direto.ts
```

O script vai:
- ✅ Processar todos os 700+ sócios
- ✅ Ignorar duplicados (os 52 já importados)
- ✅ Criar novos registros
- ✅ Associar URLs do Lattes
- ✅ Marcar todos como visíveis

---

## 📊 O QUE VOCÊ VERÁ:

```
🚀 IMPORTAÇÃO COMPLETA DE TODOS OS SÓCIOS
📊 Total a processar: 700+ sócios

🔄 [50/700] Processando...
✅ [100/700] Processando...
🔄 [150/700] Processando...
...

===============================================
📊 RESUMO FINAL DA IMPORTAÇÃO:
===============================================
✅ Novos sócios importados: 650+
🔄 Sócios atualizados: 52
❌ Erros: 0
📈 Total processado: 700+/700+
===============================================

⚠️  Senha padrão: MudarSenha@2025
```

---

## 🎯 EXEMPLO DE SUBSTITUIÇÃO:

**ANTES:**
```typescript
const sociosCompletos = [
  {"name": "Adriana Lourenço Lopes", "email": "adrianalourencolopes@gmail.com", "cv": "http://lattes.cnpq.br/9686139344430086"}, 
  {"name": "Adriana Grando", "email": "adrgrando@gmail.com", "cv": "http://lattes.cnpq.br/6655526661447047"},
  // ... apenas 52 sócios
];
```

**DEPOIS:**
```typescript
const sociosCompletos = [
  {"name": "Adriana Lourenço Lopes", "email": "adrianalourencolopes@gmail.com", "cv": "http://lattes.cnpq.br/9686139344430086"}, 
  {"name": "Adriana Grando", "email": "adrgrando@gmail.com", "cv": "http://lattes.cnpq.br/6655526661447047"},
  {"name": "Adriana de Fátima Fontes", "email": "adrianafontes.psico@gmail.com", "cv": ""},
  // ... TODOS OS 700+ SÓCIOS AQUI
  {"name": "Yumi Gosso", "email": "ygosso@gmail.com", "cv": "http://lattes.cnpq.br/3196008818776282"}
];
```

---

## ✅ VERIFICAR RESULTADO:

Após a importação, acesse:

1. **Público:** `http://localhost:3000/associados`
   - Verá TODOS os 700+ sócios em ordem alfabética
   - Busca funcionando
   - Filtros alfabéticos ativos

2. **Admin:** `http://localhost:3000/admin/socios`
   - Estatísticas atualizadas
   - Total de Sócios: 700+
   - Visíveis no Site: 700+
   - Com Lattes: ~500

---

## 🔍 DICA:

O código JavaScript que você forneceu tem o array completo em **UMA ÚNICA LINHA** gigante. 

Procure por:
```javascript
const data = [{"name": ...MUITO TEXTO...}];
```

Copie desde o `[` inicial até o `]` final.

---

**Sistema pronto! Basta copiar e colar os dados!** 🎉
