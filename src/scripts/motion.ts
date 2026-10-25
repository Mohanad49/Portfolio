import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { setInspectionProgress } from '../lib/inspection-state';

export function initMotion() {
  gsap.registerPlugin(ScrollTrigger);
  const media = matchMedia('(prefers-reduced-motion: no-preference)');
  const desktop = matchMedia('(min-width: 1024px)');
  const revealed = new WeakSet<Element>();
  let context: gsap.Context | undefined;
  let initialized = false;

  function configure() {
    const position = { top: scrollY, left: scrollX };
    context?.revert();
    context = undefined;
    if (!media.matches || !desktop.matches) setInspectionProgress(0);

    if (media.matches) context = gsap.context(() => {
      function once(element: Element, vars: gsap.TweenVars) {
        // A restored reading position must never acquire a new entrance effect.
        if (revealed.has(element)) return;
        if (element.getBoundingClientRect().top < innerHeight * .92) {
          revealed.add(element);
          return;
        }
        gsap.from(element, {
          duration: .85, ease: 'power3.out', ...vars,
          clearProps: 'transform,opacity,clipPath',
          onComplete: () => revealed.add(element),
          scrollTrigger: { trigger: element, start: 'top 92%', once: true },
        });
      }

      for (const element of document.querySelectorAll('[data-reveal]')) {
        once(element, { y: 28, opacity: .18 });
      }
      for (const element of document.querySelectorAll('.chapter-title, .case-prose h2, .case-evidence h2')) {
        once(element, { y: 42, clipPath: 'inset(0 0 100% 0)' });
      }

      for (const field of document.querySelectorAll('.material-field')) {
        const upper = field.querySelector('.material-upper');
        const lower = field.querySelector('.material-lower');
        gsap.timeline({ scrollTrigger: { trigger: field, start: 'top bottom', end: 'bottom top', scrub: .45 } })
          .fromTo(upper, { xPercent: -3, yPercent: 10, rotationY: -11, rotationZ: -6, transformPerspective: 1200 },
            { xPercent: 3, yPercent: -14, rotationY: 2, rotationZ: -3, ease: 'none' }, 0)
          .fromTo(lower, { xPercent: 4, yPercent: -8, rotationY: 9, rotationZ: -4, transformPerspective: 1200 },
            { xPercent: -4, yPercent: 14, rotationY: -3, rotationZ: -7, ease: 'none' }, 0);
      }

      const warm = document.querySelector('.ambient-warm');
      const silver = document.querySelector('.ambient-silver');
      if (warm && silver) {
        gsap.timeline({ scrollTrigger: { start: 0, end: 'max', scrub: .7 } })
          .fromTo(warm, { yPercent: -12, opacity: .12 }, { yPercent: 12, opacity: .65, ease: 'none' }, 0)
          .fromTo(silver, { yPercent: 15, opacity: .5 }, { yPercent: -15, opacity: .12, ease: 'none' }, 0);
      }

      const contention = document.querySelector('.contention-figure');
      if (contention) {
        const bars = contention.querySelectorAll('.contention-bars span');
        const winner = contention.querySelector('.winner');
        gsap.timeline({ scrollTrigger: { trigger: contention, start: 'top 90%', end: 'bottom 45%', scrub: .35 } })
          .from(bars, { scaleY: .12, rotationX: 35, stagger: { amount: .35 }, duration: 1, ease: 'power2.out' })
          .from(winner, { backgroundColor: '#8d8170', duration: .5 }, .6);
      }

      const agreement = document.querySelector('.judge-figure');
      if (agreement) {
        gsap.timeline({ scrollTrigger: { trigger: agreement, start: 'top 90%', end: 'bottom 50%', scrub: .35 } })
          .from('.agreement > span', { y: 35, scale: .88, transformOrigin: 'left bottom', duration: 1, ease: 'power2.out' }, 0)
          .from('.agreement-track span', { scaleX: 0, duration: 1, ease: 'power2.inOut' }, .15);
      }

      const trace = document.querySelector('.experience-trace');
      if (trace) gsap.from(trace, {
        scaleY: 0, ease: 'none',
        scrollTrigger: { trigger: '.experience-list', start: 'top 85%', end: 'bottom 45%', scrub: .35 },
      });

      for (const step of document.querySelectorAll('.approach-steps li')) {
        once(step, { x: -22, opacity: .3 });
      }
      if (desktop.matches && document.querySelector('#approach')) {
        ScrollTrigger.create({ trigger: '#approach', start: 'top bottom', end: 'bottom top', onUpdate: self => setInspectionProgress(self.progress) });
      }

      const portrait = document.querySelector('.portrait-frame img');
      if (portrait) gsap.fromTo(portrait, { scale: 1.09, yPercent: 3 }, {
        scale: 1, yPercent: 0, ease: 'none',
        scrollTrigger: { trigger: '.portrait-frame', start: 'top bottom', end: 'bottom 35%', scrub: .45 },
      });

      for (const rule of document.querySelectorAll('.evidence-rule')) {
        once(rule, { scaleX: 0, duration: 1.15 });
      }
      for (const row of document.querySelectorAll('.judge-results > div, .strategy-list > div, .case-index-link, .framework-item')) {
        once(row, { y: 24, opacity: .35 });
      }
      for (const next of document.querySelectorAll('.next-case > a, .archive-link-action')) {
        once(next, { x: -28, opacity: .3 });
      }

      const progress = document.querySelector('.reading-progress');
      if (progress) gsap.to(progress, {
        scaleX: 1, ease: 'none',
        scrollTrigger: { trigger: '.case-reading', start: 'top 40%', end: 'bottom bottom', scrub: true },
      });
    });

    if (initialized) window.scrollTo({ ...position, behavior: 'instant' });
    initialized = true;
  }

  const refresh = () => ScrollTrigger.refresh();
  configure();
  media.addEventListener('change', configure);
  desktop.addEventListener('change', configure);
  window.addEventListener('portfolio:layout', refresh);
  document.querySelectorAll('.experience-item').forEach(item => item.addEventListener('toggle', refresh));

  function cleanup(event: PageTransitionEvent) {
    if (event.persisted) return;
    media.removeEventListener('change', configure);
    desktop.removeEventListener('change', configure);
    window.removeEventListener('portfolio:layout', refresh);
    document.querySelectorAll('.experience-item').forEach(item => item.removeEventListener('toggle', refresh));
    context?.revert();
    window.removeEventListener('pagehide', cleanup);
  }
  window.addEventListener('pagehide', cleanup);
}
