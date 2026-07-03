# Interactive 3D Portfolio Room

Premium immersive portfolio experience built as a futuristic 3D workspace. The room is the navigation surface: users open portfolio sections by interacting with 3D objects instead of using a traditional navbar.

## Stack

- Next.js 15 App Router
- React 19
- TypeScript
- TailwindCSS v4
- Three.js, React Three Fiber, Drei
- GSAP, Framer Motion
- Zustand
- Lenis
- React Hook Form, Zod
- Lucide React
- ESLint, Prettier, Husky, lint-staged
- Vercel

## Local Development

```bash
pnpm install
pnpm dev
```

Open `http://localhost:3000`.

## Production Checks

```bash
pnpm typecheck
pnpm lint
pnpm format
pnpm assets:validate
pnpm assets:optimize
pnpm build
```

Lighthouse CI is configured with 95+ score gates:

```bash
pnpm build
pnpm audit:lighthouse
```

## Architecture

- `app/` contains App Router entry points, metadata routes, loading/error states, and PWA manifest.
- `src/core/` contains global configuration, constants, providers, and shared domain types.
- `src/components/` contains reusable design-system, layout, animation, experience, and Three.js primitives.
- `src/features/room/` contains the interactive 3D portfolio room, camera system, object interactions, lighting, materials, and scene composition.
- `src/store/` contains Zustand stores split by responsibility.
- `src/lib/` contains reusable utilities for animation, analytics, Three.js, and browser helpers.
- `scripts/` contains asset validation, manifest generation, model optimization, texture compression, and bundle analysis utilities.

## Performance Notes

- The heavy 3D room and portfolio overlay are dynamically imported.
- First-load JS for `/` is kept small by deferring Three.js/R3F modules.
- Quality profiles control DPR, shadows, postprocessing, and texture strategy.
- Model tooling supports Draco compression and KTX2 texture compression.
- Texture tooling converts source raster textures into bounded WebP outputs.
- Runtime error boundaries prevent blank screens during module or WebGL failures.
- PWA service worker caches immutable static assets while keeping navigation network-first.

## Deployment

The project is prepared for Vercel using `vercel.json`.

Required Vercel settings:

- Framework: `Next.js`
- Install command: `pnpm install --frozen-lockfile`
- Build command: `pnpm build`
- Output: handled by Next.js
- Node.js: `>=20.18.0`

Set `NEXT_PUBLIC_SITE_URL` to the production domain before deployment.

## Commit Suggestion

```bash
git add .
git commit -m "chore: audit and harden portfolio production readiness"
```
