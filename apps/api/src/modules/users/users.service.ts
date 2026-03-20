import { Injectable } from '@nestjs/common'

import { DatabaseService } from '@core/database/database.service'

import type { User } from '@repo/database'

@Injectable()
export class UsersService {
  constructor(private readonly databaseService: DatabaseService) {}

  async getUsers(): Promise<User[]> {
    return await this.databaseService.client.user.findMany()
  }
}
