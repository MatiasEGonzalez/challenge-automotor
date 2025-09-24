#!/bin/bash

# 🚗 Sistema Automotor - Inicio Simple
# ===================================

echo "🚀 Iniciando Sistema de Gestión Automotor..."

# Verificar si Docker está corriendo
if ! docker info >/dev/null 2>&1; then
    echo "❌ Docker no está corriendo. Por favor inicie Docker primero."
    exit 1
fi

# Detener cualquier proceso local que use los puertos
echo "🔧 Deteniendo procesos locales en puertos 3000 y 4200..."
pkill -f "ng serve" 2>/dev/null || true
pkill -f "npm run start" 2>/dev/null || true

# Iniciar los contenedores
echo "🐳 Construyendo e iniciando contenedores..."
docker-compose up --build -d

# Esperar un momento para que los servicios inicien
echo "⏳ Esperando que los servicios inicien..."
sleep 10

# Verificar estado
echo "📊 Verificando estado de los servicios..."
docker-compose ps

echo ""
echo "✅ ¡Sistema iniciado exitosamente!"
echo ""
echo "🌟 URLs Disponibles:"
echo "   🌐 Frontend: http://localhost:4200"
echo "   🔧 API:      http://localhost:3000/api"
echo "   💚 Health:   http://localhost:3000/health"
echo "   🗄️  DB:       localhost:5433"
echo ""
echo "🛠️  Comandos útiles:"
echo "   ./stop.sh     - Detener el sistema"
echo "   ./logs.sh     - Ver logs en tiempo real"
echo "   ./status.sh   - Ver estado de los servicios"
echo ""
