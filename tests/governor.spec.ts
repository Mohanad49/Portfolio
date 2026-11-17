import { test, expect } from '@playwright/test';
import { createGovernor, GOVERNOR, isSoftwareRenderer, STAGE_RETURN } from '../src/scene/governor';

// Pure rules, no page. The stage's objects once vanished for a whole visit after a burst of long
// frames at the bottom of the page; these cases pin what may and may not end the stage.
const feed = (governor: ReturnType<typeof createGovernor>, seconds: number, frameTime: number) => {
  const steps: string[] = [];
  for (let elapsed = 0; elapsed < seconds; elapsed += frameTime) steps.push(governor.step(frameTime));
  return steps;
};

test('a renderer that never holds a usable rate is handed back within seconds', () => {
  const governor = createGovernor();
  // Software rendering: about two frames a second from the start.
  const steps = feed(governor, 4, 0.5);
  expect(steps).toContain('stopped');
  expect(steps.indexOf('stopped')).toBeLessThan(8);
  expect(governor.level).toBe(2);
  expect(governor.step(0.016)).toBe('stopped');
});

test('a slow but steady start steps down once and then stops only if the lighter level is slow too', () => {
  const governor = createGovernor();
  // 15 frames a second: under the full-quality floor, above the lighter one.
  const steps = feed(governor, 12, 1 / 15);
  expect(steps.filter(step => step === 'changed')).toHaveLength(1);
  expect(steps).not.toContain('stopped');
  expect(governor.level).toBe(1);
});

test('a burst of long frames after the stage has run well never ends it', () => {
  const governor = createGovernor();
  expect(feed(governor, 6, 1 / 30)).not.toContain('changed');
  expect(governor.proven).toBe(true);
  // The reported case: a fast scroll to the bottom, then a dozen frames of 270 to 470 ms.
  const burst = [0.32, 0.3, 0.38, 0.47, 0.27, 0.27, 0.33, 0.41, 0.29, 0.36, 0.44, 0.3].map(frame => governor.step(frame));
  expect(burst).not.toContain('stopped');
  expect(burst.filter(step => step === 'changed')).toHaveLength(1);
  expect(governor.level).toBe(1);
  // Back to a healthy rate: the stage is still running, and full quality returns.
  const after = feed(governor, 12, 1 / 60);
  expect(after).not.toContain('stopped');
  expect(after).toContain('changed');
  expect(governor.level).toBe(0);
});

test('a proven renderer is handed back only after sustained slowness at the lighter level', () => {
  const governor = createGovernor();
  feed(governor, 6, 1 / 30);
  // Five frames a second. One slow window steps down; it then takes several more in a row to stop.
  const steps = feed(governor, 3.5, 0.2);
  expect(steps).not.toContain('stopped');
  expect(governor.level).toBe(1);
  const more = feed(governor, 2 * GOVERNOR.slowWindowsToStop + 2, 0.2);
  expect(more).toContain('stopped');
});

test('full quality is retried a limited number of times, and a returning tab is not a slow frame', () => {
  const governor = createGovernor();
  feed(governor, 6, 1 / 30);
  expect(governor.step(8)).toBe('steady');
  expect(governor.level).toBe(0);
  let restored = 0;
  for (let round = 0; round < GOVERNOR.restores + 2; round += 1) {
    // Stall, then recover.
    governor.step(0.4); governor.step(0.4);
    if (feed(governor, 12, 1 / 60).includes('changed')) restored += 1;
  }
  expect(restored).toBe(GOVERNOR.restores);
  expect(governor.level).toBe(1);
});

test('only a hardware renderer is offered the stage again after a handback', () => {
  for (const name of [
    'ANGLE (Google, Vulkan 1.3.0 (SwiftShader Device (Subzero) (0x0000C0DE)), SwiftShader driver)',
    'llvmpipe (LLVM 15.0.7, 256 bits)',
    'Microsoft Basic Render Driver',
    'Generic Software Renderer',
    '',
  ]) expect(isSoftwareRenderer(name), name).toBe(true);
  for (const name of [
    'ANGLE (Intel, ANGLE Metal Renderer: Intel(R) UHD Graphics 630, Unspecified Version)',
    'ANGLE (Apple, ANGLE Metal Renderer: Apple M2, Unspecified Version)',
    'Mali-G78',
    'Adreno (TM) 740',
  ]) expect(isSoftwareRenderer(name), name).toBe(false);
  expect(STAGE_RETURN.attempts).toBeGreaterThan(0);
});
