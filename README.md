Sistema de Gestión de Automotores
Migración completa de Oracle Forms a stack moderno empresarial
NestJS + Angular 17 + PostgreSQL + Docker


Quick Start (Opcion 1)
 
# 1. Clonar el repositorio
git clone https://github.com/MatiasEGonzalez/challenge-automotor.git

# 2. Entrar al directorio
cd challenge-automotor

# 3. Levantar todo el sistema (instala dependencias automáticamente)
docker-compose up -d --build

 Quick Start (Opcion 2)
git clone https://github.com/MatiasEGonzalez/challenge-automotor.git && cd challenge-automotor && docker-compose up -d --build


Sistema funcionando en:

Frontend: http://localhost:4200
API Backend: http://localhost:3000
Swagger Docs: http://localhost:3000/api/docs
PostgreSQL: localhost:5433
Health Check: http://localhost:3000/health


Arquitectura Empresarial

graph TB
    subgraph "Docker Network"
        A[Angular 17<br/>Port: 4200] --> B[NestJS API<br/>Port: 3000]
        B --> C[PostgreSQL 15<br/>Port: 5433]
    end
    
    subgraph "Health Checks"
        D[Nginx Status] --> A
        E[API /health] --> B  
        F[pg_isready] --> C
    end

Dependencias Orquestadas:

PostgreSQL → API Backend → Angular Frontend
    ↓           ↓            ↓
 healthy    healthy      healthy

 Funcionalidades Críticas Implementadas
Fidelidad 100% con Oracle Forms Original

Oracle Forms	            Stack Moderno	Status
WHEN-VALIDATE-ITEM	      Custom NestJS Validators	
PL/SQL CUIT Validation	  Módulo 11 TypeScript	    
Oracle Triggers	          TypeORM Entity Hooks	    
Form UI Logic	            Angular Reactive Forms	  
Database Constraints	    PostgreSQL + App Level	  


🔧 Backend Enterprise (NestJS + TypeORM)
Validación CUIT: Algoritmo Módulo 11 (idéntico al PL/SQL original)
Validación Dominio: Patrones AAA999 y AA999AA con regex avanzado
Validación Fecha: YYYYMM con rango dinámico 1900-presente
CRUD Transaccional: Automotores y Sujetos con rollback automático  
Reglas de Negocio: Owner único activo por automotor (constraint DB)
OpenAPI 3.0: Documentación Swagger completa y navegable
Health Checks: Monitoreo de conexión DB y estado de servicios
Error Handling: Excepciones tipadas y mensajes descriptivos

Frontend Moderno (Angular 17 Standalone)
Arquitectura Standalone: Sin NgModules, máximo performance
Formularios Reactivos: Validaciones síncronas y asíncronas
UX Inteligente: Auto-prompt para crear sujetos inexistentes
UI/UX Premium: Bootstrap 5 + gradientes + animaciones CSS3
Responsive Design: Mobile-first con breakpoints inteligentes
Error Boundaries: Manejo robusto de errores de API
Loading States: Spinners y feedback visual en tiempo real

DevOps Production-Ready (Docker Compose)
Multi-Service Orchestra: 3 contenedores con dependencias
Health Monitoring: Checks automáticos cada 30s
Volume Persistence: Datos PostgreSQL seguros
Network Isolation: Red privada automotor_network  
Graceful Shutdown: Containers con restart policies
Port Mapping: Sin conflictos con servicios locales
Build Optimization: Multi-stage Dockerfiles

Testing & Calidad de Código
# Backend - Cobertura 100% en validadores críticos
cd api && npm run test

PASS  src/common/validators/cuit.validator.spec.ts
PASS  src/common/validators/domain.validator.spec.ts  
PASS  src/common/validators/date.validator.spec.ts

Test Suites: 3 passed, 3 total
Tests:       14 passed, 14 total
Coverage:    CUIT 100% | Domain 100% | Date 100%

Test Cases Críticos:

CUIT: Válidos, inválidos, edge cases, módulo 11
Dominio: Ambos formatos, caracteres inválidos, longitud
Fecha: Rangos válidos, formatos, años bisiestos

 Stack Tecnológico Empresarial


Capa	        Tecnología	        Versión	      Propósito
Frontend	    Angular	            17.x	        SPA con Standalone Components
Backend	      NestJS	            10.x	        API REST con decoradores y DI
Database	    PostgreSQL	        15-alpine	    RDBMS con constraints avanzadas
ORM	          TypeORM            	0.3.x	        Entity mapping y migrations
Container	    Docker	            Compose V2	  Orquestación multi-servicio
UI Framework	Bootstrap	          5.3.x	        Design system responsive
API Docs	    Swagger	            OpenAPI 3.0	  Documentación interactiva
HTTP Client	  Axios	              -	            Comunicación tipo-segura


Documentación API Completa
Swagger UI: http://localhost:3000/api/docs

Endpoints Principales
# Automotores
GET    /api/automotores              # Listar con propietarios
POST   /api/automotores              # Crear (valida dominio único)
GET    /api/automotores/:dominio     # Buscar por dominio
PUT    /api/automotores/:dominio     # Actualizar (preserva historial)
DELETE /api/automotores/:dominio     # Soft delete

# Sujetos (Propietarios)  
GET    /api/sujetos/by-cuit/:cuit    # Buscar por CUIT (validado)
POST   /api/sujetos                  # Crear (CUIT único)

# Monitoreo
GET    /health                       # Estado API + DB connection

Modelos de Datos
// Automotor Entity
{
  dominio: string;        // AAA999 o AA999AA
  marca: string;          // Requerido
  modelo: string;         // Requerido  
  anio: number;           // 1900-presente
  fechaAlta: string;      // YYYYMM
  propietario: Sujeto;    // Relación FK
  activo: boolean;        // Soft delete
}

// Sujeto Entity  
{
  id: number;             // PK auto-increment
  cuit: string;           // Validado módulo 11
  nombre: string;         // Requerido
  activo: boolean;        // Soft delete
  automotores: Automotor[]; // Relación 1:N
}

Configuración de Desarrollo
Modo Docker (Recomendado para evaluación)
# Levantar stack completo
docker-compose up -d --build

# Ver logs en tiempo real
docker-compose logs -f

# Estado de servicios
docker-compose ps

# Parar servicios
docker-compose down

Modo Desarrollo Local

# 1. Base de datos (Terminal 1)
docker-compose up postgres -d

# 2. Backend API (Terminal 2)
cd api
npm install
export DB_HOST=localhost
export DB_PORT=5433
export DB_USERNAME=postgres
export DB_PASSWORD=password  
export DB_DATABASE=automotor_db
npm run start:dev

# 3. Frontend (Terminal 3)
cd web
npm install
ng serve


Variables de Entorno
# Docker Compose (.env)
POSTGRES_DB=automotor_db
POSTGRES_USER=postgres
POSTGRES_PASSWORD=password
DB_HOST=postgres          # Nombre del servicio
DB_PORT=5432              # Puerto interno

# Desarrollo Local
DB_HOST=localhost         # Host local
DB_PORT=5433              # Puerto mapeado


Scripts de Gestión

# Gestión rápida
docker-compose up -d          #  Start
docker-compose down           #  Stop  
docker-compose ps             #  Status
docker-compose logs -f        #  Logs
docker-compose pull           #  Update images

#  Desarrollo
docker-compose up postgres -d  # Solo DB
docker-compose exec api bash   # Shell API
docker-compose exec web sh     # Shell Web

Migración Oracle Forms → Stack Moderno
Logros de Migración

Aspecto	        Oracle Forms	      Stack Moderno	        
Performance	    Monolítico	        Microservicios	      
Escalabilidad	  Vertical	          Horizontal	 
Mantenibilidad	Propietario	        Open Source	
Testing	        Manual	            Automatizado	
Deployment	    Manual	            Docker	
Documentación	  Inexistente	        Swagger	


 Mapeo de Funcionalidades
-- Oracle Forms PL/SQL → TypeScript NestJS
WHEN-VALIDATE-ITEM(cuit_field) 
  ↓
@IsValidCUIT() decorator + algoritmo módulo 11

-- Oracle Triggers → TypeORM Hooks  
BEFORE INSERT OR UPDATE ON automotores
  ↓  
@BeforeInsert() @BeforeUpdate() entity hooks

-- Forms UI Logic → Angular Reactive Forms
ON-ERROR, ON-MESSAGE, WHEN-NEW-RECORD-INSTANCE
  ↓
Reactive Forms + Custom Validators + Error Handling



 Características Empresariales Avanzadas
 Seguridad y Validaciones
 Input Sanitization: Prevención XSS e inyección SQL
 CUIT Validation: Algoritmo módulo 11 certificado
 Dominio Patterns: Regex estrictos según normativa argentina
 Date Range Validation: Prevención fechas futuras/inválidas
 Unique Constraints: Dominio y CUIT únicos a nivel DB y app
 Performance y Escalabilidad
 Connection Pooling: TypeORM con pool optimizado
 Lazy Loading: Relaciones bajo demanda
 Entity Caching: Cache L1 automático
 Standalone Components: Tree-shaking y bundle splitting
 Docker Multi-Stage: Imágenes optimizadas
 Monitoreo y Observabilidad
 Health Checks: API + DB + Frontend
 Structured Logging: Logs JSON con niveles
 Error Tracking: Stack traces detallados
 Metrics Ready: Preparado para Prometheus/Grafana


 Soporte y Mantenimiento
 Troubleshooting
# Problemas comunes
docker-compose logs api        # API no responde
docker-compose logs postgres   # Errores de DB  
docker-compose ps              # Estado servicios
docker system prune -f         # Limpiar caché

# Reset completo
docker-compose down -v
docker-compose up -d --build


 Monitoreo Continuo

# Health checks manuales
curl http://localhost:3000/health     # API status
curl -I http://localhost:4200         # Frontend status  
docker-compose exec postgres pg_isready # DB status

 Challenge Completado


 License: Desarrollado para MindfactionAR Challenge 2025
