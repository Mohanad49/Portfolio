# Dependency security review

Reviewed on 2026-10-27 and refreshed on 2026-10-28 for the static portfolio
release candidate. Application
versions stay pinned. The installed production dependency graph has no reported
advisories in `pnpm audit --prod --json`. This is a registry advisory check,
not a claim that dependencies cannot contain undiscovered vulnerabilities.

## Applied corrections

Lighthouse CI 0.15.1 is still its published current release. Its development-only
transitive dependencies include older versions. Two compatible corrections are
pinned in `pnpm-workspace.yaml` and the generated lockfile:

- `body-parser` 1.20.8 to 1.20.9 addresses
  [GHSA-27r3-jxmh-p828](https://github.com/advisories/GHSA-27r3-jxmh-p828).
- Older `tmp` versions to 0.2.7 address the symlink/path-validation advisories,
  including the follow-up
  [GHSA-7c78-jf6q-g5cm](https://github.com/advisories/GHSA-7c78-jf6q-g5cm).
  The intermediate 0.2.6 was not accepted as the final fix.

The consumers still use supported CommonJS methods and constant options. The
Node 24 engine meets both packages' requirements. Regenerating the lockfile also
resolved `legacy-javascript` 0.0.3 to 0.0.4 inside Lighthouse's trace engine. Its
narrow regular-expression update was reviewed separately. No application package
was upgraded. Frozen installation and the full Lighthouse run verify this graph.

## Remaining development-tool advisories

The complete audit retains the following upstream advisories. They are not
suppressed or represented as a zero-finding full dependency audit.

| Package | Reported issue | Assessed reachability in this project |
| --- | --- | --- |
| `uuid` 8.3.2 | Buffer bounds in v3/v5/v6 | LHCI calls `uuid.v4()` for local temporary flag filenames, without a caller-provided buffer. The affected APIs are not used. |
| `extract-zip` 2.0.1 | Two archive symlink/path traversal advisories | The collector launches the explicitly installed Playwright Chromium executable. This project does not invoke Puppeteer's browser download/extraction path or accept archives. The advisory lists 2.0.2 as patched, but that version was not published in the configured npm registry at review time. An attempted resolution was rejected and no such override remains. |
| `basic-ftp` 5.3.1 | Directory-listing parser CPU exhaustion | The configured Lighthouse target is the locally served static build. No FTP target or untrusted PAC configuration is supplied. The affected listing parser is not exposed to portfolio visitors. |
| `zod` 3.25.76 | Oversized constrained-collection validation | This copy belongs to Puppeteer's Chromium BiDi implementation. Lighthouse uses its local Chromium CDP connection, and no public request or uploaded document is passed to that parser. Forcing Zod 4 into a Zod 3 consumer is not a compatible patch. |

These packages are development tooling, not shipped browser modules or a hosted
application server. Their reported paths were traced through the installed graph,
LHCI's collector, Lighthouse's `navigation-runner`, and the configured local
collector. The workflow uses fixed commands and targets, read-only repository
permissions, and ephemeral runners. A developer choosing an untrusted remote
target, archive, FTP service, or proxy would change these assumptions.

The remaining advisories are nonblocking for this static deployment under the
reviewed configuration. Keep them visible and reassess when upstream compatible
fixes ship or the collector's inputs change. Do not use blanket major-version
overrides or relax the performance gates to obtain a clean report.

## Retained evidence

Local review evidence is ignored by Git under `.research/final-readiness/`:
`dependency-audit.json`, `dependency-audit-after.json`,
`dependency-audit-production.json`, and `install.log`. The current-source CI
results and browser/performance evidence are recorded in
[verification.md](verification.md).
