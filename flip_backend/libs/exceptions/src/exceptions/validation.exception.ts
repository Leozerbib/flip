import { BaseException } from './base.exception';
import { EXCEPTION_CODES, HTTP_STATUS_CODES } from '../constants/exception.constants';
import { IValidationError } from '../interfaces/exception.interface';

export class ValidationException extends BaseException {
  public readonly validationErrors: IValidationError[];

  constructor(message: string, validationErrors: IValidationError[], path?: string) {
    super(
      message,
      HTTP_STATUS_CODES.UNPROCESSABLE_ENTITY,
      EXCEPTION_CODES.VALIDATION_ERROR,
      { validationErrors },
      path
    );
    this.validationErrors = validationErrors;
  }
}

export class RequiredFieldException extends BaseException {
  constructor(fieldName: string, path?: string) {
    super(
      `Le champ '${fieldName}' est requis`,
      HTTP_STATUS_CODES.BAD_REQUEST,
      EXCEPTION_CODES.VALIDATION_REQUIRED_FIELD,
      { fieldName },
      path
    );
  }
}

export class InvalidFormatException extends BaseException {
  constructor(fieldName: string, expectedFormat: string, path?: string) {
    super(
      `Format invalide pour le champ '${fieldName}'. Format attendu: ${expectedFormat}`,
      HTTP_STATUS_CODES.BAD_REQUEST,
      EXCEPTION_CODES.VALIDATION_INVALID_FORMAT,
      { fieldName, expectedFormat },
      path
    );
  }
}
