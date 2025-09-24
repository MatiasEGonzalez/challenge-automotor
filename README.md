# 🚗 Sistema de Gestión de Automotores

Migración completa de Oracle Forms a stack moderno (NestJS + Angular + PostgreSQL)

## 🚀 Quick Start - Un Solo Comando

```bash
git clone https://github.com/MatiasEGonzalez/challenge-automotor.git
cd challenge-automotor
docker compose up -d --build

Sistema funcionando en:

Frontend: http://localhost:4200
API: http://localhost:3000
Swagger Docs: http://localhost:3000/api/docs

✅ Funcionalidades Implementadas

  🔧 Backend (NestJS + TypeORM)
  
    ✅ Validación CUIT: Módulo 11 idéntico al PL/SQL original
    ✅ Validación Dominio: Patrones AAA999 y AA999AA
    ✅ Validación Fecha: YYYYMM con rango 1900-presente
    ✅ CRUD Completo: Automotores y Sujetos
    ✅ Reglas de Negocio: Owner único activo por automotor
    ✅ Swagger/OpenAPI: Documentación completa
    ✅ Tests: 14 tests con 100% cobertura en validadores
    
  🎨 Frontend (Angular 17)
  
    ✅ UI Moderna: Bootstrap con gradientes y animaciones
    ✅ Formularios Reactivos: Validaciones en tiempo real
    ✅ Manejo CUIT: Prompt automático para crear sujetos inexistentes
    ✅ UX Intuitiva: Confirmaciones y feedback visual
    ✅ Responsive: Diseño móvil y desktop
    
  🐳 DevOps (Docker + PostgreSQL)
  
    ✅ Multi-Service: API + Web + Database
    ✅ Health Checks: Monitoreo automático
    ✅ Volúmenes Persistentes: Datos seguros
    ✅ Scripts: Deployment y gestión automatizados

┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   Angular 17    │────│   NestJS API     │────│  PostgreSQL 16  │
│   (Frontend)    │    │   (Backend)      │    │   (Database)    │
│  Port: 4200     │    │   Port: 3000     │    │   Port: 5433    │
└─────────────────┘    └──────────────────┘    └─────────────────┘


🔧 Stack Tecnológico
Componente	Tecnología	Versión
Frontend	Angular	17.x
Backend	NestJS	10.x
Database	PostgreSQL	16.x
ORM	TypeORM	0.3.x
Container	Docker	Compose V2
UI	Bootstrap	5.3.x
Docs	Swagger	OpenAPI 3.0




📊 Migración Oracle Forms → Stack Moderno
Fidelidad de Reglas de Negocio:
✅ WHEN-VALIDATE-ITEM → Custom Validators
✅ PL/SQL Triggers → TypeORM Hooks
✅ Oracle Constraints → Database + Application Level
✅ Forms UI Logic → Angular Reactive Forms
🧪 Testing & Calidad

# Tests unitarios
npm run test

# Resultados:
# ✅ CUIT Validator: 6 tests
# ✅ Domain Validator: 4 tests  
# ✅ Date Validator: 4 tests
# ✅ Total: 14/14 passing


📚 Documentación API
La documentación completa de la API está disponible en: http://localhost:3000/api/docs (Swagger UI)

Endpoints Principales:
GET /api/automotores - Listar automotores con dueños
POST /api/automotores - Crear nuevo automotor
PUT /api/automotores/:dominio - Actualizar automotor
DELETE /api/automotores/:dominio - Eliminar automotor
GET/POST /api/sujetos - Gestión de sujetos (dueños)

🚀 Scripts de Gestión
./start.sh      # Iniciar servicios
./stop.sh       # Detener servicios  
./status.sh     # Ver estado
./logs.sh       # Ver logs
./deploy.sh     # Deployment completo

⚙️ Configuración de Desarrollo
Variables de Entorno (.env):

DATABASE_HOST=localhost
DATABASE_PORT=5433
DATABASE_NAME=challenge_automotor
API_PORT=3000
WEB_PORT=4200

Desarrollo Local:
# Backend
cd api && npm install && npm run start:dev

# Frontend  
cd web && npm install && ng serve

# Database
docker run -p 5433:5432 -e POSTGRES_DB=challenge_automotor postgres:16


📄 Licencia
Este proyecto fue desarrollado como parte del Challenge Técnico MindfactionAR.

Challenge completado con éxito ✅
