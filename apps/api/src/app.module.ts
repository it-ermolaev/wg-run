import { Module } from '@nestjs/common'

import { DatabaseModule } from '@core/database/database.module'
import { UsersModule } from '@modules/users/users.module'
import { WgModule } from '@modules/wg/wg.module'

@Module({
  imports: [DatabaseModule, UsersModule, WgModule],
})
export class AppModule {}
