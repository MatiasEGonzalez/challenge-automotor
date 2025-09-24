# Docker Production Environment

## 🐳 Multi-Service Architecture:
- **PostgreSQL 16**: Database with persistent volumes
- **NestJS API**: Backend with optimized multi-stage build
- **Angular Web**: Frontend served with nginx
- **Health Checks**: Monitoring for all services

## 🚀 One-Command Deployment:
```bash
./deploy.sh  # or docker compose up -d --build
```

## 🛠️ Management Scripts:
- `./start.sh` - Start all services
- `./stop.sh` - Stop all services  
- `./status.sh` - Check service status
- `./logs.sh` - View service logs

## 🌐 Service Access:
- **API**: http://localhost:3000
- **Swagger**: http://localhost:3000/api/docs
- **Web App**: http://localhost:4200
- **Database**: localhost:5433

## ⚙️ Production Features:
- Multi-stage builds for optimized images
- Persistent volumes for data retention
- Health checks with auto-restart
- Environment configuration
- Nginx optimization for Angular

## 📊 Monitoring & Documentation:
- Complete escalability analysis
- IA tools transparency documentation  
- Database seeds for quick setup
- Production deployment guidelines

Configured: mié 24 sep 2025 08:56:02 -03
