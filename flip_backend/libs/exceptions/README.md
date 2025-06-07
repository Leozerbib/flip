# Exceptions Library

A comprehensive exception handling library for the Flip backend application.

## Features

- **Global Exception Filter**: Automatically catches and formats all exceptions
- **Custom Exception Classes**: Pre-defined exceptions for common scenarios
- **Exception Thrower Service**: Convenient methods for throwing exceptions
- **Structured Error Responses**: Consistent error format across the application
- **Automatic Logging**: All exceptions are logged with context

## Usage

### 1. Setup Global Exception Filter

```typescript
import { GlobalExceptionFilter } from '@app/exceptions';

// In your main.ts or module
app.useGlobalFilters(new GlobalExceptionFilter());
```

### 2. Using Exception Thrower

```typescript
import { ExceptionThrower } from '@app/exceptions';

@Injectable()
export class YourService {
  constructor(private readonly thrower: ExceptionThrower) {}

  someMethod() {
    // Throw authentication errors
    this.thrower.throwInvalidCredentials();
    this.thrower.throwUserNotFound();

    // Throw database errors
    this.thrower.throwDatabaseConnection();
    this.thrower.throwRecordNotFound();

    // Throw business rule errors
    this.thrower.throwBusinessRule('Custom message', 'BUSINESS_CODE');
  }
}
```

### 3. Using Custom Exception Classes

```typescript
import { InvalidCredentialsException, DatabaseConnectionException } from '@app/exceptions';

// Direct usage
throw new InvalidCredentialsException({ email: 'user@example.com' });
throw new DatabaseConnectionException({ host: 'localhost', port: 5432 });
```

## Exception Types

### Authentication Exceptions

- `InvalidCredentialsException`
- `TokenExpiredException`
- `InvalidTokenException`
- `UnauthorizedException`
- `ForbiddenException`
- `UserNotFoundException`
- `EmailAlreadyExistsException`
- `GoogleTokenInvalidException`

### Database Exceptions

- `DatabaseConnectionException`
- `DatabaseQueryException`
- `RecordNotFoundException`
- `DuplicateEntryException`
- `ConstraintViolationException`

### Business Logic Exceptions

- `BusinessException`
- `InsufficientPermissionsException`
- `ResourceNotAvailableException`

### Validation Exceptions

- `ValidationException`
- `RequiredFieldException`
- `InvalidFormatException`

## Error Response Format

All exceptions return a consistent format:

```json
{
  "status": "error",
  "message": "Human readable error message",
  "code": "ERROR_CODE_CONSTANT",
  "statusCode": 400,
  "timestamp": "2023-12-01T10:30:00.000Z",
  "path": "/api/endpoint",
  "details": {
    // Additional context specific to the error
  }
}
```

## Integration with Microservices

The filter automatically handles microservice connection errors and Prisma database errors, providing appropriate responses for common failure scenarios.
