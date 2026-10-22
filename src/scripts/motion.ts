import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { setInspectionProgress } from '../lib/inspection-state';

export function initMotion() {
  gsap.registerPlugin(ScrollTrigger);
  const media = matchMedia('(min-width: 761px) and (prefers-reduced-motion: no-preference)');
  let context: gsap.Context | undefined;
  function configure() {
    const position = { top: scrollY, left: scrollX };
    context?.revert();
    context = undefined;
    if (!media.matches) { setInspectionProgress(0); return; }
    context = gsap.context(() => {
      gsap.from('.hero h1 span', { y: 10, opacity: .85, duration: .9, stagger: .08, ease: 'expo.out' });
      gsap.to('.hero-scene', { yPercent: 3, scale: 1.035, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: .6 } });
      for (const element of document.querySelectorAll<HTMLElement>('[data-reveal]')) {
        gsap.from(element, { y: 22, opacity: .75, duration: .85, ease: 'expo.out', scrollTrigger: { trigger: element, start: 'top 92%', once: true } });
      }
      ScrollTrigger.create({ trigger: '#approach', start: 'top bottom', end: 'bottom top', onUpdate: self => setInspectionProgress(self.progress) });
    });
    window.scrollTo({ ...position, behavior: 'instant' });
  }
  configure();
  media.addEventListener('change', configure);
  window.addEventListener('pagehide', () => { media.removeEventListener('change', configure); context?.revert(); }, { once: true });
}
