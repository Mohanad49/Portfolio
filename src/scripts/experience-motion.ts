import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function initExperienceMotion() {
  const opening = document.querySelector<HTMLElement>('.passage-opening');
  const history = document.querySelector<HTMLElement>('.run-history');
  if (!opening || !history) return;
  gsap.registerPlugin(ScrollTrigger);
  const motion = matchMedia('(prefers-reduced-motion: no-preference)');
  const desktop = matchMedia('(min-width: 1024px)');
  let context: gsap.Context | undefined;
  let historyRevealed = false;

  function configure() {
    if (!opening || !history) return;
    const evidence = document.querySelector<HTMLElement>('#evidence');
    const before = evidence?.getBoundingClientRect().top;
    const retainEvidence = before !== undefined && before < innerHeight * .75;
    if (history.getBoundingClientRect().top < innerHeight * .9) historyRevealed = true;
    context?.revert();
    context = undefined;
    opening.style.setProperty('--passage-height', desktop.matches ? '200svh' : '145svh');
    opening.style.setProperty('--passage-min-height', desktop.matches ? '1440px' : '1073px');
    opening.classList.toggle('has-passage-motion', motion.matches);
    if (motion.matches) context = gsap.context(() => {
      const sequence = gsap.timeline({ scrollTrigger: { trigger: opening, start: 'top top', end: 'bottom bottom', scrub: .2, invalidateOnRefresh: true } });
      if (desktop.matches) {
        sequence.to('.passage-plate', { scale: 1.22, duration: 1, ease: 'none' }, 0);
        sequence.to('.passage-shade', { opacity: .9, duration: 1, ease: 'none' }, 0);
        sequence.to('.passage-introduction', { color: '#f8f2e9', duration: .35, ease: 'none' }, 0);
      }
      sequence.to('.passage-upper', { yPercent: () => innerWidth <= 600 ? -12 : -4, xPercent: 4, rotate: 2, duration: 1, ease: 'none' }, 0);
      sequence.to('.passage-lower', { yPercent: desktop.matches ? 55 : 65, xPercent: -3, rotate: -2, duration: 1, ease: 'none' }, 0);
      sequence.to('.passage-peek-title', { xPercent: desktop.matches ? -35 : 0, y: desktop.matches ? -50 : 0, scale: desktop.matches ? 1.35 : 1.15, duration: .8, ease: 'none' }, .15);
      sequence.to('.passage-peek-summary', { xPercent: -30, y: desktop.matches ? -35 : 0, duration: .8, ease: 'none' }, .15);
      sequence.to('#passage-title', { y: desktop.matches ? -60 : -16, opacity: .85, duration: .6, ease: 'none' }, .2);
      if (!historyRevealed && history.getBoundingClientRect().top > innerHeight * .9) {
        gsap.from('.observation', { opacity: .18, y: 20, duration: .7, stagger: .14, clearProps: 'opacity,transform', ease: 'expo.out', onComplete: () => { historyRevealed = true; }, scrollTrigger: { trigger: history, start: 'top 85%', once: true } });
      } else historyRevealed = true;
    });
    if (retainEvidence && evidence && before !== undefined) {
      const adjustment = evidence.getBoundingClientRect().top - before;
      if (Math.abs(adjustment) > .5) window.scrollBy({ top: adjustment, behavior: 'instant' });
    }
  }
  configure();
  motion.addEventListener('change', configure);
  desktop.addEventListener('change', configure);
  function cleanup(event: PageTransitionEvent) {
    if (event.persisted) return;
    context?.revert();
    motion.removeEventListener('change', configure);
    desktop.removeEventListener('change', configure);
    window.removeEventListener('pagehide', cleanup);
  }
  window.addEventListener('pagehide', cleanup);
}
