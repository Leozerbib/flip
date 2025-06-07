export interface ICustomException {
  message: string;
  statusCode: number;
  code: string;
  details?: any;
  timestamp?: Date;
  path?: string;
}

export interface IExceptionResponse {
  status: 'error';
  message: string;
  code: string;
  statusCode: number;
  timestamp: string;
  path?: string;
  details?: any;
}

export interface IValidationError {
  field: string;
  value: any;
  constraints: string[];
}

export interface IBusinessError {
  businessCode: string;
  context?: Record<string, any>;
}
