# DECISION_LOG

## Validaciones identificadas del XML

### DOMINIO
- **Regla**: Regex `^[A-Z]{3}[0-9]{3}$` OR `^[A-Z]{2}[0-9]{3}[A-Z]{2}$`
- **Implementación**: Validator custom en NestJS + validación client-side en Angular
- **Ejemplos válidos**: ABC123, AB123CD

### CUIT  
- **Regla**: 11 dígitos + módulo 11 para dígito verificador
- **Implementación**: Función `isCuitValid()` portada desde PL/SQL
- **Trade-off**: Rechazar CUIT con dígito verificador = 10 (como hace el original)

### FECHA_FABRICACION
- **Regla**: YYYYMM, >= 190001, <= fecha actual, mes 1-12
- **Implementación**: Validator `isYYYYMMValid()`
- **Storage**: INTEGER en DB (mismo que Oracle)

## Flujo de asignación de dueño
- **Regla**: Solo un dueño responsable activo por automotor
- **Implementación**: 
  1. UPDATE vinculos anteriores → set fecha_fin = NOW()
  2. INSERT nuevo vinculo → responsable='S', fecha_fin=NULL
- **Constraint DB**: Índice único parcial `uq_vso_owner_actual`

## Endpoints identificados
- POST /api/automotores → registrar_alta()
- PUT /api/automotores/:dominio → actualizar() 
- DELETE /api/automotores/:dominio → eliminar()
- GET /api/sujetos/by-cuit → obtener_denominacion()
