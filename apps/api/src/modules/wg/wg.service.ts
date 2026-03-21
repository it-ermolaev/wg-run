import { execSync } from 'child_process'

import { Injectable } from '@nestjs/common'

import { ONLINE_THRESHOLD_SECONDS } from './constants/wg.constants'
import { WgDumpResponseDto } from './dto/wg-dump-response.dto'
import { WgInterface, WgPeer } from './interfaces/wg.interface'

@Injectable()
export class WgService {
  private readonly prefix = process.env.NODE_ENV === 'production' ? '' : 'docker exec wg'

  private exec(command: string): string {
    const full = this.prefix ? `${this.prefix} ${command}` : command

    return execSync(full).toString().trim()
  }

  getDump(): WgDumpResponseDto {
    const raw = this.exec('wg show wg0 dump')
    const lines = raw.split('\n')

    const interfaceLine = lines[0].split('\t')
    const peerLines = lines.slice(1)

    return {
      interface: this.parseInterface(interfaceLine),
      peers: peerLines.map(line => this.parsePeer(line.split('\t'))),
    }
  }

  private parseInterface(fields: string[]): WgInterface {
    return {
      publicKey: fields[1],
      listenPort: Number(fields[2]),
      fwmark: this.nullable(fields[3]),
    }
  }

  private parsePeer(fields: string[]): WgPeer {
    const latestHandshake = Number(fields[4])
    const now = Math.floor(Date.now() / 1000)

    return {
      publicKey: fields[0],
      endpoint: fields[2],
      allowedIps: fields[3],
      latestHandshake,
      transferRx: Number(fields[5]),
      transferTx: Number(fields[6]),
      isOnline: latestHandshake > 0 && now - latestHandshake < ONLINE_THRESHOLD_SECONDS,
    }
  }

  private nullable(value: string): string | null {
    return value === '(none)' || value === 'off' ? null : value
  }

  private nullableNumber(value: string): number | null {
    return value === 'off' || value === '(none)' ? null : Number(value)
  }
}
