import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Motion for the reading pages: the archive and the case studies. The homepage has its own script.

// Things arrive as their slot enters the window, so a waiting element never leaves a hole in text
// the reader can already see. Offsets stay small because the trigger measures the moved position.
const ARRIVAL = 48;

export function initMotion() {
  gsap.registerPlugin(ScrollTrigger);
  const media = matchMedia('(prefers-reduced-motion: no-preference)');
  const revealed = new WeakSet<Element>();
  let context: gsap.Context | undefined;
  let initialized = false;
  let resizeTimer: number | undefined;

  function configure() {
    const position = { top: scrollY, left: scrollX };
    const readingAnchor = [...document.querySelectorAll<HTMLElement>('main h2, main h3, main p, main summary')].find(element => {
      const rect = element.getBoundingClientRect();
      return rect.height > 0 && rect.top >= 0 && rect.top < innerHeight * .75;
    });
    const readingTop = readingAnchor?.getBoundingClientRect().top;
    context?.revert();
    context = undefined;

    if (media.matches) context = gsap.context(() => {
      function once(element: Element, vars: gsap.TweenVars) {
        if (revealed.has(element)) return;
        if (element.getBoundingClientRect().top < innerHeight - ARRIVAL) {
          revealed.add(element);
          return;
        }
        gsap.from(element, {
          duration: 1, ease: 'power3.out', ...vars,
          clearProps: 'transform,opacity,clipPath',
          onComplete: () => revealed.add(element),
          scrollTrigger: { trigger: element, start: `top bottom-=${ARRIVAL}`, once: true },
        });
      }

      // Anything that holds a link only travels, so it is never unreachable while it waits.
      for (const element of document.querySelectorAll('.case-prose h2, .case-evidence h2')) {
        once(element, element.querySelector('a, button, input, summary') ? { y: 16 } : { y: 16, clipPath: 'inset(0 0 100% 0)' });
      }

      for (const field of document.querySelectorAll<HTMLElement>('.material-field')) {
        const object = field.querySelector('.material-object');
        const archive = field.dataset.materialShape === 'archive';
        gsap.fromTo(object,
          { y: 44, scale: .88, rotationZ: archive ? -12 : -7, rotationY: -10, transformPerspective: 1200 },
          { y: -32, scale: 1, rotationZ: archive ? 4 : 3, rotationY: 5, ease: 'none',
            scrollTrigger: { trigger: field, start: 'top 80%', end: 'bottom top', scrub: .35 } });
        if (field.dataset.materialShape === 'llm-evaluation') {
          gsap.from(field.querySelector('.material-prism-left'), { xPercent: -10, ease: 'none', scrollTrigger: { trigger: field, start: 'top bottom', end: 'center 35%', scrub: .35 } });
          gsap.from(field.querySelector('.material-prism-right'), { xPercent: 10, ease: 'none', scrollTrigger: { trigger: field, start: 'top bottom', end: 'center 35%', scrub: .35 } });
        }
      }

      const warm = document.querySelector('.ambient-warm');
      const silver = document.querySelector('.ambient-silver');
      if (warm && silver) {
        gsap.timeline({ scrollTrigger: { start: 0, end: 'max', scrub: .7 } })
          .fromTo(warm, { yPercent: -12, opacity: .18 }, { yPercent: 12, opacity: .75, ease: 'none' }, 0)
          .fromTo(silver, { yPercent: 15, opacity: .6 }, { yPercent: -15, opacity: .12, ease: 'none' }, 0);
      }

      for (const rule of document.querySelectorAll('.evidence-rule')) once(rule, { scaleX: 0, duration: 1.15 });
      for (const row of document.querySelectorAll('.judge-results > div, .strategy-list > div')) once(row, { y: 32, opacity: 0 });
      for (const row of document.querySelectorAll('.case-index-link, .framework-item')) once(row, { y: 44 });
      for (const next of document.querySelectorAll('.next-case > a')) once(next, { x: -36 });

      const progress = document.querySelector('.reading-progress');
      if (progress) gsap.to(progress, {
        scaleX: 1, ease: 'none',
        scrollTrigger: { trigger: '.case-reading', start: 'top 40%', end: 'bottom bottom', scrub: true },
      });
    });

    if (readingAnchor && readingTop !== undefined) {
      // Native scroll anchoring may already compensate for a changed layout.
      const adjustment = readingAnchor.getBoundingClientRect().top - readingTop;
      if (Math.abs(adjustment) > .5) window.scrollBy({ top: adjustment, behavior: 'instant' });
    } else if (initialized) window.scrollTo({ ...position, behavior: 'instant' });
    initialized = true;
    ScrollTrigger.refresh();
    ScrollTrigger.clearScrollMemory('auto');
  }

  const imageObserver = new IntersectionObserver(entries => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      const image = entry.target as HTMLImageElement;
      image.loading = 'eager';
      void image.decode().catch(() => {});
      imageObserver.unobserve(image);
    }
  }, { rootMargin: '700px' });
  document.querySelectorAll<HTMLImageElement>('.material-field img').forEach(image => imageObserver.observe(image));

  const refresh = () => ScrollTrigger.refresh();
  const resize = () => {
    window.clearTimeout(resizeTimer);
    resizeTimer = window.setTimeout(configure, 180);
  };
  configure();
  media.addEventListener('change', configure);
  window.addEventListener('resize', resize);
  window.addEventListener('portfolio:layout', refresh);
  // A face that arrives late re-wraps headings and moves everything below them: measure again.
  document.fonts.addEventListener('loadingdone', refresh);

  function cleanup(event: PageTransitionEvent) {
    if (event.persisted) return;
    media.removeEventListener('change', configure);
    window.removeEventListener('resize', resize);
    window.clearTimeout(resizeTimer);
    window.removeEventListener('portfolio:layout', refresh);
    document.fonts.removeEventListener('loadingdone', refresh);
    imageObserver.disconnect();
    context?.kill(false);
    window.removeEventListener('pagehide', cleanup);
  }
  window.addEventListener('pagehide', cleanup);
}
