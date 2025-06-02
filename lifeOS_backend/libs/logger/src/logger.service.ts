import { Injectable, LogLevel } from '@nestjs/common';

export interface LogContext {
  service?: string;
  method?: string;
  userId?: string;
  requestId?: string;
  [key: string]: any;
}

export interface LogEntry {
  level: LogLevel;
  message: string;
  context?: LogContext;
  timestamp: string;
  trace?: string;
}

@Injectable()
export class LoggerService {
  private serviceName = 'Unknown';
  private readonly isProduction: boolean = process.env.NODE_ENV === 'production';

  // Codes couleur ANSI pour le développement
  private readonly colors = {
    reset: '\x1b[0m',
    bright: '\x1b[1m',
    dim: '\x1b[2m',
    red: '\x1b[31m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    magenta: '\x1b[35m',
    cyan: '\x1b[36m',
    white: '\x1b[37m',
    bgRed: '\x1b[41m',
    bgGreen: '\x1b[42m',
    bgYellow: '\x1b[43m',
    bgBlue: '\x1b[44m',
    gray: '\x1b[90m',
  };

  constructor() {
    // Constructeur vide pour l'injection de dépendance NestJS
    // Utilisez setContext() pour définir le nom du service
  }

  public setContext(serviceName: string): void {
    this.serviceName = serviceName;
  }

  private getColorForLevel(level: LogLevel): string {
    if (this.isProduction) {
      return '';
    }

    switch (level) {
      case 'error':
        return this.colors.red;
      case 'warn':
        return this.colors.yellow;
      case 'log':
        return this.colors.blue;
      case 'debug':
        return this.colors.cyan;
      case 'verbose':
        return this.colors.magenta;
      default:
        return this.colors.white;
    }
  }

  private formatMessage(
    level: LogLevel,
    message: string,
    context?: LogContext,
    trace?: string
  ): LogEntry {
    return {
      level,
      message,
      context: {
        service: this.serviceName,
        ...context,
      },
      timestamp: new Date().toISOString(),
      trace,
    };
  }

  private output(logEntry: LogEntry): void {
    const { level, message, context, timestamp, trace } = logEntry;

    if (this.isProduction) {
      // Format JSON pour la production (facilite l'ingestion par des outils de monitoring)
      console.log(JSON.stringify(logEntry));
    } else {
      // Format lisible et coloré pour le développement
      const contextStr = context ? JSON.stringify(context, null, 2) : '';
      const color = this.getColorForLevel(level);
      const reset = this.colors.reset;

      // Timestamp en gris
      const timeStr = `${this.colors.gray}[${timestamp}]${reset}`;

      // Level coloré selon le type
      const levelStr = `${color}[${level.toUpperCase()}]${reset}`;

      // Service en couleur vive
      const serviceStr = `${this.colors.bright}${this.colors.green}[${this.serviceName}]${reset}`;

      // Message principal
      const coloredMessage = `${color}${message}${reset}`;

      console.log(`${timeStr} ${levelStr} ${serviceStr} ${coloredMessage}`);

      if (contextStr && context && Object.keys(context).length > 1) {
        // Context en couleur atténuée
        console.log(`${this.colors.dim}${this.colors.cyan}Context: ${contextStr}${reset}`);
      }

      if (trace) {
        // Trace d'erreur en rouge
        console.log(`${this.colors.red}Trace: ${trace}${reset}`);
      }
    }
  }

  public log(message: string, context?: LogContext): void {
    this.output(this.formatMessage('log', message, context));
  }

  public info(message: string, context?: LogContext): void {
    this.output(this.formatMessage('log', message, context));
  }

  public warn(message: string, context?: LogContext): void {
    this.output(this.formatMessage('warn', message, context));
  }

  public error(message: string, trace?: string, context?: LogContext): void {
    this.output(this.formatMessage('error', message, context, trace));
  }

  public debug(message: string, context?: LogContext): void {
    if (!this.isProduction) {
      this.output(this.formatMessage('debug', message, context));
    }
  }

  public verbose(message: string, context?: LogContext): void {
    if (!this.isProduction) {
      this.output(this.formatMessage('verbose', message, context));
    }
  }

  // Méthodes utilitaires pour différents cas d'usage
  public logRequest(method: string, url: string, userId?: string, requestId?: string): void {
    this.info(`Incoming ${method} request`, {
      method: 'HTTP_REQUEST',
      url,
      userId,
      requestId,
    });
  }

  public logResponse(
    method: string,
    url: string,
    statusCode: number,
    duration: number,
    userId?: string,
    requestId?: string
  ): void {
    this.info(`Response ${method} ${statusCode}`, {
      method: 'HTTP_RESPONSE',
      url,
      statusCode,
      duration: `${duration}ms`,
      userId,
      requestId,
    });
  }

  public logDatabaseQuery(query: string, duration: number, context?: LogContext): void {
    this.debug('Database query executed', {
      method: 'DATABASE_QUERY',
      query,
      duration: `${duration}ms`,
      ...context,
    });
  }

  public logBusinessLogic(action: string, result: string, context?: LogContext): void {
    this.info(`Business logic: ${action}`, {
      method: 'BUSINESS_LOGIC',
      action,
      result,
      ...context,
    });
  }

  public logExternal(
    service: string,
    action: string,
    success: boolean,
    duration?: number,
    context?: LogContext
  ): void {
    const level: LogLevel = success ? 'log' : 'warn';
    const message = `External service ${service}: ${action} ${success ? 'succeeded' : 'failed'}`;

    this.output(
      this.formatMessage(level, message, {
        method: 'EXTERNAL_SERVICE',
        service,
        action,
        success,
        duration: duration ? `${duration}ms` : undefined,
        ...context,
      })
    );
  }
}
