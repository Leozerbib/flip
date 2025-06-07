import { Module, Global } from '@nestjs/common';
import { ExceptionThrower } from './throwers/exception.thrower';
import { GlobalExceptionFilter } from './filters/global-exception.filter';

@Global()
@Module({
  providers: [ExceptionThrower, GlobalExceptionFilter],
  exports: [ExceptionThrower, GlobalExceptionFilter],
})
export class ExceptionsModule {}
