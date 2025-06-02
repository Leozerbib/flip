#!/usr/bin/env pwsh

param(
    [Parameter(Mandatory=$false)]
    [ValidateSet("dev", "prod", "db-only", "local")]
    [string]$Mode = "dev"
)

Write-Host "🚀 LifeOS Backend Launcher" -ForegroundColor Cyan
Write-Host "=========================" -ForegroundColor Cyan

switch ($Mode) {
    "dev" {
        Write-Host "🔧 Lancement en mode DÉVELOPPEMENT" -ForegroundColor Yellow
        Write-Host "   - PostgreSQL + Services backend avec hot reload" -ForegroundColor Gray
        docker-compose -f docker-compose.dev.yml up -d
        Write-Host "✅ Services démarrés !" -ForegroundColor Green
        Write-Host "📡 API Gateway: http://localhost:4001" -ForegroundColor Blue
        Write-Host "🔐 Auth Service: http://localhost:4002" -ForegroundColor Blue
        Write-Host "🗄️  PostgreSQL: localhost:4444" -ForegroundColor Blue
    }
    
    "prod" {
        Write-Host "🏭 Lancement en mode PRODUCTION" -ForegroundColor Red
        Write-Host "   - Tous les services optimisés pour la production" -ForegroundColor Gray
        docker-compose -f docker-compose.prod.yml up -d
        Write-Host "✅ Services de production démarrés !" -ForegroundColor Green
    }
    
    "db-only" {
        Write-Host "🗄️  Lancement de PostgreSQL UNIQUEMENT" -ForegroundColor Magenta
        Write-Host "   - Pour développement local des services" -ForegroundColor Gray
        docker-compose up -d postgres_db
        Write-Host "✅ PostgreSQL démarré sur le port 4444 !" -ForegroundColor Green
        Write-Host "🔗 Connection: postgresql://lifeos_user:lifeos_password@localhost:4444/lifeos_db" -ForegroundColor Blue
    }
    
    "local" {
        Write-Host "💻 Mode DÉVELOPPEMENT LOCAL" -ForegroundColor Green
        Write-Host "   - PostgreSQL en Docker, services en local" -ForegroundColor Gray
        docker-compose up -d postgres_db
        Write-Host ""
        Write-Host "1️⃣  PostgreSQL démarré !" -ForegroundColor Green
        Write-Host "2️⃣  Lancez maintenant les services :" -ForegroundColor Yellow
        Write-Host "   cd lifeOS_backend/apps/auth-service && npm run start:dev" -ForegroundColor Cyan
        Write-Host "   cd lifeOS_backend/apps/api-gateway && npm run start:dev" -ForegroundColor Cyan
    }
}

Write-Host ""
Write-Host "📊 Pour voir les logs : docker-compose logs -f" -ForegroundColor Yellow
Write-Host "🛑 Pour arrêter : docker-compose down" -ForegroundColor Yellow 