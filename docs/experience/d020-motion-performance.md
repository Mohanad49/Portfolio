# D-020 motion and desktop performance

Application: abe295742909c1f1a3110daf404d2f5d19b66523.
This is a controlled local comparison, not a physical-device certification.

The owner's rejected preview used two large cutouts as repeated clipped fields.
Later reveals mostly moved 28px at the viewport edge. The revised work uses the
approved gate, paired prisms, and fan, with a reserved complete silhouette and a
finite entry/exit before reading surfaces. Project names and QA descriptions are
immediate. The Cal.diy homepage no longer starts with a full-bleed paper edge;
its case study retains the actual light audit panel and red failures.

## Choreography

- Cal.diy: one fitted native-scroll chapter, gate travel/rotation/scale, twenty
  attempts resolving to the one retained booking. Recorded counts stay fixed.
- LLM: paired optics converge; the same 82% measurement settles beside its
  45-label scope and gate exclusion. No invented numerical count-up.
- Both desktop stages use 170svh only when all content fits. Compact, oversized,
  no-JavaScript, and reduced-motion paths preserve ordinary flowing content.
  Stage resize observation handles live text enlargement without scroll traps.
- Cases: distinct materials settle into their own evidence, then prose stays
  steady while headings/rules and reading progress provide continuity.
- Archive: the complete fan rotates into a readable, descriptive case list.
- Production: the existing trace follows the disclosures; Approach and portrait
  transitions keep the material world beyond the selected work.

## Readiness and rendering are separate

The initial desktop handoff uses Mohanad's identity and existing colors. It waits
only for actual hero/type preparation and module initialization, with a 1600ms
release ceiling. It yields immediately to interaction and skips repeat, history,
reduced-motion, and static access. There is no percentage or fixed minimum wait.
The indeterminate pulse pauses as soon as its readiness state ends.

The delayed-module regression exposed WebKit waiting for the whole font-set
readiness promise while the document was still loading. Both required fonts
were already loaded. Opening and general motion now share explicit preparation
of Alexandria 700 and Manrope 400 through
[FontFaceSet.load](https://developer.mozilla.org/en-US/docs/Web/API/FontFaceSet/load),
without depending on unrelated document resources. The
[font loading specification](https://drafts.csswg.org/css-font-loading/#dom-fontfaceset-ready)
describes the broader readiness promise. All nine browser/viewport configurations
pass the held-module regression with the original range and reversal assertions.

The costlier Approach renderer is an explicit optional action. Its static image
stays visible during preparation, keyboard focus moves only from the still-focused
launch action, and the visitor can return to the artwork. This removes automatic
renderer initialization from ordinary scrolling. Starting 3D may still have a
real compile/setup cost; its local preparation state acknowledges that cost.

The strategy follows the distinction between prioritizing needed resources and
reducing runtime rendering work described by [critical-resource loading](https://web.dev/articles/preload-critical-assets)
and [rendering performance](https://web.dev/articles/rendering-performance).
Native-scroll progress uses the existing [GSAP ScrollTrigger](https://gsap.com/docs/v3/Plugins/ScrollTrigger/);
no scroll-smoothing or second animation library was added.

## Retained measurements

Method: headless Chromium, 1440x900, device scale 1, same localhost preview and
software-WebGL launch option. Each route waits for current art/type, then uses
the same 2300ms native smooth-scroll sampling windows. No parallel browser check
or capture was run during the comparison. Results are single controlled runs,
not field percentiles or a 60fps guarantee.

| Route | Before largest frame gap | After largest frame gap | Before script time | After script time |
| --- | ---: | ---: | ---: | ---: |
| Homepage, three sampled regions | 2099.8ms | 33.4ms | 751.9ms | 67.0ms |
| Work archive | 33.4ms | 33.4ms | 16.9ms | 18.4ms |
| Cal.diy case | 33.4ms | 33.4ms | 18.1ms | 19.9ms |

The removed homepage stall coincides with the former automatic scene activation.
An earlier amended Cal.diy sample at de818d4 retained a 50ms outlier in
performance-after-final.json. The current sample has no gap above 34ms, but
these single runs are not evidence of a universal frame-rate improvement. The
current raw report records per-region counts, p95 gaps, aggregate task/layout/
style work, and empty page-error logs. No startup long tasks were recorded.

The current homepage readiness class is observed at 30.8ms, releases at 258.1ms,
and finishes its fade at 582.9ms in this fast local cold navigation. These
navigation-relative values demonstrate actual readiness, not a promised hosted
loading time. A separate throttled startup capture belongs to the visual packet.

Observed initial transfer bytes rise from 433,687 to 492,537 on the homepage,
fall from 234,469 to 176,257 on the archive, and fall from 234,939 to 226,794 on
the Cal.diy case. The new distinct artwork has a measured homepage byte cost.
Responsive WebP delivery, native alpha, lazy delivery, and pre-entry decode retain
the existing mobile Lighthouse gates. Hosted medians are owned by the current
verification record.

Raw, ignored evidence:

- .research/d020/performance-before.json
- .research/d020/performance-after-final.json
- .research/d020/performance-after-fonts.json
- .research/d020/performance-comparison.json
- .research/d020/webkit-held-font-state.json
- .research/d020/module-race-final.json
- .impeccable/review/d020/capture-manifest.json

The normal-speed native-wheel videos and first/middle/settled frames demonstrate
the authored relationships. They are test-browser evidence, not recordings from
the owner's iPhone or a guarantee about every desktop GPU.
