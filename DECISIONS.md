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

## D-022: Take the homepage to a live stage

The accepted site was still a set of approved stills. I asked for a new version
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
amber stay. The page now moves through a paper chapter for production experience
and an amber chapter for the testing approach, and Bodoni Moda italic joins
Alexandria inside the large headlines.

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
page with the approved still. Enlarged text releases pinned scenes. Any input ends
the opening handoff at once.

This version lives on the local branch `dev/portfolio-v2`. It has not been pushed
or deployed, and the older homepage components are still in the repository until
I approve the replacement. Measured results and open findings belong in
[verification](docs/verification.md).

## D-023: Corrections after my review of the live stage

I reviewed the local preview on 2026-11-17 and kept the direction. These
corrections followed.

The stage has to survive scrolling back up. Once, after I reached the bottom and
scrolled up again, the objects were gone until I reloaded. The cause was the
renderer's own safeguard: a short run of long frames ended the stage for the rest
of the visit. Now a renderer that has already run well is only stepped down by a
stall, and it returns to full quality when the frame rate recovers. Only a
renderer that never holds a usable rate, or that stays slow for several seconds
at the lighter level, is handed back to the still. On a real GPU a handed-back
stage is offered again after a twelve second rest, up to two times in a visit,
so the objects come back without a reload. Software rendering is not retried.

The paper chapter and the amber chapter are withdrawn, which reverses that part
of D-022. Their colour felt outside the homepage's theme and their type was too
large. Experience and Approach now sit on the same graphite as the rest of the
page, amber stays for figures and emphasis, and their titles use the chapter
scale instead of a second hero scale.

Experience lists Blue Ribbon and Atos only. ENPPI and MBG Developments are
removed from the site because they are not software testing roles. The resume
PDF is not changed by this.

The work archive and the three case studies take the homepage's style: the same
header with Experience and the resume, the Bodoni Moda voice in their headings,
the heavier titles, and the same closing. The not-found page follows them. They
remain reading pages without the 3D stage.

Three choices were made while carrying this out, and I have not reviewed them yet:

- With two roles, the sideways career track is gone. The roles are two rows.
- The stage fades out above Experience and rests until Approach ends.
- The Cal.diy case study's evidence panel moved from paper to graphite, so no
  page keeps a paper field. Its two retained accessibility failures keep their
  own tone and their wording.

Every figure, scope note, and evidence boundary is unchanged. Measured results
are in [verification](docs/verification.md).

## D-024: Stage Experience and Approach, and fix Back to top

After the D-023 corrections I pointed out two things on 2026-11-17 and delegated
the second as a decision.

Back to top sent me to the Cal.diy chapter. The cause was not the scroll target.
After an in-page jump the page hands keyboard focus to the destination, and the
smooth-scroll library centres whatever receives focus. For Back to top the
destination is the whole main content, whose centre is the Cal.diy chapter. It
only showed in a window shorter than about 900 pixels, which is any ordinary
browser window. The page now tells the library to leave focus alone during its
own jumps. The other navigation links were being re-centred the same way and now
land with their chapter at the top.

Experience and Approach had no held scroll sequence and no object, unlike every
chapter before them. The decision, made for me and still mine to overrule: add
both, with restraint.

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
case studies missed the 2.5 second paint limit. The gate was not relaxed. These
changes brought every route back inside it, and they change what a phone visitor
sees, so they are listed for my review:

- On phones and touch layouts the homepage has no opening curtain and no opening
  animation. The first screen is painted once and stays as it was painted.
- Phones show a still until the visitor's first touch, scroll, or key. The 3D
  stage loads then, and the still fades out when its first frame is drawn. A
  visitor who only reads the first screen never downloads the renderer. On
  portrait phones and tablets the still is the live stage's own settled opening
  frame, captured from the stage and placed where the live object appears,
  because the approved hero raster cropped to an unreadable band at that width.
  The same still serves those screens with reduced motion or without WebGL.
  Wide screens keep the approved hero still.
- On every layout the page's own scripts load after the browser reports the first
  paint, and the scroll choreography is built chapter by chapter in small turns
  instead of in one long task.
- The reading pages fetch the Bodoni Moda face shortly after load instead of
  before the first paint, because their first screen does not depend on it.
  Until it arrives, and without scripts, their headings use the nearest
  installed serif.
- The work-page hero images are encoded at quality 78 instead of 85, and the
  second TestPulse plate loads at low priority.

Two rounds of the finish review led to these:

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
- Date ranges use an en dash. The Atos dates and the email address were checked
  against my resume and are as there.

Still mine to decide, and not changed:

- Whether the sub-page hero rasters should be re-made from the live stage, so the
  stage's material and theirs match.
- Whether the TestPulse tiles should show more of their thickness. Tilting them
  back to show it made the glass mirror the studio light, so the amber went to
  cream and the failed run to pale pink. They keep the approved tilt for now.

## D-026: Reading pages show stills of the live stage

The finish review left the reading pages' plates to me. They were the earlier
generated renders, brushed chrome and amber glass under studio light, while the
homepage stage is black lacquer and amber glass on graphite. On 2026-11-17 I
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

Still mine to decide: whether the TestPulse tiles should show more of their
thickness, and whether D-024, D-025, and the choices D-023 made in implementation
stand. Measured results are in [verification](docs/verification.md).

## D-027: Keep the TestPulse tiles at their approved tilt

D-025 left open whether the three TestPulse tiles should show more of their
thickness. Tilting them back to show it made the glass mirror the studio light,
so the amber went to cream and the failed run to pale pink. On 2026-11-17 I chose
to keep the approved tilt. Nothing changes in the stage or in the TestPulse still.

Still mine to decide: whether D-024, D-025, and the choices D-023 made in
implementation stand.

