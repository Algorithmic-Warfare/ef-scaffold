# Sui Move Contract Local Dev Environment Scaffold

A concise boilerplate for building and testing a `.move` contract system against local network. (Current code purposefully minimal: no custom events, no shared metadata object, and no public `entry` mint wrapper yet.)


_Note: This has only been tested in MacOS & Linux so far_
---

## Installing depedencies and requirements

1. Install the [rust tools](https://rust-lang.org/tools/install/)
```bash
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
```
2. Install [node version manager](https://github.com/nvm-sh/nvm)
```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.3/install.sh | bash
```
### Node dependencies

Before applying the following, run `nvm install 24 && nvm use 24`

3. Install [yarn package manager](https://yarnpkg.com/getting-started/install)
```bash
npm install -g yarn
```
4. Install [mprocs](https://github.com/pvolok/mprocs)
```bash
npm install -g mprocs
```

### Rust dependencies

5. Install the [sui tools manager](https://github.com/MystenLabs/suiup)
```bash
cargo install --git https://github.com/Mystenlabs/suiup.git --locked
```
6. Install the latest [sui tools](https://docs.sui.io/guides/developer/getting-started/sui-install)
```bash
suiup install sui@testnet
```
7. Install [watchexec tool](https://github.com/watchexec/watchexec)
```bash
cargo install --locked watchexec-cli
```


## How to set up local network dev env
1. Install Packages
```bash
yarn
cd packages/contracts && yarn
```

2. Start Local network + fund address from local faucet + build contracts + deploy contracts.
```bash
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
* Rust (https://rust-lang.org/tools/install/)
* Sui CLI (https://docs.sui.io) in `PATH`
* `bash`, `jq`
* nodejs (tested with `v20.19`) && `yarn` (Corepack / Node.js)
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
