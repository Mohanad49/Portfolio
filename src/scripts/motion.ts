import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { setInspectionProgress } from '../lib/inspection-state';

export function initMotion() {
  gsap.registerPlugin(ScrollTrigger);
  const media = matchMedia('(prefers-reduced-motion: no-preference)');
  const desktop = matchMedia('(min-width: 761px)');
  const revealed = new WeakSet<HTMLElement>();
  let context: gsap.Context | undefined;
  let initialized = false;
  function configure() {
    const position = { top: scrollY, left: scrollX };
    context?.revert();
    context = undefined;
    if (!media.matches || !desktop.matches) setInspectionProgress(0);
    if (media.matches) context = gsap.context(() => {
      if (desktop.matches) {
        gsap.from('.hero h1 span', { y: 10, opacity: .85, duration: .9, stagger: .08, ease: 'expo.out' });
        gsap.to('.hero-scene', { yPercent: 3, scale: 1.035, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: .6 } });
        ScrollTrigger.create({ trigger: '#approach', start: 'top bottom', end: 'bottom top', onUpdate: self => setInspectionProgress(self.progress) });
      }
      for (const element of document.querySelectorAll<HTMLElement>('[data-reveal]')) {
        // Leave content at the current reading position steady, including deep links.
        if (revealed.has(element)) continue;
        if (element.getBoundingClientRect().top < innerHeight * .92) { revealed.add(element); continue; }
        gsap.from(element, { y: 28, opacity: .18, duration: .8, ease: 'expo.out', clearProps: 'transform,opacity', onComplete: () => { revealed.add(element); }, scrollTrigger: { trigger: element, start: 'top 92%', once: true } });
      }
    });
    if (initialized) window.scrollTo({ ...position, behavior: 'instant' });
    initialized = true;
  }
  configure();
  media.addEventListener('change', configure);
  desktop.addEventListener('change', configure);
  function cleanup(event: PageTransitionEvent) {
    if (event.persisted) return;
    media.removeEventListener('change', configure);
    desktop.removeEventListener('change', configure);
    context?.revert();
    window.removeEventListener('pagehide', cleanup);
  }
  window.addEventListener('pagehide', cleanup);
}
