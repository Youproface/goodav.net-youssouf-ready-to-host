#!/usr/bin/env sh
# Simple helper to load .env (if present) and start PHP built-in server serving public/
# Usage: sh ./scripts/php-server.sh

ENVFILE=".env"
if [ -f "$ENVFILE" ]; then
  # export variables from .env
  set -a
  . "$ENVFILE"
  set +a
fi

cd "$(dirname "$0")/.." || exit 1
cd public || exit 1
PHP_BIND=127.0.0.1
PHP_PORT=8000
printf "Starting PHP server on http://%s:%s/\n" "$PHP_BIND" "$PHP_PORT"
php -S ${PHP_BIND}:${PHP_PORT}
