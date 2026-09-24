#!/usr/bin/env sh

set -eu

cd "$(dirname "$0")"
PORT="${PORT:-4173}"

PORT="$(python3 - "$PORT" <<'PY'
import socket
import sys

for port in range(int(sys.argv[1]), 65536):
	with socket.socket() as connection:
		try:
			connection.bind(("127.0.0.1", port))
		except OSError:
			continue
		print(port)
		break
else:
	raise SystemExit("No available port found.")
PY
)"

printf 'Starting game at http://localhost:%s/\n' "$PORT"
exec python3 -m http.server "$PORT" --directory .