# Credenciais de Acesso - ABPMC

## 🔐 USUÁRIOS CRIADOS

### Super Admin (Dashboard)
- **Email:** `paulo@agencialumina.com.br`
- **Senha:** `Sucesso102030#`
- **Role:** `SUPERADMIN`
- **ID:** 724
- **Acesso:** `/admin`
- **Permissões:** Acesso total ao dashboard administrativo

### Associado de Teste (Área Restrita)
- **Email:** `teste@agencialumina.com.br`
- **Senha:** `Sucesso102030#`
- **Role:** `ASSOCIADO`
- **ID:** 725
- **Acesso:** `/associados` (área restrita)
- **Permissões:** Acesso à área do associado

## 🚀 COMO ACESSAR

### Dashboard Admin
1. Acesse: `http://localhost:3002/admin`
2. Use as credenciais do Super Admin
3. Terá acesso completo ao painel administrativo

### Área do Associado
1. Acesse: `http://localhost:3002/associados`
2. Use as credenciais do Associado de Teste
3. Terá acesso à área restrita dos associados

## 🔧 CONFIGURAÇÕES

### Campos Criados
- **senhaHash:** Senha criptografada com bcrypt (12 rounds)
- **visivelNoSite:** `false` (não aparecem na lista pública de sócios)
- **status:** `ATIVO`
- **emailVerificado:** `false` (padrão)

### Dados Fictícios
- CPFs de teste (não reais)
- Telefones e endereços fictícios
- Criados apenas para desenvolvimento/teste

## ⚠️ SEGURANÇA

### Produção
- **ALTERE AS SENHAS** antes do deploy em produção
- Use senhas mais complexas e únicas
- Configure autenticação de dois fatores se disponível
- Monitore logs de acesso

### Desenvolvimento
- Estas credenciais são apenas para desenvolvimento local
- Não compartilhe em repositórios públicos
- Use variáveis de ambiente para senhas em produção

## 📝 SCRIPT UTILIZADO

O script `scripts/create-users.ts` foi usado para criar os usuários:
- Usa `bcrypt` para hash das senhas
- Usa `upsert` para evitar duplicatas
- Cria registros na tabela `associados`
- Roles: `SUPERADMIN` e `ASSOCIADO`

## 🔄 REGENERAR USUÁRIOS

Para recriar os usuários:
```bash
npx tsx scripts/create-users.ts
```

O script usa `upsert`, então pode ser executado múltiplas vezes sem erro.

---

**Data:** Outubro 2025  
**Ambiente:** Desenvolvimento Local  
**Status:** Usuários ativos e prontos para uso
