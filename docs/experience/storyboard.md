# Experience study: opening into TestPulse

Status: B selected; the owner authorized the cinematic layered treatment after
rejecting the hosted live renderer on 2026-10-23. Isolated prototype only.
Owner request confirmed on 2026-10-23. Baseline: 40a24f16ec037658fb13d5509dd1ba59573f480a.
This document retains the concept-stage choices and projected beats. D-018 in
DECISIONS.md and the completed design record govern the implemented continuous
arrival, including its measured travel and full hero fade.

## The job

A visitor should remember inspecting something beneath its surface. The opening
and TestPulse become one continuous experience, while role, work, resume, and
contact remain understandable on first arrival. This is an expansion of the
approved graphite, amber, chrome, and broad-type world, not a new brand identity.

The proposed motion is scroll-controlled and reversible. Normal page scrolling
remains native. There is no forced introduction, scroll-speed replacement,
mandatory interaction, cursor replacement, sound, or continuous decorative loop.

## Three staging choices

| Choice | Opening mechanism | Connection to TestPulse | Main uncertainty |
| --- | --- | --- | --- |
| A: Unfold | Five surfaces open around a shared edge into a mechanical fan. | The lower plane aligns with the first evidence panel. | The opening fan could read as hardware rather than inspection. |
| B: Pass Through | A close viewing slot opens between the material layers; the camera advances a short distance. | The TestPulse title appears through that separation, then becomes ordinary readable HTML. | The optical transition needs to remain comfortable and smooth on phones. |
| C: Follow | One compact specimen travels from the opening into the project composition. | Its position anchors the change of section. | The composition remains closest to the current site and may feel too conservative. |

B is selected: the owner explicitly chose Pass Through on 2026-10-23. It makes
inspection the act of entering the portfolio and makes the biggest structural
departure from the incumbent. Approval covers the isolated prototype and its
mobile adaptation, not production integration or a release.

Concept artifacts: [A: Unfold](../../.impeccable/mocks/experience/unfold.png),
[B: Pass Through](../../.impeccable/mocks/experience/pass-through.png),
[C: Follow](../../.impeccable/mocks/experience/follow.png), and the
[mobile comparison](../../.impeccable/mocks/experience/mobile-study.png).
Exact prompts and approval sidecars are stored beside the four generated images.
The current comparison is https://myehia.vercel.app.

The PNGs show intermediate composition frames. They do not prove working motion,
material parity in a browser, loading speed, or physical-device compatibility.
Generated TestPulse lettering is a placement reference; it will be real HTML,
without image-generated blur, in the prototype.

## Opening storyboard

The original three choices below preserve the concept comparison. B now uses
the approved artwork itself as one continuous field. A short visual push toward
its existing viewing slot and independent semantic title movement retain the
material finish. Mobile separates the approved upper and lower cutouts. This replaces the rejected
live 3D implementation. It does not promise new camera angles or physical optics.

The percentages describe sequence progress, not elapsed time. The visitor chooses
the pace and can reverse direction. A typical deliberate viewing might take
roughly 15 to 20 seconds including TestPulse; no timer enforces that duration.

| Beat | Desktop | Mobile | What the visitor understands |
| --- | --- | --- | --- |
| Arrival, 0% | Name/navigation, the existing headline, QA role, and two immediate actions frame a large compact specimen. | The same information precedes a portrait-safe material field; both actions fit in the first composition. | Who this is and how to reach the work or resume. |
| Separation, 15-40% | Planes open into the selected fan, slot, or travelling arrangement. The headline remains legible in a clear region. | Separation is primarily vertical within the portrait field; it is not a cropped desktop camera path. | The object has an interior structure worth inspecting. |
| Inspection, 40-70% | B uses one short advance through an open slot. A unfolds around its edge; C follows the compact object. | B opens the slot as a mask and moves the layers through a much shorter depth range. A opens a compact vertical fan; C moves the specimen down the composition. | Looking beneath the surface reveals more useful information. |
| Handoff, 70-100% | TestPulse appears in the material opening and resolves to a readable section with evidence links. | The project title and evidence replace the material field in normal document order. | The visual idea now connects to an actual QA project. |

The initial storyboard targeted about one extra desktop viewport and half an
extra mobile viewport. The D-018 continuous arrival instead measures the scene
in pixels: its opening is 2.4 scene heights on desktop and 2.2 on compact screens.
After subtracting the pinned scene, travel is 1.4 and 1.2 scene heights. The
completed design record documents these current values and their limitations.
Work/Resume links bypass the sequence immediately. Deep links begin in their
readable destination, without forcing the visitor back through the opening.

## TestPulse storyboard

This sequence uses a frozen public export, not invented failures or live data.
The selected test is test_booking_lifecycle in caldiy-api-v2. Its exported history
contains different outcomes at the same commit. The detailed source record is
in docs/experience/testpulse-evidence.json.

| Beat | Desktop | Mobile | Evidence and copy boundary |
| --- | --- | --- | --- |
| Ask | The existing line, A red test deserves a better explanation, sits beside the failed observation. | The question and failed observation stack in reading order. | Show run 1224 as Failed, dated 14 Sep 2026. Do not infer a cause. |
| Compare | Expand to the three selected observations: 1220 Passed, 1224 Failed, 1364 Passed. | Reveal the same three observations vertically, with dates and explicit status words. | Keep chronological spacing honest; events were not three immediate retries. |
| Inspect | A shared commit label connects the observations as the material layers settle. | The commit label follows the three observations; no hover is required. | Same commit 5c0869a. Retry counts are unknown, not zero. |
| Explain | The evidence label Same-commit inconsistency and a short explanation appear. | The same explanation remains fully readable beneath the observations. | This supports an instability signal, not proof of root cause or a repaired test. |
| Open | Read the case study and Open dashboard remain direct links. | Both actions are touch-sized and follow the explanation. | Keep Recorded CI snapshot and the export date visible. |

The detailed export has 81 timeline observations, while its metrics are computed
over a 50-run window. The story uses a labeled three-observation selection and
does not conflate those scopes or turn the 98% window pass rate into a lifetime
claim. Other green suites are retained as green. No result is recolored for drama.

## Device and accessibility treatments

- Desktop prototype: preserve the approved plate as one continuous image field.
  GSAP advances toward its existing viewing slot with native scroll. No canvas,
  live material rendering, extra motion library, or continuous idle loop.
- Mobile prototype: prove the composition with bounded material transforms and
  a short sequence of rendered layers or frames. Live transmission is an option
  to measure, not an assumption or requirement. Keep a native vertical scroll.
- Reduce Motion: show the separated specimen and complete TestPulse evidence
  without camera travel, pinning, or delayed text. Preserve clear interaction feedback.
- No JavaScript, no WebGL, failed assets: retain complete semantic content,
  a meaningful still, direct actions, and the evidence explanation.
- Keyboard: links and any optional inspection control follow normal tab order;
  decorative rendering does not capture focus or gestures.
- Resize, orientation, interruption, and history restoration must not reset the
  reading position, replay completed content, or leave an active animation loop.

## Prototype boundary and decision

After composition approval, build only the opening-to-TestPulse study in an
isolated preview. Include a direct comparison link to the current production
homepage. Do not replace production, rewrite the whole homepage, or add motion
to every section during this step.

Judge the prototype against the current site on memorable motion, QA relevance,
readability, touch comfort, responsiveness, and runtime cost. Keep the approved
performance/accessibility contract. A high Lighthouse score alone does not prove
smooth motion; also inspect frame pacing, asset requests, and active-scene work.
The owner's iPhone review remains a physical-device check, not browser emulation.

The output of that comparison is a decision to carry forward, revise, or reject
the sequence. A successful study authorizes a later scoped integration proposal;
it does not silently approve a production release.
