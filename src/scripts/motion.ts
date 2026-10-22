import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { setInspectionProgress } from '../lib/inspection-state';

export function initMotion() {
  gsap.registerPlugin(ScrollTrigger);
  const media = gsap.matchMedia();
  media.add('(min-width: 761px) and (prefers-reduced-motion: no-preference)', () => {
    gsap.from('.hero h1 span', { y: 10, opacity: .85, duration: .9, stagger: .08, ease: 'expo.out' });
    gsap.to('.hero-scene', { yPercent: 3, scale: 1.035, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: .6 } });
    for (const element of document.querySelectorAll<HTMLElement>('[data-reveal]')) {
      gsap.from(element, { y: 22, opacity: .75, duration: .85, ease: 'expo.out', scrollTrigger: { trigger: element, start: 'top 92%', once: true } });
    }
    ScrollTrigger.create({ trigger: '#approach', start: 'top bottom', end: 'bottom top', onUpdate: self => setInspectionProgress(self.progress) });
    return () => setInspectionProgress(0);
  });
  window.addEventListener('pagehide', () => media.revert(), { once: true });
}
