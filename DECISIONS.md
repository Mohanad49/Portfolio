# Why I built the portfolio this way

I wanted a portfolio that makes my QA work understandable and gives visitors a
reason to remember it. These are the choices behind it, including the approaches
I rejected. The detailed test results belong in [verification](docs/verification.md),
and deployment history belongs in [release and recovery](docs/release.md).

## D-001: Keep the existing history and public address

I built the replacement in a separate checkout so I could keep using the live
site while I worked on the new one. I kept the existing repository and Vercel
project, including `myehia.vercel.app`. That work ran on `codex/qa-portfolio`,
later renamed `dev/qa-portfolio`; I built the live stage on `dev/portfolio-v2`.

## D-002: Give each workflow one job

I did not want several design skills giving conflicting advice. Impeccable owns
the visual work, imagegen produces assets from that direction, and content,
version control, and source review have separate responsibilities. I set those
boundaries in [the project plan](tasks/plan.md).

## D-003: Make every claim defensible

I only publish experience and results I can explain in an interview. TestPulse
shows exported CI snapshots, Cal.diy targets v6.2.0, and the LLM refusal judge
stays outside CI gates. Failed checks and measurement limits are part of the
story. Employer illustrations are conceptual, not screenshots of private systems.

## D-004: See the design before building it

I started with image concepts. That let me judge the composition, lighting,
and material treatment before spending time on implementation. The concepts
remain in the repository as design references.

## D-005: Choose the layered composition

I chose concept B for its dark chrome, amber glass, and strong typography. I
wanted the artwork to establish the identity without turning the text and
navigation into part of an image. The site keeps real HTML for both.

## D-006: Work within the artwork's real resolution

The generated hero and project artwork had finite resolution. I kept the native
files instead of upscaling them and claiming extra detail. Responsive optimized
images carried that artwork, and a separate inspection study provided optional 3D
until D-022 made the stage the homepage.

## D-007: Keep the build reproducible

I use pinned dependencies, a committed lockfile, Node 24, and pnpm 11.17.0.
TypeScript and lint tooling must support each other. The build validates the
content, while browser checks and axe verify behavior and accessibility.

## D-008: Make the glass interaction worth opening

The inspection study used bounded transmission buffers to show overlapping amber
layers. I accepted the extra rendering cost for that optional experience. It
rendered on demand and had a complete artwork fallback. D-020 replaced its
automatic activation with an explicit button, and D-022 retired the study.

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
respected. The optional 3D scene stayed desktop-only as a performance choice,
not because an iPhone cannot run WebGL. D-022 later gave phones a lighter stage.

## D-014: Prototype a memorable opening

A clean portfolio was not enough for what I wanted. I ran an experience
study and chose B, Pass Through, after comparing three desktop concepts and a
mobile study. The TestPulse sequence uses real exported observations, including
their dates and unknown retry counts.

## D-015: Keep scrolling native

I chose a bounded scroll sequence with immediate work and resume access. GSAP
controls the DOM motion; it does not replace the browser's scrolling. Bookmarks,
history, keyboard navigation, and a complete static version remain part of the
experience. The isolated `/experience` route records that study.

## D-016: Reject the renderer that missed the concept

The rendered prototype did not match the artwork I had chosen. Its reflections looked
pale and its gold planes looked opaque. I rejected that finish instead of accepting
it because it was technically 3D. The rejected studies and review records remain
part of the project history.

## D-017: Preserve the cinematic artwork

I chose the layered artwork treatment when the renderer could not reproduce the
material I had chosen. Desktop advanced through the intact plate; mobile used
separate transparent layers. This preserved the look I actually wanted and removed
the prototype renderer and its unused maps. The `/experience` study still uses
this treatment; D-022 replaced it on the homepage.

## D-018: Turn the opening into TestPulse

Seeing TestPulse enlarge and then appear again as another heading felt wrong.
I wanted one continuous handoff: the hero copy fades away, the same TestPulse
heading grows, and the full project introduction appears before normal scrolling
continues. That transition was the main moment of the homepage until D-022.

## D-019: Carry the experience through the site

I wanted the rest of the homepage and the case studies to match the opening.
Each chapter got motion related to its content: booking contention, LLM
comparison, experience, inspection, and contact. Case-study prose stays steady
so the animation does not interfere with reading. Lando Norris's site informed
the ambition and pacing; its assets and content were not reused.

## D-020: Fix cutoffs, repetition, and unclear project identities

My preview review found chopped glass artwork, repeated slab shapes, and project
names that needed more explanation. I chose a related material family: a gate
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
I checked the corrected preview on desktop and mobile and kept it.

## D-021: Verify the release and preserve the current site

Before production I ran one final review covering Windows, browsers, security,
source quality, and the repository itself. Windows now has a dedicated
Chrome, Edge, and Firefox job. The existing Linux desktop, tablet, and mobile
coverage stays in place. pnpm's built-in shell emulator makes the same commands
work on Windows without another dependency.

The production source of that time is saved on the locked branch
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

I kept production unchanged until I released this version on 2026-10-28 as
`qa-portfolio-v1.1.0`.

## D-022: Take the homepage to a live stage

The site I had released was still a set of stills. I wanted a new version
that reaches for what makes Lando Norris's site memorable: one signature object
that reacts to the visitor, a page that plays like a film as it scrolls, two
typographic voices, and a personal mark. Its assets and content were not reused.

I chose the inspection lens. A chrome and amber-glass object stands for the
system under test, and the cursor is a lens that leaves a fluid X-ray trail,
showing the wireframe and flagged defects beneath the polished surface. On scroll
the same stage becomes TestPulse's three recorded runs, the Cal.diy gate with its
twenty contenders, the paired LLM prisms, and the archive fan. I rejected a
portrait-led opening because my current photo cannot be cut out cleanly.

I also chose to keep the same world and make it bolder. Graphite, warm white, and
amber stay. The page first moved through a paper chapter for production experience
and an amber chapter for the testing approach (D-023 withdrew both), and Bodoni
Moda italic joins Alexandria inside the large headlines.

This reverses three earlier positions on purpose. The 3D scene is no longer an
optional study behind a button (D-008, D-020): it is the homepage. Phones now run
a lighter version of it instead of none (D-013). Wide screens with a mouse get
momentum scrolling from GSAP's own ScrollSmoother, which still drives the native
scroll position, so bookmarks, history, and keyboard scrolling keep working
(D-015). No motion library was added; the one new package is the italic typeface.

Every figure and boundary on the page is unchanged: the TestPulse snapshot and
unknown retry counts, Cal.diy v6.2.0, the 82% agreement with 45 blind labels, the
judge outside CI gates, and the Blue Ribbon figures with their scope. The defect
markers in the X-ray view are abstract and carry no invented identifiers.

Reduced motion, no JavaScript, and a missing WebGL2 context each keep the complete
page with the hero still. Enlarged text releases pinned scenes. Any input ends
the opening handoff at once.

I built this version on the branch `dev/portfolio-v2` and kept the older
homepage components until I was sure of the replacement. D-024 removed them, and
D-029 records the release. Measured results and open findings belong in
[verification](docs/verification.md).

## D-023: Corrections after my review of the live stage

I reviewed the local preview on 2026-11-17, kept the direction, and made these
corrections.

The stage has to survive scrolling back up. Once, after I reached the bottom and
scrolled up again, the objects were gone until I reloaded. The cause was the
renderer's own safeguard: a short run of long frames ended the stage for the rest
of the visit. Now a renderer that has already run well is only stepped down by a
stall, and it returns to full quality when the frame rate recovers. Only a
renderer that never holds a usable rate, or that stays slow for several seconds
at the lighter level, is handed back to the still. On a real GPU a handed-back
stage is offered again after a twelve second rest, up to two times in a visit,
so the objects come back without a reload. Software rendering is not retried.

I withdrew the paper chapter and the amber chapter, which reverses that part
of D-022. Their colour felt outside the homepage's theme and their type was too
large. Experience and Approach now sit on the same graphite as the rest of the
page, amber stays for figures and emphasis, and their titles use the chapter
scale instead of a second hero scale.

Experience lists Blue Ribbon and Atos only. I removed ENPPI and MBG Developments
from the site because they are not software testing roles. The resume PDF is
unchanged.

The work archive and the three case studies take the homepage's style: the same
header with Experience and the resume, the Bodoni Moda voice in their headings,
the heavier titles, and the same closing. The not-found page follows them. They
remain reading pages without the 3D stage.

Carrying this out meant three more choices. D-024 replaced the second, and I
kept the other two in D-028:

- With two roles, the sideways career track is gone. The roles are two rows.
- The stage fades out above Experience and rests until Approach ends.
- The Cal.diy case study's evidence panel moved from paper to graphite, so no
  page keeps a paper field. Its two retained accessibility failures keep their
  own tone and their wording.

Every figure, scope note, and evidence boundary is unchanged. Measured results
are in [verification](docs/verification.md).

## D-024: Stage Experience and Approach, and fix Back to top

After the D-023 corrections, two more things needed work on 2026-11-17.

Back to top sent me to the Cal.diy chapter. The cause was not the scroll target.
After an in-page jump the page hands keyboard focus to the destination, and the
smooth-scroll library centres whatever receives focus. For Back to top the
destination is the whole main content, whose centre is the Cal.diy chapter. It
only showed in a window shorter than about 900 pixels, which is any ordinary
browser window. The page now tells the library to leave focus alone during its
own jumps. The other navigation links were being re-centred the same way and now
land with their chapter at the top.

Experience and Approach had no held scroll sequence and no object, unlike every
chapter before them. I added both, with restraint.

- Experience holds while its four figures resolve one at a time. Beside them a
  column of chrome slabs with lit seams builds in step. It has twenty-two slabs
  for the stated twenty-two modules and encodes nothing else. The two roles then
  stay on flat graphite with the stage at rest, because that is the part a
  recruiter reads line by line.
- Approach holds while its four steps take focus one at a time. The four-layer
  object returns laid open, and the lens moves to a flagged point on a different
  layer for each step. Moving the pointer takes the lens back.

This supersedes the D-023 choice to rest the stage through both chapters. No
copy, figure, or scope note changed, and no number is animated: a counting
figure would show values that are not facts.

## D-025: Keep the mobile performance gate with a renderer on phones

D-022 put a lighter 3D stage on phones for the first time. The mobile Lighthouse
gate then failed where it had always passed: the homepage scored 62 against the
required 90, with 4.1 seconds of blocked main thread, and the homepage and two
case studies missed the 2.5 second paint limit. I did not relax the gate. These
changes brought every route back inside it, and they change what a phone visitor
sees:

- On phones and touch layouts the homepage has no opening curtain and no opening
  animation. The first screen is painted once and stays as it was painted.
- Phones show a still until the visitor's first touch, scroll, or key. The 3D
  stage loads then, and the still fades out when its first frame is drawn. A
  visitor who only reads the first screen never downloads the renderer. On
  portrait phones and tablets the still is the live stage's own settled opening
  frame, captured from the stage and placed where the live object appears,
  because the original hero raster cropped to an unreadable band at that width.
  The same still serves those screens with reduced motion or without WebGL.
  Wide screens keep the original hero still.
- On every layout the page's own scripts load after the browser reports the first
  paint, and the scroll choreography is built chapter by chapter in small turns
  instead of in one long task.
- The reading pages fetch the Bodoni Moda face shortly after load instead of
  before the first paint, because their first screen does not depend on it.
  Until it arrives, and without scripts, their headings use the nearest
  installed serif.
- The work-page hero images are encoded at quality 78 instead of 85, and the
  second TestPulse plate loads at low priority.

Two rounds of design review led to these refinements:

- The LLM agreement track no longer grows from zero beside the 82 percent it
  states.
- The archive lettering is drawn as faint solid letters, because outlined
  variable-font letters showed their inner contours.
- The LLM prisms stay inside the window and clear of the title.
- On wide screens the three TestPulse runs sit directly over their run columns,
  and the row is closer to them. On narrow screens the three runs stack in the
  window above the copy, first run on top, in the order of the list beneath.
- Edges are smoothed wherever multisampling is off (phones, and the lighter
  quality level), and a stall no longer leaves the stage at the lighter level for
  the rest of a visit: full quality returns, each time after a longer healthy
  stretch.
- Case-study prose is narrowed to about 69 characters a line. Headings there
  arrive as their slot enters the window, because a heading that waited further
  up left a gap in text that was already readable.
- The narrow archive ends with its copy instead of a third of a screen of
  nothing.
- Date ranges use an en dash. I checked the Atos dates and the email address
  against my resume.

Two questions stayed open here, and I settled both later:

- Whether the sub-page hero rasters should be re-made from the live stage, so the
  stage's material and theirs match. They were, in D-026.
- Whether the TestPulse tiles should show more of their thickness. Tilting them
  back to show it made the glass mirror the studio light, so the amber went to
  cream and the failed run to pale pink. I kept the original tilt in D-027.

## D-026: Reading pages show stills of the live stage

The reading pages still opened with the earlier generated renders, brushed
chrome and amber glass under studio light, while the homepage stage is black
lacquer and amber glass on graphite. On 2026-11-17 I
compared both on every reading page, at desktop and phone sizes, and chose stills
of the stage for all four.

- The work archive shows the stage's evidence fan. TestPulse shows its three
  recorded runs with the failed run lit, Cal.diy the contenders jammed in the lit
  gate, and the LLM evaluation the paired prisms with the signal between them.
- Each still is captured from the live stage near the end of its chapter and cut
  out on a transparent ground. Nothing is retouched. The stills are quieter and
  less detailed than the generated plates, because they are what the real-time
  stage draws.
- TestPulse now has one plate instead of two stacked bars. The faint fan behind
  the closing of the experience study is the same still.
- The earlier archive, Cal.diy, and LLM plates are removed. Their generation
  records stay in `.impeccable/assets`, beside the capture records of the new
  stills and of the D-025 phone and tablet stills.

Measured results are in [verification](docs/verification.md).

## D-027: Keep the TestPulse tiles at their original tilt

D-025 left open whether the three TestPulse tiles should show more of their
thickness. Tilting them back to show it made the glass mirror the studio light,
so the amber went to cream and the failed run to pale pink. On 2026-11-17 I chose
to keep the original tilt. Nothing changes in the stage or in the TestPulse still.

## D-028: Mobile corrections after my preview review

On 2026-11-19 I reviewed the hosted preview on desktop and on my phone. I kept
D-024, D-025, and the two remaining D-023 choices (the roles as two rows, the
Cal.diy evidence panel on graphite). Desktop stays as it is. Two things on the
phone were wrong:

- The four layer notes (web, mobile, API, data) took turns in one place, so an
  ordinary scroll flicked through them before they could be read. On narrow
  screens they are now a list: each note arrives as it enters the window and
  stays while it is in view, and the word it explains lights with it, as does
  the matching plate of the object. Wide screens keep the held chapter with one
  note at a time.
- The middle TestPulse run turned red only after the runs had left the screen.
  On narrow screens each project object now plays its sequence while its window
  at the top of the chapter is on screen: the runs light in order with the
  failed one in the middle of the screen, the Cal.diy contenders crowd into the
  gate, and the LLM prisms converge. Between the layers and the runs, the object
  no longer slides behind the notes; it shrinks away and grows back in the runs'
  window.

No copy, figure, or scope note changed. Measured results are in
[verification](docs/verification.md).

## D-029: Release the live stage

On 2026-11-19 I rechecked the preview on my phone and released the new version
once the hosted checks passed. Before production changed, I saved the version it
replaced on the locked branch `backup/production-2026-11-19`, beside its existing
GitHub release, and its Vercel deployment stays available for recovery. The release, its live checks, and the recovery steps are in
[release and recovery](docs/release.md) and [verification](docs/verification.md).

