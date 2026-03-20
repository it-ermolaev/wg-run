import { Injectable, Logger, OnModuleDestroy, OnModuleInit } from '@nestjs/common'
import { prisma, PrismaClient } from '@repo/database'

@Injectable()
export class DatabaseService implements OnModuleInit, OnModuleDestroy {
  readonly client: PrismaClient = prisma as PrismaClient
  private readonly logger = new Logger(DatabaseService.name)

  async onModuleInit() {
    await this.client.$connect()
    this.logger.log('[PrismaClient] Connected to the database')
  }

  async onModuleDestroy() {
    await this.client.$disconnect()
    this.logger.log('[PrismaClient] Disconnected from the database')
  }
}
