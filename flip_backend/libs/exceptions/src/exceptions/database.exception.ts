import { BaseException } from './base.exception';
import { EXCEPTION_CODES, HTTP_STATUS_CODES } from '../constants/exception.constants';

export class DatabaseException extends BaseException {
  constructor(message: string, code: string, details?: any, path?: string) {
    super(message, HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR, code, details, path);
  }
}

export class DatabaseConnectionException extends DatabaseException {
  constructor(details?: any, path?: string) {
    super(
      'Erreur de connexion à la base de données',
      EXCEPTION_CODES.DB_CONNECTION_ERROR,
      details,
      path
    );
  }
}

export class DatabaseQueryException extends DatabaseException {
  constructor(details?: any, path?: string) {
    super(
      "Erreur lors de l'exécution de la requête",
      EXCEPTION_CODES.DB_QUERY_ERROR,
      details,
      path
    );
  }
}

export class RecordNotFoundException extends BaseException {
  constructor(details?: any, path?: string) {
    super(
      'Enregistrement introuvable',
      HTTP_STATUS_CODES.NOT_FOUND,
      EXCEPTION_CODES.DB_RECORD_NOT_FOUND,
      details,
      path
    );
  }
}

export class DuplicateEntryException extends BaseException {
  constructor(details?: any, path?: string) {
    super(
      'Enregistrement déjà existant',
      HTTP_STATUS_CODES.CONFLICT,
      EXCEPTION_CODES.DB_DUPLICATE_ENTRY,
      details,
      path
    );
  }
}

export class ConstraintViolationException extends BaseException {
  constructor(details?: any, path?: string) {
    super(
      'Violation de contrainte de base de données',
      HTTP_STATUS_CODES.BAD_REQUEST,
      EXCEPTION_CODES.DB_CONSTRAINT_VIOLATION,
      details,
      path
    );
  }
}
