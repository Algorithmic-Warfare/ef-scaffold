# Sui Move Token Boilerplate

A concise boilerplate for building and testing a minimal fungible `Coin` type on a local Sui network. (Current code purposefully minimal: no custom events, no shared metadata object, and no public `entry` mint wrapper yet.)

## ✨ Features (Current Minimal Scope)
* Simple `admin::my_token` module (file: `packages/contracts/sources/token.move`)
* Defines `MY_TOKEN` coin type + init creating Treasury & Metadata caps (both transferred to publisher)
* Build scripts (standard, isolated, verbose, watch + auto-publish)
* Local validator helpers (`start_sui.sh`, funding script, mprocs orchestration)
* Docker compose option

> Roadmap items like a `TokenInfo` object, events, upgrade pattern, or an entry `mint` function are NOT implemented yet (previous README references removed).

---
## 🚀 TL;DR Local Build & Publish Workflow
```bash
# 1. Install deps
corepack enable   # if not already
yarn install

# 2. Start a local validator (terminal A)
yarn start:sui     # wraps build_scripts/start_sui.sh

# 3. Fund / import account (terminal B)
yarn fund          # imports key (see .env) + faucet funding loop

# 4. Build the Move package
yarn --cwd packages/contracts build

# 5. Publish to localnet (from repo root OR pass '.' if inside package)
# Option (root):
bash packages/contracts/build_scripts/publish_local.sh
# Option (inside contracts directory):
cd packages/contracts
bash build_scripts/publish_local.sh .
```
After publish, `.env.local` (written where you run the script) contains at least:
* `PACKAGE_ID`
* `TREASURY_CAP_ID`

(Any `TOKEN_INFO_ID` entry can be ignored for now; it is a placeholder field not used by current code.)

---
## 🧰 Prerequisites
* Sui CLI (https://docs.sui.io) in `PATH`
* `bash`, `jq`
* `yarn` (Corepack / Node.js)
* Optional: `docker`, `mprocs`, `watchexec`

Install Node dependencies:
```bash
yarn install
yarn prepare   # installs husky hooks
```

---
## 📦 Building the Contracts
Package root: `packages/contracts`.

Standard build:
```bash
yarn --cwd packages/contracts build
```
Runs `build_scripts/build.sh`:
* Normalizes global client config (`fix_client_config.sh`)
* Executes `sui move build --dump-bytecode-as-base64 --ignore-chain`
* Outputs: `build_artifacts.json`, `build_err.log`

Isolated build (temp client config, no `~/.sui` touch):
```bash
bash packages/contracts/build_scripts/build_isolated.sh
```
Verbose build:
```bash
bash packages/contracts/build_scripts/build_verbose.sh
```
Watch build (needs `watchexec`):
```bash
yarn --cwd packages/contracts build:watch
```

---
## 🔁 Auto Publish on Rebuild
```bash
cd packages/contracts
yarn deploy:watch   # watches build_artifacts.json -> build_scripts/deploy_watch.sh
```
`deploy_watch.sh` publishes only if the artifact hash changes. (It expects publish script relative paths, so run it from the package directory.)

---
## 🏗 Starting a Local Network
1. Native CLI:
   ```bash
   yarn start:sui  # RUST_LOG=off,sui_node=info sui start --with-faucet --force-regenesis --epoch-duration-ms 1000
   ```
2. Docker:
   ```bash
   docker compose up --build
   ```
3. `mprocs` orchestration:
   ```bash
   yarn start:local
   ```

---
## 💰 Funding & Accounts
```bash
yarn fund
```
Performs:
1. Imports/updates key alias via `build_scripts/create_and_import_account.sh` (expects `PRIVATE_KEY_FILE` in `.env` to be a real key file path or convertible key; replace placeholder).
2. Ensures `local` env active.
3. Faucet retry loop until balance > 0.

Useful checks:
```bash
sui client addresses
sui client active-address
sui client balance $(sui client active-address)
```

---
## 📤 Publishing (Details)
From repo root (recommended):
```bash
bash packages/contracts/build_scripts/publish_local.sh
```
OR from inside the package:
```bash
cd packages/contracts
bash build_scripts/publish_local.sh .
```
Environment overrides (run from chosen working directory):
```bash
NAME="MyToken" SYMBOL="MTK" DECIMALS=9 INITIAL_SUPPLY=420000 \
  bash packages/contracts/build_scripts/publish_local.sh
```
The script extracts:
* `PACKAGE_ID` via JSON (`.packageId` fallback heuristics)
* `TREASURY_CAP_ID` by grepping publish output for `TreasuryCap`

Writes values into `.env.local` in current working directory.

---
## 🪙 Minting (Current Status)
There is NO exposed `entry` mint function usable directly via `sui client call` yet:
* The module defines `public fun minttt(...)` (non-`entry`, requires a mutable `TreasuryCap<MY_TOKEN>` argument and has a likely typo in its name).
* To support CLI minting you would add something like:
  ```move
  public entry fun mint(treasury_cap: &mut TreasuryCap<MY_TOKEN>, amount: u64, recipient: address, ctx: &mut TxContext) { 
      let c = coin::mint(treasury_cap, amount, ctx); 
      transfer::public_transfer(c, recipient);
  }
  ```
* After adding an `entry` function and rebuilding/publishing, you could call:
  ```bash
  sui client call \
    --package $PACKAGE_ID \
    --module my_token \
    --function mint \
    --args $TREASURY_CAP_ID 1000 0xRECIPIENT \
    --gas-budget 20000000
  ```

Until then, minting can only happen inside tests or a custom transaction block that passes the TreasuryCap as a mutable object (not covered here).

Remove or ignore the existing `mint.sh` script if it references a `token::mint` with `TOKEN_INFO_ID` — that call signature does not match current code.

---
## 🧪 Testing
```bash
cd packages/contracts
yarn test   # runs `sui move test`
```
Existing tests cover initialization + lifecycle (mint/split/join/burn) using internal test-only helpers.

Potential additions:
* Failure cases (burn without cap, invalid split)
* Rename & expose proper `entry` functions and add CLI-level integration tests

---
## 📁 Directory Layout (Relevant)
```
build_scripts/                         # Root helper scripts (start, fund, mint placeholder, etc.)
packages/contracts/                    # Move package root
packages/contracts/sources/token.move  # Current minimal token module
packages/contracts/tests/token_tests.move
packages/contracts/build_scripts/      # Build & publish tooling
mprocs.yaml                            # Dev process orchestration
```

---
## 🛠 Troubleshooting
| Symptom | Likely Cause | Action |
|---------|--------------|--------|
| Publish script fails inside `packages/contracts` | Default path expects root execution | Run from root OR pass `.` argument |
| `TOKEN_INFO_ID` empty in `.env.local` | Placeholder field; no TokenInfo implemented | Ignore; not used |
| Mint script fails (module/function not found) | Script assumes future `token::mint` | Remove or update after adding entry function |
| Faucet loop times out | Local node faucet not ready | Restart node; increase retry/backoff env vars |
| Build warnings about client config | Legacy schema | Script auto-patches; re-run build |

Handy commands:
```bash
sui client package --id $PACKAGE_ID
sui client objects --address $(sui client active-address)
```

---
## 🗺 Future Enhancements (Not Implemented Yet)
* Add `entry` functions (`init`, `mint`, optional `burn`) for CLI calls
* Introduce `TokenInfo` / metadata object & events
* Emit `MintEvent` / `BurnEvent` and upgrade signaling event
* Refine mint script once entry endpoints exist

---
## 📄 License
MIT
