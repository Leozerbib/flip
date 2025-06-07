import { BaseException } from './base.exception';
import { EXCEPTION_CODES, HTTP_STATUS_CODES } from '../constants/exception.constants';

export class AuthException extends BaseException {
  constructor(message: string, code: string, details?: any, path?: string) {
    super(message, HTTP_STATUS_CODES.UNAUTHORIZED, code, details, path);
  }
}

export class InvalidCredentialsException extends AuthException {
  constructor(details?: any, path?: string) {
    super('Identifiants invalides', EXCEPTION_CODES.AUTH_INVALID_CREDENTIALS, details, path);
  }
}

export class TokenExpiredException extends AuthException {
  constructor(details?: any, path?: string) {
    super('Token expiré', EXCEPTION_CODES.AUTH_TOKEN_EXPIRED, details, path);
  }
}

export class InvalidTokenException extends AuthException {
  constructor(details?: any, path?: string) {
    super('Token invalide', EXCEPTION_CODES.AUTH_TOKEN_INVALID, details, path);
  }
}

export class UnauthorizedException extends AuthException {
  constructor(details?: any, path?: string) {
    super('Non autorisé', EXCEPTION_CODES.AUTH_UNAUTHORIZED, details, path);
  }
}

export class ForbiddenException extends BaseException {
  constructor(details?: any, path?: string) {
    super(
      'Accès interdit',
      HTTP_STATUS_CODES.FORBIDDEN,
      EXCEPTION_CODES.AUTH_FORBIDDEN,
      details,
      path
    );
  }
}

export class UserNotFoundException extends BaseException {
  constructor(details?: any, path?: string) {
    super(
      'Utilisateur introuvable',
      HTTP_STATUS_CODES.NOT_FOUND,
      EXCEPTION_CODES.AUTH_USER_NOT_FOUND,
      details,
      path
    );
  }
}

export class EmailAlreadyExistsException extends BaseException {
  constructor(details?: any, path?: string) {
    super(
      'Cet email est déjà utilisé',
      HTTP_STATUS_CODES.CONFLICT,
      EXCEPTION_CODES.AUTH_EMAIL_ALREADY_EXISTS,
      details,
      path
    );
  }
}

export class GoogleTokenInvalidException extends AuthException {
  constructor(details?: any, path?: string) {
    super('Token Google invalide', EXCEPTION_CODES.AUTH_GOOGLE_TOKEN_INVALID, details, path);
  }
}
