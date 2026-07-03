# Future Improvements

## Content

- Replace placeholder portfolio data with real projects, case studies, certificates, and resume assets.
- Add production contact delivery through a server action or route handler.
- Add downloadable resume and validated document asset checks.

## Three.js

- Replace procedural primitives with optimized GLB models after running `pnpm assets:models`.
- Add baked lighting and KTX2 texture variants for lower GPU memory use.
- Add object-level LOD for mobile and low-power devices.

## Performance

- Add automated Lighthouse CI to the GitHub pull request workflow.
- Add bundle analyzer output for pull request review.
- Track Web Vitals and WebGL context failures in production analytics.
- Add device-specific quality persistence so users keep the best stable profile.

## Accessibility

- Add a non-WebGL fallback content mode for browsers without stable WebGL support.
- Add a keyboard-first object interaction map for all room hotspots.
- Add richer panel focus restoration after camera transitions.

## Deployment

- Add preview deployment checks for asset budgets and Lighthouse.
- Add custom domain metadata screenshots and social preview verification.
- Add release notes generation once the project has tagged releases.
