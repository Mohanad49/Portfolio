# Release and recovery record

Production project: the existing Vercel project serving https://myehia.vercel.app.
Deploy the new repository root through that project; do not create a replacement
project or move the hostname to another project.

## Retained recovery point

- Production commit before replacement: 283ac31982d3e77893c8f28d22384e795172737e.
- GitHub deployment: 6580860301, environment Production, state success.
- Immutable deployment URL: https://portfolio-3b2zb9dqi-mohanad49s-projects.vercel.app.
- Original checkout: /Users/yehiaabozid/Coding/Portfolio/Portfolio, unchanged.

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
during Contact bookmark scrolling. The narrow activation correction is independently
reviewed and passes the affected local checks. Follow-up hosted verification,
production merge, and final live downloads remain required before closing release.

The Vercel configuration pins pnpm 11.17.0 explicitly because an unversioned custom
pnpm install command can select an older build-image binary. Node 24 is pinned by
the package engine range. All application routes are static, with no runtime API,
external font requests, contact-form backend, or application secrets.
