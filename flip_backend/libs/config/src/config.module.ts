import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { join } from 'path';
import { GlobalConfigService } from './config.service';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [
        join(process.cwd(), '.env'),
        join(process.cwd(), '.env.local'),
        join(process.cwd(), '.env.development'),
      ],
      cache: true,
    }),
  ],
  providers: [GlobalConfigService],
  exports: [GlobalConfigService, ConfigModule],
})
export class GlobalConfigModule {}
