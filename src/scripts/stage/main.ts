import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import { SplitText } from 'gsap/SplitText';
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin';
import { sceneState, stationIndex, type Station } from '../../lib/scene-state';
import { preserveReadingPosition } from '../../lib/reading-position';

gsap.registerPlugin(ScrollTrigger, ScrollSmoother, SplitText, DrawSVGPlugin);

const root = document.documentElement;
const all = <T extends Element = HTMLElement>(selector: string, scope: ParentNode = document) => [...scope.querySelectorAll<T>(selector)];
const one = <T extends Element = HTMLElement>(selector: string, scope: ParentNode = document) => scope.querySelector<T>(selector);

// Local time in Cairo beside the status line. Plain text, refreshed twice a minute.
function startClock() {
  const clock = one('.hero-clock');
  if (!clock) return;
  const format = new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', timeZone: clock.dataset.zone ?? 'Africa/Cairo' });
  const tick = () => { clock.textContent = `${format.format(new Date())} local`; };
  tick();
  window.setInterval(tick, 30_000);
}

// Fonts and the first stage frame (or the decision that there is no stage) end the handoff.
function whenPrepared() {
  const fonts = Promise.all([
    document.fonts.load('700 1em "Alexandria Variable"'),
    document.fonts.load('400 1em "Manrope Variable"'),
    document.fonts.load('italic 500 1em "Bodoni Moda Variable"'),
  ]).catch(() => undefined);
  const stage = new Promise<void>(resolve => {
    // Phones start their stage after the page is idle, so the handoff does not wait for it.
    if (sceneState.ready || lite.matches) { resolve(); return; }
    const done = () => { window.removeEventListener('scene:ready', done); window.removeEventListener('scene:unavailable', done); resolve(); };
    window.addEventListener('scene:ready', done);
    window.addEventListener('scene:unavailable', done);
    window.setTimeout(done, 2800);
  });
  return Promise.all([fonts, stage]);
}

startClock();

// Phones and touch layouts: a lighter stage that starts on first input, and no opening curtain.
const lite = matchMedia('(max-width: 1023px), (pointer: coarse)');
const queries = {
  motion: matchMedia('(prefers-reduced-motion: no-preference)'),
  wide: matchMedia('(min-width: 1024px)'),
  fine: matchMedia('(hover: hover) and (pointer: fine)'),
};
const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming | undefined;
const reading = preserveReadingPosition(navigation?.type === 'reload' || navigation?.type === 'back_forward');
let opened = false;
let rebuild = () => {};
let ensureBuilt = () => {};
// The current build's in-page jump. The opening uses it, and a rebuild replaces it.
let jumpTo: (hash: string, instant?: boolean) => boolean = () => false;
// Set by the opening: brings every opening tween to its end, so nothing it hid stays hidden.
let finishOpening = () => {};
// The page is built over several turns. Work that needs every chapter in place waits here.
let building = false;
const afterBuild: Array<() => void> = [];
const whenBuilt = (done: () => void) => { if (building) afterBuild.push(done); else done(); };

// A stage is pinned only while its whole content fits the viewport, so enlarged text is never clipped.
// The decision is taken before any pin exists, when a stage still has its natural height.
const fits = (stage: HTMLElement) => stage.scrollHeight <= window.innerHeight + 2;
// What a pin decision depends on. When it changes, the page is rebuilt and decides again.
// Narrow layouts never pin, so nothing there asks for a rebuild: a phone's collapsing address bar
// changes the viewport height on every scroll and must not disturb the page.
const environment = () => (queries.wide.matches ? `${getComputedStyle(root).fontSize}|${window.innerWidth}x${window.innerHeight}` : 'flow');
// Stages that fitted when measured but outgrew the viewport once their text was prepared.
// They stay unpinned for as long as the environment is the same, so the decision cannot oscillate.
const outgrown = new Set<HTMLElement>();
let outgrownFor = '';

function setup({ motion, wide, fine }: { motion: boolean; wide: boolean; fine: boolean }) {
  if (!motion) {
    root.classList.remove('is-staged', 'is-preparing');
    root.classList.add('is-ready');
    finishOpening();
    if (!opened) { opened = true; reading.ready(); }
    return () => {};
  }
  root.classList.add('is-staged');
  if (opened) sceneState.intro = 1;
  const disposers: Array<() => void> = [];
  const listen = (target: Window | Element, type: string, handler: EventListener, options?: AddEventListenerOptions) => {
    target.addEventListener(type, handler, options);
    disposers.push(() => target.removeEventListener(type, handler, options));
  };
  let smoother: ScrollSmoother | null = null;
  // True while this script hands focus to a target it is already scrolling to. The smoother
  // otherwise centres whatever receives focus, which sent "Back to top" to the middle of the page.
  let placingFocus = false;
  const pinnable = all('.layers-stage, .project-stage, .career-stage, .method-stage');
  // These change layout when they hold, so they are measured in the layout they would hold in.
  const holdable = all('.layers-stage, .career-stage, .method-stage');
  holdable.forEach(stage => stage.classList.toggle('is-held', wide));
  const decidedFor = environment();
  if (outgrownFor !== decidedFor) { outgrown.clear(); outgrownFor = decidedFor; }
  const pins = new Map(pinnable.map(stage => [stage, wide && !outgrown.has(stage) && fits(stage)] as const));
  holdable.forEach(stage => stage.classList.toggle('is-held', pins.get(stage) === true));
  // If some stages cannot hold, their objects would sit behind running text: quiet the stage.
  root.classList.toggle('stage-loose', wide && [...pins.values()].includes(false));

  const setLocal = (name: Station) => (self: ScrollTrigger) => { sceneState.local[stationIndex(name)] = self.progress; };

  // The choreography is built chapter by chapter, in page order. Whenever the work so far has
  // taken more than a few milliseconds the next chapter waits a turn, so setting the page up
  // never holds the main thread for long, however slow the device.
  const context = gsap.context(() => {});
  const slices: Array<() => void> = [];
  const slice = (build: () => void) => { slices.push(build); };
  let alive = true;

  slice(() => {
  smoother = wide && fine
    ? ScrollSmoother.create({ wrapper: '#smooth-wrapper', content: '#smooth-content', smooth: 1.05, smoothTouch: false, effects: false, onFocusIn: () => !placingFocus })
    : null;
  });

  slice(() => {
  /* Hero: the two lines part as the object takes the stage. */
  const hero = one('.hero');
  if (hero) {
    gsap.timeline({ scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: true } })
      .to('.hero-line--first', { xPercent: -14, opacity: 0, ease: 'none' }, 0)
      .to('.hero-line--second', { xPercent: 14, opacity: 0, ease: 'none' }, 0)
      .to('.hero-foot', { yPercent: 40, autoAlpha: 0, ease: 'none' }, 0);
  }

  });

  slice(() => {
  /* Layers: the sentence lights word by word while the matching plate lifts out of the stack. */
  const layers = one('.layers');
  const layersStage = one('.layers-stage', layers ?? undefined);
  if (layers && layersStage) {
    const words = all('.layers-word', layers);
    const notes = all('.layers-notes li', layers);
    const plain = words.filter(word => !word.classList.contains('layers-key'));
    const keys = all('.layers-key', layers);
    // Dim words stay above 3:1 against graphite, so the sentence is readable before it is lit.
    const dim = 0.45;
    if (pins.get(layersStage)) {
      // Held, the four notes share one place and take turns while the stage stays put.
      gsap.set(words, { opacity: dim });
      gsap.set(notes, { opacity: 0, y: 18 });
      const timeline = gsap.timeline({ defaults: { ease: 'none' } });
      plain.slice(0, 3).forEach((word, index) => timeline.to(word, { opacity: 1, duration: 0.04 }, 0.01 + index * 0.035));
      const and = plain[3];
      if (and) timeline.to(and, { opacity: 1, duration: 0.04 }, 0.7);
      keys.forEach(word => {
        const index = Number(word.dataset.layer);
        const from = 0.14 + index * 0.2;
        timeline.to(word, { opacity: 1, duration: 0.05 }, from - 0.03);
        const note = notes[index];
        if (!note) return;
        timeline.to(note, { opacity: 1, y: 0, duration: 0.05 }, from);
        if (index < 3) timeline.to(note, { opacity: 0, y: -18, duration: 0.04 }, from + 0.17);
      });
      timeline.to({}, { duration: 0.02 }, 0.98);
      ScrollTrigger.create({ trigger: layersStage, start: 'top top', end: '+=240%', pin: true, scrub: true, animation: timeline, onUpdate: setLocal('layers') });
    } else {
      // Without a hold the notes are a list, read at the reader's own pace: each arrives as it enters
      // the window and the word it explains lights with it. Taking turns in one place, they passed in
      // a few dozen pixels of scrolling. Each undoes only as it leaves through the bottom edge, so
      // nothing in view is taken away and scrolling back up retraces the way down.
      const arrive = (trigger: HTMLElement) => ({ trigger, start: 'top bottom-=48', toggleActions: 'play none none reverse' });
      // One tween per element, from its dim state: undone, each returns to exactly how it was.
      const sentence = one('.layers-sentence', layers);
      if (sentence) gsap.fromTo(plain, { opacity: dim }, { opacity: 1, duration: 0.5, stagger: 0.04, scrollTrigger: arrive(sentence) });
      notes.forEach((note, index) => {
        gsap.from(note, { opacity: 0, y: 18, duration: 0.7, ease: 'power3.out', scrollTrigger: arrive(note) });
        const key = keys.find(word => Number(word.dataset.layer) === index);
        if (key) gsap.fromTo(key, { opacity: dim }, { opacity: 1, duration: 0.5, scrollTrigger: arrive(note) });
      });
      // Each plate lifts as its note arrives, so the lit word and the lifted plate stay a pair.
      ScrollTrigger.create({ trigger: one('.layers-notes', layers) ?? layers, start: 'top bottom-=48', end: 'bottom bottom-=48', onUpdate: setLocal('layers') });
    }
  }

  });

  /* Projects: each stage holds while its evidence resolves in step with the object. */
  all('.project').forEach(project => slice(() => {
    const station = project.dataset.station as Station;
    const stage = one('.project-stage', project);
    const title = one('.project-title a', project);
    if (!stage || !title) return;

    // The name arrives letter by letter; the rest of the copy follows it once.
    SplitText.create(title, {
      type: 'words, chars', mask: 'words', wordsClass: 'title-word', autoSplit: true, aria: 'auto',
      onSplit: self => gsap.from(self.chars, {
        yPercent: 110, duration: 0.9, ease: 'expo.out', stagger: 0.025,
        scrollTrigger: { trigger: project, start: 'top 55%', toggleActions: 'play none none reverse' },
      }),
    });
    // Waiting text stays in the accessibility tree; link groups only travel, so they are never invisible.
    gsap.from(all('.project-kind, .project-claim, .project-summary', project), {
      opacity: 0, y: 34, duration: 0.9, ease: 'power3.out', stagger: 0.07,
      scrollTrigger: { trigger: project, start: 'top 45%', toggleActions: 'play none none reverse' },
    });
    gsap.from(all('.project-links', project), {
      y: 34, duration: 0.9, ease: 'power3.out', delay: 0.2,
      scrollTrigger: { trigger: project, start: 'top 45%', toggleActions: 'play none none reverse' },
    });

    const timeline = gsap.timeline({ defaults: { ease: 'none' } });
    if (station === 'testpulse') {
      all('.history-run', project).forEach((run, index) => {
        timeline.from(run, { opacity: 0, y: 26, duration: 0.1, ease: 'power2.out' }, 0.15 + index * 0.3);
      });
      timeline.from(one('.project-evidence figcaption', project), { opacity: 0, y: 20, duration: 0.1, ease: 'power2.out' }, 0.86);
    } else if (station === 'caldiy') {
      const bars = all('.contention span', project);
      timeline.from(bars, { scaleY: 0, duration: 0.14, ease: 'power2.out', stagger: 0.006 }, 0.06);
      timeline.fromTo(bars.slice(1), { height: '100%' }, { height: '40%', duration: 0.22, stagger: 0.006 }, 0.52);
      timeline.fromTo(bars.slice(0, 1), { backgroundColor: '#756c60' }, { backgroundColor: '#ffc368', duration: 0.12 }, 0.6);
      timeline.from(one('.project-evidence figcaption', project), { opacity: 0, y: 20, duration: 0.1, ease: 'power2.out' }, 0.72);
    } else {
      // The track is a statement of the measured 82 percent, so it never shows a smaller share while it arrives.
      timeline.from(one('.agreement', project), { opacity: 0, y: 26, duration: 0.14, ease: 'power2.out' }, 0.2);
      timeline.from(one('.agreement-track', project), { opacity: 0, duration: 0.14, ease: 'power2.out' }, 0.3);
      timeline.from(one('.project-evidence figcaption', project), { opacity: 0, duration: 0.1 }, 0.85);
    }
    timeline.to({}, { duration: 0.02 }, 0.98);
    if (pins.get(stage)) {
      ScrollTrigger.create({ trigger: stage, start: 'top top', end: '+=190%', pin: true, scrub: true, animation: timeline, onUpdate: setLocal(station) });
    } else {
      ScrollTrigger.create({ trigger: project, start: 'top 30%', end: 'bottom 90%', scrub: true, animation: timeline });
      // On narrow screens the object keeps to the window at the top of its chapter, so its sequence
      // plays while that window is on screen. Spread over the whole chapter, the failed run lit only
      // after the runs had left the screen.
      ScrollTrigger.create(wide
        ? { trigger: project, start: 'top 30%', end: 'bottom 90%', onUpdate: setLocal(station) }
        : { trigger: project, start: 'top 30%', end: 'top -10%', onUpdate: setLocal(station) });
    }
  }));

  slice(() => {
  /* Archive: framework names travel with the scroll while the fan opens. */
  const archive = one('.archive');
  if (archive) {
    all('.archive-row', archive).forEach(row => {
      const direction = Number(row.dataset.direction);
      const track = one('.archive-track', row);
      if (!track) return;
      gsap.fromTo(track, { xPercent: direction < 0 ? 0 : -50 }, { xPercent: direction < 0 ? -50 : 0, ease: 'none', scrollTrigger: { trigger: archive, start: 'top bottom', end: 'bottom top', scrub: 0.6 } });
    });
    ScrollTrigger.create({ trigger: archive, start: 'top 75%', end: 'bottom bottom', onUpdate: setLocal('archive') });
    const title = one('.archive-title', archive);
    if (title) {
      SplitText.create(title, {
        type: 'lines', mask: 'lines', autoSplit: true,
        onSplit: self => gsap.from(self.lines, { yPercent: 105, duration: 1, ease: 'expo.out', stagger: 0.09, scrollTrigger: { trigger: title, start: 'top 88%', toggleActions: 'play none none reverse' } }),
      });
    }
    gsap.to(wide ? '.archive-reel, .archive-copy' : '.archive-reel', { autoAlpha: 0, ease: 'none', scrollTrigger: { trigger: '.career', start: 'top 85%', end: 'top 35%', scrub: true } });
  }

  });

  slice(() => {
  /* Career: the figures resolve one at a time while the column builds beside them, then the roles
     arrive on flat graphite. Both directions replay. */
  const career = one('.career');
  const careerStage = one('.career-stage');
  if (career && careerStage) {
    const title = one('.career-title', career);
    if (title) {
      SplitText.create(title, {
        type: 'lines', mask: 'lines', autoSplit: true,
        onSplit: self => gsap.from(self.lines, { yPercent: 105, duration: 1.1, ease: 'expo.out', stagger: 0.1, scrollTrigger: { trigger: title, start: 'top 84%', toggleActions: 'play none none reverse' } }),
      });
    }
    const timeline = gsap.timeline({ defaults: { ease: 'none' }, paused: true });
    all('.career-line', career).forEach((line, index) => {
      timeline.from(line, { clipPath: 'inset(0% 100% 0% 0%)', x: -24, duration: 0.16, ease: 'power2.out' }, 0.06 + index * 0.21);
    });
    timeline.from(one('.career-scope', career), { opacity: 0, y: 16, duration: 0.1, ease: 'power2.out' }, 0.86);
    timeline.to({}, { duration: 0.02 }, 0.98);
    if (pins.get(careerStage)) {
      ScrollTrigger.create({ trigger: careerStage, start: 'top top', end: '+=170%', pin: true, scrub: true, animation: timeline, onUpdate: setLocal('career') });
    } else {
      // In flow the column still builds with the scroll, but the figures play once they arrive:
      // a line tied to the scroll could rest half drawn while someone is reading it.
      ScrollTrigger.create({ trigger: careerStage, start: 'top 45%', end: 'bottom 85%', onUpdate: setLocal('career') });
      ScrollTrigger.create({ trigger: one('.career-figures', career) ?? careerStage, start: 'top 88%', animation: timeline.timeScale(0.8), toggleActions: 'play none none reverse' });
    }
    all('.career-stop', career).forEach(stop => {
      gsap.from(stop, { opacity: 0, y: 36, duration: 0.9, ease: 'power3.out', scrollTrigger: { trigger: stop, start: 'top 86%', toggleActions: 'play none none reverse' } });
    });
    // While the roles fill the viewport on solid graphite, the stage rests. The fades at either
    // end of that block are see-through, so they are left outside the range.
    const roles = one('.career-roles', career);
    if (roles) {
      ScrollTrigger.create({
        trigger: roles, start: 'top top', end: 'bottom bottom',
        onToggle: self => { sceneState.covered = self.isActive ? 1 : 0; },
        onRefresh: self => { sceneState.covered = self.isActive ? 1 : 0; },
      });
    }
  }

  });

  slice(() => {
  /* Method: one step is in focus at a time while the lens inspects a different layer for each.
     Held, the scroll picks the step; in flow, each step's own position does. */
  const method = one('.method');
  const methodStage = one('.method-stage');
  if (method && methodStage) {
    const steps = all('.method-step', method);
    if (pins.get(methodStage)) {
      const focusStep = (self: ScrollTrigger) => {
        sceneState.local[stationIndex('method')] = self.progress;
        const active = Math.min(steps.length - 1, Math.floor(self.progress * steps.length));
        steps.forEach((step, index) => step.classList.toggle('is-active', index === active));
      };
      ScrollTrigger.create({ trigger: methodStage, start: 'top top', end: '+=230%', pin: true, onUpdate: focusStep, onRefresh: focusStep });
    } else {
      steps.forEach(step => {
        ScrollTrigger.create({ trigger: step, start: 'top 62%', end: 'bottom 40%', toggleClass: { targets: step, className: 'is-active' } });
      });
      ScrollTrigger.create({ trigger: methodStage, start: 'top 45%', end: 'bottom 85%', onUpdate: setLocal('method') });
    }
    disposers.push(() => steps.forEach(step => step.classList.remove('is-active')));
    const title = one('.method-title', method);
    if (title && fine) {
      const lens = { radius: 0 };
      const apply = () => title.style.setProperty('--lens', `${lens.radius}px`);
      const size = () => Math.min(120, title.offsetHeight * 0.42);
      listen(title, 'pointermove', event => {
        const bounds = title.getBoundingClientRect();
        const pointer = event as PointerEvent;
        title.style.setProperty('--mx', `${pointer.clientX - bounds.left}px`);
        title.style.setProperty('--my', `${pointer.clientY - bounds.top}px`);
      });
      listen(title, 'pointerenter', () => { gsap.to(lens, { radius: size(), duration: 0.7, ease: 'expo.out', onUpdate: apply, overwrite: true }); });
      listen(title, 'pointerleave', () => { gsap.to(lens, { radius: 0, duration: 0.5, ease: 'power3.inOut', onUpdate: apply, overwrite: true }); });
    }
  }

  });

  slice(() => {
  /* Profile: the portrait opens like a shutter and settles. */
  const profile = one('.profile');
  if (profile) {
    const frame = one('.profile-frame', profile);
    const image = one('.profile-frame img', profile);
    if (frame && image) {
      gsap.fromTo(frame, { clipPath: 'inset(100% 0% 0% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.4, ease: 'expo.inOut', scrollTrigger: { trigger: frame, start: 'top 82%', toggleActions: 'play none none reverse' } });
      gsap.fromTo(image, { scale: 1.3, yPercent: -6 }, { scale: 1, yPercent: 6, ease: 'none', scrollTrigger: { trigger: frame, start: 'top bottom', end: 'bottom top', scrub: true } });
    }
    const title = one('.profile-title', profile);
    if (title) {
      SplitText.create(title, {
        type: 'lines', mask: 'lines', autoSplit: true,
        onSplit: self => gsap.from(self.lines, { yPercent: 105, duration: 1.1, ease: 'expo.out', stagger: 0.1, scrollTrigger: { trigger: title, start: 'top 82%', toggleActions: 'play none none reverse' } }),
      });
    }
    const bio = one('.profile-bio', profile);
    if (bio) {
      SplitText.create(bio, {
        type: 'lines', autoSplit: true, aria: 'none',
        onSplit: self => gsap.from(self.lines, { opacity: 0, y: 22, filter: 'blur(6px)', duration: 0.9, ease: 'power3.out', stagger: 0.07, scrollTrigger: { trigger: bio, start: 'top 84%', toggleActions: 'play none none reverse' } }),
      });
    }
    all('.profile-facts > div', profile).forEach(row => {
      gsap.from(row, { opacity: 0, y: 24, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: row, start: 'top 90%', toggleActions: 'play none none reverse' } });
    });
  }

  });

  slice(() => {
  /* Closing: the two lines drift toward each other; the address leans toward the pointer. */
  const closing = one('.closing');
  if (closing) {
    all('.closing-line', closing).forEach(line => {
      const drift = Number(line.dataset.drift);
      gsap.fromTo(line, { xPercent: drift * 16 }, { xPercent: 0, ease: 'none', scrollTrigger: { trigger: closing, start: 'top bottom', end: 'top 10%', scrub: true } });
    });
    gsap.from(all('.closing-body > *, .closing-foot', closing), { y: 36, duration: 0.9, ease: 'power3.out', stagger: 0.1, scrollTrigger: { trigger: '.closing-body', start: 'top 92%', toggleActions: 'play none none reverse' } });
    const address = one('.closing-address', closing);
    if (address && fine) {
      const moveX = gsap.quickTo(address, 'x', { duration: 0.6, ease: 'power3.out' });
      const moveY = gsap.quickTo(address, 'y', { duration: 0.6, ease: 'power3.out' });
      listen(address, 'pointermove', event => {
        const bounds = address.getBoundingClientRect();
        const pointer = event as PointerEvent;
        moveX((pointer.clientX - (bounds.left + bounds.width / 2)) * 0.12);
        moveY((pointer.clientY - (bounds.top + bounds.height / 2)) * 0.3);
      });
      listen(address, 'pointerleave', () => { moveX(0); moveY(0); });
    }
  }

  });

  slice(() => {
  /* Story coordinate: each chapter adds one as it rises through the viewport. */
  const stations = all('[data-station]');
  const entered = new Float32Array(stations.length);
  const publish = () => { sceneState.story = entered.reduce((sum, value) => sum + value, 0); };
  stations.forEach((station, index) => {
    if (index === 0) return;
    const update = (self: ScrollTrigger) => { entered[index] = self.progress; publish(); };
    ScrollTrigger.create({ trigger: station, start: 'top bottom', end: 'top top', onUpdate: update, onRefresh: update });
  });

  /* Narrow layouts: publish each chapter's position so its object stays in the window above the copy. */
  if (!wide) {
    const measure = () => { stations.forEach((station, index) => { sceneState.tops[index] = station.getBoundingClientRect().top / window.innerHeight; }); };
    gsap.ticker.add(measure);
    disposers.push(() => gsap.ticker.remove(measure));
  }

  });

  slice(() => {
  /* Chrome: leaves while reading down, returns on the way up. */
  ScrollTrigger.create({
    start: 0, end: 'max',
    onUpdate: self => root.classList.toggle('chrome-away', self.direction === 1 && self.scroll() > window.innerHeight * 0.6),
  });

  });

  slice(() => {
  /* In-page links follow the smoothed scroll when it is active. */
  const jump = (hash: string, instant = false) => {
    // The top of the page is a position, not an element.
    if (hash === '#top') {
      if (smoother) smoother.scrollTo(0, !instant);
      else window.scrollTo({ top: 0, behavior: instant ? 'instant' : 'smooth' });
      return true;
    }
    let id = hash.slice(1);
    try { id = decodeURIComponent(id); } catch { return false; }
    const target = document.getElementById(id);
    if (!target) return false;
    if (smoother) smoother.scrollTo(target, !instant, 'top top');
    else target.scrollIntoView({ behavior: instant ? 'auto' : 'smooth', block: 'start' });
    return true;
  };
  listen(document.documentElement, 'click', event => {
    const link = (event.target as Element).closest<HTMLAnchorElement>('a[href^="#"]');
    const mouse = event as MouseEvent;
    // A modified click means a new tab or window: that stays the browser's.
    if (!link || event.defaultPrevented || mouse.button > 0 || mouse.metaKey || mouse.ctrlKey || mouse.shiftKey || mouse.altKey) return;
    const hash = link.getAttribute('href') ?? '';
    if (hash.length < 2 || !jump(hash)) return;
    event.preventDefault();
    history.pushState(null, '', hash === '#top' ? location.pathname : hash);
    const target = hash === '#top' ? one('#main') : document.getElementById(hash.slice(1));
    const region = target?.closest<HTMLElement>('section, footer, main');
    if (region) {
      // Chapters are not focusable by themselves, so reading order would stay on the link.
      if (!region.hasAttribute('tabindex')) region.tabIndex = -1;
      placingFocus = true;
      region.focus({ preventScroll: true });
      placingFocus = false;
    }
  });

  jumpTo = jump;
  });

  // Text enlargement or a resize can change which stages fit. Rebuild when that happens.
  let settle = 0;
  let late = 0;
  let turn = 0;
  const observer = new ResizeObserver(() => {
    window.clearTimeout(settle);
    settle = window.setTimeout(() => { if (environment() !== decidedFor) rebuild(); }, 180);
  });
  const finish = () => {
    // Settle every pin and range now that the whole page is described.
    if (opened) ScrollTrigger.refresh();
    // A pinned stage keeps a fixed box, so its children are what report a change in content size.
    pinnable.forEach(stage => { observer.observe(stage); [...stage.children].forEach(child => observer.observe(child)); });
    // A pinned stage that ended up taller than the viewport gives up its pin on the next build.
    const grown = pinnable.filter(stage => pins.get(stage) && stage.scrollHeight > window.innerHeight + 2);
    if (grown.length) {
      grown.forEach(stage => outgrown.add(stage));
      late = window.setTimeout(rebuild, 0);
    }
    building = false;
    afterBuild.splice(0).forEach(done => done());
  };
  const run = (from: number) => {
    if (!alive) return;
    const started = performance.now();
    for (let index = from; index < slices.length; index += 1) {
      context.add(slices[index]!);
      if (index + 1 < slices.length && performance.now() - started > 10) {
        turn = window.setTimeout(() => run(index + 1), 0);
        return;
      }
    }
    finish();
  };
  building = true;
  run(0);

  return () => {
    alive = false;
    building = false;
    window.clearTimeout(turn);
    window.clearTimeout(late);
    observer.disconnect();
    window.clearTimeout(settle);
    disposers.forEach(dispose => dispose());
    context.revert();
    (smoother as ScrollSmoother | null)?.kill();
    holdable.forEach(stage => stage.classList.remove('is-held'));
    root.classList.remove('is-staged', 'chrome-away', 'stage-loose');
    sceneState.covered = 0;
  };
}

/* Opening: release the handoff, then let the hero arrive. It runs once and outlives rebuilds. */
function open() {
  const intro = gsap.timeline({ paused: true, defaults: { ease: 'expo.out' } });
  const loader = one('.stage-loader');
  if (root.classList.contains('is-preparing') && loader) {
    intro.to(loader, { clipPath: 'inset(0% 0% 100% 0%)', duration: 0.9, ease: 'expo.inOut' }, 0)
      .set(loader, { display: 'none' });
  }
  const start = intro.duration() * 0.55;
  // Narrow and touch layouts have no curtain. Their first screen is painted before this script
  // runs, so nothing on it is hidden and brought back: it stays as it was painted.
  if (!lite.matches) intro.fromTo('.hero-line', { clipPath: 'inset(0% 0% 100% 0%)', yPercent: 55 }, { clipPath: 'inset(-25% -12% -30% -12%)', yPercent: 0, duration: 1.3, stagger: 0.12, clearProps: 'clipPath,transform' }, start)
    .fromTo('.hero-mark path', { drawSVG: '0%' }, { drawSVG: '100%', duration: 1.2, ease: 'power2.inOut' }, start + 0.75)
    // Text may fade in. Anything that holds a link only travels, so it is reachable from the first frame.
    .fromTo('.hero-role, .hero-summary, .hero-hint, .hero-status', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1, stagger: 0.07, clearProps: 'all' }, start + 0.45)
    .fromTo('.hero-actions', { y: 30 }, { y: 0, duration: 1, clearProps: 'all' }, start + 0.55)
    .fromTo('.site-chrome > *', { y: -16 }, { y: 0, duration: 0.9, stagger: 0.05, clearProps: 'all' }, start + 0.3);
  finishOpening = () => { intro.progress(1); };
  const inputs = ['pointerdown', 'keydown', 'wheel', 'touchstart'];
  const release = () => {
    if (opened) return;
    opened = true;
    inputs.forEach(name => window.removeEventListener(name, hurry));
    root.classList.add('is-ready');
    sceneState.intro = 1;
    intro.play();
    try { sessionStorage.setItem('portfolio-stage-seen', '1'); } catch { /* The handoff may show again on a later visit. */ }
    // A wall-clock timer: the page is never held by a slow first frame.
    window.setTimeout(() => root.classList.remove('is-preparing'), 900);
    ensureBuilt();
    whenBuilt(() => {
      ScrollTrigger.refresh();
      if (location.hash.length > 1) jumpTo(location.hash, true);
      reading.ready();
    });
  };
  // Any input ends the handoff at once: the visitor never waits on the stage.
  const hurry = () => { intro.progress(1); root.classList.remove('is-preparing'); release(); };
  inputs.forEach(name => window.addEventListener(name, hurry, { passive: true }));
  void whenPrepared().then(release);
}

let teardown = () => {};
let built = false;
rebuild = () => {
  teardown();
  teardown = setup({ motion: queries.motion.matches, wide: queries.wide.matches, fine: queries.fine.matches });
  built = true;
  // A static page has nothing left to build, so nobody is kept waiting for it.
  if (!building) afterBuild.splice(0).forEach(done => done());
};
ensureBuilt = () => { if (!built) rebuild(); };
Object.values(queries).forEach(query => query.addEventListener('change', () => { if (built) rebuild(); }));
// The stage's gate (React and the renderer check) is mounted when the page is ready for it. This
// script already runs after the first paint, so wide layouts mount it at once. Narrow and touch
// layouts wait for the visitor's first input and show the still until then.
const stageRoot = one('#stage-root');
let stageMounted = false;
const mountStage = () => {
  if (stageMounted || !stageRoot) return;
  stageMounted = true;
  void import('../../components/stage/mount').then(module => module.mountStage(stageRoot)).catch(() => {
    root.classList.add('no-stage');
    window.dispatchEvent(new Event('scene:unavailable'));
  });
};
const offerStage = () => {
  if (stageMounted || !queries.motion.matches) return;
  if (!lite.matches) { mountStage(); return; }
  const firstInputs = ['pointerdown', 'touchstart', 'keydown', 'wheel'];
  const begin = () => { firstInputs.forEach(name => window.removeEventListener(name, begin)); mountStage(); };
  firstInputs.forEach(name => window.addEventListener(name, begin, { passive: true }));
};
// With reduced motion nothing is mounted, so the page is marked here as having no stage.
root.classList.toggle('no-stage', !queries.motion.matches);
queries.motion.addEventListener('change', () => { if (!stageMounted) { root.classList.toggle('no-stage', !queries.motion.matches); offerStage(); } });
offerStage();

if (queries.motion.matches) {
  // Pin decisions depend on text metrics, so the first build waits briefly for the fonts.
  open();
  void Promise.race([document.fonts.ready, new Promise(resolve => window.setTimeout(resolve, 1500))]).then(ensureBuilt);
} else {
  rebuild();
}
