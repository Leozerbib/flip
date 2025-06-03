import { LoggerService } from '../logger.service';

/**
 * Décorateur pour automatiser le logging des méthodes
 * Compatible avec Swagger - ne modifie pas les métadonnées
 * @param message Message personnalisé (optionnel)
 * @param logLevel Niveau de log (par défaut 'info')
 */
export function Log(message?: string, logLevel: 'info' | 'debug' | 'warn' = 'info') {
  return function (target: any, propertyName: string, descriptor: PropertyDescriptor) {
    // Sauvegarder la méthode originale
    const originalMethod = descriptor.value;

    // Créer une nouvelle fonction qui préserve complètement l'original
    function loggedMethod(...args: any[]) {
      const logger = new LoggerService();
      logger.setContext(
        `${String(target.constructor.name).replaceAll('Controller', '').toUpperCase()}.${propertyName}`
      );
      const startTime = Date.now();

      const logMessage = message ?? `Executing ${propertyName}`;
      logger[logLevel](logMessage, {
        method: propertyName,
        args: args.length > 0 ? 'provided' : 'none',
      });

      // Fonction pour gérer le logging après exécution
      const logCompletion = (result: any, error?: any) => {
        const duration = Date.now() - startTime;

        if (error) {
          logger.error(`Failed ${propertyName}`, error.stack, {
            method: propertyName,
            duration: `${duration}ms`,
            success: false,
            error: error.message,
          });
        } else {
          logger.info(`Completed ${propertyName}`, {
            method: propertyName,
            duration: `${duration}ms`,
            success: true,
          });
        }
      };

      try {
        const result = originalMethod.apply(this, args);

        // Gérer les promesses et les valeurs synchrones
        if (result && typeof result.then === 'function') {
          return result
            .then((res: any) => {
              logCompletion(res);
              return res;
            })
            .catch((error: any) => {
              logCompletion(null, error);
              throw error;
            });
        } else {
          logCompletion(result);
          return result;
        }
      } catch (error) {
        logCompletion(null, error);
        throw error;
      }
    }

    // Copier toutes les propriétés importantes de la méthode originale
    Object.defineProperty(loggedMethod, 'name', {
      value: originalMethod.name,
      configurable: true,
    });
    Object.defineProperty(loggedMethod, 'length', {
      value: originalMethod.length,
      configurable: true,
    });

    // CRUCIAL: Copier toutes les métadonnées existantes vers la nouvelle fonction
    if (typeof Reflect !== 'undefined' && Reflect.getMetadataKeys) {
      const metadataKeys = Reflect.getMetadataKeys(originalMethod) || [];
      metadataKeys.forEach(key => {
        const metadata = Reflect.getMetadata(key, originalMethod);
        Reflect.defineMetadata(key, metadata, loggedMethod);
      });
    }

    // Remplacer la méthode dans le descripteur
    descriptor.value = loggedMethod;

    return descriptor;
  };
}
