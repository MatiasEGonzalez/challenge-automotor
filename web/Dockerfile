# Dockerfile del frontend Angular
FROM node:18-alpine AS builder

WORKDIR /app

# Copiar archivos de dependencias
COPY package*.json ./
RUN npm ci --silent

# Copiar el código fuente
COPY . .

# Construir la aplicación para producción
RUN npm run build --prod

# Imagen de nginx para servir la aplicación
FROM nginx:alpine AS production

# Copiar la configuración personalizada de nginx
COPY nginx.conf /etc/nginx/nginx.conf

# Copiar los archivos construidos (Angular 17+ usa /browser)
COPY --from=builder /app/dist/automotor-web/browser /usr/share/nginx/html

# Exponer el puerto 80
EXPOSE 80

# Comando por defecto para iniciar nginx
CMD ["nginx", "-g", "daemon off;"]
