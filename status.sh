#!/bin/bash

# 📊 Sistema Automotor - Estado
# =============================

echo "📊 Estado del Sistema de Gestión Automotor"
echo "==========================================="

# Estado de contenedores
echo ""
echo "🐳 Contenedores:"
docker-compose ps

echo ""
echo "🌐 Verificando conectividad:"

# Test API
echo -n "   API (puerto 3000): "
if curl -s http://localhost:3000/health >/dev/null; then
    echo "✅ OK"
else
    echo "❌ Error"
fi

# Test Frontend
echo -n "   Frontend (puerto 4200): "
if curl -s http://localhost:4200 >/dev/null; then
    echo "✅ OK"
else
    echo "❌ Error"
fi

# Test Database
echo -n "   Database (puerto 5433): "
if nc -z localhost 5433 2>/dev/null; then
    echo "✅ OK"
else
    echo "❌ Error"
fi

echo ""
echo "🔗 URLs:"
echo "   🌐 Frontend: http://localhost:4200"
echo "   🔧 API:      http://localhost:3000/api"
echo "   💚 Health:   http://localhost:3000/health"
