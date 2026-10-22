# Independent technical source review

Review date: 2026-10-22.

Initial immutable source: `68a4ab408d7d686ce5dfba907f64b77d65918de8`.
Final approved source: `9355bab6df21a5011b6510316ababfaa625b3cf1`.
Production baseline: `283ac31982d3e77893c8f28d22384e795172737e`.

Scope: correctness, architecture, readability, resource lifecycle, security,
dependency graph, static output, and verification quality. Visual acceptance
belongs to the separate Impeccable review. This review does not approve a release
while objective measurements or hosted validation remain outstanding.

## Final verdict

**Approve.** No unresolved Critical or Required source findings remain. The
initial review requested changes for filter URL persistence and initial fragment
navigation. Commit `92cd582182b821ca14a6fd68ce62b9101e2cf9b7` addresses both,
along with the two Optional findings. The final scene commit was also reviewed
for resource lifecycle and rendering behavior. Its material changes do not add
resource owners; its explicit initial invalidation schedules a bounded render.

The final source has reported type checking across 30 authored files with zero
errors, warnings, or hints, passing ESLint, and a successful 19-page build.
The retained affected matrix reports 16 passed, 12 intentionally inapplicable
desktop-only skips, zero unexpected failures, zero flaky results, and no runner
errors. Its coverage is nine filter/browser/viewport combinations, three legacy
fragment checks, three desktop 3D lifecycle and network-deferral checks, and one
actual Chromium history-cache check. The strengthened history check separately
passed in 6.2 seconds. These results were read from
`.research/affected-matrix.json` and `.research/history-verification.json`.

The preceding full matrix's 113 passing checks remain evidence for unaffected
behavior; its single legacy-fragment failure is addressed and passed in the
affected matrix. This is source approval, not a claim that all release gates
have already completed.

## Findings against the initial source

### Resolved, Required: preserve a user-selected filter when entering through a bookmark

Location: `src/pages/work/index.astro:36-39`, with recovery at lines 42-47.

Open `/work#github-api`, select Mobile, then reload. Before reload the UI shows
one Mobile framework and the URL is `/work?type=Mobile#github-api`. After reload,
the URL becomes `/work#github-api`, All is selected, and seven frameworks appear.
The user-selected filter writes a contradictory URL because it retains a hash
target that the filter hides. This was reproduced in Chromium.

Remedy: when a visitor selects a filter, clear a fragment only when it names a
framework hidden by that filter. Retain initial URL recovery for existing legacy
bookmarks. Verify the selected category, count, and URL across reload.

Resolution: the filter now removes only a fragment naming a newly hidden
framework. All nine engine/viewport combinations passed the reload regression.

### Resolved, Required: do not interrupt initial native fragment navigation

Location: `src/scripts/motion.ts:22`.

The initial motion configuration unconditionally restores the scroll position
captured before constructing its timelines. When native fragment scrolling is
still in progress, that restore can cancel navigation to `/#About` or `/#Contact`
and return the page to the top. The parent observed both paths diagnostically and
the current full browser matrix caught Contact.

Remedy: preserve the scroll position on subsequent media-preference transitions,
without issuing that restore on initial configuration. Recheck initial legacy
fragments and live reduced-motion transitions across the affected browsers.

Resolution: the first configuration no longer restores the captured position;
later preference changes retain that behavior. Initial legacy fragments and live
motion transitions passed in Chromium, Firefox, and WebKit.

### Resolved, Optional: retain motion on back/forward cache restoration

Locations: `src/scripts/motion.ts:26` and `src/pages/index.astro:27`.

Both pagehide handlers remove their media listeners; the motion handler also
reverts its context. A browser back/forward cache restoration resumes the same
document without running its startup scripts again. In full Chromium, after
visiting `/work` and going back, pageshow reported `persisted: true`; the hero
transform was empty and stayed empty after scrolling and a reduced-motion toggle.
This affects enhancement behavior while core content remains usable.

Remedy: retain the context and listeners when pagehide has `persisted: true`,
or explicitly restore them on persisted pageshow. Do not use a once-only listener
that removes itself when a persisted event intentionally skips cleanup. Verify
actual cache restoration, not only a fresh document reached through Back.

Resolution: both cleanup handlers retain state for persisted page transitions
and unregister themselves only on nonpersisted pagehide. The real Chromium
cache-restoration test requires persisted pageshow, a changed transform after
scrolling, and working reduced-motion enable/disable transitions. It passed.

### Resolved, Optional: make the JSON-LD escape perform its stated operation

Location: `src/layouts/BaseLayout.astro:35`.

The replacement string uses a JavaScript Unicode escape that evaluates to `<`,
so the replacement is a no-op. A literal backslash followed by `u003c` is needed
to make less-than characters safe inside the inline script payload. The current
profile is trusted, checked-in data, so this is not a current untrusted-input
exploit. Correct the escape before relying on it as a serialization boundary.

Resolution: the replacement now emits a literal backslash followed by `u003c`.
The exact source correction was reviewed and the final build passed.

## Review evidence

- Read project instructions, product contract, implementation plan, decisions,
  evidence ledger, verification record, and browser tests before source.
- Reviewed the complete authored source, CI/deployment configuration, dependency
  importer graph and integrity records, and old numeric project mappings.
- Core content is generated as static HTML. Case studies and profile data have
  build-time schemas. There is no application API, contact backend, runtime
  ingestion, arbitrary HTML input, or client-side secret requirement.
- The thirteen old project IDs retain the correct destinations. The built output
  contains 19 generated pages and the retained Google verification HTML file.
  A read-only parse resolved all 101 internal links and fragments successfully.
- No source maps, prompt sidecars, AGENTS.md, PRODUCT.md, DECISIONS.md, or
  sources.json were found in the built output. Public assets and module imports
  exclude the development research and design directories.
- InspectionIsland pairs observer, media, and visibility registration with
  cleanup. Deferred import cancellation prevents stale state updates. WebGL
  failure, render failure, and context loss retain the static artwork.
- InspectionCanvas removes its DOM listeners and animation callback, and clears
  the shared invalidation hook only when it still owns it. The installed R3F
  implementation disposes its owned renderer, scene objects, geometries and
  materials; the installed Drei Environment implementation disposes its cube
  render target. The scene uses demand rendering and a bounded pixel ratio.
- The 3D dependency graph is isolated behind a dynamic import. Its size warning
  remains visible. The parent reports passing normal mobile/tablet and all
  reduced-motion network-exclusion assertions in the preceding full matrix.
  The affected matrix also passed absence of the Canvas request at desktop top
  and a single request near the inspection section in all three desktop engines.
- The pinned lockfile uses registry integrity records. The retained production
  audit reports zero advisories. Build/type/lint/peer results are reused from the
  shared verification record instead of rerunning broad checks during review.
- CI uses read-only repository permissions, pinned action commits, frozen
  installation, type/lint/build checks, three browser engines and three viewport
  sizes, no automatic test retries, median mobile performance/LCP/CLS assertions,
  and retained artifacts even when a step fails.
- Tests exercise exact resume bytes, actual filter results, clipboard success and
  denial, initial bookmarks, no-JavaScript content, real image decoding, keyboard
  controls, preference changes, and actual GPU context loss. Automated axe scans
  intentionally enforce zero serious or critical violations; they do not by
  themselves establish every WCAG criterion.

## Objective acceptance remains separate

The final shared record must identify the approved source and consolidate the
full and affected browser evidence. At the time of source approval, the three
mobile Lighthouse runs for each main route were running. Their results, hosted
preview routing/status/headers, and final live smoke checks remain release gates.
External evidence links and professional claims retain their separate factual
verification responsibility. No additional browser process was launched by this
reviewer during the Lighthouse measurement window.
