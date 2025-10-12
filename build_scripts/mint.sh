#!/usr/bin/env bash
set -euo pipefail

if [ ! -f .env.local ]; then
  echo ".env.local not found. Run publish_local.sh first" >&2
  exit 1
fi

source .env.local
AMOUNT=${1:-1000}
RECIPIENT=${2:-$(sui client active-address)}

if [ -z "${TOKEN_INFO_ID:-}" ]; then
  echo "TOKEN_INFO_ID missing in .env.local" >&2
  exit 1
fi

echo "Minting $AMOUNT tokens to $RECIPIENT..."
sui client call \
  --package "$PACKAGE_ID" \
  --module token \
  --function mint \
  --args "$RECIPIENT" "$AMOUNT" "$TOKEN_INFO_ID" \
  --gas-budget 20000000

echo "Done"
