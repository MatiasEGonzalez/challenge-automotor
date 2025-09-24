# Dockerfile del backend NestJS
FROM node:18-alpine AS builder

WORKDIR /app

# Copiar archivos de dependencias
COPY package*.json ./
RUN npm ci

# Copiar el código fuente
COPY . .

# Construir la aplicación
RUN npm run build

# Imagen de producción
FROM node:18-alpine AS production

WORKDIR /app

# Crear usuario no root
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nestjs -u 1001

# Copiar package.json para instalar solo dependencias de producción
COPY --chown=nestjs:nodejs package*.json ./
RUN npm ci --only=production && npm cache clean --force

# Copiar el build desde la fase builder
COPY --from=builder --chown=nestjs:nodejs /app/dist ./dist

# Cambiar al usuario no root
USER nestjs

# Exponer el puerto
EXPOSE 3000

# Variables de entorno por defecto
ENV NODE_ENV=production
ENV PORT=3000

# Comando para ejecutar la aplicación
CMD ["node", "dist/main.js"]
