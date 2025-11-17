# EF Scaffold Client

A minimal React + Vite client scaffold modeled after the `packages/client` folder of the MUD-DApp-Scaffold. This initial version intentionally omits EVM wallet/auth integration (RainbowKit, wagmi, viem, etc.) in preparation for a future migration to Mysten Labs SUI SDK.

## What Was Mirrored
- Directory layout: `src/` with `App.tsx`, `index.tsx`, basic routing, placeholder `lib/` & `utils/`.
- TypeScript configuration (`tsconfig.json`, `tsconfig.node.json`).
- Vite setup (simplified to just React plugin for now).

## What Was Deferred / Omitted
- Wallet & provider components (to be replaced by SUI integration).
- Tailwind, Radix UI, advanced codegen & table systems.
- Node polyfills, SVG transform plugins, and dev tools.

## Next Steps
1. Add Tailwind + design system if needed for parity.
2. Introduce SUI SDK for account management & transaction flow.
3. Restore any complex data sync or codegen features.

## Scripts
- `npm run dev` — start local dev server.
- `npm run build` — production build.
- `npm run preview` — preview build output.
- `npm run typecheck` — TypeScript validation.

## Development
From the repo root (workspaces enabled):
```sh
npm install
npm run dev --workspace=client
```
Or directly inside `packages/client`:
```sh
cd packages/client
npm install
npm run dev
```

## Future SUI Integration Notes
- Replace removed wallet logic with SUI account connect & signer utilities.
- Implement transaction helpers analogous to prior EVM abstractions.
- Consider a `providers/sui/` directory for context providers.
