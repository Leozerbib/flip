import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { Request, Response } from 'express';
import { LoggerService } from '../logger.service';
import { throwError } from 'rxjs';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(private readonly logger: LoggerService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const ctx = context.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();

    const { method, url, headers, body } = request;
    const userAgent = headers['user-agent'] || '';
    const contentLength = headers['content-length'] || '0';

    // Générer un ID unique pour cette requête
    const requestId = this.generateRequestId();
    request['requestId'] = requestId;

    // Log de la requête entrante
    this.logger.logRequest(method, url, undefined, requestId);

    const startTime = Date.now();

    return next.handle().pipe(
      tap(data => {
        const duration = Date.now() - startTime;
        this.logger.logResponse(method, url, response.statusCode, duration, undefined, requestId);
      }),
      catchError(error => {
        const duration = Date.now() - startTime;
        this.logger.error(`Request failed: ${method} ${url}`, error.stack, {
          method: 'HTTP_ERROR',
          url,
          statusCode: error.status || 500,
          duration: `${duration}ms`,
          requestId,
          error: error.message,
        });
        return throwError(() => error);
      })
    );
  }

  private generateRequestId(): string {
    return (
      Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
    );
  }
}
