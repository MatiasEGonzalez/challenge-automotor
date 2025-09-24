#!/bin/bash

# 🚀 Script de Despliegue One-Liner - Sistema Automotor
# Descripción: Despliega toda la stack con un solo comando
# Uso: ./deploy.sh [prod|dev]

set -e  # Salir en caso de error

# Colores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # Sin color

# Configuración
ENV=${1:-dev}
PROJECT_NAME="sistema-automotor"
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")

echo -e "${BLUE}🚀 Iniciando despliegue del Sistema Automotor [${ENV}]${NC}"
echo -e "${BLUE}📅 Timestamp: ${TIMESTAMP}${NC}"

# Función para logging
log() {
    echo -e "${GREEN}[$(date '+%H:%M:%S')] $1${NC}"
}

error() {
    echo -e "${RED}[ERROR] $1${NC}"
    exit 1
}

warning() {
    echo -e "${YELLOW}[WARNING] $1${NC}"
}

# Verificar dependencias
check_dependencies() {
    log "🔍 Verificando dependencias..."
    
    command -v docker >/dev/null 2>&1 || error "Docker no está instalado"
    command -v docker-compose >/dev/null 2>&1 || error "Docker Compose no está instalado"
    
    # Verificar que Docker esté corriendo
    docker info >/dev/null 2>&1 || error "Docker daemon no está corriendo"
    
    log "✅ Dependencias verificadas"
}

# Limpiar despliegue anterior
cleanup() {
    log "🧹 Limpiando despliegue anterior..."
    
    # Parar contenedores existentes
    docker-compose down -v --remove-orphans 2>/dev/null || true
    
    # Limpiar imágenes huérfanas
    docker image prune -f >/dev/null 2>&1 || true
    
    # Limpiar volúmenes no utilizados
    docker volume prune -f >/dev/null 2>&1 || true
    
    log "✅ Limpieza completada"
}

# Verificar archivos necesarios
verify_files() {
    log "📋 Verificando archivos necesarios..."
    
    required_files=(
        "docker-compose.yml"
        "api/Dockerfile"
        "web/Dockerfile"
        "docs/source/schema_automotor.sql"
    )
    
    for file in "${required_files[@]}"; do
        if [[ ! -f "$file" ]]; then
            error "Archivo requerido no encontrado: $file"
        fi
    done
    
    log "✅ Archivos verificados"
}

# Configurar environment específico
setup_environment() {
    log "⚙️ Configurando entorno [${ENV}]..."
    
    # Crear archivo .env si no existe
    if [[ ! -f ".env" ]]; then
        cat > .env << EOF
# Configuración generada automáticamente - ${TIMESTAMP}
NODE_ENV=${ENV}
COMPOSE_PROJECT_NAME=${PROJECT_NAME}
POSTGRES_DB=automotor_db
POSTGRES_USER=postgres
POSTGRES_PASSWORD=password
API_PORT=3000
WEB_PORT=80
EOF
        log "📝 Archivo .env creado"
    fi
    
    # Configurar variables para producción
    if [[ "$ENV" == "prod" ]]; then
        log "🔒 Configurando entorno de producción..."
        
        # Generar password seguro si no existe
        if ! grep -q "POSTGRES_PASSWORD.*$(openssl rand -base64 32)" .env 2>/dev/null; then
            SECURE_PASSWORD=$(openssl rand -base64 32 | tr -d "=+/")
            sed -i "s/POSTGRES_PASSWORD=password/POSTGRES_PASSWORD=${SECURE_PASSWORD}/" .env
            log "🔑 Password de base de datos actualizado"
        fi
    fi
    
    log "✅ Entorno configurado"
}

# Build y despliegue
deploy() {
    log "🏗️ Construyendo aplicación..."
    
    # Build con progress
    if [[ "$ENV" == "prod" ]]; then
        docker-compose build --no-cache --parallel
    else
        docker-compose build --parallel
    fi
    
    log "✅ Build completado"
    
    log "🚀 Desplegando servicios..."
    
    # Iniciar servicios
    docker-compose up -d
    
    # Esperar a que los servicios estén listos
    log "⏳ Esperando que los servicios estén listos..."
    
    # Esperar PostgreSQL
    local retries=30
    while ! docker-compose exec -T postgres pg_isready -U postgres >/dev/null 2>&1; do
        retries=$((retries - 1))
        if [[ $retries -eq 0 ]]; then
            error "PostgreSQL no se inició correctamente"
        fi
        sleep 2
        echo -n "."
    done
    echo
    log "✅ PostgreSQL está listo"
    
    # Esperar API
    retries=30
    while ! curl -sf http://localhost:3000/api/automotores >/dev/null 2>&1; do
        retries=$((retries - 1))
        if [[ $retries -eq 0 ]]; then
            error "API no se inició correctamente"
        fi
        sleep 2
        echo -n "."
    done
    echo
    log "✅ API está lista"
    
    # Esperar Frontend
    retries=30
    while ! curl -sf http://localhost:80 >/dev/null 2>&1; do
        retries=$((retries - 1))
        if [[ $retries -eq 0 ]]; then
            warning "Frontend puede no estar listo (continúa el despliegue)"
            break
        fi
        sleep 2
        echo -n "."
    done
    echo
    log "✅ Frontend está listo"
}

# Verificar estado del despliegue
verify_deployment() {
    log "🔍 Verificando despliegue..."
    
    # Verificar que todos los contenedores estén corriendo
    if ! docker-compose ps | grep -q "Up"; then
        error "Algunos servicios no están corriendo"
    fi
    
    # Test básico de API
    if ! curl -sf http://localhost:3000/api/automotores >/dev/null; then
        error "API no responde correctamente"
    fi
    
    # Test básico de Frontend
    if ! curl -sf http://localhost:80 >/dev/null; then
        warning "Frontend puede no estar respondiendo"
    fi
    
    log "✅ Despliegue verificado"
}

# Mostrar información de acceso
show_access_info() {
    log "📊 Información de acceso:"
    echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo -e "${GREEN}🌐 Frontend:${NC}     http://localhost:80"
    echo -e "${GREEN}🔧 API:${NC}          http://localhost:3000/api"
    echo -e "${GREEN}📊 Swagger:${NC}      http://localhost:3000/api/docs (si está habilitado)"
    echo -e "${GREEN}🗄️  PostgreSQL:${NC}  localhost:5432"
    echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    
    # Mostrar logs de todos los servicios
    echo -e "${YELLOW}📋 Para ver logs: docker-compose logs -f${NC}"
    echo -e "${YELLOW}🛑 Para parar: docker-compose down${NC}"
    echo -e "${YELLOW}🔄 Para reiniciar: docker-compose restart${NC}"
}

# Función de rollback
rollback() {
    warning "🔄 Ejecutando rollback..."
    docker-compose down -v
    log "✅ Rollback completado"
}

# Trap para manejar interrupciones
trap 'echo -e "\n${RED}❌ Despliegue interrumpido por usuario${NC}"; rollback; exit 1' INT TERM

# Función principal
main() {
    echo -e "${BLUE}╔══════════════════════════════════════════════════════════╗${NC}"
    echo -e "${BLUE}║                 🚗 Sistema Automotor 🚗                  ║${NC}"
    echo -e "${BLUE}║              Despliegue Automatizado v1.0               ║${NC}"
    echo -e "${BLUE}╚══════════════════════════════════════════════════════════╝${NC}"
    
    check_dependencies
    verify_files
    setup_environment
    cleanup
    deploy
    verify_deployment
    show_access_info
    
    echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo -e "${GREEN}🎉 ¡DESPLIEGUE EXITOSO! 🎉${NC}"
    echo -e "${GREEN}⏱️  Tiempo total: $(( $(date +%s) - $(date -d "${TIMESTAMP}" +%s 2>/dev/null || echo 0) )) segundos${NC}"
    echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    
    # Abrir browser automáticamente en desarrollo
    if [[ "$ENV" == "dev" ]] && command -v xdg-open >/dev/null 2>&1; then
        log "🌐 Abriendo navegador..."
        xdg-open http://localhost:80 >/dev/null 2>&1 &
    fi
}

# Mostrar ayuda
show_help() {
    echo -e "${BLUE}Sistema Automotor - Script de Despliegue${NC}"
    echo ""
    echo "Uso: $0 [ENTORNO] [OPCIONES]"
    echo ""
    echo "Entornos:"
    echo "  dev     Despliegue de desarrollo (default)"
    echo "  prod    Despliegue de producción"
    echo ""
    echo "Opciones:"
    echo "  -h, --help     Mostrar esta ayuda"
    echo "  --cleanup      Solo limpiar sin desplegar"
    echo "  --status       Mostrar estado actual"
    echo ""
    echo "Ejemplos:"
    echo "  $0              # Despliegue de desarrollo"
    echo "  $0 prod         # Despliegue de producción"  
    echo "  $0 --status     # Ver estado"
    echo ""
}

# Mostrar estado actual
show_status() {
    echo -e "${BLUE}📊 Estado actual del sistema:${NC}"
    echo ""
    
    if docker-compose ps &>/dev/null; then
        docker-compose ps
        echo ""
        echo -e "${GREEN}Servicios activos detectados${NC}"
    else
        echo -e "${YELLOW}No hay servicios activos${NC}"
    fi
    
    # Mostrar uso de recursos
    if docker stats --no-stream &>/dev/null; then
        echo -e "${BLUE}📈 Uso de recursos:${NC}"
        docker stats --no-stream --format "table {{.Name}}\t{{.CPUPerc}}\t{{.MemUsage}}"
    fi
}

# Procesar argumentos
case "${1:-}" in
    -h|--help)
        show_help
        exit 0
        ;;
    --cleanup)
        cleanup
        exit 0
        ;;
    --status)
        show_status
        exit 0
        ;;
    prod|dev|"")
        main
        ;;
    *)
        echo -e "${RED}Argumento no válido: $1${NC}"
        show_help
        exit 1
        ;;
esac
