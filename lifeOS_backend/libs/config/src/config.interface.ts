export interface IGlobalConfig {
  // Base de données
  database: {
    url: string;
    user: string;
    password: string;
    host: string;
    port: number;
    name: string;
  };

  // JWT
  jwt: {
    secret: string;
    refreshSecret: string;
    accessExpiresIn: number;
    refreshExpiresIn: number;
  };

  // Google OAuth
  google: {
    clientId: string;
    clientSecret: string;
    callbackUrl: string;
  };

  // Services
  services: {
    authService: {
      host: string;
      port: number;
    };
    userService: {
      host: string;
      port: number;
    };
    bankService: {
      host: string;
      port: number;
    };
    apiGateway: {
      port: number;
    };
  };

  // Application
  app: {
    nodeEnv: string;
    frontendUrl: string;
  };
}
