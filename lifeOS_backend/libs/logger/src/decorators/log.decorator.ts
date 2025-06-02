import { LoggerService } from '../logger.service';

/**
 * Décorateur pour automatiser le logging des méthodes
 * @param message Message personnalisé (optionnel)
 * @param logLevel Niveau de log (par défaut 'info')
 */
export function Log(message?: string, logLevel: 'info' | 'debug' | 'warn' = 'info') {
  return function (target: any, propertyName: string, descriptor: PropertyDescriptor) {
    const method = descriptor.value;

    descriptor.value = async function (...args: any[]) {
      const logger = new LoggerService();
      logger.setContext(target.constructor.name);
      const startTime = Date.now();

      const logMessage = message || `Executing ${propertyName}`;
      logger[logLevel](logMessage, {
        method: propertyName,
        args: args.length > 0 ? 'provided' : 'none',
      });

      try {
        const result = await method.apply(this, args);
        const duration = Date.now() - startTime;

        logger.info(`Completed ${propertyName}`, {
          method: propertyName,
          duration: `${duration}ms`,
          success: true,
        });

        return result;
      } catch (error) {
        const duration = Date.now() - startTime;

        logger.error(`Failed ${propertyName}`, error.stack, {
          method: propertyName,
          duration: `${duration}ms`,
          success: false,
          error: error.message,
        });

        throw error;
      }
    };
  };
}
