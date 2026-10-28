# Why I built the portfolio this way

I wanted a portfolio that makes my QA work understandable and gives visitors a
reason to remember it. These are the choices behind it, including the approaches
I rejected. The detailed test results belong in [verification](docs/verification.md),
and deployment history belongs in [release and recovery](docs/release.md).

## D-001: Keep the existing history and public address

I built the replacement in a separate checkout so I could keep using the current
site while reviewing the new one. I kept the existing repository and Vercel
project, including `myehia.vercel.app`. The development branch is now
`dev/qa-portfolio`; its original name was `codex/qa-portfolio`.

## D-002: Give each workflow one job

I did not want several design skills giving conflicting advice. Impeccable owns
the visual work, imagegen produces assets from that direction, and content,
version control, and source review have separate responsibilities. The agreed
boundaries are in [the project plan](tasks/plan.md).

## D-003: Make every claim defensible

I only publish experience and results I can explain in an interview. TestPulse
shows exported CI snapshots, Cal.diy targets v6.2.0, and the LLM refusal judge
stays outside CI gates. Failed checks and measurement limits are part of the
story. Employer illustrations are conceptual, not screenshots of private systems.

## D-004: See the design before building it

I asked for image concepts first. That let me judge the composition, lighting,
and material treatment before spending time on implementation. The selected
concepts remain in the repository as design references.

## D-005: Choose the layered composition

I chose concept B for its dark chrome, amber glass, and strong typography. I
wanted the artwork to establish the identity without turning the text and
navigation into part of an image. The site keeps real HTML for both.

## D-006: Work within the artwork's real resolution

The generated hero and project artwork had finite resolution. I kept the native
files instead of upscaling them and claiming extra detail. Responsive optimized
images carry that artwork; the separate inspection study provides optional 3D.

## D-007: Keep the build reproducible

I use pinned dependencies, a committed lockfile, Node 24, and pnpm 11.17.0.
TypeScript and lint tooling must support each other. The build validates the
content, while browser checks and axe verify behavior and accessibility.

## D-008: Make the glass interaction worth opening

The inspection study uses bounded transmission buffers to show overlapping amber
layers. I accepted the extra rendering cost for that optional experience. It
renders on demand and has a complete artwork fallback. D-020 replaces its earlier
automatic activation with an explicit button.

## D-009: Keep Firefox failures visible

The first hosted Firefox interaction test could not create WebGL2. I kept the
assertion and fixed the Linux test environment with a virtual display and software
rendering. A browser failing to initialize is evidence to investigate, not a
reason to mark the same test as passed.

## D-010: Avoid starting 3D during navigation

Smooth scrolling to Contact briefly crossed the inspection section and started
its renderer. The first fix waited for scrolling to settle before activation.
D-020 later removed automatic activation entirely, so ordinary navigation no
longer starts the optional renderer.

## D-011: Give the resume download a useful filename

The PDF was correct, but the download was named `resume.pdf`. I kept its exact
bytes and public URL and set the response filename to
`Mohanad_Yehia_Software_QA_Engineer.pdf`.

## D-012: Update my figures and curate the project list

My Blue Ribbon figures are 5,000+ authored test cases and 600+ defects driven to
resolution. I can defend those numbers, and they now match my resume and GitHub
profile. The 85% regression figure still refers specifically to the admin portal.
I also labelled my machine-learning work as my graduation project.

I removed the small eBay search/filter exercise from the curated portfolio. The
other Selenium work provides stronger evidence, so expanding eBay would add
repetition. Its repository stays available, and the old portfolio link redirects
to it. The framework archive contains six projects across four disciplines.

## D-013: Let mobile visitors see the motion too

I wanted visible scroll reveals on desktop and mobile, with Reduce Motion fully
respected. The optional 3D scene remains desktop-only as a performance choice.
That does not mean an iPhone is incapable of running WebGL.

## D-014: Prototype a memorable opening

A clean portfolio was not enough for what I wanted. I asked for an experience
study and chose B, Pass Through, after comparing three desktop concepts and a
mobile study. The TestPulse sequence uses real exported observations, including
their dates and unknown retry counts.

## D-015: Keep scrolling native

I chose a bounded scroll sequence with immediate work and resume access. GSAP
controls the DOM motion; it does not replace the browser's scrolling. Bookmarks,
history, keyboard navigation, and a complete static version remain part of the
experience. The isolated `/experience` route records that study.

## D-016: Reject the renderer that missed the concept

The rendered prototype did not match the approved artwork. Its reflections looked
pale and its gold planes looked opaque. I rejected that finish instead of accepting
it because it was technically 3D. The rejected studies and review records remain
part of the project history.

## D-017: Preserve the cinematic artwork

I chose the layered artwork treatment when the renderer could not reproduce the
approved material. Desktop advances through the intact plate; mobile uses separate
transparent layers. This preserved the look I actually wanted and removed the
prototype renderer and its unused maps.

## D-018: Turn the opening into TestPulse

Seeing TestPulse enlarge and then appear again as another heading felt wrong.
I asked for one continuous handoff: the hero copy fades away, the same TestPulse
heading grows, and the full project introduction appears before normal scrolling
continues. That transition is the main moment of the homepage.

## D-019: Carry the experience through the site

I wanted the rest of the homepage and the case studies to match the opening.
Each chapter now has motion related to its content: booking contention, LLM
comparison, experience, inspection, and contact. Case-study prose stays steady
so the animation does not interfere with reading. Lando Norris's site informed
the ambition and pacing; its assets and content were not reused.

## D-020: Fix cutoffs, repetition, and unclear project identities

My preview review found chopped glass artwork, repeated slab shapes, and project
names that needed more explanation. I approved a related material family: a gate
for Cal.diy, paired prisms for LLM evaluation, and a fan for the archive. The
complete forms now connect with the surrounding content, and each featured
project has a clear QA description.

I also wanted stronger motion beyond the opening. The project sequences now
advance with scrolling and keep their actual results unchanged. Enlarged text,
mobile layouts, and reduced motion get complete alternatives.

A local software-rendering trace showed a large stall when the optional 3D scene
started automatically. It now starts only after pressing **Inspect in 3D**. The
short desktop readiness screen has a fixed release ceiling and never blocks
interaction. I did not use a loader as a substitute for fixing rendering work.

The hosted WebKit checks also exposed a font-readiness issue. Explicit preparation
of the two required fonts replaced waiting for the entire document font set.
I reviewed the corrected preview on desktop and mobile and accepted it.

## D-021: Verify the release and preserve the current site

I asked for one final review before production, including Windows, browsers,
security, source quality, and the repository itself. Windows now has a dedicated
Chrome, Edge, and Firefox job. The existing Linux desktop, tablet, and mobile
coverage stays in place. pnpm's built-in shell emulator makes the same commands
work on Windows without another dependency.

The current production source is saved on the locked branch
`backup/production-2026-10-27`. `main` requires a pull request, passing checks, and
resolved conversations, and blocks force pushes and deletion. I do not require a
second person's approval on a repository I maintain alone.

The final review found a homepage LCP result above the existing limit. I kept
that limit and moved later chapter preparation out of the opening's first paint.
The mobile opening uses smaller AVIF cutouts with WebP fallbacks. The full Linux
run now passes the original performance gates; exact results and any remaining
checks belong in [verification](docs/verification.md).

I also isolated headed browser sessions on the Windows runner after two Firefox
checks stalled while running together. That change keeps the same coverage,
assertions, time limits, and zero retries. A later trace also pointed to work
during page exit. Checkpoints now save before following links, and closing a
document stops its animations without fully restoring a visual state that will be discarded.
Cached pages keep their state.

The Windows driver still hung when closing a page with no animation module.
I separated Firefox's normal headless content checks from its one headed WebGL
check. That keeps every check and gives each profile a clear job. The complete
Windows run passed with those profiles. A repeat run exposed animation refresh
throttling on the runner, so I explicitly keep its Firefox test pages active
using Mozilla's automation preference. This affects the test browser, while the
site's timings and the assertions stay unchanged.

Reload and Back also need to keep my visitor's place after the opening changes
the document height. The site now saves a small reading checkpoint with each
native history entry and restores it after layout, without replacing scrolling.
A new action or another traversal cancels a pending restoration.

Production will change only after I explicitly request the release.
