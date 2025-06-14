import { BaseException } from './base.exception';
import { EXCEPTION_CODES, HTTP_STATUS_CODES } from '../constants/exception.constants';

export class BusinessException extends BaseException {
  public readonly businessCode: string;
  public readonly context?: Record<string, any>;

  constructor(
    message: string,
    businessCode: string,
    statusCode: number = HTTP_STATUS_CODES.BAD_REQUEST,
    context?: Record<string, any>,
    path?: string
  ) {
    super(
      message,
      statusCode,
      EXCEPTION_CODES.BUSINESS_RULE_VIOLATION,
      { businessCode, context },
      path
    );
    this.businessCode = businessCode;
    this.context = context;
  }
}

export class InsufficientPermissionsException extends BaseException {
  constructor(details?: any, path?: string) {
    super(
      'Permissions insuffisantes',
      HTTP_STATUS_CODES.FORBIDDEN,
      EXCEPTION_CODES.INSUFFICIENT_PERMISSIONS,
      details,
      path
    );
  }
}

export class ResourceNotAvailableException extends BaseException {
  constructor(details?: any, path?: string) {
    super(
      'Ressource non disponible',
      HTTP_STATUS_CODES.NOT_FOUND,
      EXCEPTION_CODES.RESOURCE_NOT_AVAILABLE,
      details,
      path
    );
  }
}

export class PackNotFoundException extends BaseException {
  constructor(details?: any, path?: string) {
    super(
      'Pack introuvable',
      HTTP_STATUS_CODES.NOT_FOUND,
      EXCEPTION_CODES.APP_PACK_NOT_FOUND,
      details,
      path
    );
  }
}

export class InsufficientQuantityException extends BaseException {
  constructor(details?: any, path?: string) {
    super(
      'Quantité insuffisante',
      HTTP_STATUS_CODES.NOT_FOUND,
      EXCEPTION_CODES.APP_INSUFFICIENT_QUANTITY,
      details,
      path
    );
  }
}

export class PrankNotFoundException extends BaseException {
  constructor(details?: any, path?: string) {
    super(
      'Prank introuvable',
      HTTP_STATUS_CODES.NOT_FOUND,
      EXCEPTION_CODES.APP_PRANK_NOT_FOUND,
      details,
      path
    );
  }
}
