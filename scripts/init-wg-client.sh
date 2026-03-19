#!/bin/sh
set -e

WG_DIR=/etc/wireguard

echo "Waiting for server keys..."

while [ ! -f "$WG_DIR/server.pub" ]; do
    sleep 1
done

if ! ip link show wg0 > /dev/null 2>&1; then
    echo "Setting up wg0 interface..."

    ip link add wg0 type wireguard
    wg set wg0 \
        private-key "$WG_DIR/client.key" \
        peer "$(cat "$WG_DIR/server.pub")" \
        endpoint wg:51820 \
        allowed-ips 10.0.0.1/32 \
        persistent-keepalive 5
    ip addr add 10.0.0.2/24 dev wg0
    ip link set wg0 up

    echo "Client ready: 10.0.0.2"
else
    echo "wg0 already exists, skipping"
fi

exec tail -f /dev/null