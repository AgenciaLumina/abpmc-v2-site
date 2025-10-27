# 📥 IMPORTAÇÃO COMPLETA DE SÓCIOS

## ✅ STATUS ATUAL

**52 sócios já importados com sucesso!**

## 📋 COMO ADICIONAR OS SÓCIOS RESTANTES

### Opção 1: Via Arquivo JSON (Recomendado)

1. **Edite o arquivo:** `scripts/socios-completos.json`

2. **Cole TODOS os 700+ registros** no formato:
```json
[
  {"name": "Nome Completo", "email": "email@exemplo.com", "cv": "url_lattes"},
  {"name": "Outro Nome", "email": "outro@exemplo.com", "cv": ""},
  ...
]
```

3. **Execute o script:**
```bash
npx ts-node scripts/importar-socios-json.ts
```

### Opção 2: Via Painel Admin

1. Acesse: `http://localhost:3000/admin/socios`
2. Use a interface para adicionar/editar um por vez
3. Controle visibilidade e URLs do Lattes

---

## 🎯 O QUE JÁ FOI IMPORTADO

✅ **52 sócios ativos** (A-Y)
- Adriana Lourenço Lopes
- Adriana Grando  
- ... (todos visíveis em ordem alfabética)
- Yumi Gosso

**Senha padrão de todos:** `MudarSenha@2025`

---

## 📝 FORMATO DOS DADOS

Cada sócio precisa de:
- `name` - Nome completo (obrigatório)
- `email` - Email único (obrigatório)
- `cv` - URL do Lattes (opcional, usar "" se vazio)

---

## 🚀 PRÓXIMOS PASSOS

### 1. Copiar dados restantes para JSON

Cole os 700+ sócios fornecidos no arquivo:
`scripts/socios-completos.json`

### 2. Executar importação

```bash
cd /Volumes/Dock\ Station/abpmcdev/abpmc-v2
npx ts-node scripts/importar-socios-json.ts
```

### 3. Verificar resultado

- **Página pública:** `http://localhost:3000/associados`
- **Painel admin:** `http://localhost:3000/admin/socios`

---

## 🔍 VERIFICAÇÃO

Após importar, verifique:

```bash
# Contar sócios no banco
npx prisma studio
# Ou via SQL:
# SELECT COUNT(*) FROM associados WHERE "visivelNoSite" = true;
```

---

## ⚙️ CAMPOS NO BANCO

Cada sócio tem:
```typescript
{
  id: number
  nome: string
  email: string (único)
  senhaHash: string
  curriculoLattes: string | null
  visivelNoSite: boolean (default: true)
  status: "ATIVO" | "INATIVO" | ...
  role: "ASSOCIADO"
  createdAt: Date
  updatedAt: Date
}
```

---

## 📊 ESTATÍSTICAS ESPERADAS

Após importação completa:
- **Total de sócios:** 700+
- **Visíveis no site:** 700+ (todos ativos)
- **Com Lattes:** ~500 (aproximadamente)
- **Ordem:** Alfabética automática

---

## 🛠️ TROUBLESHOOTING

### Erro: Email duplicado
**Solução:** O script usa `upsert` - atualiza se já existe

### Erro: Prisma Client desatualizado
**Solução:**
```bash
npx prisma generate
npm run dev
```

### Erro: Timeout
**Solução:** Importar em lotes menores (dividir JSON)

---

## ✨ APÓS IMPORTAÇÃO

1. **Acesse o admin:** `/admin/socios`
2. **Verifique estatísticas:**
   - Total de Sócios
   - Visíveis no Site
   - Com Lattes
3. **Teste a busca** na página pública
4. **Teste os filtros** alfabéticos

---

## 📧 NOTIFICAÇÃO DE SÓCIOS

**IMPORTANTE:** Os sócios importados têm:
- ✅ Conta ativa
- ✅ Visível no site
- ⚠️ Senha padrão: `MudarSenha@2025`

**Recomendação:**
Enviar email para todos os sócios informando:
1. Conta criada
2. Senha temporária
3. Link para primeiro acesso
4. Instruções para alterar senha

---

**Criado em:** 27/10/2025  
**Última atualização:** 27/10/2025  
**Status:** ✅ Pronto para importação completa
