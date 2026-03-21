import { Controller, Get } from '@nestjs/common'
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger'

import { WgDumpResponseDto } from './dto/wg-dump-response.dto'
import { WgService } from './wg.service'

@ApiTags('WireGuard')
@Controller('wg')
export class WgController {
  constructor(private readonly wgService: WgService) {}

  @Get('dump')
  @ApiOperation({ summary: 'Получить текущее состояние WireGuard' })
  @ApiOkResponse({ description: 'Текущее состояние WireGuard', type: WgDumpResponseDto })
  getDump(): WgDumpResponseDto {
    return this.wgService.getDump()
  }
}
