# Configuration Google OAuth - Résolution erreur invalid_client

## 🚨 Erreur `invalid_client` - Solutions

### 1. **Vérifier Google Cloud Console**

1. Allez sur [Google Cloud Console](https://console.cloud.google.com/)
2. Sélectionnez votre projet LifeOS
3. **APIs & Services > Credentials**
4. Cliquez sur votre **OAuth 2.0 Client ID**

### 2. **URIs de redirection autorisées**

Dans la configuration de votre OAuth Client, ajoutez **EXACTEMENT** ces URIs :

```
http://localhost:4001/api/auth/google/callback
http://127.0.0.1:4001/api/auth/google/callback
```

### 3. **Origines JavaScript autorisées**

Ajoutez également ces origines :

```
http://localhost:4001
http://127.0.0.1:4001
http://localhost:3000
http://127.0.0.1:3000
```

### 4. **Vérifier les credentials .env**

Vos credentials actuels :
```bash
GOOGLE_CLIENT_ID=922457615656-7jf2ko9kjm3m6qhsh44lu7bocjd81vsq.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=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
GOOGLE_CALLBACK_URL=http://localhost:4001/api/auth/google/callback
```

### 5. **Test de l'URL de redirection**

1. Démarrez l'API Gateway : `npm run start:dev api-gateway`
2. Allez sur : `http://localhost:4001/api/auth/google`
3. L'URL générée doit correspondre à celle configurée dans Google Console

### 6. **Debugging l'URL générée**

Pour voir l'URL exacte générée par Passport, ajoutez ce debug temporaire dans `google.strategy.ts` :

```typescript
constructor(@Inject('AUTH_SERVICE') private readonly authClient: ClientProxy) {
  const options: StrategyOptions = {
    clientID: process.env.GOOGLE_CLIENT_ID!,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    callbackURL: process.env.GOOGLE_CALLBACK_URL ?? 'http://localhost:4001/api/auth/google/callback',
    scope: ['email', 'profile'],
  };
  
  console.log('🔍 Google OAuth Config:', {
    clientID: options.clientID,
    callbackURL: options.callbackURL,
  });
  
  super(options);
}
```

### 7. **Alternatives de configuration**

Si le problème persiste, essayez de créer un **nouveau OAuth Client** dans Google Console :

1. **APIs & Services > Credentials**
2. **Create Credentials > OAuth client ID**
3. **Application type: Web application**
4. **Name: LifeOS Local Development**
5. **Authorized redirect URIs:**
   ```
   http://localhost:4001/api/auth/google/callback
   ```

### 8. **Variables d'environnement obligatoires**

Assurez-vous que ces variables sont définies :

```bash
# Dans .env
GOOGLE_CLIENT_ID=votre-nouveau-client-id
GOOGLE_CLIENT_SECRET=votre-nouveau-client-secret
GOOGLE_CALLBACK_URL=http://localhost:4001/api/auth/google/callback

# Variables pour l'API Gateway
AUTH_SERVICE_HOST=localhost
AUTH_SERVICE_PORT=4002
FRONTEND_URL=http://localhost:3000
```

### 9. **Test complet du flux**

1. **Démarrer Auth Service** : `npm run start:dev auth-service`
2. **Démarrer API Gateway** : `npm run start:dev api-gateway`
3. **Tester l'URL** : `http://localhost:4001/api/auth/google`
4. **Vérifier la redirection** vers Google
5. **Vérifier le callback** : retour sur `/api/auth/google/callback`

### 10. **Erreurs courantes**

- ❌ **Client ID incorrect** : Vérifiez copier/coller exact
- ❌ **Callback URL mismatch** : Doit être identique dans .env et Google Console
- ❌ **Projet Google différent** : Vérifiez que vous êtes dans le bon projet
- ❌ **OAuth Client désactivé** : Vérifiez que le client est actif
- ❌ **Quotas dépassés** : Vérifiez les quotas API dans Google Console

## ✅ Solution rapide

1. **Créez un nouveau OAuth Client dans Google Console**
2. **Mettez à jour le .env avec les nouveaux credentials**
3. **Redémarrez les services**
4. **Testez l'authentification** 