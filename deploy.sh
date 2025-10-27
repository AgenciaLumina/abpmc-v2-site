#!/bin/bash

# =====================================================================
# 🎯 OBJETIVO
# Automatizar o processo de commit, push e deploy do projeto ABPMC-V2.
#
# O script executa as seguintes ações:
#  1️⃣ Adiciona todas as alterações ao Git.
#  2️⃣ Cria um commit automático com data e hora.
#  3️⃣ Faz push para o repositório remoto no GitHub.
#  4️⃣ Após o push, executa o deploy de produção na Vercel (--prod --force).
#
# Observações:
#  - Nenhum arquivo é apagado.
#  - Funciona em repositórios já conectados à Vercel.
#  - Compatível com qualquer branch (principal: main).
# =====================================================================

set -e  # Para em caso de erro

echo "🔍 Verificando alterações locais..."
git status

echo ""
echo "📦 Adicionando arquivos ao commit..."
git add .

# Cria um commit com data e hora
COMMIT_MSG="🚀 Deploy automático: $(date '+%Y-%m-%d %H:%M:%S')"
echo "📝 Criando commit com mensagem: $COMMIT_MSG"
git commit -m "$COMMIT_MSG" || echo "⚠️ Nenhuma modificação detectada."

echo ""
echo "⬆️ Enviando alterações para o GitHub..."
git push origin main || git push origin master || echo "⚠️ Nenhum push necessário."

echo ""
echo "⏳ Aguardando 3 segundos antes de iniciar o deploy..."
sleep 3

echo ""
echo "🚀 Iniciando deploy na Vercel (produção)..."
vercel --prod --force

echo ""
echo "✅ Deploy completo!"
echo "🌐 Acesse sua aplicação em: https://abpmc-v2.vercel.app"
echo ""
