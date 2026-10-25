import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function initExperienceMotion() {
  const opening = document.querySelector<HTMLElement>('.passage-opening');
  const frame = document.querySelector<HTMLElement>('.passage-frame');
  const stage = document.querySelector<HTMLElement>('.passage-stage');
  const history = document.querySelector<HTMLElement>('.run-history');
  const evidence = document.querySelector<HTMLElement>('.evidence-study');
  const anchor = document.querySelector<HTMLElement>('#evidence');
  const title = document.querySelector<HTMLElement>('.passage-project-title');
  const summary = document.querySelector<HTMLElement>('.passage-project-summary');
  const titleDestination = document.querySelector<HTMLElement>('.passage-title-destination');
  const summaryDestination = document.querySelector<HTMLElement>('.passage-summary-destination');
  if (!opening || !frame || !stage || !history || !evidence || !anchor || !title || !summary || !titleDestination || !summaryDestination) return;
  gsap.registerPlugin(ScrollTrigger);
  const motion = matchMedia('(prefers-reduced-motion: no-preference)');
  const desktop = matchMedia('(min-width: 1024px)');
  let context: gsap.Context | undefined;
  let sequence: gsap.core.Timeline | undefined;
  let historyRevealed = false;
  let configured = false;
  let resizeTimer: number | undefined;

  function destination(element: HTMLElement, target: HTMLElement, compression = 1) {
    const rect = target.getBoundingClientRect();
    const origin = element.offsetParent?.getBoundingClientRect();
    const ratio = Math.min(parseFloat(getComputedStyle(target).fontSize) / parseFloat(getComputedStyle(element).fontSize), rect.width / (element.offsetWidth * compression));
    return { x: rect.left - (origin?.left ?? 0) - element.offsetLeft, y: rect.top - (origin?.top ?? 0) - element.offsetTop, scaleX: ratio * compression, scaleY: ratio };
  }

  function bookmarkOffset(target: HTMLElement) {
    return parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) + parseFloat(getComputedStyle(target).scrollMarginTop);
  }

  function syncBookmark() {
    if (!['#evidence', '#work', '#Portofolio'].includes(location.hash) || !motion.matches || !anchor) return;
    window.scrollTo({ top: anchor.getBoundingClientRect().top + scrollY - bookmarkOffset(anchor), behavior: 'instant' });
    ScrollTrigger.update();
    sequence?.progress(sequence.scrollTrigger?.progress ?? 1);
  }

  function configure() {
    if (!opening || !frame || !stage || !history || !evidence || !anchor || !title || !summary || !titleDestination || !summaryDestination) return;
    const before = evidence.getBoundingClientRect().top;
    const retainEvidence = before < innerHeight * .75;
    const arrivingAtBookmark = !configured && ['#evidence', '#work', '#Portofolio'].includes(location.hash) && Math.abs(anchor.getBoundingClientRect().top - bookmarkOffset(anchor)) < 4;
    if (history.getBoundingClientRect().top < innerHeight * .9) historyRevealed = true;
    context?.revert();
    context = undefined;
    sequence = undefined;
    opening.style.setProperty('--passage-height', `${stage.offsetHeight * (desktop.matches ? 2.4 : 2.2)}px`);
    const compactFits = desktop.matches || stage.offsetHeight <= parseFloat(getComputedStyle(stage).minHeight) + 2;
    const enhanced = motion.matches && compactFits;
    opening.classList.toggle('has-passage-motion', enhanced);
    if (enhanced) context = gsap.context(() => {
      sequence = gsap.timeline({ defaults: { ease: 'none' }, scrollTrigger: { trigger: opening, start: 'top top', end: () => `+=${opening.offsetHeight - frame.offsetHeight}`, scrub: .2, invalidateOnRefresh: true } });
      if (desktop.matches) {
        sequence.to('.passage-plate', { scale: 3.6, duration: 1 }, 0);
        sequence.to('.passage-shade', { opacity: 1, duration: .4 }, 0);
      }
      sequence.to('.passage-upper', { yPercent: -120, xPercent: 4, rotate: 2, duration: 1 }, 0);
      sequence.to('.passage-lower', { yPercent: 140, xPercent: -3, rotate: -2, duration: 1 }, 0);
      sequence.to('.passage-artwork, .passage-mobile', { autoAlpha: 0, duration: .5 }, .25);
      sequence.to('.passage-introduction', { color: '#f8f2e9', duration: .2 }, 0);
      sequence.to('#passage-title', { autoAlpha: 0, y: -80, duration: .55 }, .05);
      sequence.to('.passage-role, .passage-introduction, .passage-actions a', { autoAlpha: 0, y: -36, duration: .5 }, .05);
      sequence.to(title, { scaleX: () => destination(title, titleDestination, .95).scaleX, scaleY: () => destination(title, titleDestination, .95).scaleY, duration: 1 }, 0);
      sequence.to(title, { x: () => destination(title, titleDestination, .95).x, y: () => destination(title, titleDestination, .95).y, duration: .9, ease: 'power2.inOut' }, .1);
      sequence.to(summary, { x: () => destination(summary, summaryDestination).x, y: () => destination(summary, summaryDestination).y, scaleX: () => destination(summary, summaryDestination).scaleX, scaleY: () => destination(summary, summaryDestination).scaleY, duration: .9, ease: 'power2.inOut' }, .1);
      sequence.to(summary, { autoAlpha: 1, duration: .3 }, .55);
      sequence.fromTo('.passage-arrival', { autoAlpha: 0 }, { autoAlpha: 1, duration: .3 }, .55);
      sequence.from('.passage-arrival-content', { y: 24, duration: .3 }, .55);
      if (!historyRevealed && history.getBoundingClientRect().top > innerHeight * .9) {
        gsap.from('.observation', { opacity: .18, y: 20, duration: .7, stagger: .14, clearProps: 'opacity,transform', ease: 'expo.out', onComplete: () => { historyRevealed = true; }, scrollTrigger: { trigger: history, start: 'top 85%', once: true } });
      } else historyRevealed = true;
    });
    if (arrivingAtBookmark) syncBookmark();
    else if (retainEvidence) {
      const adjustment = evidence.getBoundingClientRect().top - before;
      if (Math.abs(adjustment) > .5) window.scrollBy({ top: adjustment, behavior: 'instant' });
    }
    configured = true;
    window.dispatchEvent(new Event('portfolio:layout'));
  }
  function resize() {
    window.clearTimeout(resizeTimer);
    resizeTimer = window.setTimeout(configure, 150);
  }
  configure();
  let stageHeight = stage.offsetHeight;
  const stageObserver = new ResizeObserver(() => {
    if (stage.offsetHeight === stageHeight) return;
    stageHeight = stage.offsetHeight;
    resize();
  });
  stageObserver.observe(stage);
  motion.addEventListener('change', configure);
  window.addEventListener('resize', resize);
  window.addEventListener('hashchange', syncBookmark);
  function cleanup(event: PageTransitionEvent) {
    if (event.persisted) return;
    context?.revert();
    stageObserver.disconnect();
    window.clearTimeout(resizeTimer);
    motion.removeEventListener('change', configure);
    window.removeEventListener('resize', resize);
    window.removeEventListener('hashchange', syncBookmark);
    window.removeEventListener('pagehide', cleanup);
  }
  window.addEventListener('pagehide', cleanup);
}
