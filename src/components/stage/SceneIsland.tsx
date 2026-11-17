import { Component, lazy, Suspense, useEffect, useRef, useState, type ReactNode } from 'react';
import { isSoftwareRenderer, STAGE_RETURN } from '../../scene/governor';

// The renderer and scene load only after this small gate decides the stage can run.
const StageCanvas = lazy(() => import('./StageCanvas'));

const motionQuery = '(prefers-reduced-motion: no-preference)';
const liteQuery = '(max-width: 1023px), (pointer: coarse)';

// If the renderer cannot load or throws, the page keeps its still instead of breaking.
class StageBoundary extends Component<{ onError: () => void; children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  componentDidCatch() { this.props.onError(); }
  render() { return this.state.failed ? null : this.props.children; }
}

// One throwaway context answers both questions: can the stage run, and on what.
function inspectRenderer() {
  try {
    const gl = document.createElement('canvas').getContext('webgl2');
    if (!gl) return { supported: false, hardware: false };
    // Firefox reports the renderer directly and warns about the extension; Chromium and Safari need it.
    let name = String(gl.getParameter(gl.RENDERER) ?? '');
    if (/^(webkit webgl|mozilla)?$/i.test(name.trim())) {
      const info = gl.getExtension('WEBGL_debug_renderer_info');
      if (info) name = String(gl.getParameter(info.UNMASKED_RENDERER_WEBGL) ?? '');
    }
    gl.getExtension('WEBGL_lose_context')?.loseContext();
    return { supported: true, hardware: !isSoftwareRenderer(name) };
  } catch {
    return { supported: false, hardware: false };
  }
}

export default function SceneIsland() {
  const [mode, setMode] = useState<'pending' | 'full' | 'lite' | 'off'>('pending');
  const [armed, setArmed] = useState(false);
  const [resting, setResting] = useState(false);
  const decide = useRef(() => {});
  const hardware = useRef(false);
  const returns = useRef(0);

  useEffect(() => {
    const motion = matchMedia(motionQuery);
    const lite = matchMedia(liteQuery);
    const renderer = inspectRenderer();
    hardware.current = renderer.hardware;
    decide.current = () => setMode(!motion.matches || !renderer.supported ? 'off' : lite.matches ? 'lite' : 'full');
    const onChange = () => decide.current();
    decide.current();
    motion.addEventListener('change', onChange);
    lite.addEventListener('change', onChange);
    return () => { motion.removeEventListener('change', onChange); lite.removeEventListener('change', onChange); };
  }, []);

  // A hardware renderer that was handed back for slowness was busy, not unable. After a rest the
  // stage is offered again, a bounded number of times, so its objects never need a reload to return.
  useEffect(() => {
    if (!resting) return;
    const timer = window.setTimeout(() => { setResting(false); decide.current(); }, STAGE_RETURN.restMs);
    return () => window.clearTimeout(timer);
  }, [resting]);

  useEffect(() => {
    if (mode === 'pending') return;
    document.documentElement.classList.toggle('has-stage', mode !== 'off');
    document.documentElement.classList.toggle('no-stage', mode === 'off');
    if (mode === 'off') {
      document.documentElement.classList.remove('stage-live');
      window.dispatchEvent(new Event('scene:unavailable'));
      return;
    }
    // The canvas fades in once its first complete frame exists. A device that cannot keep
    // a usable frame rate gives the page back to its still.
    const live = () => document.documentElement.classList.add('stage-live');
    const slow = () => {
      setMode('off');
      if (hardware.current && returns.current < STAGE_RETURN.attempts) { returns.current += 1; setResting(true); }
    };
    window.addEventListener('scene:ready', live);
    window.addEventListener('scene:slow', slow);
    return () => { window.removeEventListener('scene:ready', live); window.removeEventListener('scene:slow', slow); };
  }, [mode]);

  // Phones start the renderer only once the page has loaded and the main thread is idle,
  // so the first paint and first interaction never compete with it.
  useEffect(() => {
    if (mode !== 'lite') { setArmed(mode === 'full'); return; }
    let idle = 0;
    let timer = 0;
    const arm = () => setArmed(true);
    const queue = () => {
      if ('requestIdleCallback' in window) idle = window.requestIdleCallback(arm, { timeout: 2500 });
      else timer = globalThis.setTimeout(arm, 600) as unknown as number;
    };
    if (document.readyState === 'complete') queue();
    else window.addEventListener('load', queue, { once: true });
    return () => {
      window.removeEventListener('load', queue);
      if (idle && 'cancelIdleCallback' in window) window.cancelIdleCallback(idle);
      globalThis.clearTimeout(timer);
    };
  }, [mode]);

  if (mode === 'pending' || mode === 'off' || !armed) return null;
  return (
    <StageBoundary onError={() => setMode('off')}>
      <Suspense fallback={null}>
        <StageCanvas key={mode} lite={mode === 'lite'} onLost={() => setMode('off')} />
      </Suspense>
    </StageBoundary>
  );
}
