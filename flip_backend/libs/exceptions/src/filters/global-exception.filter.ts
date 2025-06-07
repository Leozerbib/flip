import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { BaseException } from '../exceptions/base.exception';
import { IExceptionResponse } from '../interfaces/exception.interface';
import { EXCEPTION_CODES, HTTP_STATUS_CODES } from '../constants/exception.constants';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(GlobalExceptionFilter.name);

  public catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const exceptionResponse = this.buildExceptionResponse(exception, request);

    // Log the exception
    this.logException(exception, request, exceptionResponse);

    response.status(exceptionResponse.statusCode).json(exceptionResponse);
  }

  private buildExceptionResponse(exception: unknown, request: Request): IExceptionResponse {
    const timestamp = new Date().toISOString();
    const path = request.url;

    // Handle custom BaseException
    if (exception instanceof BaseException) {
      return {
        status: 'error',
        message: exception.message,
        code: exception.code,
        statusCode: exception.getStatus(),
        timestamp,
        path,
        details: exception.details,
      };
    }

    // Handle NestJS HttpException
    if (exception instanceof HttpException) {
      const statusCode = exception.getStatus();
      const response = exception.getResponse();

      let message: string;
      let details: any;

      if (typeof response === 'string') {
        message = response;
      } else if (typeof response === 'object' && response !== null) {
        const responseObj = response as any;
        message = responseObj.message ?? responseObj.error ?? 'Erreur HTTP';
        details = responseObj;
      } else {
        message = 'Erreur HTTP';
      }

      return {
        status: 'error',
        message,
        code: this.getHttpExceptionCode(statusCode),
        statusCode,
        timestamp,
        path,
        details,
      };
    }

    // Handle Prisma errors
    if (this.isPrismaError(exception)) {
      return this.handlePrismaError(exception as any, timestamp, path);
    }

    // Handle microservices connection errors
    if (this.isMicroserviceError(exception)) {
      return {
        status: 'error',
        message: 'Service temporairement indisponible',
        code: EXCEPTION_CODES.MICROSERVICE_CONNECTION_ERROR,
        statusCode: HTTP_STATUS_CODES.SERVICE_UNAVAILABLE,
        timestamp,
        path,
        details: { originalError: (exception as Error).message },
      };
    }

    // Handle generic errors
    return {
      status: 'error',
      message: 'Erreur interne du serveur',
      code: EXCEPTION_CODES.INTERNAL_SERVER_ERROR,
      statusCode: HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
      timestamp,
      path,
      details:
        process.env.NODE_ENV === 'development'
          ? {
              originalError: (exception as Error).message,
              stack: (exception as Error).stack,
            }
          : undefined,
    };
  }

  private logException(exception: unknown, request: Request, response: IExceptionResponse) {
    const { method, url, ip, headers } = request;
    const userAgent = headers?.['user-agent'] ?? 'Unknown';

    const logContext = {
      method,
      url,
      ip,
      userAgent,
      statusCode: response.statusCode,
      code: response.code,
      timestamp: response.timestamp,
    };

    if (response.statusCode >= 500) {
      this.logger.error(
        `${method} ${url} - ${response.statusCode} ${response.code}: ${response.message}`,
        (exception as Error).stack,
        logContext
      );
    } else if (response.statusCode >= 400) {
      this.logger.warn(
        `${method} ${url} - ${response.statusCode} ${response.code}: ${response.message}`,
        logContext
      );
    } else {
      this.logger.log(
        `${method} ${url} - ${response.statusCode} ${response.code}: ${response.message}`,
        logContext
      );
    }
  }

  private getHttpExceptionCode(statusCode: number): string {
    const httpStatus = statusCode as HttpStatus;

    switch (httpStatus) {
      case HttpStatus.BAD_REQUEST:
        return 'BAD_REQUEST';
      case HttpStatus.UNAUTHORIZED:
        return EXCEPTION_CODES.AUTH_UNAUTHORIZED;
      case HttpStatus.FORBIDDEN:
        return EXCEPTION_CODES.AUTH_FORBIDDEN;
      case HttpStatus.NOT_FOUND:
        return 'NOT_FOUND';
      case HttpStatus.CONFLICT:
        return 'CONFLICT';
      case HttpStatus.UNPROCESSABLE_ENTITY:
        return EXCEPTION_CODES.VALIDATION_ERROR;
      case HttpStatus.INTERNAL_SERVER_ERROR:
        return EXCEPTION_CODES.INTERNAL_SERVER_ERROR;
      case HttpStatus.SERVICE_UNAVAILABLE:
        return EXCEPTION_CODES.SERVICE_UNAVAILABLE;
      default:
        return 'HTTP_EXCEPTION';
    }
  }

  private isPrismaError(exception: unknown): boolean {
    return Boolean(
      exception &&
        typeof exception === 'object' &&
        'code' in exception &&
        ('clientVersion' in exception || 'meta' in exception)
    );
  }

  private handlePrismaError(exception: any, timestamp: string, path: string): IExceptionResponse {
    const prismaCode = exception.code;

    switch (prismaCode) {
      case 'P1001':
        return {
          status: 'error',
          message: 'Impossible de se connecter à la base de données',
          code: EXCEPTION_CODES.DB_CONNECTION_ERROR,
          statusCode: HTTP_STATUS_CODES.SERVICE_UNAVAILABLE,
          timestamp,
          path,
          details: { prismaCode, clientVersion: exception.clientVersion },
        };

      case 'P2002':
        return {
          status: 'error',
          message: "Violation de contrainte d'unicité",
          code: EXCEPTION_CODES.DB_DUPLICATE_ENTRY,
          statusCode: HTTP_STATUS_CODES.CONFLICT,
          timestamp,
          path,
          details: { prismaCode, target: exception.meta?.target },
        };

      case 'P2025':
        return {
          status: 'error',
          message: 'Enregistrement non trouvé',
          code: EXCEPTION_CODES.DB_RECORD_NOT_FOUND,
          statusCode: HTTP_STATUS_CODES.NOT_FOUND,
          timestamp,
          path,
          details: { prismaCode },
        };

      default:
        return {
          status: 'error',
          message: 'Erreur de base de données',
          code: EXCEPTION_CODES.DB_QUERY_ERROR,
          statusCode: HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
          timestamp,
          path,
          details: { prismaCode, message: exception.message },
        };
    }
  }

  private isMicroserviceError(exception: unknown): boolean {
    return (
      exception &&
      typeof exception === 'object' &&
      'code' in exception &&
      ((exception as any).code === 'ECONNREFUSED' ||
        (exception as any).message?.includes('ECONNREFUSED'))
    );
  }
}
