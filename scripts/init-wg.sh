#!/bin/sh
set -e

WG_DIR=/etc/wireguard

if [ ! -f "$WG_DIR/server.key" ]; then
    echo "Generation server keys..."
    wg genkey | tee "$WG_DIR/server.key" | wg pubkey > "$WG_DIR/server.pub"
fi

if [ ! -f "$WG_DIR/client.key" ]; then
    echo "Generation client keys..."
    wg genkey | tee "$WG_DIR/client.key" | wg pubkey > "$WG_DIR/client.pub"
fi

if ! ip link show wg0 > /dev/null 2>&1; then
    echo "Setting up wg0 interface..."

    ip link add wg0 type wireguard
    wg set wg0 \
        listen-port 51820 \
        private-key "$WG_DIR/server.key" \
        peer "$(cat "$WG_DIR/client.pub")" \
        allowed-ips 10.0.0.2/32
    ip addr add 10.0.0.1/24 dev wg0
    ip link set wg0 up

    echo "Server ready: 10.0.0.1"
else
    echo "wg0 already exists, skipping"
fi

exec tail -f /dev/null