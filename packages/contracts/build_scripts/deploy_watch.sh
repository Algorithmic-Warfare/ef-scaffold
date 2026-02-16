#!/usr/bin/env bash
set -euo pipefail

PUBLISH_SCRIPT="./build_scripts/publish_local.sh"
PKG_DIR="./sources"

echo "[watch] Move source changed, rebuilding..."

# Build Move package
ls 

# Remove previous publication metadata to avoid "must have 0x0 addresses" error
rm -f Pub.localnet.toml

if sui client test-publish --build-env localnet --with-unpublished-dependencies; then
    echo "[watch] Build succeeded"
else
    echo "[watch] Build failed" >&2
    exit 1
fi