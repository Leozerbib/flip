import { HttpException } from '@nestjs/common';
import { ICustomException } from '../interfaces/exception.interface';

export abstract class BaseException extends HttpException implements ICustomException {
  public readonly statusCode: number;
  public readonly code: string;
  public readonly timestamp: Date;
  public readonly details?: any;
  public readonly path?: string;

  constructor(message: string, statusCode: number, code: string, details?: any, path?: string) {
    super(message, statusCode);
    this.statusCode = statusCode;
    this.code = code;
    this.timestamp = new Date();
    this.details = details;
    this.path = path;
  }

  public toJSON(): ICustomException {
    return {
      message: this.message,
      statusCode: this.getStatus(),
      code: this.code,
      details: this.details,
      timestamp: this.timestamp,
      path: this.path,
    };
  }
}
