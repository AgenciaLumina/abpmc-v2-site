#!/bin/bash

echo "🔄 REINICIANDO SERVIDOR NEXT.JS"
echo "================================"
echo ""

# Parar servidor (você precisa fazer isso manualmente com CTRL+C)
echo "1️⃣  PARE o servidor (CTRL+C no terminal)"
echo ""
read -p "Pressione ENTER depois de parar o servidor..."

# Limpar cache
echo ""
echo "2️⃣  Limpando cache do Next.js..."
rm -rf .next
echo "✅ Cache limpo!"

# Regenerar Prisma
echo ""
echo "3️⃣  Regenerando Prisma Client..."
npx prisma generate
echo "✅ Prisma regenerado!"

# Iniciar servidor
echo ""
echo "4️⃣  Iniciando servidor..."
echo ""
echo "Execute: npm run dev"
echo ""
echo "Depois acesse: http://localhost:3000/socios"
echo ""
echo "✅ PRONTO!"
