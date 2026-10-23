import { Component, useCallback, useEffect, useRef, useState, type ComponentType, type ReactNode } from 'react';
import type { PassageSceneProps } from './PassageCanvas';

class SceneBoundary extends Component<{ children: ReactNode; onFailure: () => void }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  componentDidCatch() { this.props.onFailure(); }
  render() { return this.state.failed ? null : this.props.children; }
}

export default function PassageIsland({ metalUrl, environmentUrl }: Pick<PassageSceneProps, 'metalUrl' | 'environmentUrl'>) {
  const host = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const [Scene, setScene] = useState<ComponentType<PassageSceneProps> | null>(null);
  const handleReady = useCallback(() => setReady(true), []);
  const handleFailure = useCallback(() => { setFailed(true); setReady(false); }, []);

  useEffect(() => {
    if (!host.current) return;
    const media = matchMedia('(min-width: 1024px) and (prefers-reduced-motion: no-preference)');
    let intersects = false;
    let active = false;
    let timer: number | undefined;
    const update = () => {
      window.clearTimeout(timer);
      if (!intersects || !media.matches || document.hidden) {
        active = false; setVisible(false); setReady(false);
      } else if (!active) {
        timer = window.setTimeout(() => {
          if (intersects && media.matches && !document.hidden) { active = true; setVisible(true); }
        }, 150);
      }
    };
    const scrolling = () => { if (!active && intersects) update(); };
    const observer = new IntersectionObserver(entries => { intersects = entries.at(-1)?.isIntersecting ?? false; update(); });
    observer.observe(host.current);
    media.addEventListener('change', update);
    document.addEventListener('visibilitychange', update);
    window.addEventListener('scroll', scrolling, { passive: true });
    return () => {
      window.clearTimeout(timer); observer.disconnect();
      media.removeEventListener('change', update);
      document.removeEventListener('visibilitychange', update);
      window.removeEventListener('scroll', scrolling);
    };
  }, []);

  useEffect(() => {
    if (!visible || Scene || failed) return;
    let cancelled = false;
    async function load() {
      try {
        const probe = document.createElement('canvas');
        const context = probe.getContext('webgl2');
        if (!context) { if (!cancelled) handleFailure(); return; }
        context.getExtension('WEBGL_lose_context')?.loseContext();
        const module = await import('./PassageCanvas');
        if (!cancelled) setScene(() => module.default);
      } catch { if (!cancelled) handleFailure(); }
    }
    void load();
    return () => { cancelled = true; };
  }, [visible, Scene, failed, handleFailure]);

  return <div className="passage-enhancement" ref={host} data-ready={ready && visible && !failed}>
    {visible && Scene && !failed && <SceneBoundary onFailure={handleFailure}><Scene metalUrl={metalUrl} environmentUrl={environmentUrl} onReady={handleReady} onFailure={handleFailure} /></SceneBoundary>}
  </div>;
}
