import { execSync } from 'child_process'

import { Injectable } from '@nestjs/common'

export interface WgInterface {
  privateKey: string
  publicKey: string
  listenPort: number
  fwmark: string | null
}

export interface WgPeer {
  publicKey: string
  presharedKey: string | null
  endpoint: string | null
  allowedIps: string
  latestHandshake: number
  transferRx: number
  transferTx: number
  persistentKeepalive: number | null
  isOnline: boolean
}

export interface WgDump {
  interface: WgInterface
  peers: WgPeer[]
}

const ONLINE_THRESHOLD_SECONDS = 150

@Injectable()
export class AppService {
  private readonly prefix = process.env.NODE_ENV === 'production' ? '' : 'docker exec wg'

  exec(command: string): string {
    const full = this.prefix ? `${this.prefix} ${command}` : command

    return execSync(full).toString().trim()
  }

  getDump(): WgDump {
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
      privateKey: fields[0],
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
      presharedKey: this.nullable(fields[1]),
      endpoint: this.nullable(fields[2]),
      allowedIps: fields[3],
      latestHandshake,
      transferRx: Number(fields[5]),
      transferTx: Number(fields[6]),
      persistentKeepalive: this.nullableNumber(fields[7]),
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
