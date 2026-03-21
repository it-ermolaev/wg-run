import { ApiProperty } from '@nestjs/swagger'

export class WgInterface {
  @ApiProperty({
    description: 'Публичный ключ сервера',
    example: 'Base64',
  })
  publicKey: string

  @ApiProperty({ description: 'UDP порт', example: 51820 })
  listenPort: number

  @ApiProperty({ description: 'Firewall mark', nullable: true, example: 'off' })
  fwmark: string | null
}

export class WgPeer {
  @ApiProperty({ description: 'Публичный ключ клиента', example: 'Base64' })
  publicKey: string

  @ApiProperty({
    description: 'IP и порт, откуда подключился клиент',
    example: '192.168.0.1:56565',
  })
  endpoint: string

  @ApiProperty({ description: 'Разрешённые IP-адреса в туннеле', example: '10.0.0.2/32' })
  allowedIps: string

  @ApiProperty({ description: 'Unix timestamp последнего handshake', example: 1774000864 })
  latestHandshake: number

  @ApiProperty({ description: 'Байт получено от клиента', example: 20824 })
  transferRx: number

  @ApiProperty({ description: 'Байт отправлено клиенту', example: 2024 })
  transferTx: number

  @ApiProperty({ description: 'Клиент онлайн' })
  isOnline: boolean
}
