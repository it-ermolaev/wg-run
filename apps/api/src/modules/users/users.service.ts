import { Injectable } from '@nestjs/common'

import { DatabaseService } from '@core/database/database.service'

import { UserResponseDto } from './dto/users-response.dto'

@Injectable()
export class UsersService {
  constructor(private readonly databaseService: DatabaseService) {}

  async getUsers(): Promise<UserResponseDto[]> {
    return await this.databaseService.client.user.findMany()
  }
}
