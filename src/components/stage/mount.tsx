import { createRoot } from 'react-dom/client';
import SceneIsland from './SceneIsland';

// The stage's gate, React included, is mounted by the page's own script when the page is ready
// for it: after the first paint on wide layouts, on the first input on narrow ones.
export function mountStage(target: HTMLElement) {
  createRoot(target).render(<SceneIsland />);
}
