# Final security review

Date: 2026-10-27. No reportable source vulnerability was established.
This is a bounded review, not a guarantee that no vulnerability can exist.

## Scope and source identities

Codex Security Standard scan `3031492d-bec2-4434-86ce-124cf16a172f` is complete.
Its authoritative original revision is
`97952b750435f7647cc28af2472d0028e592438a`. The scan retained that identity when
HEAD changed during release preparation. Its final scope also records the parent
review of the application/configuration delta through
`b2043e8aa67953e6e625d5fa203b087abda8b9e8`. The completed report explicitly
preserves that distinction instead of claiming the original snapshot was the
final commit.

After the canonical scan was sealed, the parent separately reviewed `df10725`,
the pinned Playwright CI image and its container-directory ownership correction,
and `17d6260`'s delayed chapter preparation. The final `c9dead3` delta moves
finite-coordinate checkpoints from page exit to link activation and stops
discarded animation contexts without full context style restoration. These changes add no public input,
markup sink, remote target, secret, or deployment permission. Their independent
source verdict is in [technical-review.md](technical-review.md). This later
review does not change the scan's authoritative revision or canonical artifacts.

An independent baseline auditor read the application, tests, support scripts,
and configuration. A separate architecture reviewer mapped real data and
privilege boundaries. The remaining textual records and lockfile were then read;
144 original tracked text files were covered. The parent reviewed the subsequent
source/configuration changes. Twenty-seven raster/PDF assets were excluded from
semantic binary-content review and received only bounded raw credential-pattern
checks. No credential was used, exploit executed, or Firestore service probed.

## Reviewed controls and outcomes

- Astro publishes a static `dist/` build. There is no hosted application API,
  authentication/session system, database mutation, upload, or contact backend.
- URL filters select known values and write status with `textContent`. Legacy
  redirects are fixed mappings. JSON-LD escapes less-than characters before its
  raw script sink. There is no visitor-controlled executable markup path.
- Published contact details, resume, certificates, and CI summaries are intended
  public content. Employer artwork is conceptual. No runtime secret is required.
- The removed `get_projects.py` was an unused legacy Firestore reader with an
  embedded Google/Firebase API-key reference. Its source did not establish a
  privileged credential, permissive database rules, or unauthorized access.
  It was removed as obsolete code; no remote-key validity claim is made.
- The optional renderer has explicit activation, bounded resources, media and
  visibility gates, demand rendering, and cleanup. Browser history checkpoints
  accept finite numeric coordinates for the matching viewport, preserve existing
  object state, change no URL, and cancel pending work on input or traversal.
- Linux and Windows CI use pinned actions, fixed commands, read-only contents
  permission, frozen installation, bounded jobs, and selected artifact paths.
  They do not deploy production or interpolate pull-request text into commands.
- Vercel declares `nosniff`, origin-conscious referrers, same-origin framing,
  and denied camera/microphone/geolocation. Local Astro preview does not claim
  to reproduce platform headers. No repository CSP is declared; that alone did
  not establish a source-supported exploit.

## Dependencies and repository settings

The final production dependency audit reports zero advisories. The complete
development audit retains five upstream advisories: one moderate and four high,
all under Lighthouse CI. Published `body-parser` and `tmp` fixes are pinned.
The remaining package paths and their nonblocking reachability dispositions are
listed in [dependency-review.md](dependency-review.md). They remain visible;
this review does not claim a zero-advisory full development graph.

The parent separately verified repository settings. `main` now requires an
up-to-date pull request, successful Linux/Windows/Vercel checks, and resolved
conversations. Administrator enforcement is enabled, with force pushes and
branch deletion blocked. `backup/production-2026-10-27` is additionally locked
at the existing production revision. These are verified platform settings,
not conclusions inferred from source code.

## Retained workbench record

The local Codex Security workbench retains `report.md`, `scan-manifest.json`,
`findings.json`, `coverage.json`, and `threatmodel.md` under the authoritative
scan directory for this scan ID. The report has 19 reviewed surfaces, no deferred
source work, and the explicit binary exclusions. The report is not edited by hand.

Workbench linked-thread usage returned 45,143,171 total tokens, 44,976,457 input
tokens, and 43,472,128 cached input tokens across six linked threads. This is the
workbench's linked-rollout accounting, not a separate estimate of incremental
audit cost. No monetary estimate is inferred from it.
