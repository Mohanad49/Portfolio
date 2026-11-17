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
  // Handed back for good (software or exhausted retries, a lost context, or an error), or resting
  // before a retry: in both cases a later media change must not bring the stage back by itself.
  const barred = useRef(false);
  const restingNow = useRef(false);
  // React Three Fiber forces a context loss when a canvas unmounts. Only the canvas that is
  // current may report one.
  const current = useRef<symbol | null>(null);
  const minted = useRef<{ mode: string; token: symbol } | null>(null);

  useEffect(() => {
    const motion = matchMedia(motionQuery);
    const lite = matchMedia(liteQuery);
    const renderer = inspectRenderer();
    hardware.current = renderer.hardware;
    decide.current = () => setMode(!motion.matches || !renderer.supported || barred.current || restingNow.current ? 'off' : lite.matches ? 'lite' : 'full');
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
    const timer = window.setTimeout(() => { restingNow.current = false; setResting(false); decide.current(); }, STAGE_RETURN.restMs);
    return () => window.clearTimeout(timer);
  }, [resting]);

  useEffect(() => {
    if (mode === 'pending') return;
    document.documentElement.classList.toggle('has-stage', mode !== 'off');
    document.documentElement.classList.toggle('no-stage', mode === 'off');
    document.documentElement.classList.toggle('stage-lite', mode === 'lite');
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
      if (hardware.current && returns.current < STAGE_RETURN.attempts) { returns.current += 1; restingNow.current = true; setResting(true); }
      else barred.current = true;
    };
    window.addEventListener('scene:ready', live);
    window.addEventListener('scene:slow', slow);
    return () => { window.removeEventListener('scene:ready', live); window.removeEventListener('scene:slow', slow); };
  }, [mode]);

  // On phones this gate is only mounted after the visitor's first input (see main.ts), so the
  // renderer never competes with loading the page. It then starts in the next idle moment.
  useEffect(() => {
    if (mode !== 'lite') { setArmed(mode === 'full'); return; }
    let idle = 0;
    let timer = 0;
    const arm = () => setArmed(true);
    if ('requestIdleCallback' in window) idle = window.requestIdleCallback(arm, { timeout: 1200 });
    else timer = globalThis.setTimeout(arm, 300) as unknown as number;
    return () => {
      if (idle && 'cancelIdleCallback' in window) window.cancelIdleCallback(idle);
      globalThis.clearTimeout(timer);
    };
  }, [mode]);

  if (mode === 'pending' || mode === 'off' || !armed) { current.current = null; minted.current = null; return null; }
  // One token per mounted canvas: it stays the same while this mode's canvas lives and changes with it.
  if (minted.current?.mode !== mode) minted.current = { mode, token: Symbol(mode) };
  const token = minted.current.token;
  current.current = token;
  const stop = () => { if (current.current === token) { barred.current = true; setMode('off'); } };
  return (
    <StageBoundary onError={stop}>
      <Suspense fallback={null}>
        <StageCanvas key={mode} lite={mode === 'lite'} onLost={stop} />
      </Suspense>
    </StageBoundary>
  );
}
