import { Controller, Get } from '@nestjs/common'
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger'

import { UserResponseDto } from './dto/users-response.dto'
import { UsersService } from './users.service'

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @ApiOperation({ summary: 'Получить список пользователей' })
  @ApiOkResponse({ description: 'Список пользователей', type: UserResponseDto })
  getUsers(): Promise<UserResponseDto[]> {
    return this.usersService.getUsers()
  }
}
