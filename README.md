# Mohanad Yehia: QA portfolio

A static, evidence-led portfolio for production QA, test automation, and test
observability. Built with Astro, TypeScript, Tailwind CSS, React islands,
React Three Fiber, Three.js, and GSAP.

## Local development

Use Node 24.16 or newer within the Node 24 release line and pnpm 11.17.0.

```sh
pnpm install --frozen-lockfile
pnpm dev
```

## Verification

```sh
pnpm check
pnpm lint
pnpm build
pnpm exec playwright install chromium firefox webkit
pnpm test
pnpm perf
```

Playwright covers Chromium, Firefox, and WebKit at desktop, tablet, and mobile
viewport sizes. It exercises navigation, filters, downloads, clipboard feedback,
keyboard focus, no-JavaScript content, reduced motion, unavailable WebGL, the
interactive scene, accessibility, and text reflow. It does not retry failures.

Lighthouse CI runs the production build three times per main route with mobile
emulation. Median performance must reach 90; median LCP must stay below 2.5 seconds
and CLS below 0.1. Reports stay local or in the workflow artifact. The single
current verification record is docs/verification.md.

## Content and evidence

- Profile and experience: src/data/profile.json.
- Three case studies: src/content/case-studies/.
- Framework archive: src/data/frameworks.json.
- Evidence boundaries and pinned sources: docs/evidence.md.
- Current resume: public/resume.pdf.

Content collections validate these records at build time. TestPulse is a static
export of real CI data, Cal.diy targets the pinned v6.2.0 snapshot, and the refusal
judge remains outside CI gates. Generated artwork is conceptual and never serves
as a report capture or employer interface.

## Motion and fallbacks

GSAP owns DOM timelines and scroll progress. React Three Fiber owns scene rendering
and resource lifecycle. A small shared progress object connects them. The scene
loads only for eligible desktop visitors when it approaches the viewport and
renders on demand. Mobile, reduced-motion, no-JavaScript, and unavailable-WebGL
states retain the artwork, content, and links.

## Deployment

Deploy this checkout through the existing Vercel project at https://myehia.vercel.app.
The production build is dist/. Vercel uses the pinned pnpm version and Node 24.
Legacy /project/1 through /project/13 links redirect to their replacement pages.
The original bookmark IDs and search-verification HTML remain available.

See tasks/plan.md for the approved ownership and acceptance contract, DECISIONS.md
for implementation decisions, and docs/release.md for deployment and rollback.
The existing MIT license is retained.
