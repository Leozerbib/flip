import { Injectable } from '@nestjs/common';
import { Request } from 'express';
import {
  InvalidCredentialsException,
  TokenExpiredException,
  InvalidTokenException,
  UnauthorizedException,
  ForbiddenException,
  UserNotFoundException,
  EmailAlreadyExistsException,
  GoogleTokenInvalidException,
} from '../exceptions/auth.exception';
import {
  DatabaseConnectionException,
  DatabaseQueryException,
  RecordNotFoundException,
  DuplicateEntryException,
  ConstraintViolationException,
} from '../exceptions/database.exception';
import {
  BusinessException,
  InsufficientPermissionsException,
  ResourceNotAvailableException,
} from '../exceptions/business.exception';
import {
  ValidationException,
  RequiredFieldException,
  InvalidFormatException,
} from '../exceptions/validation.exception';
import { IValidationError } from '../interfaces/exception.interface';
import { BaseException } from '../exceptions/base.exception';
import { EXCEPTION_CODES, HTTP_STATUS_CODES } from '../constants/exception.constants';

@Injectable()
export class ExceptionThrower {
  private getRequestPath(request?: Request): string | undefined {
    return request?.url || request?.path;
  }

  // Auth exceptions
  throwInvalidCredentials(details?: any, request?: Request): never {
    throw new InvalidCredentialsException(details, this.getRequestPath(request));
  }

  throwTokenExpired(details?: any, request?: Request): never {
    throw new TokenExpiredException(details, this.getRequestPath(request));
  }

  throwInvalidToken(details?: any, request?: Request): never {
    throw new InvalidTokenException(details, this.getRequestPath(request));
  }

  throwUnauthorized(details?: any, request?: Request): never {
    throw new UnauthorizedException(details, this.getRequestPath(request));
  }

  throwForbidden(details?: any, request?: Request): never {
    throw new ForbiddenException(details, this.getRequestPath(request));
  }

  throwUserNotFound(details?: any, request?: Request): never {
    throw new UserNotFoundException(details, this.getRequestPath(request));
  }

  throwEmailAlreadyExists(details?: any, request?: Request): never {
    throw new EmailAlreadyExistsException(details, this.getRequestPath(request));
  }

  throwGoogleTokenInvalid(details?: any, request?: Request): never {
    throw new GoogleTokenInvalidException(details, this.getRequestPath(request));
  }

  // Database exceptions
  throwDatabaseConnection(details?: any, request?: Request): never {
    throw new DatabaseConnectionException(details, this.getRequestPath(request));
  }

  throwDatabaseQuery(details?: any, request?: Request): never {
    throw new DatabaseQueryException(details, this.getRequestPath(request));
  }

  throwRecordNotFound(details?: any, request?: Request): never {
    throw new RecordNotFoundException(details, this.getRequestPath(request));
  }

  throwDuplicateEntry(details?: any, request?: Request): never {
    throw new DuplicateEntryException(details, this.getRequestPath(request));
  }

  throwConstraintViolation(details?: any, request?: Request): never {
    throw new ConstraintViolationException(details, this.getRequestPath(request));
  }

  // Business exceptions
  throwBusinessRule(
    message: string,
    businessCode: string,
    context?: Record<string, any>,
    request?: Request
  ): never {
    throw new BusinessException(
      message,
      businessCode,
      HTTP_STATUS_CODES.BAD_REQUEST,
      context,
      this.getRequestPath(request)
    );
  }

  throwInsufficientPermissions(details?: any, request?: Request): never {
    throw new InsufficientPermissionsException(details, this.getRequestPath(request));
  }

  throwResourceNotAvailable(details?: any, request?: Request): never {
    throw new ResourceNotAvailableException(details, this.getRequestPath(request));
  }

  // Validation exceptions
  throwValidation(message: string, validationErrors: IValidationError[], request?: Request): never {
    throw new ValidationException(message, validationErrors, this.getRequestPath(request));
  }

  throwRequiredField(fieldName: string, request?: Request): never {
    throw new RequiredFieldException(fieldName, this.getRequestPath(request));
  }

  throwInvalidFormat(fieldName: string, expectedFormat: string, request?: Request): never {
    throw new InvalidFormatException(fieldName, expectedFormat, this.getRequestPath(request));
  }

  // Generic exception
  throwGeneric(
    message: string,
    statusCode: number,
    code: string,
    details?: any,
    request?: Request
  ): never {
    class GenericException extends BaseException {}
    throw new GenericException(message, statusCode, code, details, this.getRequestPath(request));
  }

  // Microservice connection error
  throwMicroserviceConnection(serviceName: string, details?: any, request?: Request): never {
    class MicroserviceException extends BaseException {}
    throw new MicroserviceException(
      `Impossible de contacter le service ${serviceName}`,
      HTTP_STATUS_CODES.SERVICE_UNAVAILABLE,
      EXCEPTION_CODES.MICROSERVICE_CONNECTION_ERROR,
      { serviceName, ...details },
      this.getRequestPath(request)
    );
  }

  // Internal server error
  throwInternalError(
    message: string = 'Erreur interne du serveur',
    details?: any,
    request?: Request
  ): never {
    class InternalException extends BaseException {}
    throw new InternalException(
      message,
      HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
      EXCEPTION_CODES.INTERNAL_SERVER_ERROR,
      details,
      this.getRequestPath(request)
    );
  }
}
