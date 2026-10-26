import { Component, useCallback, useEffect, useRef, useState, type ComponentType, type ReactNode } from 'react';
import { inspectionState } from '../lib/inspection-state';

export interface InspectionCanvasProps { onReady: () => void; onFailure: () => void; }

class CanvasBoundary extends Component<{ children: ReactNode; onFailure: () => void }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  componentDidCatch() { this.props.onFailure(); }
  render() { return this.state.failed ? null : this.props.children; }
}

export default function InspectionIsland() {
  const host = useRef<HTMLDivElement>(null);
  const focusOnReady = useRef(false);
  const [visible, setVisible] = useState(false);
  const [requested, setRequested] = useState(false);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const [spread, setSpread] = useState(22);
  const [Scene, setScene] = useState<ComponentType<InspectionCanvasProps> | null>(null);
  const handleReady = useCallback(() => {
    focusOnReady.current = !!host.current?.querySelector('.inspection-start:focus');
    setReady(true);
  }, []);
  const handleFailure = useCallback(() => { setFailed(true); setReady(false); }, []);

  useEffect(() => {
    const element = host.current;
    if (!element) return;
    const media = matchMedia('(min-width: 1024px) and (prefers-reduced-motion: no-preference)');
    let intersects = false;
    const update = () => {
      const available = intersects && media.matches && !document.hidden;
      setVisible(available);
      if (!available) setReady(false);
    };
    const observer = new IntersectionObserver(entries => { intersects = entries.at(-1)?.isIntersecting ?? false; update(); }, { rootMargin: '120px' });
    observer.observe(element);
    media.addEventListener('change', update);
    document.addEventListener('visibilitychange', update);
    return () => {
      observer.disconnect();
      media.removeEventListener('change', update);
      document.removeEventListener('visibilitychange', update);
    };
  }, []);

  useEffect(() => {
    if (!requested || !visible || Scene || failed) return;
    let cancelled = false;
    async function loadScene() {
      try {
        const probe = document.createElement('canvas');
        const context = probe.getContext('webgl2');
        if (!context) { if (!cancelled) handleFailure(); return; }
        context.getExtension('WEBGL_lose_context')?.loseContext();
        const module = await import('./InspectionCanvas');
        if (!cancelled) setScene(() => module.default);
      } catch { if (!cancelled) handleFailure(); }
    }
    void loadScene();
    return () => { cancelled = true; };
  }, [requested, visible, Scene, failed, handleFailure]);

  useEffect(() => {
    if (ready && focusOnReady.current) {
      focusOnReady.current = false;
      host.current?.querySelector('input')?.focus({ preventScroll: true });
    }
  }, [ready]);

  function changeSpread(value: number) {
    setSpread(value);
    inspectionState.spread = value / 100;
    inspectionState.invalidate?.();
  }

  function showArtwork() {
    setRequested(false);
    setReady(false);
    requestAnimationFrame(() => host.current?.querySelector('button')?.focus({ preventScroll: true }));
  }

  return <div className="inspection-enhancement" ref={host} data-ready={requested && ready && visible && !failed}>
    {requested && visible && Scene && !failed && <CanvasBoundary onFailure={handleFailure}><Scene onReady={handleReady} onFailure={handleFailure} /></CanvasBoundary>}
    {visible && !ready && !failed && <button className="inspection-start" type="button" aria-disabled={requested} aria-busy={requested} onClick={() => { if (!requested) setRequested(true); }}>{requested ? 'Preparing the 3D study…' : 'Inspect in 3D'}<span>{requested ? 'The artwork stays visible while it loads.' : 'Optional interactive material study'}</span></button>}
    {failed && <p className="inspection-message" role="status">3D is unavailable. The complete artwork stays visible.</p>}
    {ready && visible && !failed && <div className="inspection-controls"><label htmlFor="inspection-spread">Separate layers<input id="inspection-spread" type="range" min="0" max="100" value={spread} aria-valuetext={`${spread}% separation`} onChange={event => changeSpread(Number(event.target.value))} /></label><button type="button" onClick={() => changeSpread(22)}>Reset</button></div>}
    {ready && visible && !failed && <button className="inspection-exit" type="button" onClick={showArtwork}>Use artwork</button>}
  </div>;
}
