# Deployment Guide

## Target

The production target is Vercel running Next.js 15 with pnpm.

## Prerequisites

- Node.js `>=20.18.0`
- pnpm `>=9.0.0`
- Vercel project connected to the GitHub repository
- Production domain assigned before launch

## Vercel Settings

```text
Framework Preset: Next.js
Install Command: pnpm install --frozen-lockfile
Build Command: pnpm build
Development Command: pnpm dev
Output Directory: Next.js default
```

`vercel.json` pins the same commands for repeatable deployments.

## Required Environment

Set this in Vercel:

```text
NEXT_PUBLIC_SITE_URL=https://your-production-domain.com
NEXT_PUBLIC_SITE_NAME=Interactive 3D Portfolio Room
NEXT_PUBLIC_SITE_CREATOR=Your Name
```

Keep server-only values empty unless the contact API is implemented.

## Pre-Deploy Checklist

```bash
pnpm typecheck
pnpm lint
pnpm format
pnpm assets:validate
pnpm assets:optimize
pnpm build
```

Optional release gate:

```bash
pnpm audit:lighthouse
```

## Runtime Behavior

- Static assets receive immutable cache headers.
- `sw.js` is served with revalidation and registers only in production over HTTPS.
- App Router metadata emits canonical URL, Open Graph, Twitter Cards, robots metadata, manifest, and JSON-LD.
- Error boundaries prevent blank screens for page, client-module, and root-level failures.

## Rollback

Use Vercel's deployment history to promote the last known good deployment. No database migration or external state is currently required.
