# Sui Move Contract Local Dev Environment Scaffold

A concise boilerplate for building and testing a `.move` contract system against local network. (Current code purposefully minimal: no custom events, no shared metadata object, and no public `entry` mint wrapper yet.)


_Note: This has only been tested in MacOS so far_
---
## How to set up local network dev env
1. Install Packages
```
yarn
cd packages/contracts && yarn
```

2. Start Local network + fund address from local faucet + build contracts + deploy contracts.
```
yarn start:local
```

---
### TL;DR of Local Build & Publish Workflow
```bash
# 1. Install deps
yarn

# 2. Start a local network 
yarn start:local

# 3. Fund / import account
yarn fund          # imports key (see .env) + faucet funding loop

# 4. Build the Move package
yarn --cwd packages/contracts build:watch

# 5. Publish to localnet (from repo root OR pass '.' if inside package)
yarn --cwd packages/contracts deploy:watch

# 6. Run `.move` tests
yarn --cwd packages/contracts test
```
After publish, `.env.local` (written where you run the script) contains at least:
* `PACKAGE_ID`

---
## Prerequisites
* Sui CLI (https://docs.sui.io) in `PATH`
* `bash`, `jq`
* `yarn` (Corepack / Node.js)
* Optional: `docker`, `mprocs`, `watchexec`

Install Node dependencies:
```bash
yarn
cd packages/contracts && yarn
```

---
## Directory Layout (Relevant)
```
build_scripts/                         # Root helper scripts (start, fund, mint placeholder, etc.)
packages/contracts/                    # Move package root
packages/contracts/sources/            # Location for `.move` files
packages/contracts/tests/token_tests.move
packages/contracts/build_scripts/      # Build & publish tooling
mprocs.yaml                            # Dev process orchestration
```
