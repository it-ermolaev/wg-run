import { Controller, Get } from '@nestjs/common'

import type { WgDump } from './app.service'

import { AppService } from './app.service'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('wg-dump')
  getDump(): WgDump {
    return this.appService.getDump()
  }
}
