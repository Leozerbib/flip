# Logger Module - LifeOS Backend

Ce module fournit un système de logging global et standardisé pour tous les microservices de LifeOS.

## Installation et Configuration

### 1. Importer le module dans votre application

```typescript
import { LoggerModule } from '@app/logger';

@Module({
  imports: [LoggerModule],
  // ... autres imports
})
export class AppModule {}
```

### 2. Utiliser le service dans vos classes

```typescript
import { LoggerService } from '@app/logger';

@Injectable()
export class UserService {
  constructor(private readonly logger: LoggerService) {
    this.logger.setContext('UserService');
  }

  async createUser(userData: CreateUserDto) {
    this.logger.info('Creating new user', { userData: userData.email });

    try {
      const user = await this.userRepository.save(userData);
      this.logger.logBusinessLogic('user_creation', 'success', { userId: user.id });
      return user;
    } catch (error) {
      this.logger.error('Failed to create user', error.stack, { userData: userData.email });
      throw error;
    }
  }
}
```

## Fonctionnalités

### Niveaux de Log

- `log()` / `info()` - Informations générales
- `warn()` - Avertissements
- `error()` - Erreurs avec trace optionnelle
- `debug()` - Messages de débogage (uniquement en développement)
- `verbose()` - Messages détaillés (uniquement en développement)

### Méthodes Spécialisées

- `logRequest()` - Log des requêtes HTTP entrantes
- `logResponse()` - Log des réponses HTTP
- `logDatabaseQuery()` - Log des requêtes de base de données
- `logBusinessLogic()` - Log de la logique métier
- `logExternal()` - Log des appels vers des services externes

### Utilisation avec le Décorateur @Log

```typescript
import { Log } from '@app/logger';

@Injectable()
export class UserService {
  @Log('Creating user account')
  async createUser(userData: CreateUserDto) {
    // Votre logique ici
    // Le décorateur loggera automatiquement l'entrée, la sortie et les erreurs
  }
}
```

### Intercepteur pour les Requêtes HTTP

```typescript
import { LoggingInterceptor } from '@app/logger';

@Module({
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
  ],
})
export class AppModule {}
```

## Format des Logs

### Développement

```
[2024-01-15T10:30:00.000Z] [INFO] [UserService] Creating new user
Context: {
  "service": "UserService",
  "method": "createUser",
  "userData": "user@example.com"
}
```

### Production

```json
{
  "level": "info",
  "message": "Creating new user",
  "context": {
    "service": "UserService",
    "method": "createUser",
    "userData": "user@example.com"
  },
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

## Contexte et Métadonnées

Vous pouvez ajouter des métadonnées à vos logs :

```typescript
this.logger.info('User operation completed', {
  userId: '123',
  operation: 'update_profile',
  requestId: 'req_456',
  duration: '150ms',
});
```

## Variables d'Environnement

- `NODE_ENV=production` - Active le format JSON pour les logs
- `NODE_ENV=development` - Active le format lisible et les logs debug/verbose

## Bonnes Pratiques

1. **Toujours définir le contexte** : Utilisez `setContext()` dans le constructeur
2. **Logs structurés** : Utilisez des objets pour le contexte plutôt que d'inclure les données dans le message
3. **Niveaux appropriés** :
   - `info` pour les opérations importantes
   - `debug` pour les détails techniques
   - `warn` pour les situations anormales mais non critiques
   - `error` pour les erreurs nécessitant une attention
4. **Inclure les IDs** : Toujours logger les identifiants utilisateur/requête pour faciliter le débogage
5. **Mesurer les performances** : Utilisez les méthodes spécialisées pour tracker les temps d'exécution
