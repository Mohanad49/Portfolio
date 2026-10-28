# Mohanad Yehia | Software QA portfolio

My portfolio brings together production QA experience, test automation, and three
case studies with inspectable evidence. The cinematic opening and scroll sequences
are part of the presentation; the results and limitations remain readable without
JavaScript, WebGL, or animation.

[Live portfolio](https://myehia.vercel.app) · [Current release candidate](https://github.com/Mohanad49/Portfolio/pull/5)

## Selected QA work

- **TestPulse:** QA reporting and flaky-test analysis using exported CI snapshots.
- **Cal.diy:** risk-led testing of the pinned v6.2.0 scheduling application,
  including concurrent booking and documented accessibility failures.
- **LLM evaluation harness:** repeatable model evaluation with measured judge
  limitations. The refusal judge is excluded from CI gates.

Six additional testing frameworks are available in the work archive. Generated
artwork is conceptual, never a substitute for real reports or employer interfaces.

## Run locally

Use Node 24.16 or newer within Node 24, and pnpm 11.17.0. These commands work on
macOS, Linux, and Windows through pnpm's configured shell emulator.

```sh
pnpm install --frozen-lockfile
pnpm dev
```

The stack is Astro, TypeScript, Tailwind CSS, React islands, React Three Fiber,
Three.js, and GSAP. Astro builds static pages from typed local content. There is
no application backend, database, contact-form service, or public runtime API.

## Verify

```sh
pnpm check
pnpm lint
pnpm build
pnpm exec playwright install chromium firefox webkit
pnpm test
pnpm perf
```

The Linux CI suite covers Chromium, Firefox, and WebKit at desktop, tablet, and
mobile sizes. A separate Windows job runs the same applicable behavior checks in
Chrome, Microsoft Edge, and Firefox. Firefox content runs headless; one separate
headed check covers WebGL interaction. The Windows job uses one worker to keep
its desktop session isolated, and each applicable check runs exactly once:

```sh
pnpm exec playwright install firefox chrome msedge
pnpm exec playwright test --config playwright.windows.config.ts
```

Installing branded browsers can replace the existing local Chrome/Edge install;
the dedicated CI job runs on an ephemeral Windows machine. Browser emulation
is not a claim of testing every physical device or corporate browser policy.

The checks cover navigation, filters, downloads, clipboard feedback, keyboard
focus, no-JavaScript content, reduced motion, unavailable WebGL, the optional
scene, axe accessibility scans, and enlarged-text reflow. Tests have no retries.
Lighthouse CI measures each main route three times on a production build. Median
mobile performance must reach 90, LCP must stay below 2.5 seconds, and CLS below
0.1. See [the current verification record](docs/verification.md) for results and
limitations; a successful deployment build alone is not release approval.

## Repository guide

| Path | Purpose |
| --- | --- |
| `src/pages/` | Static routes, metadata, sitemap, and legacy route fallbacks |
| `src/components/` | Page sections, material artwork, and optional 3D study |
| `src/scripts/` | GSAP opening and chapter motion |
| `src/content/case-studies/` | The three evidence-backed project narratives |
| `src/data/` | Profile, employment, framework, and frozen CI records |
| `assets/` | Source artwork and portrait, optimized during the build |
| `public/` | Resume, certificates, font notices, and fixed public files |
| `tests/` | Browser behavior, accessibility, and responsive checks |
| `docs/` | Evidence, visual/source reviews, and release recovery records |
| `.impeccable/` | Approved design references, asset provenance, and design tokens |

[DECISIONS.md](DECISIONS.md) explains my choices. [DESIGN.md](DESIGN.md) describes
the implemented visual system. [Evidence references](docs/evidence.md) separate
verified facts from conceptual artwork. Local captures, test reports, generated
output, and research are ignored rather than committed or publicly served.

## Motion and fallbacks

GSAP owns DOM timelines and scroll progress. React Three Fiber owns the optional
scene and its resources. **Inspect in 3D** explicitly loads that scene on an
eligible desktop; ordinary scrolling does not initialize it. Mobile, reduced
motion, disabled JavaScript, and unavailable WebGL retain the artwork and content.
Fonts are self-hosted, and page-critical styles are included in the HTML.
Later homepage scenes prepare as visitors approach the evidence sequence,
leaving the first paint focused on the opening.

## Release and recovery

`main` is the production branch. `dev/qa-portfolio` holds the reviewed replacement.
The existing Vercel project keeps `myehia.vercel.app`; only `dist/` is published.
`main` requires a pull request, successful checks, and resolved conversations.
Force pushes and deletion are blocked, including for administrators.

The pre-release production source is retained on the locked
[`backup/production-2026-10-27`](https://github.com/Mohanad49/Portfolio/tree/backup/production-2026-10-27)
branch. The corresponding retained Vercel deployment and recovery procedure are
in [docs/release.md](docs/release.md). Production replacement needs my explicit
release decision. Legacy project URLs, section bookmarks, and search verification
remain supported.

## License and credits

The repository retains its existing [MIT license](LICENSE). Dependencies keep
their own licenses, including GSAP's standard license and the SIL Open Font
Licenses for Alexandria and Manrope. Font notices ship in `public/licenses/`.
The source rewrite is original to this QA portfolio; the earlier template and
its history remain in the saved recovery revisions.
