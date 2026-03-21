import { ApiProperty } from '@nestjs/swagger'

import { WgInterface, WgPeer } from '../interfaces/wg.interface'

export class WgDumpResponseDto {
  @ApiProperty({ description: 'Wireguard интерфейс', type: () => WgInterface })
  interface: WgInterface

  @ApiProperty({ description: 'Wireguard пиры', type: () => WgPeer, isArray: true })
  peers: WgPeer[]
}
