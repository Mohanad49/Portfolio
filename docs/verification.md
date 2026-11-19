# Verification record

## Release of the live stage, D-029: 2026-11-19

Released on request once the hosted checks were green, after a recheck of the
hosted preview on a phone. On the verified head `5fa08f5`, `verify`, `windows`,
`Vercel`, and Vercel Preview Comments passed (workflow run 44430913255).

Before the merge, the outgoing production source `21bcd9d` (release
`qa-portfolio-v1.1.0`, deployment `7386489155`) was saved on the new locked branch
`backup/production-2026-11-19`. Read back from GitHub, the branch, `main`, the
v1.1.0 tag, and that production deployment all pointed at this commit, and the
branch has the older backup's protection: locked, administrators included, no
force pushes or deletion.

PR 6 merged at 12:59:39 UTC as `8bbdd838c464b76557e4936c41eeb95c619ad4a6`, a merge
commit whose tree equals the verified head's (`2c233b0`). Production deployment
`7913797965` succeeded at 13:00:13 UTC, and the public alias serves it. The tag
`qa-portfolio-v2.0.0` and its GitHub release record the result; recovery is in
[release and recovery](release.md).

Live checks, signed out and uncached, against https://myehia.vercel.app (scripts
and logs in the ignored `.research/release-v2/`):

- HTTP: 78 of 82 built files are byte-identical to a local build of the released
  tree. The four that differ are the AVIF plates on the experience page, with the
  same names and dimensions and a mean pixel difference of 0.79 to 0.89 of 255:
  AVIF encoding differs between Vercel's Linux build and this Mac. The 35 WebP
  images, 14 scripts, and 13 fonts match exactly. All 13 legacy redirects, the
  four security headers, the resume's bytes and download filename, the content
  types, and the custom 404 match. Eight development records return 404, and no
  built file names them.
- Playwright, all 460 registrations against the live site, two workers, zero
  retries: 448 passed and 12 skipped, with no failures or flaky results, in 16.7
  minutes. Chromium passed 156, Firefox 146, and WebKit 146, the same counts as
  the local run; the skips are the four established ones in each family.
- GPU, headless Chromium on this Mac: 17 fresh-page visits to the live homepage
  (desktop 1672x965 at 2x, phone 390x760 at 3x) all reached `stage-live`, the
  phone only after its first input, with no slow-frame events and no page or
  console errors. Desktop rendered at the full 1.75 pixel ratio and the phone at
  the lite 1.5.

Later the same day the commit messages after `21bcd9d` were rewritten to drop
co-author lines. A check of all 16 rewritten commits found identical trees,
authors, committers, and dates; only those lines and the blank lines before them
changed. `main` and `dev/portfolio-v2` were force-pushed once, and `main`'s
protection, lifted for that push, read back identical afterwards. The verified
head is now `654b55d` and the merge `e61bc27`, and the tag `qa-portfolio-v2.0.0`
moved with it. Vercel rebuilt the merge as deployment `7915971518`, and the live
HTTP check gave the same result as above: 78 of 82 files byte-identical, the same
four AVIF plates at the same sizes, and every other check passing.

Still open from the PR: the React chunk that phones load before any input, a
rebuild after resizing a wide window that may not keep the reader's place
(plausible, not reproduced), and the unreproduced Windows Firefox Back to top
failure on `953cfeb`.

## Mobile corrections, D-028: local checkpoint, 2026-11-19

All four hosted checks passed on `b9878db`: `verify`, `windows`, and both Vercel
checks. The owner then reviewed the hosted preview on desktop and a phone,
confirmed D-024, D-025, and the D-023 implementation choices, and reported two
phone problems. Production and `main` are unchanged.

Source identity for the results below: `src` tree
`3c07c3662a09e63b38296948520d22c0f4968399` and `tests` tree
`d986474b492b77713fde2532b282ebd69a5624f0`. Same machine and tools as D-022,
including the Node engine warning.

Measured at 390x844 on `b9878db`, before the change:

- Scrolling down in 8 pixel steps, the four layer notes were fully readable on
  screen for 0, 40, 32, and 592 pixels of scrolling. They shared one place and
  took turns over about 300 pixels.
- On the GPU, with the TestPulse chapter's top edge at 20 and at 0 percent of the
  screen, all three runs were amber. The failed run turned red only at minus 25
  percent, as the runs left the top of the screen. The Cal.diy contenders and the
  LLM prisms also finished their sequences as their objects left the screen.

After:

- Each note is readable for 704 to 712 pixels of scrolling, and its word in the
  sentence lights as it arrives.
- The failed run turns red with the chapter's top edge near 5 percent, with the
  runs in the middle of the screen. The Cal.diy contenders reach the gate and the
  LLM prisms converge while on screen.
- Between the layers and the runs, the object no longer passes behind any notes.
  The before capture also showed it behind the Data note at 45 percent.

Checks:

- `astro check`: 0 errors, 0 warnings, 0 hints. ESLint is clean. The production
  build writes 20 pages.
- New check: on narrow screens the layer notes are a list that stays readable
  while in view. It failed on the previous source in Chromium at mobile size and
  WebKit at tablet size (note 2 shared note 1's place) and passes in all six
  narrow projects.
- Playwright: 460 registrations, two workers, zero retries, one family at a time,
  each started once the one-minute load average was below 4. The five-minute
  average stayed between 5.6 and 7.6 throughout.

| Family | Passed | Skipped | Failed | Flaky | Duration |
| --- | ---: | ---: | ---: | ---: | ---: |
| Chromium | 156 | 4 | 0 | 0 | 4.8 min |
| Firefox | 146 | 4 | 0 | 0 | 4.7 min |
| WebKit | 146 | 4 | 0 | 0 | 5.4 min |

The fourth skip in each family is the new check at desktop size, where the
chapter holds instead.

Mobile Lighthouse, production build, three runs per route, thresholds unchanged:

| Route | Median performance | Median LCP | Median CLS | Median TBT | Accessibility |
| --- | ---: | ---: | ---: | ---: | ---: |
| / | 97 | 1.885s | 0 | 176 ms | 100 |
| /work/ | 99 | 2.015s | 0.0006 | 9 ms | 100 |
| /work/testpulse/ | 99 | 2.010s | 0 | 17 ms | 100 |
| /work/caldiy/ | 99 | 1.972s | 0 | 15 ms | 100 |
| /work/llm-evaluation/ | 99 | 1.970s | 0 | 21 ms | 100 |
| /experience/ | 98 | 2.278s | 0 | 15 ms | 100 |

The homepage's blocking time is higher than in the D-026 run (98 ms) and its
score lower (99). Narrow layouts now set up a few more scroll triggers, which may
account for part of it; that was not isolated. Both stay well inside the gate.
These are lab measurements on a busy machine, not field data.

### Failures retained rather than relabeled

- The first version made the notes a list but left the object's path between the
  layers and the runs as it was. The list is taller, so the object slid behind the
  API and Data notes for about a third of a screen. It now shrinks away and grows
  back in the runs' window.
- The first full matrix of this change failed "scroll reveals become fully
  readable and respect live motion preferences" in Chromium at tablet and mobile
  sizes. After reduced motion was switched on mid-visit, the four plain words of
  the layers sentence stayed at 45 percent opacity: each had two tweens, a dim
  setting and a reveal, and undoing both left the dim value. Each now has one tween
  from its dim state. That run was stopped before Firefox and WebKit finished, and
  the table above is from the rerun on the corrected build.

### Known and not done

- Hosted CI has not run this change; pushing it to PR 6 starts it.
- The finish reviewer has not reviewed the phone changes.

Evidence: `.research/d028/` (probe scripts, logs, and captures) and
`.impeccable/review/mobile-d028/phone-before-after.png`.

## Hosted checks on the D-026 commits, D-027, and a check fixed: 2026-11-17

Workflow run 44171388141 on `953cfeb`. The Linux `verify` job passed check,
lint, build, and the browser matrix, and was in its mobile gate when the next
head replaced it. The `windows` job failed 2 of its 154 checks (149 passed, 3
skipped, no retries):

- Chrome: the Cal.diy contention figure kept a losing bar at 36 pixels, above the
  30.5 the end of the scrub requires, for 8 seconds after a scripted scroll to the
  end of the chapter's pin.
- Firefox: after Back to top in a 700 pixel tall window, the scroll position
  reached the top, but the screen still showed the closing section 8 seconds
  later.

In both, the smooth-scroll layer did not follow a scripted scroll. The homepage
code in this run is identical to `5d40d40`, whose Windows job passed every check,
and the D-026 commit changed only the reading pages. Both stay recorded as
failures. The next head reruns them; a repeat would be treated as a defect in the
homepage's smooth scrolling, not as noise.

D-027 keeps the TestPulse tiles at their approved tilt. No source changed.

Workflow run 44174681315 on `9e96743`, which changed only records: `windows`
passed every check, so neither Windows failure repeated there. `verify` failed one
of its 451 checks: the same contention check, in WebKit at desktop size, read 17.4
pixels at 40 percent of the chapter and 36 at its end.

The cause was in the check, not the page. Both failure screenshots show the
figure's correct end state: the winner lit and the losers at 40 percent of the
row, 36 pixels. The check took its comparison height right after a scripted
scroll, while smoothed scrolling was still passing through the figure's growth.
Sampled every 20 ms after the same scroll on this Mac, the bar reads 0 for about
400 ms, passes through 50.8 pixels in Chromium (53.1 in WebKit, 73.4 in Firefox)
for one or two samples, and settles at 90. The Windows Chrome failure implies a
comparison height of exactly 50.8. The check now waits for scrolling to come to
rest before each reading, and passed 45 of 45 runs: five in each of the nine
browser and size projects. No page code changed.

The Firefox Back to top failure on Windows did not repeat and was not reproduced
locally. It stays recorded as a failure.

## Reading-page plates from the live stage, D-026: local checkpoint, 2026-11-17

`dev/portfolio-v2` is pushed and open as draft PR 6 against `main`. Its first
hosted run, on `5d40d40`, passed `verify` and `windows` (workflow run
44146945690), and Vercel built a preview deployment. Production and `main` are
unchanged. This section covers the commit after that run; earlier sections are
kept as written.

Source identity for the results below: `src` tree
`692177b7932dd2746a6da7f57fca0967f9bb0239`, `assets` tree
`589741ef399ca508fed1acd04dcf97bce01b949a`, and the unchanged `tests` tree
`e5c82983506fc25c73c87542f84983c21616b117`. Same machine and tools as D-022,
including the Node engine warning.

- `astro check`: 0 errors, 0 warnings, 0 hints. ESLint is clean. The production
  build writes 20 pages.
- Playwright: 451 registrations, two workers, zero retries, one family at a time,
  each started once the one-minute load average was below 4.

| Family | Passed | Skipped | Failed | Flaky | Duration |
| --- | ---: | ---: | ---: | ---: | ---: |
| Chromium | 154 | 3 | 0 | 0 | 4.1 min |
| Firefox | 144 | 3 | 0 | 0 | 4.8 min |
| WebKit | 144 | 3 | 0 | 0 | 5.8 min |

Mobile Lighthouse, production build, three runs per route, thresholds unchanged.
The plate is now the largest paint on every reading page:

| Route | Median performance | Median LCP | Median CLS | Median TBT | Accessibility | Largest paint |
| --- | ---: | ---: | ---: | ---: | ---: | --- |
| / | 99 | 1.884s | 0 | 98 ms | 100 | hero headline |
| /work/ | 99 | 2.024s | 0.0006 | 17 ms | 100 | archive plate |
| /work/testpulse/ | 99 | 2.021s | 0 | 23 ms | 100 | case plate |
| /work/caldiy/ | 99 | 2.016s | 0 | 20 ms | 100 | case plate |
| /work/llm-evaluation/ | 99 | 2.034s | 0 | 31 ms | 100 | case plate |
| /experience/ | 98 | 2.219s | 0 | 21 ms | 100 | passage plate |

The gate started with the five-minute load average near 5, just after the
matrix. These are lab measurements, not field data.

Served plate weight at 1024 pixels wide: archive 56 KB, Cal.diy 46 KB, LLM 57 KB,
and 72 KB for TestPulse's single plate. The plates they replace, re-encoded the
same way, were 75 KB, 143 KB, 83 KB, and 54 plus 44 KB for TestPulse's two.

The stills come from twelve captures of the four project stations, one fresh page
each, at 1440x900 and device scale 2 in headless Chromium on this Mac's GPU. In
every capture the stage was live at full quality (canvas 2520x1575) with no
slow-renderer event. The owner compared the chosen four with the plates they
replace, swapped in the browser only, at desktop and phone sizes, and chose all
four. The built pages were captured again at both sizes. They match those
previews in pose, framing, and size; the final cut, described below, also removed
contour lines from the glass and lightened the files.

### Failures retained rather than relabeled

- The first cut gave each pixel only the least opacity that reproduces it over
  the stage's backdrop. Where glass matched the backdrop's colour it turned
  transparent, so the page showed through the object as dark contour lines, and
  the stage's dither survived as a faint grain around each object.
- That cut also kept each object's shading in its opacity: 128 to 208 KB per
  plate at 1024 pixels, heavier than the plates being replaced. Making the body
  of each object solid moved the shading into colour. Neither version was
  committed.
- Re-grounding every pixel from the stage's backdrop onto the page colour was
  tried and discarded. Bloom raised the backdrop estimate under bright objects,
  and they came out dark and blue.

### Known and not done

- Hosted CI has not run this commit yet; pushing it to PR 6 starts it.
- The finish reviewer has not re-scored its material item; the owner decided it.
- `DESIGN.md` already describes reading pages as carrying "a still plate of the
  object" and was not regenerated.
- Still with the owner: TestPulse tile thickness, and whether D-024, D-025, and
  the D-023 implementation choices stand.

Evidence: `.impeccable/review/rasters/` (raw captures, cut checks, comparisons,
and the built pages) and `.research/d026/` (matrix and Lighthouse logs). The
capture and cut scripts are in `.research/d022-feedback/probes/`.

## Staged chapters, performance, and two review rounds, D-024 and D-025: local checkpoint, 2026-11-17

Production, `main`, and the remote are unchanged. This work is committed on the
local branch `dev/portfolio-v2` and has not been pushed, so no hosted run has
seen it. Sections below this one describe earlier trees and are kept as written.

Source identity for every result in this section: `src` tree
`d61d9c3f4e0d9da57eca39bdf513b117f312ffb0` and `tests` tree
`e5c82983506fc25c73c87542f84983c21616b117`. Same machine and tools as D-022,
including the Node engine warning.

- `astro check` across 59 files: 0 errors, 0 warnings, 0 hints. ESLint is clean.
  The production build writes 20 pages; the renderer chunk's size warning stays.
- Playwright: 451 registrations, two workers, zero retries, one family at a
  time, each started only once the machine's load average was below 4.

| Family | Registered | Passed | Skipped | Failed | Flaky | Duration |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| Chromium | 157 | 154 | 3 | 0 | 0 | 3.8 min |
| Firefox | 147 | 144 | 3 | 0 | 0 | 4.3 min |
| WebKit | 147 | 144 | 3 | 0 | 0 | 4.9 min |

The nine skips are the same two applicability rules as before. New checks since
D-023 cover:

- Back to top, the name, and the navigation at window heights of 1000 and 700
  pixels, including where keyboard focus lands.
- Experience and Approach staged, with their text never left waiting unseen.
- Every case-study heading readable when its slot sits where text below it is
  already in view.
- The quality governor's rules, including the doubling recovery and masked
  renderer names.
- Phones getting no opening curtain and loading no renderer before the first
  input.

Mobile Lighthouse, production build, three runs per route, thresholds unchanged:

| Route | Median performance | Median LCP | Median CLS | Median TBT | Accessibility |
| --- | ---: | ---: | ---: | ---: | ---: |
| / | 98 | 1.955s | 0 | 116 ms | 100 |
| /work/ | 99 | 2.012s | 0.0006 | 6 ms | 100 |
| /work/testpulse/ | 99 | 2.118s | 0 | 13 ms | 100 |
| /work/caldiy/ | 98 | 2.254s | 0 | 10 ms | 100 |
| /work/llm-evaluation/ | 99 | 2.104s | 0 | 18 ms | 100 |
| /experience/ | 98 | 2.234s | 0 | 12 ms | 100 |

This gate failed after D-022 put a renderer on phones (homepage performance 62,
4.1 seconds of blocked main thread). It was brought back without relaxing any
threshold; D-025 lists what that changed for visitors. These are lab
measurements, not field data.

On this Mac's GPU (Intel UHD Graphics 630, headless Chromium):

- **Scrolling to the bottom and back:** six different ways in a row, the object
  was live at the top every time and after a 15 second rest, with no
  slow-renderer event.
- **Phone at 390x844:** before the first input there was no canvas and no
  renderer request. After a key press the stage was live and the still had
  faded.
- **Resizing:** a live stage stayed live from wide to narrow and back.
- **Injected stalls:** a 4.5 second burst of 350 ms frames after the stage had
  run well left it live. 400 ms frames from the start handed it back after 2.7
  seconds, and it returned by itself with no reload.

### Reviews

An independent, read-only technical review of the new source reported twelve
findings and two below its cut. Fixed:

- A live stage switched itself off when the window crossed 1024 pixels.
- Navigation left keyboard focus on the link instead of the chapter.
- A handed-back stage came back on any media change.
- The governor counted a hidden tab's gap as a slow frame, a display capped at
  30 Hz could never return to full quality, and masked renderer names were taken
  for hardware.
- A late rebuild could be cancelled by its own observer.
- Arriving with a hash disabled saving the reading position.
- Reduced motion switched on mid-opening could leave the headline hidden.
- A malformed hash threw an error.
- Cmd-click and Ctrl-click on in-page links were captured.
- A renderer chunk that failed to load left neither stage nor still.
- A scroll by script counted as the first input on phones.
- Stale comments.

Still open: a rebuild after resizing or zooming a wide window may not keep the
reader's place. The reviewer rated it plausible; it was not reproduced or
changed.

The Impeccable finish review ran two rounds, the most its process allows before
the table goes to the owner. Its final disposition is **fix**, because three
items wait on the owner:

| Item | Verdict | Note |
| --- | --- | --- |
| 1. Contract record | Partial | The brief now states how the direction was set; needs the owner's confirmation, including the delegated D-024. |
| 2. One material across pages | Unresolved | Sub-page rasters are mirror chrome; the stage is amber glass on black. Owner's decision. |
| 3. Phone stage | Resolved | Matching still, clean lens and edges, stacked TestPulse runs, no empty archive tail. |
| 4. TestPulse on wide screens | Partial | Runs now sit over their columns; tile thickness is open (tilting washed out the amber). |
| 5. Archive lettering | Resolved | Faint solid letters, no inner contours. |
| 6. LLM chapter | Resolved | The track never shows less than 82 percent; prisms clear of the title and edge. |
| 7. Case-study reading | Resolved | About 69 characters a line; no heading waits above readable text. |
| 8. Facts | Resolved | Atos dates and the email match the resume. |

The reviewer's last capture showed the final Blue Ribbon figure line on a phone
half drawn, because on narrow screens it was tied to the scroll position. After
the verdict the figures were changed to play once when they arrive on narrow
screens; `.impeccable/review/d024c/phone-experience.png` shows them complete.
The reviewer has not re-scored that change.

`DESIGN.md` and its sidecar were regenerated from the built source by the
Impeccable documenter. The design hook's remaining notes are literal values the
document records as one-offs, such as the buttons' tones; none was suppressed.

### Failures retained rather than relabeled

- After the performance work, the archive filter test failed in Firefox at
  desktop and tablet sizes. The radios were 1 pixel inputs and Firefox reported
  the fieldset intercepting the click. Each radio now covers its whole label.
- The first version of the heading test passed on the broken build, because it
  placed headings by a position that included their entrance offset. It now
  places them by layout and was shown failing with the old reveal and passing
  with the fix in Chromium, Firefox, and WebKit.
- While showing that, `git stash` on two files that also held earlier
  uncommitted work reverted too much: the build failed, emptied `dist/`, and the
  preview served 404s until it was rebuilt. No source was lost.
- A governor test expected one unannounced 2 second gap to lower quality. The
  rules need two long frames in a row, so the test was corrected, not the rules.
- The first full matrix of the second review round ran on an overloaded machine:
  load average 19, 3.5 of 5 GB of swap in use, and Spotlight indexing. Chromium
  took 45 minutes and 11 tests timed out, on page loads over 20 seconds and a
  one-second heading reveal still under way after 5. None failed on content. The
  run was stopped; the table above comes from the rerun.
- The mobile gate took six runs to pass, kept as `perf.log` to `perf6.log`.
  The homepage went from 62 to 95 to 100, and two case studies went from just
  over the 2.5 second paint limit to under it.

### Known and not done

- On phones the React chunk, about 67 KB over the network, loads after the first
  paint even before any input. The bundler placed a runtime helper the homepage
  script needs inside it. The renderer itself, three.js, waits for the first
  input. Fixing this means changing the bundler's chunking; it is left for a
  follow-up.
- The Windows configuration now points at the current renderer test but has not
  been run on Windows. Hosted CI has not run this source.

Evidence: `.research/d022-feedback/` (logs, result summaries, probe output, and
the probe scripts in `probes/`) and the captures in `.impeccable/review/d024`,
`d024b`, and `d024c`.

## Owner review corrections, D-023: local checkpoint, 2026-11-17

The owner reviewed the local preview, kept the direction, and asked for five
corrections (D-023). This section covers the corrected working tree. It is still
uncommitted on `dev/portfolio-v2` over `21bcd9d`, nothing is pushed or deployed,
and the owner has not reviewed the corrections yet. The D-022 section below
describes the tree before them and is kept as it was written.

Source identity: `src` tree `904fb3d45376167ef942d9318d643adcae6d103d` and
`tests` tree `54cd27385a79c324afa314b3763de0d3071b1af6`. Same machine and tool
versions as D-022, including the Node engine warning.

- `astro check` across 65 files: 0 errors, 0 warnings, 0 hints. ESLint is clean.
  The production build writes 20 pages.
- Playwright: 414 registrations, two workers, zero retries, one family at a time.

| Family | Registered | Passed | Skipped | Failed | Flaky | Duration |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| Chromium | 144 | 141 | 3 | 0 | 0 | 3.0 min |
| Firefox | 135 | 132 | 3 | 0 | 0 | 3.5 min |
| WebKit | 135 | 132 | 3 | 0 | 0 | 4.1 min |

The nine skips are the same two applicability rules as before. The count rose
from 390 because of two new checks per project and six rule checks that run
once, on desktop Chromium. One existing check was replaced:

- `governor.spec.ts`: the renderer's quality rules as a pure module. It replays
  the reported sequence (a dozen frames of 270 to 470 ms after the stage has run
  well) and requires that the stage is never ended by it.
- "scrolling back up restores every chapter to the state it had on the way
  down": nine stops down the page, then the same stops in reverse, comparing the
  opacity and focus state of everything the scroll choreographs.
- "the archive, case studies, and not-found page share the homepage chrome,
  voice, and closing": computed title, serif voice, brand, closing, and ground
  compared with the homepage on five routes, the navigation targets, and no
  light field of real size on any of them.
- "experience and approach stay in the graphite theme with the chapter type
  scale" replaces the retired check that the chrome turned to ink over the paper
  and amber chapters. It also covers the two roles now listed.

### The disappearing objects

The owner's report was reproduced on this Mac's GPU before any change. In three
runs that scrolled to the bottom and back six different ways, one stayed live
throughout, one lost the stage at the bottom during a fast flick and showed no
objects on the way up, and one lost it 4.6 seconds after it became ready, with
long frames throughout that run. In each loss the renderer's own slow-device
rule fired and kept the still until reload.

Two changes followed. A renderer that has already run well is now only stepped
down by a stall and returns to full quality when the frame rate recovers. And
when a hardware renderer is handed back for slowness, the page offers it the
stage again after twelve seconds, at most twice in a visit. Software rendering
is not retried, so the path the browser matrix exercises is unchanged.

Checked on the GPU with stalls injected into a small, cheap canvas, so the rules
were tested and not the GPU's capacity:

- After seven seconds at rest, 4.5 seconds of 350 ms frames: the stage stayed
  live, and stayed live through a jump to the bottom and back to the top.
- 400 ms frames from the first frame for 14 seconds: handed back after 2.7
  seconds, live again at 16.1 seconds with no reload.

On the final build the six-way probe ran twice more. All twelve trips to the
bottom and back ended with the stage live and the object drawn at the top, no
slow-renderer event fired, and the two runs had one and zero frames over 250 ms.
The machine was quieter for these two runs than for the ones described next.

The first rerun of the six-way probe, with only the first change in place, came
out worse than the baseline: two of three runs lost the stage in their first
pass. The machine was busy at the time. The process list showed the window
server, a browser, and two other applications each using 15 to 60 percent of a
core, and those two runs had 69 and 33 frames over 250 ms in about 17 seconds.
A renderer that slow from its first frames is never treated as proven, so the
first change could not help it. That is what led to the second change. It also
means these probe runs measure this machine under load and are not a clean
before-and-after comparison.

### Failures retained rather than relabeled

- First Chromium run on the corrected tree: 136 passed, 5 failed. All five were
  two of the new checks being too blunt, not the pages. One counted the 2 px
  amber rules as light surfaces; it now ignores painted areas under 20,000
  square pixels. The other required chapter titles to be under three quarters of
  the hero size, which does not hold on narrow layouts where the hero is itself
  small; it now compares them with the other chapter titles at the same
  viewport. That run's log was overwritten by the rerun, so only this summary of
  it remains.
- The hidden embedded browser pane was not used for any reading here.

### Not done

Unchanged from D-022: the mobile Lighthouse gate, hosted Linux CI, native
Windows browsers, the Impeccable finish review and `DESIGN.md`, and a technical
source review. The design hook still lists the new type sizes and tones as
outside `DESIGN.md`. The retired homepage components and the old layout that
only `/experience` uses are still in the repository.

## Live stage homepage, D-022: local checkpoint, 2026-11-17

Production and `main` are unchanged. The new homepage exists only as an
uncommitted working tree on the local branch `dev/portfolio-v2`, on top of
`21bcd9d55ecd32690bc0b898f5da9c6dc67d111b`. Nothing has been pushed or deployed,
and the owner has not reviewed it yet. This checkpoint is local evidence for that
review. It is not a release-readiness claim, and the D-021 record below remains
the current record for `main`.

Source identity for every result in this section: `src` tree
`cba1e5d2dfcbd19286b4af822321fbf2e7ccd6e3` and `tests` tree
`a03cde9b22b1689488f845ab70ce9f3ee6990e9c`. If the work is committed unchanged,
`git rev-parse HEAD:src` and `git rev-parse HEAD:tests` return the same values.

Environment: macOS 15.7.9, Node v24.6.0, pnpm 11.17.0, Playwright 1.64.1. The
repository requires Node `>=24.16.0 <25`, so pnpm prints an engine warning on
every command here. Hosted CI has not run this source on the required version.

- `astro check` across 62 files: 0 errors, 0 warnings, 0 hints. ESLint is clean.
- The production build writes 20 pages. Vite's 500 kB chunk warning for the
  deferred renderer is still present, and its threshold was not raised.
- Playwright: 390 registrations against one `astro preview` server, two workers,
  zero retries, one browser family at a time.

| Family | Registered | Passed | Skipped | Failed | Flaky | Duration |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| Chromium | 132 | 129 | 3 | 0 | 0 | 2.8 min |
| Firefox | 129 | 126 | 3 | 0 | 0 | 3.5 min |
| WebKit | 129 | 126 | 3 | 0 | 0 | 4.5 min |

Each family runs at 1440x1000, 834x1112, and 390x844. The nine skips are the two
applicability rules written into the suite: the compact-menu check does not apply
to desktop layouts (three), and static redirect compatibility is checked once per
browser, on desktop (six). `history.spec.ts` runs on desktop Chromium only, as
before. Logs and per-check summaries are in `.research/d022-local/`.

### What the matrix covers and what it does not

Headless browsers render WebGL in software. Every document check therefore blocks
the renderer chunk and exercises the real "renderer unavailable" path, where the
page keeps its still. One check per project starts the real renderer, and under
software rendering it is normally judged too slow and handed back to the still.
The matrix covers the document, navigation, bookmarks, the reduced-motion,
no-JavaScript, and no-WebGL2 paths, the axe checks, 320px reflow, and that
starting and then losing the renderer leaves a working page. It does not show
that the stage stays live, and it says nothing about how the stage looks.

A scratch probe outside the suite ran the built page in Playwright's Chromium 156
on this Mac's GPU (Intel UHD Graphics 630 through Metal) at 1440x900 with a device
pixel ratio of 2. Three runs with no other copy of the page open:

- The stage stayed live in all three through ten seconds at rest, a pointer sweep
  across the object, and a full scroll down and back. No slow-renderer event
  fired and there were no page errors.
- On the hero the page held 28 frames a second at rest and 27 while the lens was
  in use, at full quality on a 2520x1575 canvas. That is above the 20 frames a
  second at which the renderer lowers its quality, and well short of 60.
- Frame gaps longer than 250 ms: one of 883 ms during startup in one run, none
  in the second, and two of 267 ms while scrolling in the third.

This is one integrated GPU in a headless browser. It is not a visible window, a
discrete GPU, or a phone. A phone-size emulation on the same desktop GPU also
stayed live, which is not evidence about phone hardware. Two captures from the
probe, `gpu-desktop-headless-dpr2-end.png` and `gpu-phone-hero.png`, show the
object and the lens rendering; they are not a visual review.

Not run for this checkpoint: the mobile Lighthouse gate, hosted Linux CI, native
Windows browsers, the Impeccable finish review and design documentation, and a
technical source review. `tasks/todo.md` schedules them after the owner's review.
D-022 puts a renderer on phones for the first time, so the mobile performance
gate is the largest unmeasured risk in this checkpoint.

The Impeccable detector reports no anti-pattern in the stage sources. It lists 65
design-record differences that are expected until `DESIGN.md` is updated: 53 type
sizes, 11 tones, and the Bodoni Moda face.

### Open findings for the owner's review

- On this integrated GPU the hero runs at about 28 frames a second at full
  quality. The renderer only steps down below 20, so a machine like this one
  keeps multisampling and bloom at a frame rate that is visibly short of smooth.
  Whether to step down earlier is a visual and performance choice, not yet made.
- Two consecutive frames longer than 250 ms lower the quality, and two more end
  the stage until the page is loaded again. In one probe run, with a second copy
  of the page open on the same GPU, six frames of 267 to 467 ms near the end of
  the page did exactly that and the page fell back to its still. The fallback
  worked as written. Whether a brief stall should end the stage for the rest of
  the visit is an open question.
- With the renderer blocked, the same scroll produced no frame gap over 250 ms in
  two runs, so the long frames come from the renderer, not the document.

### Failures retained rather than relabeled

The session of 2026-11-11 ended abruptly during its final runs. Its logs were in
a temporary folder that no longer exists, so no result from that session is
counted above. Its last three failures are listed here from the session
transcript, with the change that followed each one:

- Chromium desktop, `portfolio.spec.ts`, scroll reveals: the first profile fact
  stayed at opacity 0 after a motion-preference rebuild. `main.ts` now refreshes
  ScrollTrigger at the end of a rebuild. That alone did not clear the check. The
  `bring()` test helper now aims again until the element has arrived, because the
  page height can still be settling after a rebuild.
- Chromium tablet, `journey.spec.ts`, first navigation: `#work` was not in the
  viewport after 12 seconds. Narrow layouts never pin, and they no longer ask for
  a rebuild when the viewport changes.
- Chromium desktop, `stage.spec.ts`, real renderer: the page did not reach
  `is-ready` within 15 seconds under software rendering. `world.ts` now compiles
  its programs with `compileAsync` before the first frame. This check's readiness
  wait is now 45 seconds inside a 120 second limit. It is the only check that
  runs software WebGL.

The homepage checks were rewritten for the new opening, so their limits are not
comparable line by line with D-021. One like-for-like bound did move: the opening
handoff must end within 4.5 seconds where the retired opening had 2.5, because the
handoff now waits up to 2.8 seconds for the stage.

Found and corrected on 2026-11-17:

- The first Chromium run passed 128 checks with four skips. Three skips were
  expected. The fourth was the real-renderer check on desktop skipping itself
  with the reason "no WebGL2 context" although the context exists. It read the
  page's `no-stage` state, which is also set when a renderer starts and is handed
  back, so the skip hid the scroll check in exactly the case it was written for.
  A repeat confirmed it: one of two desktop runs skipped. The check now asks the
  browser for WebGL2 directly, then passed nine of nine targeted runs and all
  three family runs with no extra skip. The earlier log is retained as
  `chromium-before-skip-correction.log`.

Probe readings that were discarded, not counted:

- The app's embedded browser pane was hidden. Frames stopped advancing and the
  canvas never left its default size, so nothing seen there is evidence.
- The first GPU probe took a full-page capture while the desktop stage was live,
  and that stage was handed back straight afterwards. The capture stalled the
  frames it was meant to observe. Later probes capture only after the state is
  recorded. The phone-size run in the same probe is the one cited above.
- Five probe runs took place while that hidden pane still held a second copy of
  the page on the same GPU. Four stayed live and one was handed back; that one is
  the second open finding above. Four further runs had a malformed pixel-ratio
  argument and were discarded outright.

## Final pre-production review, D-021, 2026-10-28

Production is unchanged. The replacement remains on `dev/qa-portfolio` in
[draft PR 5](https://github.com/Mohanad49/Portfolio/pull/5). The locked branch
`backup/production-2026-10-27` retains production commit
`40a24f16ec037658fb13d5509dd1ba59573f480a`, together with its retained Vercel
deployment. No merge, production promotion, or hostname change is authorized.

Current application and verification source is
`c9dead34c01761c1806609cf5057c6a60cd4837a`. This includes the final page-exit
correction and its regression. Configuration follow-up `1202397` assigns Firefox
content checks to its default headless profile and retains the existing WebGL
check in a separate headed profile. All 105 Windows family/title pairs remain
present exactly once. `dd0bf4b` explicitly sets Mozilla's active-page automation
preference in the native Windows Firefox profiles, retaining every existing
assertion and time limit. The accepted active-page composition, assets,
copy, and timelines remain identical to `17d6260`; only discarded-document
cleanup and checkpoint timing changed afterward. The final documentation-only
revision preserves that application, dependency, build, and verification
configuration. Required current-head checks remain visible in the PR and are
enforced before merge.

[Full workflow 40689061389](https://github.com/Mohanad49/Portfolio/actions/runs/40689061389)
passes at `dd0bf4b73c40703e2057e8062243c4685e31b913`.
Frozen installation, type checking across 43 files, ESLint, and the twenty-page
production build pass. The optional renderer's existing chunk-size warning is
retained; the scene is explicitly requested and does not block the first paint.

- Linux: 318 registrations, 306 passes, 12 established applicability skips, zero
  unexpected failures, flaky results, retries, or runner errors. Chromium,
  Firefox, and WebKit run at desktop, tablet, and mobile sizes. The skips retain
  the desktop renderer and once-per-engine legacy-redirect scope.
- Windows: all 105 applicable checks pass, with zero skips, failures, flaky
  results, retries, or runner errors. Chrome and Edge pass 35 checks each;
  Firefox's complementary profiles pass 34 content checks and the one headed
  renderer check. Real context teardown now completes in both profiles.
- Normal/reduced-motion portfolio axe checks pass with zero serious or critical
  findings. The external Cal.diy project's two recorded findings remain visible.
- All eighteen production-build mobile Lighthouse measurements pass the original
  three-run median gates. Every measurement has accessibility score 100.

| Route | Runs | Median performance | Median LCP | Median CLS | Accessibility |
| --- | ---: | ---: | ---: | ---: | ---: |
| / | 3 | 99 | 2.041s | 0.000000 | 100 |
| /work/ | 3 | 100 | 1.805s | 0.000000 | 100 |
| /work/testpulse/ | 3 | 98 | 2.349s | 0.000000 | 100 |
| /work/caldiy/ | 3 | 98 | 2.408s | 0.000000 | 100 |
| /work/llm-evaluation/ | 3 | 99 | 1.957s | 0.000000 | 100 |
| /experience/ | 3 | 98 | 2.256s | 0.000000 | 100 |

The exact reports are retained locally under `.research/final-readiness/ci-dd0/`
and in that workflow's Linux and Windows artifacts. The final documentation-only
head changes none of the verified application, assets, dependency graph, tests,
build configuration, or CI configuration. Its required checks must also finish
successfully before release. This record does not authorize a deployment.


### What changed during readiness review

- Added actual Windows CI coverage in stable Chrome, Edge, and Firefox. pnpm's
  shell emulator supports the existing scripts without another runtime package.
- Kept first-paint styles in the HTML and preloaded the two self-hosted fonts.
  Mobile opening cutouts prefer AVIF with retained WebP fallbacks; desktop
  artwork, source rasters, copy, layout, and motion timelines are unchanged.
- Deferred later homepage motion until its evidence sequence approaches within
  1.5 viewport heights. This also handles direct fragments and fast/restored
  scroll positions. Temporary listeners and frames are disposed on exit. It
  does not add a minimum loader delay, replace native scrolling, or detect tests.
- Preserved fresh legacy bookmarks and native reading positions through layout
  setup. Checkpoints save after scrolling and before link navigation, without
  writing history during page exit. Discarded pages stop their animation contexts
  without full context style restoration; cached pages retain their existing state. Reload/Back checkpoint validation and stale-traversal cancellation keep
  the original strict assertions. Reduced motion and static content stay complete.
- Patched published compatible Lighthouse-tool dependencies. Production audit has
  zero advisories; the complete development audit retains one moderate and four
  high advisories. Their actual configured reachability is documented in
  [dependency review](dependency-review.md), without suppression or unsafe major
  version overrides. The advisory results were refreshed on 2026-10-28.

The final exit/history regression passes all 21 registrations, including real
reload/Back checks and an explicit no-history-write-on-exit assertion.
The focused chapter checks pass all 36 registrations across the nine engine/size
configurations. The remaining live-preference regression passes all nine after
activating the demand-loaded scenes. Neither has retries, skips, or failures.
The affected initial-bookmark/reflow/module-order checks previously passed 21
registrations with six established desktop-scope skips. These are supporting
checks, not additional counts to add to the complete CI matrix.

The three focused production-build homepage measurements at the final runtime
have performance scores 96, 97, 97 and LCP values 2411.866, 2369.969, 2357.832 ms.
Median performance is 97, median LCP 2.370 seconds, and CLS is zero. The complete
CI measurements above own acceptance for all routes.

### Independent reviews and hosted preview

[Technical source review](technical-review.md) approves the reviewed correctness,
architecture, maintainability, compatibility, and resource-handling scope without
unresolved blocking findings. The sealed
[security review](security-review.md) reports no established source vulnerability,
retains its original revision and binary exclusions, and distinguishes the later
parent-reviewed changes. It is not a guarantee against undiscovered issues.

The independent [visual verdict](experience/final-readiness-visual-review.md)
returns `ship`. It inspected 22 desktop/mobile captures covering all routes and
normal-motion homepage states, followed by eight refreshed affected states at
`17d6260`. Complete gate, prism, and fan silhouettes, readable QA descriptions,
quiet case prose, and the accepted opening remain intact. The
[design record](experience/final-readiness-design-record.md) preserves the
canonical tokens and previews while recording these functional changes.

The exact-runtime hosted preview is
[deployment 7379690577](https://portfolio-exudh3l8r-mohanad49s-projects.vercel.app),
verified successful in the Preview environment. Actual browser inspection at
1440x1000 and 390x844 confirms the desktop About bookmark, mobile opening, single
TestPulse arrival with the hero hidden, Cal.diy case navigation, complete material
junction, retained red results, and no captured browser errors. Earlier unchanged
archive filter/reload and case-table-of-contents checks retain their scope.
The hosted resume has the descriptive filename and SHA-256
`683ede439d00f58b2323c78629635ea674558fee1f5e1cce9d7132d7ae47735d`,
identical to the checked-in PDF. The documentation-only preview receives a final
smoke check without downloading that unchanged asset again.

This is automated engine coverage, actual Windows CI execution, viewport-based
hosted inspection, and independent still-image review. It does not certify every
physical iPhone or Windows GPU, corporate browser policy, assistive technology,
network condition, continuous animation frame rate, or intermediate visual pose.
The owner's separate desktop/mobile acceptance remains retained context.

### Repository, safeguards, and cleanup

- `main` requires an up-to-date PR, resolved conversations, and `verify`,
  `windows`, and `Vercel` checks bound to their verified GitHub Actions/Vercel apps.
  Administrator enforcement is enabled, with force pushes and deletion blocked.
  The production backup is additionally locked at the saved commit. Zero required
  approvals avoids requiring an unavailable second maintainer; it does not remove
  the PR or objective-check requirements.
- The branch is renamed locally and remotely to `dev/qa-portfolio`. GitHub closed
  PR 4 during that rename; PR 5 preserves its link and source history and stays
  draft and unmerged. Production still serves the prior deployment.
- About, homepage, topics, the QA-focused README, and the existing MIT license
  were checked. Font notices and dependency-specific licenses remain retained.
  `DECISIONS.md` is rewritten in the owner's first-person voice.
- Removed only the unused legacy Firestore reader, duplicate root verification
  file, and seven unreferenced certificate copies. The served verification file,
  active credential assets, original portrait path, exact resume, thirteen legacy
  project redirects, section bookmarks, and historical recovery records remain.
- Generated output, test reports, captures, research, and `.env` variants are
  ignored. No new runtime secret, backend, public API, or deployment project exists.

### Failures retained rather than relabeled

The earlier D-020 application passed run 40251633738. Its subsequent document-only
head's run 40256504364 crossed the homepage LCP limit, demonstrating why an older
green result was not accepted as current proof. Later intermediate runs remain
in `.research/final-readiness/` with their exact source identities:

- `40465817776`: Windows 99 passes; Linux had a Firefox mobile evidence-bookmark
  failure. The final initial-bookmark correction and history work address it.
- `40573869429`: Windows 105 passes; Linux 304 passes, 12 skips, and one WebKit
  desktop About-bookmark failure, addressed by first-layout landmark preservation.
- `40579225055`: Windows 105 passes; Linux 204 passes, eight skips, and 105 Firefox
  launch failures from container-home ownership. Nonrecursive ownership alignment
  fixed the ephemeral directory without overriding `HOME` or adding privileges.
- `40649828524`: superseded and cancelled, not a completed acceptance run.
- `40650647916`: Linux 296 passes, 12 skips, and nine instances of one reveal
  fixture expecting eager chapter setup. The fixture now approaches the evidence
  before its unchanged visibility and live-preference assertions.
- `40651798704`: Linux 305 passes, 12 skips, and all eighteen Lighthouse gates
  passed. Windows had 103 passes and two overlapping Firefox failures, one during
  context shutdown and one stalled scroll animation. Their traces remain
  retained. The Windows config now isolates headed sessions with one worker, as
  recommended in [Playwright CI guidance](https://playwright.dev/docs/ci#workers).
  Serialization is a diagnostic correction; the final complete run supplies its
  result. No timeout was increased or failed assertion removed.
- `40654781949`: Linux passed again. Windows had 104 passes and one filter-test
  context-shutdown failure despite serial execution. Its trace retained the
  page-exit history call and GSAP style restoration. The final correction moves
  checkpoints before link activation, disposes their listeners before cleanup,
  and kills discarded-document animation contexts without reverting styles.
  Live resize/preference reconfiguration still reverts normally. The corrected
  regression explicitly checks one pre-navigation save and zero exit-time saves.
- `40669413721`: Linux passed the complete current application and performance
  gates. Windows had 104 passes and a teardown-only failure after the static
  reduced-motion assertions passed. That page does not load the GSAP modules;
  the source lifecycle correction is not represented as fixing the driver hang.
  Firefox content now uses the standard headless profile, with its one existing
  WebGL interaction check isolated in a headed profile. Registration comparison
  proves no check was removed or duplicated, and no assertion or timeout changed.
- `40673557328`: the documentation-only repeat retained passing Linux checks,
  but Windows had 103 passes and two Firefox timing failures. One chapter was
  still waiting for setup; another reveal approached its final transform without
  completing within the original eight seconds. The traces were retained rather
  than relabeled flaky. The native Windows Firefox profiles now explicitly set
  `layout.testing.top-level-always-active`, Mozilla's
  [automation preference for refresh-driver scheduling](https://raw.githubusercontent.com/mozilla-firefox/firefox/main/modules/libpref/init/StaticPrefList.yaml).
  Installed Playwright already uses that preference in its Firefox BiDi defaults;
  these projects use the native Juggler path, so it is supplied explicitly.
  No site animation, test timeout, selector, assertion, or retry policy changed.
- The first local 18-measurement final run had homepage median LCP 2664.831 ms.
  A batched-layout-read experiment still failed at 2728.978 ms and was removed.
  The real deferred-preparation correction then passed the three measurements
  above. Earlier failed measurements and traces are retained as failed evidence.

No assertion threshold was relaxed. The final successful results do not relabel
these failures as flaky or convert cancelled runs into completed checks.

## Historical verification records

The records below retain their original source, date, and release scope. Their
use of "current" refers to those earlier checkpoints.

## Owner feedback refinement, D-020: current verification, 2026-10-26

The owner approved the gate, paired prisms, and fan material family. The working
application resolves the three clipped junctions, identifies each QA project,
adds finite project choreography, and makes the separate WebGL study opt-in.
The accepted opening retains its normal composition. First desktop preparation
is bounded at 1600ms, yields to interaction, skips repeat/history/reduced-motion
paths, and never waits for the optional 3D study.

Current application and verification source:
abe295742909c1f1a3110daf404d2f5d19b66523. Local evidence:

- Type checking across 41 files, ESLint, and the twenty-page build pass.
  The existing optional-renderer chunk warning remains visible.
- The affected Chromium desktop/mobile run has 46 passes, two established
  applicability skips, and zero failures or flaky results. Its retained report
  is .research/d020/affected-final.json.
- The subsequent affected motion and live-text-resize run has 18 passes with
  zero failures, skips, or flaky results, retained in
  .research/d020/live-resize-final.json. It verifies that oversized chapters
  return to normal flow and resume their fitting scenes after text is restored.
- All nine configurations pass the delayed-module regression at the current
  source, retained in .research/d020/module-race-final.json. The fixture waits
  for commit while holding its resource and always releases it in finally.
  Explicit shared preparation of the two critical fonts resolves WebKit's
  pending whole-font-set promise without weakening any range/growth assertion.
- Complete entry bounds, actual decoded images, named QA purposes, original
  evidence limits, startup deadline/cache/keyboard behavior, scene focus,
  reduced motion, no JavaScript, filters, downloads, and legacy navigation are
  covered by the applicable checks. Do not add overlapping local counts.
- Initial failures remain in .research/d020/affected-initial.json and its
  retained results. A variant/shape class collision and native scroll-anchoring
  correction were resolved. The intermediate enlarged-word failure and its
  measurements are retained; the same word-fragment check now passes.
- The mechanical detector reports advisory system-drift observations, with no
  blocking finding. Its exact JSON remains .research/d020/detector.json.
  The final design extraction must document intentional fluid type and local
  material/diagram treatments. No second detector or new design workflow.
- All eight shipping material rasters have embedded provenance. No dependency,
  evidence metric, resume byte, employer claim, or production release changed.

### Current full CI and performance

[Workflow 40251633738](https://github.com/Mohanad49/Portfolio/actions/runs/40251633738)
passes at abe2957. The retained artifact is .research/d020/ci-final, with the
derived .research/d020/ci-final-summary.json. There are 298 registrations:
286 passes, 12 established applicability skips, zero unexpected failures, flaky
results, retries, or runner errors. The skips are desktop-only renderer checks
and once-per-browser redirect checks on tablet/mobile. All nine browser/viewport
configurations retain normal and reduced-motion accessibility coverage across
six routes with zero serious or critical axe findings in the portfolio.

The first hosted run, 40249515832 at de818d4, had 283 passes, 12 skips, and
three WebKit delayed-module failures. Its traces remain in .research/d020/ci-first.
The font-state diagnostic and intermediate failing correction remain retained;
the final successful result does not erase them or relabel them flaky.

All eighteen production-build mobile Lighthouse runs pass the unchanged gates:

| Route | Runs | Median performance | Median LCP | Median CLS | Accessibility |
| --- | ---: | ---: | ---: | ---: | ---: |
| / | 3 | 98 | 2.269s | 0.000125 | 100 |
| /work/ | 3 | 99 | 1.955s | 0.000125 | 100 |
| /work/testpulse/ | 3 | 99 | 1.808s | 0.000180 | 100 |
| /work/caldiy/ | 3 | 99 | 2.108s | 0.031167 | 100 |
| /work/llm-evaluation/ | 3 | 99 | 1.957s | 0.000125 | 100 |
| /experience/ | 3 | 99 | 2.108s | 0.000125 | 100 |

The isolated desktop profile records the removed automatic renderer activation:
homepage maximum sampled frame gap changes from 2099.8ms to 33.4ms. Current
archive and Cal.diy samples also peak at 33.4ms. An earlier amended case sample
had a 50ms gap and remains disclosed. This is a software-WebGL lab comparison,
not physical-device certification or a universal 60fps claim. Method, real
readiness timing, byte tradeoffs, and raw reports are recorded in
[D-020 motion and performance](experience/d020-motion-performance.md).

### Visual evidence and hosted preview

The final confirmation manifest contains 52 validated stills and three
normal-speed native-wheel videos, with per-capture source commits and explicit
settled-source equivalence after the script-only font-preparation correction.
Current startup, production trace, both new case entrances, and archive motion
have current-source evidence. The build thread completed its one inspection,
correction batch, and final confirmation; no new aesthetic search is open.
The fresh reviewer scored all six listed material fixes resolved, with the
performance fix explicitly limited to the sampled scope: disposition ship.
The [verdict](experience/d020-finish-verdict.md) records all 52 stills opened
and all three recordings inspected as decoded frame sequences. It does not
claim real-time playback, a fresh whole-surface approval, physical-device
certification, or universal frame-rate behavior. The independent documenter
completed token-bearing DESIGN.md and .impeccable/design.json plus the
[D-020 design record](experience/d020-design-record.md). The build thread
confirmed schema version 2, eight canonical sections, all ten unchanged preview
component objects, and no application/test/asset/dependency/workflow delta from
abe2957. Existing preview drift is disclosed without changing those previews.

Preview deployment 7321691035 is Ready for the exact verified source:
[current preview](https://portfolio-detg2k6ub-mohanad49s-projects.vercel.app).
Authenticated in-app browser smoke uses the actual 1265x712 viewport. Native
wheel travel reaches the complete Cal.diy chapter, its case link opens the
correct QA study, continuation opens the LLM case, All work opens the archive,
and Web filtering displays two matching frameworks and survives reload at
?type=Web. No warning/error log was recorded in that smoke session. The valid
hosted chapter proof is .impeccable/review/d020/hosted-caldiy-settled.png.
The hosted Approach action prepares the optional study only after Inspect in
3D is selected, focuses Separate layers when ready, responds to Right from 22
to 23, and Use artwork restores the static image and launch focus. No error log
was recorded after that interaction.
The immediate fast-jump image and the screenshot taken during native page
transition are timing observations, not visual acceptance captures.

The dist text scan finds no local owner paths, Impeccable workspace paths,
generation-prompt markers, or imagegen tool names. No dependency, evidence
metric, resume byte, employer claim, or production deployment changed. The
D-019 results below are historical. Production remains
40a24f16ec037658fb13d5509dd1ba59573f480a.
GitHub's current Production deployment was rechecked as 7280653313 at that SHA.
The original Portfolio checkout remains clean.

D-020 is complete at the preview boundary. The final documentation commits
preserve the application and verification source above, so no duplicate runtime
check was manually rerun after the documentation handoff. The temporary local
Astro server on port 4187 was identified by PID and command before being stopped;
the hosted preview remains available for the owner.

## Full-site motion, D-019: historical checkpoint, 2026-10-25

Current application commit: d3e334ea22cbb3c7f9f4315bd182bb2c44c81b14.
Current verification-test commit: 9b9c03abeb289b2e34639e46f60409a4cc8684e2.
This promotes the accepted Pass Through opening onto the preview homepage and
extends its world across the remaining homepage, archive, three case studies,
and closing navigation. No factual source, dependency, or production deployment
is changed. The earlier D-018 records below are historical evidence.

Type checking covers 38 files with zero errors, warnings, or hints. ESLint and
the twenty-page production build pass. The existing optional inspection-renderer
chunk warning remains visible. The selected owner pipeline remains unchanged.

| Retained local report | Result | Scope |
| --- | --- | --- |
| .research/d019/opening-browser.json | 72 passed | Shared opening, compact text flow, artwork, fallbacks, arrival and evidence. |
| .research/d019/first-full-browser.json | 208 passed, 12 inapplicable skips, 15 failures | First complete browser matrix; failures were investigated, not suppressed. |
| .research/d019/final-affected-browser.json | 40 passed, six inapplicable skips | Corrected images/history/reading positions, native navigation, shared geometry and module-loading order. |
| .research/d019/artwork-and-range-browser.json | 18 passed | Actual WebP resources rather than inert placeholders; chapter range startup and reversal. |
| .research/d019/navigation-repeat-browser.json | Nine passed | Three repetitions per Chromium viewport, including case-to-case navigation and browser Back. |
| .research/d019/motion-accessibility-browser.json | 37 passed | Contrast correction, normal-motion axe, live preferences, actual artwork, and BFCache. |
| .research/d019/action-state-axe-browser.json | Nine passed | Six routes in every browser/viewport, zero serious or critical axe findings with motion enabled; actual action containers stay opaque and unclipped. |
| .research/d019/zoom-fix-browser.json | 81 passed | The visual review's enlarged-word correction, all opening behaviors, and main-route reflow across all nine configurations. |
| .research/d019/settled-arrival-browser.json | 27 passed | Three repetitions per configuration of condition-based scroll/growth and frame settlement. |
| .research/d019/settled-initial-growth-browser.json | Nine passed | Final settled initial-growth assertion with every original threshold retained. |

Passing runs have no unexpected failures, retries, or flaky results. The six
affected skips and twelve complete-matrix skips retain the established
desktop-only scene and once-per-browser redirect applicability rules.
Do not sum these overlapping registrations into a claimed full-suite result.
The complete hosted result for the current application and verification tests is
recorded below.

### Corrected findings

The shared opening's compact layout now flows at enlarged text sizes instead of
overlapping absolute copy/actions. The opening's own responsive picture delivery
remains scoped to the active viewport. Footer material is opt-in on full-site
surfaces, keeping the isolated study free of unnecessary desktop split images.
The image test keeps stable DOM identities as scrolling hides the old opening.
The history test advances the new scrub sequence before requiring a transform.
Live preferences compare the actual content's viewport position because changing
the upstream opening's height legitimately changes the numerical scroll offset.

Repeated Chromium navigation exposed a native View Transition opt-in timing
error. The opt-in and reduced-motion opt-out now appear in inline head CSS before
stylesheet loading, following the documented first-render requirement. No native
error is filtered from the tests. Nine repeated navigation runs pass.

Source review identified missing coordination when general motion loads before
the opening expands. The opening now emits the existing portfolio:layout event
after its height and reading-position transaction; general motion refreshes its
triggers. A delayed-opening-bundle regression proves the initial and final poses
at the actual shifted chapter range in all nine configurations.

The first eighteen Lighthouse measurements passed performance but exposed
offscreen low-contrast waiting text. Noninteractive fades now begin at zero
opacity, without visibility or accessibility-tree hiding. Linked content uses
transform-only motion. This includes the linked chapter headings, archive rows,
next-project links, and About copy. The new normal-motion axe check inspects the
actual animated containers, requiring full opacity and no clip mask. The previous
reduced-motion scans remain evidence for the unchanged complete static layouts.

Hosted CI 40179713602 then reported 240 passes, twelve inapplicable skips, and
one WebKit desktop continuous-growth failure. Its retained trace shows a stale
sample, not a reproduced title plateau: the 75% scroll was requested at
219320.405, its width was read by 219703.65, and the next retained frame did not
arrive until 219922. The prior frame was at 219221.651. The final frame shows the
complete enlarged arrival. Trace and extracted poses remain in
.research/d019/ci-d3 and .research/d019/ci-d3-pose-*.jpg.

The test-only correction waits for the real artwork and fonts, confirms native
scroll position, requires the same greater-than-0.2px growth at 25%, 75%, 92%, and
100%, and samples a width after three unchanged animation frames. Settled initial
growth also uses that threshold. It retains the complete arrival, hero fade,
native release, and reversal assertions, and attaches actual scroll/width samples.
No retry, skip, error filter, or relaxed assertion was introduced. The 27-repeat
and final nine-configuration runs pass. Application paths have no diff from
d3e334e, so this verification change does not alter the accepted artifact.

### Visual, performance, and hosted completion

The current 35-view visual manifest is
.impeccable/review/d019/capture-manifest.json. It covers the five complete main
routes at desktop/mobile, the homepage at tablet and the reported 1280 width,
the approved comp size, all six later homepage chapters, readable case entrances,
and 320-wide enlarged text. It also includes the ordinary compact entry and an
actual 1265 by 712 hosted Cal.diy view. Captures were refreshed for the technical
corrections. Unchanged PNG hashes reuse the earlier validity inspection; changed
images were reopened. All current files have been validated. The opening's final
comparison remains 0.942 overall; the material region is 0.9435. The explicitly
accepted sharp semantic typography remains a documented adaptation.

The fresh full-site visual review accepted the world and later-page treatment,
with one material reflow finding at 320 width and 200% text size. The compact
opening now caps its padding in viewport units, preserving the actual 64px title
while giving each word sufficient width. A text-range regression requires every
word to remain whole at both 320 and 390 widths. The reviewer scored that one fix
resolved after validating the four refreshed views. Its ship disposition covers
the scored fix list, with the original full assessment retained separately.

An invalid early reflow attempt is retained under .research/d019/stale-build-*.
Concurrent Astro check/build processes collided while renaming their generated
content cache. The old build's test failure and captures are not current evidence.
A successful standalone build preceded the passing 81-registration run and the
current corrected captures. Future content-generating checks run sequentially.

Provenance scan: six shipping rasters, zero missing records. The required
completed-build documentation is complete in DESIGN.md, .impeccable/design.json,
and docs/experience/full-site-design-record.md. It preserves the existing world
and records the built motion values. Technical findings are resolved in
source; its completion pointer follows this hosted result. The final local eighteen-run
Lighthouse checkpoint at 976c91b passes all unchanged thresholds, with performance
medians 97 to 99 and accessibility 100 on every route. Detailed measurements are
in .research/d019/lighthouse-final-summary.json. That checkpoint precedes the
narrow compact-padding correction; fresh current-source performance is supplied
by hosted CI rather than inferred from those prior measurements.

Hosted CI 40178038709 passed for 976c91b; the d3e334e run and its diagnosed failure
remain recorded above. **Current CI 40182083491 passes** for verification commit
9b9c03a, with no application-source change from d3e334e. Its complete 253-case
registration matrix has 241 passes, twelve established applicability skips,
zero unexpected failures, zero flaky results, zero retries, and zero runner
errors. It starts at 2026-10-25T09:48:45.518Z and completes in 253.159 seconds.
Retained result: .research/d019/ci-final/test-results/results.json. This includes
Chromium, Firefox, and WebKit at desktop, tablet, and mobile sizes, normal and
reduced-motion axe checks, keyboard/navigation, complete no-JavaScript content,
WebGL failure/lifecycle, history restoration, filters/downloads/contact actions,
legacy destinations, reading-position retention, and enlarged text.

The same current-source CI completes all eighteen production-build mobile
Lighthouse measurements, three per route, with the original thresholds intact.
Each route has accessibility score 100 and no failed accessibility audit. Medians:

| Route | Performance | LCP, ms | CLS |
| --- | ---: | ---: | ---: |
| / | 99 | 2106.81 | 0.000125 |
| /work/ | 99 | 2065.53 | 0.000753 |
| /work/testpulse/ | 98 | 2079.10 | 0.020175 |
| /work/caldiy/ | 99 | 2076.02 | 0.000796 |
| /work/llm-evaluation/ | 98 | 2089.02 | 0.000772 |
| /experience/ | 99 | 1957.04 | 0.000125 |

The complete reports and assertion results are retained under
.research/d019/ci-final/.lighthouseci; the parsed current measurement record is
.research/d019/ci-final-summary.json. Workflow:
https://github.com/Mohanad49/Portfolio/actions/runs/40182083491.

Vercel Preview deployment 7311056066 is Ready at
https://portfolio-k0z5987oj-mohanad49s-projects.vercel.app. In the authenticated
in-app browser, the current preview passed homepage arrival, archive filtering
and reload persistence, a case-study bookmark, and continuation through all three
case routes. A 390-wide hosted check reached the arrival with the hero hidden,
exactly one TestPulse heading, and no canvas. The browser viewport was reset and
the full preview retained as the deliverable. Physical-device smoothness is not
inferred from this emulation. The matching test-commit deployment 7311399085 is
also Ready at https://portfolio-cyrt22n7f-mohanad49s-projects.vercel.app. Source
equivalence is explicit: git diff d3e334e..9b9c03a has no changes in src, public,
assets, package.json, pnpm-lock.yaml, or astro.config.mjs. Subsequent design/review
documentation does not change the application or invalidate these measurements.

Production remains on 40a24f16ec037658fb13d5509dd1ba59573f480a. This task publishes
the complete preview only. Physical-device iPhone smoothness remains outside the
automated and desktop-browser verification scope.

## Continuous TestPulse arrival: historical checkpoint, 2026-10-25

D-018 records the owner's request to remove the broken handoff between a growing
decorative label and a second TestPulse section title. The prototype now uses one
real linked heading throughout. The hero title, role, subtitle, and actions fade
completely; the materials advance and clear; the heading and descriptor become
the full work introduction. Existing approved project copy explains TestPulse.
The real evidence approaches from below before sticky release, without another
title entrance. The established first view, facts, images, dependencies, homepage,
and production are preserved.

Application commit 563096e90f1bd0a300e2e23460a7edd39caa6364 contains the current
source blobs: page aeb16f2c39d4e03a40dfa10a924cdf43d2154c9c,
motion 3a67322cdfdc51cd574f9af94f2017f3877bf825, and test
d57a9a5e1ea9e8e6ee1d46bbce8a8542dd4f6036. Type checking across 34 files has zero
diagnostics; lint and the twenty-page production build pass. The existing optional
homepage renderer chunk warning remains visible. The complete affected matrix
passes all 63 checks across Chromium, Firefox, and WebKit at desktop, tablet, and
mobile sizes, without skips, retries, failures, or flaky results. It starts at
2026-10-25T00:00:04.666Z and completes in 67.667 seconds. Retained report:
.research/experience-study/arrival-final-source-browser.json. The earlier two
63-pass checkpoints remain retained separately.

The new regression samples four scroll positions, including 92% and 100%, and
requires continued title growth, one heading, a fully visible arrival, every hero
element hidden at completion, stable title size and an 80-pixel native position
change on release, then a complete reverse to the opening. Existing checks cover
bookmarks, immediate actions, static and unavailable-WebGL paths, live motion
preferences, tablet-to-phone reading retention, loaded active artwork only, idle
rest, and errors. All nine axe/reflow cases have zero serious or critical findings.

Independent technical review caught a compact fallback defect outside the original
assertions: the unique project descriptor was transparent without active motion.
Its initial hidden state now applies only to the enhanced timeline. No JavaScript,
initial Reduce Motion, and live Reduce Motion each explicitly require descriptor
opacity 1 in all nine configurations. The source reviewer resolves the Required
finding at the corrected blobs. The current 63-pass result includes this correction.

Earlier failures remain retained. The first 14 registrations had ten passes and
four failures: an empty arrival layout intercepted mobile clicks, and structural
padding/margin transitions moved the reading position after Reduce Motion cleanup.
The layout now passes pointer input through its empty area, while visible copy
remains selectable. Its structural transitions are explicitly disabled so layout
changes settle inside the existing reading-position transaction. The diagnostic
rules out a proposed native-scroll-anchoring explanation and records the delayed
padding and margin values instead.

The following 63-registration run had 58 passes and five failures: two exact
IntersectionObserver ratio comparisons returned 0.99999976158 for a fully visible
transformed heading, and all three tablet-to-phone reading checks failed. The
heading assertion now checks all four actual viewport bounds with a half CSS
pixel rounding tolerance; it still requires complete visibility. Removing an
unnecessary focus side effect did not fix the resize issue, and the affected
nine-check run retained those three failures. The actual cause was extra travel
expressed in svh, which changed the document height before JavaScript could
compensate. Travel now uses measured pixel height and reconfigures on debounced
resize. The affected three checks and the full final matrix pass. Failure reports
and diagnostics remain under .research/experience-study/arrival-* and
test-results/arrival-*. No retry, skip, or acceptance gate was relaxed.

The builder completed one batched inspection and one correction/confirmation.
The batch brought evidence into the end viewport and made the explanatory copy
arrive earlier. Final static and moving captures, native-scroll videos, and their
manifest are under .impeccable/review. The comparison remains 94% against B, with
the existing approved typography and semantic-text adaptations. Provenance scan:
five rasters, zero missing. All 24 current PNGs were opened for validity after
the required technical corrections. The current manifest is dated
2026-10-24T23:59:15.900Z. No further builder aesthetic pass was started.

Three initial production-build mobile Lighthouse runs failed the unchanged
performance and CLS gates: all scores were 80, with CLS 0.3843770739. LCP passed
at 2264.5541, 2255.9163, and 2255.4751 ms. The attributed shift was the arrival
wrapper moving from static flow into its pinned position before it was hidden.
The enhanced wrapper now starts hidden during that layout change, and the
existing timeline reveals it from 55% to 85%; only its copy child translates.
The default static wrapper stays visible. New assertions check its hidden enhanced
start, complete arrival, and visible no-JavaScript/initial/live Reduce Motion states.
The failing reports remain in lighthouse-arrival and lighthouse-arrival-summary.json
under .research/experience-study.

All three corrected mobile Lighthouse runs score 98. LCP values are 2262.0677,
2256.4436, and 2255.8537 ms, median 2256.4436 ms. Each CLS is 0.0001237532.
All unchanged gates pass. Reports and the parsed summary are retained as
lighthouse-arrival-corrected and lighthouse-arrival-corrected-summary.json.
The local headless post-load sample records zero errors or canvas elements,
46,899 encoded JavaScript bytes with motion, and 1,467 with initial Reduce Motion.
Each 39-frame sample has a median interval of 16.7 ms. The desktop p90 is 33.3 ms;
tablet and mobile p90 values are 16.7 and 16.8 ms. This bounded lab sample is not
physical iPhone, GPU, or field smoothness certification. Data is retained in
arrival-runtime-profile.json.

Technical source review approves the current blobs with no unresolved Critical
or Required finding. The fresh full D-018 visual review returns ship after opening
all 24 required captures. It confirms the complete single-heading transformation,
hero disappearance, explanatory arrival, and settled release, with no material
fixes. Videos were not played, and the verdict does not certify temporal or
physical-device smoothness. D-017 review history is retained below that report.
The completed design record describes the actual D-018 DOM, local values,
progress ownership, measured travel, lifecycle, and fallbacks. DESIGN.md and
.impeccable/design.json retain their recorded canonical hashes. Historical spec
and static-diff annotations are documented without unrelated repair.

Preview deployment 7306339845 succeeds at checkpoint
186ef7970751fa19cf42c95be167793c3c48ab5a. The immutable preview is
https://portfolio-f6xmmxsd7-mohanad49s-projects.vercel.app/experience.
The in-app browser smoke checks native scrolling at 1280x720 and 390x844.
Desktop title width grows from 314.316 to 579.004 CSS pixels; all five hero
opacities reach zero with hidden visibility, and the arrival reaches opacity 1.
At scroll 1008 the title top is 86.398; after 80 more pixels its top is 6.398,
with unchanged width and one heading. Mobile widths progress from 227.466 through
276.909 to 332.674 pixels. Both compact images load, no canvas is present, and
all five hero opacities reach zero. The work shortcut lands the evidence marker
at 64.063 pixels. The noindex/download attributes, comparison navigation, return,
and restored opening are verified; recorded browser errors are empty.
Hosted screenshots and the smoke record are retained as hosted-arrival.jpg,
hosted-mobile-arrival.jpg, and .research/experience-study/hosted-arrival-smoke.json.
Viewport overrides were reset, and the preview remains open at its beginning.

Hosted quality [run 40145616153](https://github.com/Mohanad49/Portfolio/actions/runs/40145616153)
succeeds at checkpoint 186ef7970751fa19cf42c95be167793c3c48ab5a, with its verify
job completing in 7 minutes 46 seconds. All check, lint, build, browser,
performance, and upload steps pass. The 199 browser registrations contain
187 passes and twelve established inapplicable portfolio.spec.ts skips, with
zero failures, flaky results, or retries. All 63 experience checks apply and
pass. The browser matrix starts at 2026-10-25T00:11:20.528Z and completes in
177.272 seconds. All eighteen mobile Lighthouse runs complete, and every
unchanged median gate passes:

| Route | Runs | Median performance | Median LCP, ms | Median CLS |
| --- | --- | --- | --- | --- |
| / | 3 | 100 | 1585.324 | 0.000563 |
| /experience/ | 3 | 99 | 1956.322 | 0.000125 |
| /work/ | 3 | 100 | 1356.795 | 0.000753 |
| /work/testpulse/ | 3 | 100 | 1356.151 | 0.017927 |
| /work/caldiy/ | 3 | 100 | 1354.854 | 0.000800 |
| /work/llm-evaluation/ | 3 | 100 | 1357.215 | 0.000774 |

The run metadata, complete artifacts, and parsed summary are retained as
ci-run-40145616153.json, ci-artifacts-40145616153, and ci-summary-40145616153.json
under .research/experience-study. Final documentation consumes this exact
application tree without repeating its checks. This remains an isolated draft
preview, not production integration. Production deployment 7280653313 remains at
40a24f16ec037658fb13d5509dd1ba59573f480a, and the original checkout is clean.
The temporary local preview was stopped after hosted verification.

## Layered artwork prototype: previous checkpoint, 2026-10-24

The owner rejected the hosted renderer at 6a46f0b and authorized preserving the
approved B artwork with cinematic layers. D-017 and the surface brief record
that treatment. The new /experience opening advances through its continuous
text-free plate; its mobile cutouts and actual TestPulse evidence are retained.
The prototype-only React/WebGL components and abandoned material maps are removed.
The homepage, its standalone renderer, and production remain unchanged.

Application commit 8731f42 contains the final application blobs:
page 34a7e7fbf82d94b77cc270ae3177425b315b455d,
motion 7379acbc1fe5c1c43f1b33ae3ddd00fa24f64c39, and test
884ccbbb25c239e978696048e30c80e72cb8a53e. Sequential type checking across
34 files has zero diagnostics; lint and the twenty-page static build pass.
Existing optional homepage renderer chunk warnings remain visible. The complete
affected matrix passes all 54 checks across Chromium, Firefox, and WebKit at
desktop, tablet, and mobile sizes. There are no skips, retries, failures, or flaky
results. This covers native forward/reverse scrolling, immediate work access,
evidence bookmarks, reading-position retention, live preferences,
no-JavaScript/WebGL-unavailable paths, active-viewport artwork loading, and idle
rest without a renderer. All nine axe/reflow cases have zero serious or critical
findings. The final report is
.research/experience-study/source-final-browser.json, started at
2026-10-24T11:06:11.422Z and completed in 70.392 seconds. Earlier passing reports
remain retained as historical checkpoints.

One batched visual inspection and one correction/confirmation preceded the fresh
independent full review. That review returned fix for a caption crossing the
foreground beam, introduction contrast during motion, and the missing lower
boundary at 729/tablet widths. One correction batch moved the project text inside
the aperture, brought the introduction to existing warm-white ink during the
push, and restored the compact lower boundary. The same reviewer reopened all
sixteen required captures and resolved all three named findings with a scoped
ship verdict. The full review plus scoped resolution is in
docs/experience/visual-review.md; the initial review is preserved separately.
This is not a new independent review of every surface after the fixes.

Current captures and motion samples are retained under .impeccable/review; the
initial split-image attempt and rejected renderer remain archived under
.research/experience-study. The matching static comparison is 94.2%, with no
forced gate. Provenance scan: five rasters, zero missing. The design documenter
records the completed implementation in docs/experience/design-record.md;
canonical DESIGN.md and .impeccable/design.json hashes are unchanged. Technical
source review approves these exact blobs for the isolated preview, with no
unresolved Critical or Required finding. The fractional media-query gap is
resolved. Neither review authorizes production integration.

The first local artwork measurement passed performance and layout stability but
failed the unchanged LCP gate: median performance 96, LCP 2556.6769 ms, and CLS
0.000123753. The upper mobile artwork was the LCP element, with lazy loading and
approximately 1201 ms load delay in the attribution. Eager loading and a high
fetch priority address that discovery delay. A subsequent network assertion
exposed unused upper/lower downloads in WebKit desktop: 53 passes and one failure
in delivery-initial-browser.json. Although currentSrc selected the inert image,
the real fallback URLs still generated requests. The final markup places actual
optimized WebP URLs only on active picture sources, with an inert SVG fallback
and complementary media queries. The full 54-pass result above verifies this
correction without retries or weakened assertions. Rendering uses the same
artwork, geometry, and timeline as the accepted captures.

Three production-build mobile Lighthouse runs on the final source score 98, 98,
and 98. LCP is 2266.5714, 2259.6771, and 2255.5207 ms; median 2259.6771 ms. Each
CLS value is 0.000123753. All unchanged thresholds pass. Reports and the parsed
summary are retained under .research/experience-study/lighthouse-source-final
and lighthouse-source-final-summary.json. The prior failing reports and the
intermediate priority measurements remain retained. A local headless Chromium
sample of the unchanged motion path reports zero canvas elements or errors and
approximately 46 KB of encoded JavaScript on desktop, tablet, and mobile. Its
16.7 ms median animation-frame sample is a lab observation, not physical iPhone
or field smoothness certification.

The earlier artwork CI run 40025575891 at ee578bf completed successfully:
178 passed, twelve inapplicable skips, zero failures or flaky results, and all
eighteen Lighthouse measurements. Its /experience median was 98, LCP
2234.6564 ms, and CLS 0.0001249505. That run preceded the three visual fixes and
final delivery correction, so it does not certify the final source. Its parsed
summary and artifacts are retained under .research/experience-study.

Final hosted run [40089079924](https://github.com/Mohanad49/Portfolio/actions/runs/40089079924)
at 38ea3bedd90cbf8c90a373c9f4b4f2aa63d25ffe succeeds in 8 minutes and 53 seconds.
All type, lint, build, browser, performance, and artifact-upload steps pass. The
190 browser registrations contain 178 passes, twelve established inapplicable
portfolio.spec.ts skips, zero failures, zero flaky results, and zero retries.
All 54 experience registrations are applicable and pass. The browser matrix
completes in 211.908 seconds. All eighteen production-build mobile Lighthouse
measurements complete and every unchanged median gate passes:

| Route | Runs | Median performance | Median LCP | Median CLS |
| --- | --- | --- | --- | --- |
| / | 3 | 99 | 1.588 s | 0.000563 |
| /work/ | 3 | 100 | 1.356 s | 0.000753 |
| /work/testpulse/ | 3 | 100 | 1.356 s | 0.017927 |
| /work/caldiy/ | 3 | 100 | 1.356 s | 0.000800 |
| /work/llm-evaluation/ | 3 | 100 | 1.357 s | 0.000774 |
| /experience/ | 3 | 99 | 1.959 s | 0.000125 |

The exact parsed results and downloaded reports are retained under
.research/experience-study/ci-summary-40089079924.json and
ci-artifacts-40089079924. These remote-runner measurements are production-build
lab results, not visitor field data. The final audit follow-up changes only
documentation, so it consumes this verified application/test/configuration tree
without repeating identical checks.

Vercel Preview deployment 7297844824 succeeded at application commit 8731f42 plus
review-record commit 38ea3be. Its immutable comparison route is
https://portfolio-5c4dn4unn-mohanad49s-projects.vercel.app/experience.
The existing authorized browser session opens it without an authentication
interruption. At its actual 729x797 viewport, the upper and lower WebPs load,
the unused desktop picture selects the inert image, motion initializes, and a
native scroll changes the upper transform. Explore the work reaches #evidence
with its heading approximately 64 pixels below the viewport top and all three
observations present. View the current version opens the unchanged homepage.
The resume retains its public PDF URL and descriptive download filename; its
bytes are unchanged from the earlier hash-verified download. The prototype is
noindex, follow and has been left open for comparison. No new physical-device
or download claim is made by this hosted smoke check.

At the temporary 1440x1000 hosted desktop viewport, the full approved plate loads
and both compact images select their inert fallback. Native scrolling advances
the plate to its 1.22 scale, with zero canvas elements. The viewport override was
then reset to the actual 729x797 browser size. A footer-link automation attempt
failed in the in-app browser's click resolution after that reset; it did not
establish a site defect or verify footer pointer activation. Direct navigation
to the already exposed #top fragment returns to scroll position zero. These
limits are retained separately from the passing local and hosted browser suite.

GitHub still records Production deployment 7280653313 at
40a24f16ec037658fb13d5509dd1ba59573f480a. The original checkout is clean. PR #4
remains an open draft, with no homepage integration or production change.

The handoff recommends this artwork treatment for the opening because it retains
the approved material finish while providing bounded desktop and compact mobile
scroll motion. It does not claim a fully rendered 3D passage. The actual built
desktop capture and tested immutable preview are ready for owner comparison;
integration remains a separate decision.

The rejected snapshot's hosted run 40016674543 completed its full browser matrix:
172 passed, eighteen inapplicable skips, zero failures, zero flaky results, and
no retries. The workflow concluded cancelled during performance collection after
eleven of eighteen Lighthouse reports. The job annotation confirms the 25-minute
execution limit was exceeded. Browser installation alone took 18 minutes and
53 seconds. The job allowance is now 35 minutes so the existing browser and
performance checks can finish; no test, retry, metric, or threshold is relaxed.
The cancelled run is not a green full pipeline. Artifacts and the parsed
summary are retained in .research/experience-study/ci-artifacts and
ci-summary-40016674543.json. Its local three-run /experience measurement had median
performance 97, LCP 2.409 s, and CLS 0.000124; one individual LCP was 2.707 s.
Those measurements apply to the rejected renderer snapshot, not the new treatment.

The rejected hosted preview's work fragment, comparison navigation, and current
resume download were checked in the authenticated browser. The downloaded PDF's
SHA-256 matches the current public resume. The new preview smoke check is
recorded above.

## Rejected renderer: comparison checkpoint

The owner selected B: Pass Through on 2026-10-23. Application source a697113
and test configuration 8125cf0 implement the isolated /experience route on
codex/qa-portfolio. The homepage and production are unchanged. Type checking
passes for 36 files with zero diagnostics; lint and the twenty-page static build
pass. Existing optional renderer chunk warnings remain visible.

The rebuilt route's first full local matrix records 47 passed checks, six
inapplicable desktop-only skips, and one WebKit desktop timeout in the driver's
scroll-into-view command. All nine new axe/reflow cases pass, with zero serious
or critical findings. The trace shows that the CTA had already passed visible,
enabled, and stable checks; no click was dispatched. A separate diagnostic finds
responsive JavaScript, a fully visible hit-testable anchor, and working native
pointer navigation before scene readiness. It does not establish a definitive
application cause for the intermittent inspector stall.

The corrected test requires full viewport visibility and click({ scroll: 'none' }).
This pinned Playwright option retains normal actionability and hit-target checks.
It changes the driver step, not the site's behavior or the assertion. The final
affected matrix records 12 passed checks, six inapplicable skips, and zero failures:
native scrolling in all nine configurations, plus actual rendering, idle rest,
zero console/page errors, and context-loss recovery in all three desktop engines.
The other 36 green checks are unchanged. Together these cover all 48 applicable
prototype checks without retries. The hosted PR pipeline will run the complete
application matrix and all eighteen mobile Lighthouse runs; results are pending.

Initial focused checks also exposed a real desktop deep-link failure during
inherited smooth fragment scrolling. Immediate native anchors on this route fix
it. The first reading-position test incorrectly assumed the timeline was onscreen
at the section bookmark; it now enters that timeline before changing preferences.
A test closure was corrected to pass its expected position into the browser.
Failure traces are retained in test-results/experience-initial,
experience-corrected, experience-matrix, and experience-rebuild-matrix. No retry,
skip, or threshold was added to suppress a failing applicable behavior.

One local type/build attempt collided on Astro's generated temporary file because
both wrote it concurrently. Sequential type checking and building succeed. The
rebuild's initial unchecked-index type errors were resolved before the passing
final check. The two source materials compile into optimized WebP files; their
PNG sources and exact prompt sidecars are absent from dist. Provenance scan:
seven raster assets, zero missing metadata.

Visual acceptance remains open. Both independent full reviews have disposition
rebuild. The first found flat desktop materials, an unclear project opening, and
mobile action overlap. The focal rebuild added original chrome/reflection maps,
real gap geometry, lower transmission cost, and preserved readable HTML. The
second review resolves mobile clearance but still rejects the live desktop
materials, close enclosure, arrival caption, and navigation clearance. The static
94.2% comparison applies only to the still. It does not certify the live scene.
Both reports are retained as docs/experience/visual-review.initial.md and
visual-review.renderer.md. Current required captures/videos are under
.impeccable/review/experience; previous captures remain under .research.

The documentation handoff records the actual prototype in
docs/experience/design-record.md and preserves canonical DESIGN.md and
.impeccable/design.json. This snapshot is for a hosted comparison. It is not ready
for integration or production. A further material strategy requires the owner's
decision after the second rebuild verdict, as required by Impeccable.

## Experience study: evidence checkpoint

On 2026-10-23 the owner authorized a storyboard and isolated motion prototype.
The desktop/mobile storyboard, three opening concepts, and a supporting mobile
comparison are prepared in docs/experience and .impeccable/mocks/experience.
All four generated PNGs have exact prompt sidecars and embedded provenance.
The concepts were inspected; their image-generated text is a visual reference,
not production UI or evidence of working motion. The owner subsequently selected B.

The live public TestPulse index and all thirteen suite summaries were inspected.
The selected caldiy-api-v2 booking-lifecycle observations were rechecked against
the exact public JSON. Three dated Passed/Failed/Passed observations share commit
5c0869a1ddaf9aedc8f05d3d0cccc8c7b4dcc3a2, with unknown retry counts. The
payload digest and source are retained in docs/experience/testpulse-evidence.json.
The 50-run metrics window and 81-observation detailed timeline remain distinct.

This earlier checkpoint changed no application code, dependencies, build settings,
or deployment configuration. The production checks below remain historical
evidence for the unchanged public homepage. Production replacement is outside
the selected prototype's scope.

## Current source

Owner-feedback application source: 5387919, including the content increment b0e89e6.
The current PDF SHA-256 is
683ede439d00f58b2323c78629635ea674558fee1f5e1cce9d7132d7ae47735d.
It is an exact copy of the owner's existing local PDF; the original Word/PDF files
were already current and are unchanged. Both resume pages were rendered and viewed.

Type checks, lint, and the nineteen-page production build pass. The first affected
matrix passed 27 checks for filters, downloads, and visible motion. Technical review
then found completed reveals could replay after breakpoint/preference changes.
The fix preserves completed targets in a WeakSet. Its strengthened nine-project
motion matrix passes in Chromium, Firefox, and WebKit at desktop, tablet, and mobile
sizes. Reports are .research/owner-feedback-focused.json and
.research/owner-feedback-motion-verification.json. No retries were enabled.

One batched desktop/mobile inspection covers metrics, the graduation label, and
the six-framework archive. Real motion samples and videos are retained under
.research/owner-feedback. The mobile capture records zero Canvas requests and a
complete reveal to opacity 1; desktop also completes after its sampled interval.
The updated source and GitHub profile copy are independently approved in
docs/technical-review.md. The profile update is published as commit
d9b50823bac4901fa9d7ea1a71f7efd42a54fc11 in Mohanad49/Mohanad49. Its README
Git blob is e3ac39496684978d7ab8a501343450bc8ede34e5. The eBay repository is
unchanged; only its curated archive/profile listings were removed.

Hosted run https://github.com/Mohanad49/Portfolio/actions/runs/39966751784
passed at PR head df538af65df788ac52ba666a8ab08ceeda4a62ce. It records 124
passed browser checks, twelve inapplicable desktop-only skips, zero failures,
zero flaky results, and no retries. All 54 axe scans have zero serious or critical
findings. Type checks, lint, build, and all fifteen mobile Lighthouse runs pass.
Artifacts and exact values are retained in .research/owner-feedback-ci-artifacts
and .research/owner-feedback-ci-summary.json.

| Route | Runs | Median performance | Median LCP | Median CLS |
| --- | --- | --- | --- | --- |
| / | 3 | 99 | 1.590 s | 0.000563 |
| /work | 3 | 100 | 1.357 s | 0.000753 |
| /work/testpulse | 3 | 100 | 1.356 s | 0.017927 |
| /work/caldiy | 3 | 100 | 1.358 s | 0.000800 |
| /work/llm-evaluation | 3 | 100 | 1.356 s | 0.000774 |

These are mobile production-build lab measurements, not field Core Web Vitals
or certification on the owner's physical iPhone. Authenticated preview deployment
7280247522 serves https://portfolio-cnaxr54xj-mohanad49s-projects.vercel.app.
Its metrics, graduation label, six-framework archive, and Web/All filter transitions
were checked in the existing signed-in browser session. The bounded independent
visual review has disposition ship, with no blocking finding. Its eight captures,
motion recordings, and explicit emulation limit are recorded in docs/visual-review.md.

PR 3 merged as 0f5638d898249ee02cbb02c5546d607f5aa8902c at 14:19:59 UTC on
2026-10-23. Its Git tree d0761026727d84a89423cb1ca0257f60b3ba2d9a exactly
matches the tested PR head. Production deployment 7280563239 succeeded at
14:20:19 UTC. Its immutable URL is
https://portfolio-it7q4fh5n-mohanad49s-projects.vercel.app, and the public alias
https://myehia.vercel.app serves the update.

All 23 live HTTP checks pass, including the new metrics and graduation label,
six-framework archive, thirteen exact redirects, security/metadata/search assets,
404, and the current PDF digest with the descriptive attachment filename. The
targeted public Chromium desktop/mobile suite passes ten applicable checks with
two inapplicable desktop-only skips, zero failures, zero flaky results, and no
retries. It covers routes/images/contact, filters, exact downloads, visible reveals
and live motion preferences, desktop scene controls, and legacy bookmarks.
Results are retained in .research/owner-feedback-live-http.json and
.research/owner-feedback-live-browser.json. Final public desktop/mobile metrics
captures are .research/owner-feedback/live-{desktop,mobile}-metrics.png.

The final audit commit changes only this record, the release/checklist records,
and the independent visual report. It does not change application source, assets,
tests, dependencies, build settings, or deployment configuration. These verified
results remain the shared acceptance evidence for the unchanged application tree.

The remaining sections retain the original release's dated evidence, including
its previous PDF identity and seven-framework count. They are historical results.

## Previous release source

Verified release head: 398525e5c1bd0f69c1719dc6880fff9426557233. The production
merge b5c5cb860b42d6048b57e2492c02b113701f7c89 has the identical Git tree
fb4a0c20ac8a90bf6dd1d424e4773dafdbca40cc. Application source includes a2c56c2
and deployment configuration includes f55bfd4. The final record-only commit changes
no application, asset, test, dependency, build, or deployment configuration. The
original checkout is unchanged.
This is the shared record for Git, visual review, and technical review.

## Completed verification

| Check | Scope | Result |
| --- | --- | --- |
| Type check | 30 authored source/configuration files | 0 errors, 0 warnings, 0 hints |
| ESLint | Authored source, configuration, and tests | Passed |
| Build | Main pages, 404, thirteen legacy pages, sitemap | 19 pages generated successfully |
| Peer compatibility | Pinned dependency graph | No peer dependency issues |
| Production advisories | pnpm audit --prod, retained local JSON | 0 vulnerabilities across all severities |
| Resume fidelity | Supplied PDF and public/resume.pdf | SHA-256 1053c4a9375885e7a248291bb2f76b4c93f348d9618f6422da8d8333f2208aee |
| Case-study evidence | Three public flagship repositories | Exact source commits retained in docs/evidence.md |
| Framework descriptions | Seven framework READMEs | Verified against retained source excerpts |
| Initial hero comparison | Semantic UI versus selected B composition | 90 percent match |
| Responsive gate | 1440px desktop capture versus composition | 91 percent match |
| Visual captures | Home at 390, 834, 1280, 1440, 1536, 1600px; work and cases on desktop/mobile; 404; real 3D | Captured, opened, and validated in two builder rounds |
| Raster provenance | Two generated plates and existing portrait source | 3 rasters, 0 missing provenance |
| Accessibility | Six routes, three engines, three viewport sizes | 54 scans, zero serious or critical axe findings |
| Static fallbacks | Reduced motion, no JavaScript, unavailable WebGL | Content and links retained; displayed fallback images decode |
| Keyboard | Chromium/Firefox Tab; macOS WebKit Option-Tab | Skip link and visible focus verified |
| Bundle requests | Normal mobile/tablet and all reduced-motion states | No React renderer, island, or Canvas module requested |
| Desktop Canvas deferral | Chromium, Firefox, WebKit | Canvas module absent at the top, requested near Approach |
| Technical source review | Commit 9355bab and narrow material, CI, header, and activation follow-ups | Approved; blocking findings resolved |
| Transmission material | Final scene in all three desktop engines | Input, reset, live preferences, real context loss pass; no console or page errors |
| Mobile Lighthouse | Three production-build runs per main route | Latest hosted median 100 on all five routes; all thresholds passed |
| Hosted Ubuntu matrix | Three engines, three viewport sizes, actual software WebGL2 | 115 passed, 12 inapplicable desktop-only skips, 0 failures, 0 retries |
| Hosted performance | Fifteen mobile production-build runs | All median performance, LCP, and CLS gates passed |
| Hosted preview | Retained previews, latest deployment 7267058226 | Routes, filters/reload, metadata, 404, legacy links, exact resume, Contact transit, and scene controls verified |
| Public production | Vercel deployment 7267170763 | 23 HTTP checks and 8 applicable live browser checks passed |
| Design documentation | DESIGN.md and .impeccable/design.json | Actual tokens, ten component previews, sidecar schema and CSS validated |

| Route | Median performance | Median LCP | Median CLS |
| --- | --- | --- | --- |
| / | 99 | 1.597 s | 0 |
| /work | 100 | 1.508 s | 0.000124 |
| /work/testpulse | 100 | 1.511 s | 0.014464 |
| /work/caldiy | 100 | 1.514 s | 0 |
| /work/llm-evaluation | 100 | 1.510 s | 0 |

These are local mobile lab measurements, not field Core Web Vitals. All fifteen
runs are retained in .lighthouseci/ and .research/mobile-performance.json.

Hosted run: https://github.com/Mohanad49/Portfolio/actions/runs/39873648429.
Its median scores are also 99 for home and 100 for the other four routes; median
LCP spans 1.356 to 1.584 seconds and median CLS stays below 0.018. Hosted artifacts
are retained in .research/ci-accepted-artifacts and summarized in
.research/ci-accepted-summary.json. The first Ubuntu Firefox failure is resolved
by actual rendering under the virtual display, with assertions unchanged.

Authenticated preview: https://portfolio-lq7mlbe83-mohanad49s-projects.vercel.app.
The downloaded preview resume matches the supplied PDF hash above.

The first full browser run executed 114 tests: 110 passed and four failed. The
scrollable-table accessibility issue from the preceding Chromium run was already
fixed. The four matrix failures concerned macOS WebKit's link-navigation shortcut
and an unpainted image behind an active replacement canvas. The corrected WebKit
checks passed, including image decoding in displayed fallback states.

A live preference-transition test exposed ScrollTrigger cleanup resetting the
document's reading position. The fixed path passed in all three desktop engines,
including actual GPU context loss and recovery to a decoded static fallback.

The subsequent full matrix passed 113 checks, skipped 12 inapplicable desktop-only
cases, and failed one Chromium initial-fragment check. Initial motion setup was
interrupting native fragment scrolling. Source review also found a contradictory
filter/hash state on reload, BFCache cleanup, and ineffective JSON-LD escaping.
All four causes were fixed. The affected matrix passed 16 checks, with 12
inapplicable skips and no failures. A stronger actual Chromium BFCache regression
then passed separately, verifying that restored motion responds to scrolling and
live preferences. Retained summaries are .research/affected-matrix.json and
.research/history-verification.json. No failed check was relabelled or retried.

## Visual review status

The builder completed its first inspection and one confirmation round. Its two
material fixes were a readable mobile strategy comparison and clearer 3D lighting.
The independent Impeccable review accepted the first viewport, responsive layouts,
archive, case studies, and metadata cleanup. The owner authorized one additional
focused material pass. The resulting transparent amber overlap, dark chrome, and
graphite field were accepted. Both visual findings are resolved, disposition ship.
See docs/visual-review.md. The extracted design system and its sidecar are complete;
the Impeccable build-phase finish is recorded as ship, with no forced gates.
Live design hooks ran on edited files. Their colored-shadow finding was fixed by
removing that shadow. No rule suppressions were added and no duplicate detector
run was performed.

## Production follow-up

The complete pre-release head baa1b95 passed hosted run
https://github.com/Mohanad49/Portfolio/actions/runs/39874771959:
115 browser checks passed, twelve inapplicable desktop-only skips, no failures,
no flaky results, and all fifteen mobile Lighthouse runs passed. Its five median
scores are 99, 100, 100, 100, and 100; LCP spans 1.356 to 1.586 seconds and CLS is
below 0.018. Artifacts and the parsed summary remain in .research/release-artifacts
and .research/release-summary.json.

PR 1 merged as 9f1e9fb and Vercel production deployment 7266800739 replaced the
public alias. The initial live HTTP smoke passed all 23 checks. Desktop/mobile
browser smoke passed routes, content, images, and archive filters, but failed both
strict resume filename checks. Vercel's default inline header named the correct
PDF resume.pdf. The explicit response header is independently source-approved;
authenticated preview deployment 7266858801 downloads the descriptive filename
and its bytes match the supplied SHA-256 digest.

The follow-up CI run 39876869771 passed 114 browser checks, skipped twelve
inapplicable cases, and failed the unchanged desktop Chromium legacy Contact
bookmark assertion. It remains a failed run. The trace and 90-frame capture
identified transient renderer startup while smooth scrolling passes Approach.
The activation fix avoids that startup without changing the assertion or global
scrolling. Local before/after captures reach scrollY 5727; renderer requests fall
from one to zero and canvas frames from fifteen to zero. The affected suite then
passed all thirteen checks across Chromium, Firefox, and WebKit, covering strict
bookmarks, real interaction, live preferences, actual context loss, WebGL failure,
and real Chromium history restoration. Type checks, lint, and build also pass.
Retained evidence: .research/bookmark-transit-before.json,
.research/bookmark-transit-after.json, .research/scene-entry-browser-verification.json,
and .research/resume-fix-ci-artifacts. Both narrow source deltas are approved in
docs/technical-review.md. The scene's materials and visual composition are unchanged.

## Release outcome

All required gates are complete. Final hosted run
https://github.com/Mohanad49/Portfolio/actions/runs/39878256527 passed 115 checks,
with twelve inapplicable desktop-only skips, zero unexpected failures, zero flaky
results, and no retries. All fifteen mobile Lighthouse runs passed. Each of the
five routes has a median performance score of 100, median LCP ranges from 1.356 to
1.584 seconds, and the largest median CLS is 0.017927. These are production-build
lab measurements, not field Core Web Vitals or physical-device certification.
The artifacts are in .research/final-followup-artifacts; parsed values are in
.research/final-followup-summary.json.

Authenticated preview 7267058226 confirmed Contact in the viewport with no canvas,
then settled Approach activation, keyboard adjustment, and reset. One initial
browser inspection command timed out during cold scene initialization; the
subsequent state and controls passed. The approved composition and material
values remain unchanged. No new aesthetic review was opened.

PR 2 merged as b5c5cb8. Production deployment 7267170763 succeeded at
2026-10-23 00:36:31 UTC and serves https://myehia.vercel.app. All 23 public HTTP
checks passed, including thirteen permanent redirects, canonical metadata,
security headers, 404, search assets, and the exact PDF with its explicit
descriptive attachment filename. Final public Chromium desktop/mobile smoke
passed eight applicable checks and skipped two desktop-only cases on mobile.
It covers routes, images, direct contact, archive filtering and reload, strict
resume bytes and filename, legacy bookmarks, real scene input, preference
transitions, and actual context-loss fallback. Retained records are
.research/live-http.json and .research/live-browser-verification.json, with final
public captures in .research/live-desktop.png and .research/live-mobile.png.
The previous production source and immutable deployment remain recoverable;
see docs/release.md.

The deferred 3D chunk exceeds Vite's general 500 kB warning. The warning threshold
was not raised. Its mobile request exclusion and deferred desktop behavior passed
browser network assertions. The local mobile performance gate passed independently.
Local reports are under test-results/,
playwright-report/, .impeccable/review/, and .research/; they are not served by the app.
