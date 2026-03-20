import { Controller, Get } from '@nestjs/common'

import type { WgDump } from './interfaces/wg.interface'

import { WgService } from './wg.service'

@Controller('wg')
export class WgController {
  constructor(private readonly wgService: WgService) {}

  @Get('dump')
  getDump(): WgDump {
    return this.wgService.getDump()
  }
}
