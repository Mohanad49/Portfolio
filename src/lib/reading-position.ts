const key = 'portfolioReadingPosition';
type Position = { x: number; y: number; width: number; height: number };

function read(state: unknown): Position | undefined {
  if (!state || typeof state !== 'object' || !(key in state)) return;
  const position = state[key];
  if (!position || typeof position !== 'object') return;
  if (!('x' in position && 'y' in position && 'width' in position && 'height' in position)) return;
  const { x, y, width, height } = position;
  if ([x, y, width, height].every(value => typeof value === 'number' && Number.isFinite(value)) && width === innerWidth && height === innerHeight) {
    return { x: x as number, y: y as number, width, height };
  }
}

export function preserveReadingPosition(restoreInitial: boolean) {
  const initial = restoreInitial ? read(history.state) : undefined;
  let ready = false;
  let frame = 0;
  const inputs = ['wheel', 'touchstart', 'pointerdown', 'keydown'];
  const cancel = () => cancelAnimationFrame(frame);
  const save = () => {
    if (!ready) return;
    const state: unknown = history.state;
    if (state !== null && (typeof state !== 'object' || Array.isArray(state))) return;
    try {
      history.replaceState({ ...state, [key]: { x: scrollX, y: scrollY, width: innerWidth, height: innerHeight } }, '');
    } catch { /* Restricted browser contexts retain native restoration. */ }
  };
  const restore = (position: Position | undefined) => {
    cancel();
    if (!position) return;
    frame = requestAnimationFrame(() => {
      frame = requestAnimationFrame(() => {
        window.scrollTo({ left: position.x, top: position.y, behavior: 'instant' });
      });
    });
  };
  const traversed = (event: PopStateEvent) => restore(read(event.state));
  const navigating = (event: MouseEvent) => {
    if (event.target instanceof Element && event.target.closest('a[href]')) save();
  };
  window.addEventListener('scrollend', save);
  document.addEventListener('click', navigating, true);
  window.addEventListener('popstate', traversed);
  inputs.forEach(name => window.addEventListener(name, cancel, { passive: true }));
  return {
    ready() { ready = true; restore(initial); },
    dispose() {
      cancel();
      window.removeEventListener('scrollend', save);
      document.removeEventListener('click', navigating, true);
      window.removeEventListener('popstate', traversed);
      inputs.forEach(name => window.removeEventListener(name, cancel));
    },
  };
}
