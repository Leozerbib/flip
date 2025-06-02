# Migration : HTTP + TCP → TCP uniquement

## 🎯 **Objectif**

Simplifier l'architecture en supprimant les endpoints HTTP redondants du service d'authentification pour une approche microservices pure.

## 📋 **Changements effectués**

### 1. **Auth Service** (`apps/auth-service`)

#### ✅ **Supprimé** :
- Tous les endpoints HTTP (`@Post`, `@Get`, etc.)
- Guards HTTP (`LocalAuthGuard`, `JwtAuthGuard`, `GoogleAuthGuard`)
- Strategies Passport (`JwtStrategy`, `LocalStrategy`, `GoogleStrategy`)
- Imports HTTP (`PassportModule`, HTTP decorators)

#### ✅ **Conservé** :
- Message patterns TCP uniquement
- Logique métier dans `AuthService`
- Validation des tokens
- Gestion des refresh tokens

#### **Avant** :
```typescript
@Controller('auth')
export class AuthController {
  @Post('login')  // ❌ HTTP redondant
  @UseGuards(LocalAuthGuard)
  async loginHttp(@Body() loginDto: LoginDto) { ... }

  @MessagePattern({ cmd: 'login_user' })  // ✅ TCP conservé
  async login(@Payload() loginDto: LoginDto) { ... }
}
```

#### **Après** :
```typescript
@Controller()
export class AuthController {
  @MessagePattern({ cmd: 'login_user' })  // ✅ TCP uniquement
  async login(@Payload() loginDto: LoginDto) { ... }
}
```

### 2. **API Gateway** (`apps/api-gateway`)

#### ✅ **Renforcé** :
- Seul point d'entrée HTTP
- Validation via TCP vers Auth Service
- Gardes JWT utilisant TCP
- Décorateurs d'authentification

#### **Communication** :
```typescript
// API Gateway → Auth Service (TCP)
const result = await firstValueFrom(
  this.authClient.send<IAuthResponse>({ cmd: 'login_user' }, loginDto)
);
```

## 🏗️ **Architecture finale**

```
┌─────────────┐    HTTP     ┌─────────────┐    TCP      ┌─────────────┐
│   Frontend  │ ────────► │ API Gateway │ ────────► │ Auth Service│
└─────────────┘             └─────────────┘             └─────────────┘
                                  │                           │
                               HTTP only                  TCP only
                            (Point d'entrée)         (Logique métier)
```

## ✅ **Avantages obtenus**

### **Sécurité** 🔒
- ✅ Point d'entrée unique (API Gateway)
- ✅ Auth Service inaccessible directement
- ✅ Isolation réseau renforcée
- ✅ Contrôle centralisé des accès

### **Performance** ⚡
- ✅ Suppression de la surcharge HTTP dans Auth Service
- ✅ TCP plus rapide pour la communication interne
- ✅ Moins de code à maintenir

### **Maintenabilité** 🛠️
- ✅ Responsabilités claires (Gateway = HTTP, Auth = logique)
- ✅ Pas de duplication de code
- ✅ Configuration simplifiée
- ✅ Tests plus simples

## 🔧 **Configuration requise**

### **Variables d'environnement** :
```bash
# API Gateway
AUTH_SERVICE_HOST=localhost  # ou nom du service
AUTH_SERVICE_PORT=4002

# Auth Service
JWT_SECRET=your-secret
JWT_REFRESH_SECRET=your-refresh-secret
# Pas de variables HTTP nécessaires
```

### **Réseau** :
```yaml
# Docker Compose
auth-service:
  # ❌ Plus de ports HTTP exposés
  # ports: - "4002:4002"  
  # ✅ TCP interne uniquement
  networks:
    - internal
```

## 🚀 **Utilisation**

### **Pour les développeurs** :
```typescript
// ✅ Utiliser les décorateurs dans l'API Gateway
@Controller('example')
export class ExampleController {
  
  @Get('protected')
  @Auth()  // Validation via TCP automatique
  getProtectedData(@CurrentUser() user: ICurrentUser) {
    return { user };
  }
}
```

### **Pour le frontend** :
```typescript
// ✅ Toujours utiliser l'API Gateway
const response = await fetch('/api/auth/login', {
  method: 'POST',
  body: JSON.stringify({ email, password })
});
```

## 📊 **Comparaison**

| Aspect | Avant (HTTP + TCP) | Après (TCP uniquement) |
|--------|-------------------|------------------------|
| **Endpoints Auth Service** | HTTP + TCP | TCP uniquement |
| **Points d'entrée** | 2 (Gateway + Auth) | 1 (Gateway) |
| **Sécurité** | ⚠️ Double exposition | ✅ Point unique |
| **Maintenance** | ⚠️ Code dupliqué | ✅ Code simplifié |
| **Performance** | ⚠️ Surcharge HTTP | ✅ TCP optimisé |
| **Complexité** | ⚠️ Élevée | ✅ Réduite |

## 🧪 **Tests**

### **Vérifier la suppression HTTP** :
```bash
# ❌ Ne devrait plus répondre
curl http://localhost:4002/auth/login

# ✅ Devrait fonctionner
curl http://localhost:4001/api/auth/login
```

### **Vérifier TCP** :
```bash
# ✅ Port TCP accessible en interne
telnet auth-service 4002
```

## 🐛 **Dépannage**

### **Erreurs possibles** :

1. **"Connection refused"** :
   - Vérifier `AUTH_SERVICE_HOST` et `AUTH_SERVICE_PORT`
   - S'assurer que Auth Service écoute sur TCP

2. **"No matching event handler"** :
   - Vérifier les noms des message patterns
   - S'assurer que Auth Service est démarré

3. **"Service unavailable"** :
   - Auth Service probablement en panne
   - Vérifier les logs du service

### **Logs utiles** :
```bash
# API Gateway
grep "AUTH_SERVICE" logs/api-gateway.log
grep "send.*cmd" logs/api-gateway.log

# Auth Service
grep "MessagePattern" logs/auth-service.log
grep "TCP" logs/auth-service.log
```

## 📝 **Migration frontend**

Si vous avez du code frontend qui appelait directement l'Auth Service :

### **Avant** :
```typescript
// ❌ Appel direct à Auth Service
const response = await fetch('http://auth-service:4002/auth/login', {
  method: 'POST',
  body: JSON.stringify({ email, password })
});
```

### **Après** :
```typescript
// ✅ Appel via API Gateway
const response = await fetch('http://api-gateway:4001/api/auth/login', {
  method: 'POST',
  body: JSON.stringify({ email, password })
});
```

## 🎉 **Résultat**

L'architecture est maintenant **plus sécurisée**, **plus performante** et **plus maintenable** avec une séparation claire des responsabilités :

- **API Gateway** : Gestion HTTP et sécurité
- **Auth Service** : Logique métier pure en TCP

Cette approche suit les meilleures pratiques des architectures microservices modernes ! 🚀 