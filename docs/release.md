# Release and recovery record

Production project: the existing Vercel project serving https://myehia.vercel.app.
Deploy the new repository root through that project; do not create a replacement
project or move the hostname to another project.

## Retained recovery point

- Production commit before replacement: 283ac31982d3e77893c8f28d22384e795172737e.
- GitHub deployment: 6580860301, environment Production, state success.
- Immutable deployment URL: https://portfolio-3b2zb9dqi-mohanad49s-projects.vercel.app.
- Original checkout: /Users/yehiaabozid/Coding/Portfolio/Portfolio, unchanged.
- Annotated recovery tag: portfolio-before-qa-redesign, pushed to origin.

The prior deployment stays available. If a launch regression requires recovery,
select that deployment in the existing Vercel project's deployment history and
promote it back to production. A source revert of the release merge is the
recoverable Git alternative; do not reset or force-push main.

## Release gates

Read docs/verification.md for the current source and objective results. Release
requires the technical source verdict, the Impeccable visual verdict, all objective
acceptance gates, and validation of the hosted preview. A successful Vercel build
alone is not acceptance. Both review domains are approved. The complete pre-release
head baa1b95 passed hosted run 39874771959 with 115 browser checks and all fifteen
mobile Lighthouse runs. The authenticated preview passed route, metadata,
filter/reload, 404, representative legacy-link, and exact-resume checks.

PR 1 merged as 9f1e9fb7a464c98145e67b7c97617ca66ee56673 on 2026-10-23 at
00:08:44 UTC. Vercel production deployment 7266800739 succeeded and replaced
https://myehia.vercel.app. Its immutable URL is
https://portfolio-2eitcswar-mohanad49s-projects.vercel.app.

The initial live HTTP checks passed. Browser checks found the correct PDF was
downloaded with Vercel's generic filename. PR 2 explicitly sets the descriptive
response filename. Its first hosted run also exposed transient scene startup
during Contact bookmark scrolling. Both narrow corrections are independently
source-approved and preserve the approved compositions and strict assertions.

Final follow-up run 39878256527 passed 115 browser checks, with twelve inapplicable
desktop-only skips and no unexpected failures or flaky results. All fifteen mobile
Lighthouse runs passed; every route has a median performance score of 100, median
LCP is below 1.584 seconds, and median CLS is below 0.018. The authenticated preview
also confirmed the corrected bookmark transit and scene controls.

PR 2 merged as b5c5cb860b42d6048b57e2492c02b113701f7c89 at
2026-10-23 00:36:09 UTC. Its tree matches the verified PR head 398525e exactly.
Production deployment 7267170763 succeeded at 00:36:31 UTC, with immutable URL
https://portfolio-fkptu7pdd-mohanad49s-projects.vercel.app. The public alias serves
this release. All 23 live HTTP checks and eight applicable desktop/mobile browser
checks pass, including exact PDF bytes and the descriptive download filename.

Annotated release tag qa-portfolio-v1.0.0 retains this verified production merge.
The final documentation-only commit records the completed release and changes no
application, assets, tests, build, dependencies, or deployment configuration.
No required release work remains. Future updates use the existing GitHub-to-Vercel
integration and retain the same acceptance contract.

The Vercel configuration pins pnpm 11.17.0 explicitly because an unversioned custom
pnpm install command can select an older build-image binary. Node 24 is pinned by
the package engine range. All application routes are static, with no runtime API,
external font requests, contact-form backend, or application secrets.
