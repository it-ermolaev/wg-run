import { Module } from '@nestjs/common'

import { WgController } from './wg.controller'
import { WgService } from './wg.service'

@Module({
  controllers: [WgController],
  providers: [WgService],
})
export class WgModule {}
