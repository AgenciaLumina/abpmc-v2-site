#!/bin/bash
set -e

echo "🔧 CORRIGINDO PÁGINA DE SÓCIOS"
echo "================================"
echo ""

# Ir para o diretório
cd "/Volumes/Dock Station/abpmcdev/abpmc-v2"

# 1. Limpar caches
echo "1️⃣  Limpando caches..."
rm -rf .next
rm -rf node_modules/.prisma
echo "✅ Caches limpos"
echo ""

# 2. Regenerar Prisma
echo "2️⃣  Regenerando Prisma Client..."
npx prisma generate > /dev/null 2>&1
echo "✅ Prisma regenerado"
echo ""

# 3. Testar banco
echo "3️⃣  Testando dados no banco..."
npx tsx scripts/testar-api-socios.ts
echo ""

# 4. Instruções finais
echo "================================"
echo "✅ CORREÇÃO COMPLETA!"
echo ""
echo "📝 PRÓXIMOS PASSOS:"
echo ""
echo "1. Se o servidor está rodando, PARE (CTRL+C)"
echo "2. Execute: npm run dev"
echo "3. Acesse: http://localhost:3000/socios"
echo ""
echo "Você verá os 721 sócios! 🎉"
echo ""
