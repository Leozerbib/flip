# Architecture d'Authentification LifeOS

## Vue d'ensemble

Cette documentation décrit l'architecture de sécurité mise en place pour LifeOS, basée sur une approche microservices pure avec JWT et une sécurité renforcée.

## Architecture

### Composants principaux

1. **Auth Service** (`apps/auth-service`) - Microservice d'authentification (TCP uniquement)
2. **API Gateway** (`apps/api-gateway`) - Point d'entrée unique HTTP
3. **Contracts Library** (`libs/contracts`) - Interfaces et DTOs partagés
4. **Logger Library** (`libs/logger`) - Système de logging centralisé

### Flux d'authentification

```
Frontend → API Gateway (HTTP) → Auth Service (TCP) → Database
```

**⚠️ Important** : L'Auth Service n'expose **aucun endpoint HTTP**. Toute communication publique passe par l'API Gateway.

## Sécurité implémentée

### 1. Architecture en couches sécurisées

- **Couche publique** : API Gateway (HTTP) - Point d'entrée unique
- **Couche privée** : Auth Service (TCP) - Microservice protégé
- **Isolation réseau** : Auth Service inaccessible directement depuis l'extérieur

### 2. Double couche de tokens JWT

- **Access Token** : Durée courte (1h par défaut), pour les opérations courantes
- **Refresh Token** : Durée longue (7j par défaut), pour renouveler les access tokens
- **Secrets séparés** : Chaque type de token utilise un secret différent
- **Type validation** : Vérification du type de token (access/refresh)

### 3. Validation multi-niveaux

- **Signature JWT** : Vérification cryptographique
- **Expiration** : Validation de la durée de vie
- **Type de token** : Vérification access vs refresh
- **Existence utilisateur** : Validation que l'utilisateur existe toujours
- **Structure du payload** : Validation des données contenues

### 4. Communication sécurisée

- **TCP interne uniquement** : Communication entre microservices via TCP
- **HTTP public contrôlé** : Exposition uniquement via l'API Gateway
- **Message patterns** : Validation des commandes entre services
- **Point d'entrée unique** : Contrôle centralisé de la sécurité

## Utilisation

### Dans l'API Gateway

#### Décorateurs disponibles

```typescript
import { Auth, OptionalAuth } from './auth/decorators/auth.decorator';
import { CurrentUser, GetUserId, GetUserEmail } from './auth/decorators/current-user.decorator';

@Controller('example')
export class ExampleController {
  
  @Get('protected')
  @Auth() // Authentification obligatoire
  public getProtectedData(@CurrentUser() user: ICurrentUser) {
    return { user };
  }

  @Get('optional')
  @OptionalAuth() // Authentification optionnelle
  public getOptionalData(@CurrentUser() user?: ICurrentUser) {
    return { user: user || null };
  }

  @Post('create')
  @Auth()
  public createContent(
    @GetUserId() userId: string,
    @GetUserEmail() email: string,
    @Body() content: any
  ) {
    return { userId, email, content };
  }
}
```

#### Garde JWT

```typescript
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Get('manual-guard')
public protectedEndpoint(@Request() req) {
  return req.user; // Utilisateur injecté par le garde
}
```

### Endpoints disponibles

#### API Gateway (`/api/auth`) - Seuls endpoints HTTP publics

- `POST /register` - Inscription
- `POST /login` - Connexion
- `POST /refresh` - Renouvellement de token
- `GET /profile` - Profil utilisateur (protégé)
- `POST /logout` - Déconnexion (protégé)
- `GET /check` - Vérification du statut d'auth
- `GET /me` - Informations utilisateur (protégé)
- `GET /google` - Auth Google OAuth
- `GET /google/callback` - Callback Google

#### Auth Service (TCP uniquement) - Message patterns internes

- `register_user` - Inscription utilisateur
- `login_user` - Connexion utilisateur
- `validate_token` - Validation access token
- `validate_refresh_token` - Validation refresh token
- `refresh_token` - Renouvellement de token
- `get_user_from_token` - Récupération utilisateur depuis token
- `revoke_token` - Révocation de token
- `google_login` - Connexion Google
- `health_check` - Vérification de santé du service

## Configuration

### Variables d'environnement

```bash
# Auth Service (TCP)
JWT_SECRET=your-jwt-secret-here
JWT_REFRESH_SECRET=your-refresh-secret-here
JWT_ACCESS_EXPIRES_IN=3600  # 1 heure
JWT_REFRESH_EXPIRES_IN=604800  # 7 jours

# API Gateway (HTTP)
AUTH_SERVICE_HOST=localhost
AUTH_SERVICE_PORT=4002

# Google OAuth (API Gateway)
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# Frontend
FRONTEND_URL=http://localhost:3000
```

### Secrets de production

⚠️ **IMPORTANT** : En production, utilisez des secrets robustes :

```bash
# Générer des secrets sécurisés
openssl rand -base64 64  # Pour JWT_SECRET
openssl rand -base64 64  # Pour JWT_REFRESH_SECRET
```

## Avantages de cette architecture

### Sécurité maximale

1. **Point d'entrée unique** : Seul l'API Gateway expose HTTP
2. **Auth Service protégé** : Inaccessible directement depuis l'extérieur
3. **Séparation des préoccupations** : Gateway = HTTP, Auth = logique métier
4. **Communication TCP** : Plus sécurisé entre microservices
5. **Validation centralisée** : Toute la sécurité HTTP dans le Gateway

### Performance optimisée

1. **TCP interne** : Plus rapide que HTTP entre services
2. **Pas de surcharge HTTP** : Auth Service optimisé pour les calculs
3. **Cache possible** : Validation côté Gateway pour réduire les appels
4. **Tokens légers** : Payload minimal dans les JWT

### Maintenabilité excellente

1. **Responsabilités claires** : Gateway = exposition, Auth = logique
2. **Code simplifié** : Pas de duplication HTTP/TCP
3. **Décorateurs simples** : `@Auth()`, `@CurrentUser()`
4. **Types partagés** : Contrats via `@app/contracts`
5. **Documentation centralisée** : Swagger uniquement sur Gateway

### Scalabilité

1. **Services indépendants** : Auth Service peut être répliqué
2. **Load balancing** : Possible sur l'Auth Service en interne
3. **Monitoring centralisé** : Toutes les métriques HTTP sur Gateway
4. **Déploiement indépendant** : Services déployables séparément

## Communication entre services

### API Gateway → Auth Service

```typescript
// Dans l'API Gateway
const result = await firstValueFrom(
  this.authClient.send<IAuthResponse>({ cmd: 'login_user' }, loginDto)
);
```

### Gestion des erreurs

```typescript
// Gestion automatique des erreurs TCP
try {
  const validation = await firstValueFrom(
    this.authClient.send<ITokenValidationResponse>({ cmd: 'validate_token' }, token)
  );
} catch (error) {
  throw new UnauthorizedException('Service d\'authentification indisponible');
}
```

## Patterns de sécurité avancés

### 1. Blacklist de tokens (TODO)

```typescript
// Dans AuthService (TCP)
@MessagePattern({ cmd: 'revoke_token' })
async revokeToken(@Payload() token: string): Promise<{ success: boolean }> {
  this.tokenBlacklist.add(token);
  return { success: true };
}
```

### 2. Rate limiting (Gateway uniquement)

```typescript
// Dans l'API Gateway
@RateLimit({ points: 10, duration: 60 })
@Post('login')
public async login(@Body() loginDto: LoginDto) {
  // Rate limiting sur les tentatives de connexion
}
```

### 3. Monitoring centralisé

```typescript
// Toutes les métriques HTTP centralisées sur Gateway
@Post('login')
public async login(@Body() loginDto: LoginDto) {
  const start = Date.now();
  try {
    const result = await this.authService.login(loginDto);
    this.metricsService.recordSuccess('login', Date.now() - start);
    return result;
  } catch (error) {
    this.metricsService.recordError('login', error);
    throw error;
  }
}
```

## Déploiement

### Docker Compose exemple

```yaml
version: '3.8'

services:
  api-gateway:
    build: ./apps/api-gateway
    ports:
      - "4001:4001"
    environment:
      - AUTH_SERVICE_HOST=auth-service
      - AUTH_SERVICE_PORT=4002
    depends_on:
      - auth-service

  auth-service:
    build: ./apps/auth-service
    # Pas de ports exposés - TCP interne uniquement
    environment:
      - JWT_SECRET=${JWT_SECRET}
      - JWT_REFRESH_SECRET=${JWT_REFRESH_SECRET}
    depends_on:
      - database
```

## Dépannage

### Problèmes de communication TCP

```bash
# Vérifier la connectivité TCP
telnet auth-service-host 4002

# Logs à vérifier
grep "TCP" logs/api-gateway.log
grep "MessagePattern" logs/auth-service.log
```

### Erreurs courantes

1. **Service unavailable** : Auth Service TCP inaccessible
2. **Connection refused** : Mauvaise configuration host/port
3. **Timeout** : Auth Service surchargé ou en panne
4. **Message pattern not found** : Commande TCP inexistante

## Migration depuis HTTP

Si vous migrez depuis une version avec endpoints HTTP :

```bash
# 1. Mise à jour des clients frontend
# Utiliser l'API Gateway au lieu de l'Auth Service direct

# Avant
fetch('http://auth-service:4002/auth/login', { ... })

# Après  
fetch('http://api-gateway:4001/api/auth/login', { ... })

# 2. Mise à jour de la configuration réseau
# Fermer le port 4002 de l'Auth Service vers l'extérieur
```

## Roadmap

- [ ] Cache Redis pour la validation de tokens
- [ ] Circuit breaker pour la communication TCP
- [ ] Metrics Prometheus sur l'API Gateway
- [ ] Tracing distribué entre Gateway et Auth Service
- [ ] Auto-scaling de l'Auth Service 