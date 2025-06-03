import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  public async onModuleInit() {
    await this.$connect();
    console.log('✅ Connexion à la base de données PostgreSQL établie (Banque Service)');
  }

  public async onModuleDestroy() {
    await this.$disconnect();
  }
}
