import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { setInspectionProgress } from '../lib/inspection-state';

export function initMotion() {
  gsap.registerPlugin(ScrollTrigger);
  const media = matchMedia('(prefers-reduced-motion: no-preference)');
  const desktop = matchMedia('(min-width: 1024px)');
  const revealed = new WeakSet<Element>();
  const chapters = [...document.querySelectorAll<HTMLElement>('.work-chapter')];
  const stages = [...document.querySelectorAll<HTMLElement>('.project-stage')];
  const stageHeights = new WeakMap<Element, number>();
  let context: gsap.Context | undefined;
  let initialized = false;
  let resizeTimer: number | undefined;

  function configure() {
    const position = { top: scrollY, left: scrollX };
    const readingAnchor = initialized ? [...document.querySelectorAll<HTMLElement>('main h2, main h3, main p, main summary')].find(element => {
      const rect = element.getBoundingClientRect();
      return rect.height > 0 && rect.top >= 0 && rect.top < innerHeight * .75;
    }) : undefined;
    const readingTop = readingAnchor?.getBoundingClientRect().top;
    context?.revert();
    context = undefined;
    chapters.forEach(chapter => chapter.classList.remove('has-chapter-motion'));
    if (!media.matches || !desktop.matches) setInspectionProgress(0);

    if (media.matches) context = gsap.context(() => {
      function once(element: Element, vars: gsap.TweenVars) {
        if (revealed.has(element)) return;
        if (element.getBoundingClientRect().top < innerHeight * .82) {
          revealed.add(element);
          return;
        }
        gsap.from(element, {
          duration: 1, ease: 'power3.out', ...vars,
          clearProps: 'transform,opacity,clipPath',
          onComplete: () => revealed.add(element),
          scrollTrigger: { trigger: element, start: 'top 82%', once: true },
        });
      }

      for (const element of document.querySelectorAll('[data-reveal]')) {
        once(element, element.querySelector('a, button, input, summary') ? { y: 52 } : { y: 52, opacity: 0 });
      }
      for (const element of document.querySelectorAll('.chapter-title, .case-prose h2, .case-evidence h2')) {
        if (element.closest('.work-chapter')) continue;
        once(element, element.querySelector('a, button, input, summary') ? { y: 56 } : { y: 56, clipPath: 'inset(0 0 100% 0)' });
      }

      for (const chapter of chapters) {
        const stage = chapter.querySelector<HTMLElement>('.project-stage');
        const figure = chapter.querySelector('figure');
        const object = chapter.querySelector('.material-object');
        if (!stage || !figure || !object) continue;
        const pinned = desktop.matches && innerHeight >= 680 && stage.scrollHeight <= innerHeight + 2;
        chapter.classList.toggle('has-chapter-motion', pinned);
        const timeline = gsap.timeline({ scrollTrigger: {
          trigger: pinned ? chapter : figure,
          start: pinned ? 'top top' : 'top 90%',
          end: pinned ? 'bottom bottom' : 'bottom 45%',
          scrub: .3, invalidateOnRefresh: true,
        } });
        if (chapter.dataset.project === 'caldiy') {
          timeline.fromTo(object,
            { y: 64, scale: .76, rotationZ: -12, rotationY: -15, transformPerspective: 1200 },
            { y: -12, scale: 1, rotationZ: 2, rotationY: 4, duration: .85, ease: 'power2.inOut' }, 0)
            .from(chapter.querySelectorAll('.contention-bars span'), { scaleY: .08, stagger: { amount: .18 }, duration: .5, ease: 'power3.out' }, 0)
            .to(chapter.querySelectorAll('.contention-bars span:not(.winner)'), { scaleY: .28, opacity: .5, duration: .35, stagger: { amount: .1 }, ease: 'power2.inOut' }, .55)
            .from(chapter.querySelector('.winner'), { backgroundColor: '#8d8170', duration: .3 }, .65);
        } else {
          timeline.fromTo(object,
            { y: 42, scale: .82, rotationY: -12, transformPerspective: 1200 },
            { y: -8, scale: 1, rotationY: 3, duration: .9, ease: 'power2.inOut' }, 0)
            .from(chapter.querySelector('.material-prism-left'), { xPercent: -16, rotationY: -12, duration: .9, ease: 'power2.inOut' }, 0)
            .from(chapter.querySelector('.material-prism-right'), { xPercent: 16, rotationY: 12, duration: .9, ease: 'power2.inOut' }, 0)
            .from(chapter.querySelector('.agreement > span'), { scale: .8, transformOrigin: 'left bottom', duration: .6, ease: 'power2.out' }, .2)
            .from(chapter.querySelector('.agreement-track span'), { scaleX: 0, duration: .6, ease: 'power2.inOut' }, .3)
            .from(chapter.querySelector('figcaption'), { y: 20, duration: .3, ease: 'power2.out' }, .7);
        }
        timeline.from(chapter.querySelector('.project-copy'), { y: 28, duration: .45, ease: 'power2.out' }, 0);
      }

      for (const field of document.querySelectorAll<HTMLElement>('.material-field')) {
        if (field.closest('.work-chapter')) continue;
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

      const trace = document.querySelector('.experience-trace');
      if (trace) gsap.from(trace, {
        scaleY: 0, ease: 'none',
        scrollTrigger: { trigger: '.experience-list', start: 'top 75%', end: 'bottom 45%', scrub: .35 },
      });
      for (const step of document.querySelectorAll('.approach-steps li')) once(step, { x: -34, opacity: 0 });
      if (desktop.matches && document.querySelector('#approach')) {
        ScrollTrigger.create({ trigger: '#approach', start: 'top bottom', end: 'bottom top', onUpdate: self => setInspectionProgress(self.progress) });
      }

      const portrait = document.querySelector('.portrait-frame img');
      if (portrait) gsap.fromTo(portrait, { scale: 1.14, yPercent: 6 }, {
        scale: 1, yPercent: -2, ease: 'none',
        scrollTrigger: { trigger: '.portrait-frame', start: 'top bottom', end: 'bottom 35%', scrub: .45 },
      });

      for (const rule of document.querySelectorAll('.evidence-rule')) once(rule, { scaleX: 0, duration: 1.15 });
      for (const row of document.querySelectorAll('.judge-results > div, .strategy-list > div')) once(row, { y: 32, opacity: 0 });
      for (const row of document.querySelectorAll('.case-index-link, .framework-item')) once(row, { y: 44 });
      for (const next of document.querySelectorAll('.next-case > a, .archive-link-action')) once(next, { x: -36 });

      const progress = document.querySelector('.reading-progress');
      if (progress) gsap.to(progress, {
        scaleX: 1, ease: 'none',
        scrollTrigger: { trigger: '.case-reading', start: 'top 40%', end: 'bottom bottom', scrub: true },
      });
    });

    if (initialized) {
      if (readingAnchor && readingTop !== undefined) {
        // Native scroll anchoring may already compensate for removed sticky space.
        const adjustment = readingAnchor.getBoundingClientRect().top - readingTop;
        if (Math.abs(adjustment) > .5) window.scrollBy({ top: adjustment, behavior: 'instant' });
      } else window.scrollTo({ ...position, behavior: 'instant' });
    }
    initialized = true;
    stages.forEach(stage => stageHeights.set(stage, stage.offsetHeight));
    ScrollTrigger.refresh();
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
  const stageObserver = new ResizeObserver(entries => {
    if (entries.some(({ target }) => target instanceof HTMLElement && stageHeights.get(target) !== target.offsetHeight)) resize();
  });
  stages.forEach(stage => stageObserver.observe(stage));
  media.addEventListener('change', configure);
  desktop.addEventListener('change', configure);
  window.addEventListener('resize', resize);
  window.addEventListener('portfolio:layout', refresh);
  document.querySelectorAll('.experience-item').forEach(item => item.addEventListener('toggle', refresh));

  function cleanup(event: PageTransitionEvent) {
    if (event.persisted) return;
    media.removeEventListener('change', configure);
    desktop.removeEventListener('change', configure);
    window.removeEventListener('resize', resize);
    window.clearTimeout(resizeTimer);
    window.removeEventListener('portfolio:layout', refresh);
    document.querySelectorAll('.experience-item').forEach(item => item.removeEventListener('toggle', refresh));
    imageObserver.disconnect();
    stageObserver.disconnect();
    context?.revert();
    window.removeEventListener('pagehide', cleanup);
  }
  window.addEventListener('pagehide', cleanup);
}
