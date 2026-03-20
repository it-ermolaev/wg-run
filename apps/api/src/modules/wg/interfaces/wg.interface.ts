export interface WgInterface {
  publicKey: string
  listenPort: number
  fwmark: string | null
}

export interface WgPeer {
  publicKey: string
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
