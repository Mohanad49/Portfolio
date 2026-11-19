# Release and recovery record

Production project: the existing Vercel project serving https://myehia.vercel.app.
Deploy the new repository root through that project; do not create a replacement
project or move the hostname to another project.

## Current production: the live stage, v2.0.0, 2026-11-19

Released on 2026-11-19, after a final review of the hosted preview on desktop and
on a phone and an explicit request to release once the hosted checks were green.
PR 6 merged at its verified head, and the merge has the identical source tree.

- Verified head: `5fa08f5573c813780395914ad616c1f81c5aeada`. `verify`, `windows`,
  `Vercel`, and Vercel Preview Comments passed on it (workflow run 44430913255).
- Production merge: `8bbdd838c464b76557e4936c41eeb95c619ad4a6`, at 12:59:39 UTC.
- GitHub Production deployment: `7913797965`, successful at 13:00:13 UTC.
- Immutable URL: https://portfolio-mv2xtlun6-mohanad49s-projects.vercel.app.
- Release tag and record: `qa-portfolio-v2.0.0`.

Recovery points, newest first:

- The version this release replaced, `qa-portfolio-v1.1.0` at
  `21bcd9d55ecd32690bc0b898f5da9c6dc67d111b`, was saved before the merge on the
  locked branch `backup/production-2026-11-19`. Its deployment `7386489155` stays
  in the Vercel project: https://portfolio-phdptz66z-mohanad49s-projects.vercel.app.
- The version before it, `40a24f16ec037658fb13d5509dd1ba59573f480a`, is on the
  locked branch `backup/production-2026-10-27`, with deployment `7280653313`:
  https://portfolio-7zv8t8y73-mohanad49s-projects.vercel.app.
- The original template keeps its recovery tag, described below.

To recover, promote the retained deployment in the same Vercel project; do not
reset or force-push `main`. A locked backup branch can also be checked out
separately to rebuild its version. `main` requires an up-to-date pull request
with successful `verify`, `windows`, and `Vercel` checks, plus resolved
conversations. Administrator enforcement is enabled, force pushes and deletion
are disabled, and both backup branches are locked against updates. No
second-person approval is required for this single-maintainer repository.

The live checks after this release are in [verification](verification.md).

## Cinematic release v1.1.0, 2026-10-28

PR 5 merged as `21bcd9d55ecd32690bc0b898f5da9c6dc67d111b`, and production
deployment `7386489155` succeeded on 2026-10-28 at 13:20:52 UTC. Its complete
record, including the hosted run and the live smoke checks, is the GitHub release
`qa-portfolio-v1.1.0`, which superseded the pre-release hold this file described
until now.

The sections below record earlier launches.

## Original-template recovery point

- Production commit before replacement: 283ac31982d3e77893c8f28d22384e795172737e.
- GitHub deployment: 6580860301, environment Production, state success.
- Immutable deployment URL: https://portfolio-3b2zb9dqi-mohanad49s-projects.vercel.app.
- Original checkout: /Users/yehiaabozid/Coding/Portfolio/Portfolio, unchanged.
- Annotated recovery tag: portfolio-before-qa-redesign, pushed to origin.

The prior deployment stays available. If a launch regression requires recovery,
select that deployment in the existing Vercel project's deployment history and
promote it back to production. A source revert of the release merge is the
recoverable Git alternative; do not reset or force-push main.

## Initial release gates and launch history

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

## 2026-10-23: owner-feedback update

PR 3 updates Blue Ribbon to the owner's confirmed 5,000+ authored cases and
600+ defects driven to resolution, publishes the exact existing updated resume,
labels the graduation project, and curates six frameworks by removing the small
eBay exercise. Its repository remains unchanged and /project/10 permanently
redirects directly to that repository. The matching GitHub profile update is
published in Mohanad49/Mohanad49 as d9b50823bac4901fa9d7ea1a71f7efd42a54fc11.
The original Word and PDF resumes were already current and remain unchanged.

The owner selected stronger lightweight scroll reveals on desktop and mobile.
The existing GSAP implementation now supports both, preserves completed reveals,
and respects live Reduce Motion changes. Hero parallax and the 3D scene retain
their desktop boundaries. Mobile artwork remains a complete static alternative;
this is the chosen rendering policy, not a claim that an iPhone cannot run WebGL.

Independent source review approves the final blobs and independent Impeccable
visual review has disposition ship. Hosted run 39966751784 passes 124 checks,
with twelve inapplicable skips, no failures, no flaky results, and no retries.
All 54 axe scans and fifteen mobile Lighthouse runs meet acceptance. Median
performance is 99 for home and 100 for the other four routes, LCP stays below
1.590 seconds, and CLS stays below 0.018. These are production-build lab results.
Authenticated preview deployment 7280247522 was checked before release.

PR 3 merged at 14:19:59 UTC as 0f5638d898249ee02cbb02c5546d607f5aa8902c.
Its tree exactly matches tested head df538af65df788ac52ba666a8ab08ceeda4a62ce.
Production deployment 7280563239 succeeded at 14:20:19 UTC, with immutable URL
https://portfolio-it7q4fh5n-mohanad49s-projects.vercel.app. The public alias serves
the update. All 23 live HTTP checks and ten applicable desktop/mobile browser
checks pass, including the current PDF digest, descriptive download filename,
updated figures, archive filters, permanent redirects, and visible scroll reveals.
The detailed shared results and retained capture paths are in docs/verification.md.

The immediately previous production deployment remains the rollback point:
7267224653, source 9d676e5aa5ef39035656b4a405eb35a946ba9e04,
https://portfolio-ouub2jk5y-mohanad49s-projects.vercel.app. Promote that retained
deployment in the existing Vercel project if recovery is needed; do not reset or
force-push main. The original template deployment and recovery tag also remain.
The final audit-only commit records this outcome without application changes.
