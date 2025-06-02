import { Injectable } from '@nestjs/common';
import { LoggerService, Log, LogContext } from '../index';

/**
 * Exemple d'utilisation du LoggerService
 * Ce fichier démontre les différentes façons d'utiliser le logger
 */
@Injectable()
export class ExampleService {
  constructor(private readonly logger: LoggerService) {
    // Définir le contexte du service après l'injection
    this.logger.setContext('ExampleService');
  }

  // Exemple d'utilisation basique
  async basicLogging(): Promise<void> {
    this.logger.info('Service démarré');
    this.logger.debug('Mode debug activé');
    this.logger.warn('Ceci est un avertissement');
  }

  // Exemple avec contexte
  async loggingWithContext(userId: string): Promise<void> {
    const context: LogContext = {
      userId,
      operation: 'example_operation',
    };

    this.logger.info('Opération démarrée', context);

    try {
      // Simulation d'une opération
      await this.simulateAsyncOperation();

      this.logger.logBusinessLogic('example_operation', 'success', context);
    } catch (error) {
      this.logger.error('Opération échouée', error.stack, context);
      throw error;
    }
  }

  // Exemple avec le décorateur @Log
  @Log("Exécution de l'opération automatique")
  async automaticLogging(): Promise<string> {
    // Le décorateur va automatiquement logger l'entrée et la sortie
    await this.simulateAsyncOperation();
    return 'Opération terminée avec succès';
  }

  // Exemple de logging de requête de base de données
  async simulateDatabaseQuery(): Promise<void> {
    const startTime = Date.now();

    // Simulation d'une requête
    await new Promise(resolve => setTimeout(resolve, 100));

    const duration = Date.now() - startTime;
    this.logger.logDatabaseQuery('SELECT * FROM users WHERE active = true', duration, {
      table: 'users',
      type: 'SELECT',
    });
  }

  // Exemple de logging d'appel externe
  async simulateExternalServiceCall(): Promise<void> {
    const startTime = Date.now();

    try {
      // Simulation d'un appel externe
      await new Promise(resolve => setTimeout(resolve, 200));

      const duration = Date.now() - startTime;
      this.logger.logExternal('PaymentAPI', 'process_payment', true, duration, {
        amount: 100,
        currency: 'EUR',
      });
    } catch (error) {
      const duration = Date.now() - startTime;
      this.logger.logExternal('PaymentAPI', 'process_payment', false, duration, {
        error: error.message,
      });
    }
  }

  // Méthode utilitaire pour les exemples
  private async simulateAsyncOperation(): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, 50));
  }
}
