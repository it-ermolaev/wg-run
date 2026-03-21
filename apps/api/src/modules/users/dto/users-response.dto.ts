import { ApiProperty } from '@nestjs/swagger'

export class UserResponseDto {
  @ApiProperty({ description: 'ID' })
  id: number

  @ApiProperty({ description: 'E-mail', example: 'john@example.com' })
  email: string

  @ApiProperty({ description: 'Имя пользователя', type: String, nullable: true, example: 'John' })
  name: string | null
}
