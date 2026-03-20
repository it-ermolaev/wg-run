import { Controller, Get } from '@nestjs/common'

import type { User } from '@repo/database'

import { UsersService } from './users.service'

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getUsers(): Promise<User[]> {
    return this.usersService.getUsers()
  }
}
