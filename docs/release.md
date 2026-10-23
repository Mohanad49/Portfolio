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
alone is not acceptance. Both review domains are approved. Hosted acceptance run
39873648429 passed 115 browser checks and all fifteen mobile Lighthouse runs.
The authenticated preview for commit 213871f passed route, metadata, filter/reload,
404, representative legacy-link, and exact-resume checks. No application changes
follow that verified source. The production alias has not been changed yet.

The Vercel configuration pins pnpm 11.17.0 explicitly because an unversioned custom
pnpm install command can select an older build-image binary. Node 24 is pinned by
the package engine range. All application routes are static, with no runtime API,
external font requests, contact-form backend, or application secrets.
