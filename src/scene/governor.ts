/**
 * Quality governor for the stage. Level 0 is full quality, level 1 renders smaller without bloom
 * or multisampling, level 2 hands the page back to its still.
 *
 * A renderer that has never held a usable frame rate is handed back within seconds: that device
 * cannot run the stage. One that has already run well is only stepped down by a stall, because a
 * burst of long frames after that is the page being busy (a fast scroll, another tab on the same
 * GPU), not the device being unable. It is handed back only after sustained slowness at the
 * lighter level, and it returns to full quality once the frame rate has recovered.
 */
export type GovernorStep = 'steady' | 'changed' | 'stopped';

export const GOVERNOR = {
  /** A frame longer than this, twice in a row, counts as a stall. */
  longFrame: 0.25,
  /** A gap this long is a tab coming back, not a slow frame. */
  awayGap: 3,
  /** Seconds of healthy rendering before a renderer counts as proven. */
  provenAfter: 3,
  /** Slow windows in a row, at the lighter level, before a proven renderer is handed back. */
  slowWindowsToStop: 3,
  /** Fast windows in a row before the lighter level returns to full quality. */
  fastWindowsToRestore: 4,
  /** Full quality is retried this many times in one visit, so an unsustainable level cannot flicker. */
  restores: 2,
} as const;

/**
 * Software rendering does not get faster by waiting, so a stage handed back there stays handed
 * back. A hardware renderer that was handed back was busy, and is given the stage again after a
 * rest. An unknown name is treated as software: the page never retries on a guess.
 */
export const isSoftwareRenderer = (name: string) => name.trim() === '' || /swiftshader|llvmpipe|softpipe|software|basic render/i.test(name);

/** How a handed-back stage returns on a hardware renderer. */
export const STAGE_RETURN = { restMs: 12_000, attempts: 2 } as const;

export function createGovernor() {
  const state = { level: 0, frames: 0, strikes: 0, span: 0, count: 0, healthy: 0, proven: false, slowWindows: 0, fastWindows: 0, restores: 0 };
  const clear = () => { state.strikes = 0; state.span = 0; state.count = 0; state.slowWindows = 0; state.fastWindows = 0; };
  const lower = (): GovernorStep => { state.level += 1; clear(); return state.level > 1 ? 'stopped' : 'changed'; };

  return {
    get level() { return state.level; },
    get proven() { return state.proven; },
    /** Feed one rendered frame's elapsed time in seconds. */
    step(elapsed: number): GovernorStep {
      if (state.level > 1) return 'stopped';
      state.frames += 1;
      // The first frames compile shaders, and a long gap is the tab returning.
      if (state.frames <= 2 || elapsed > GOVERNOR.awayGap) return 'steady';
      state.strikes = elapsed > GOVERNOR.longFrame ? state.strikes + 1 : 0;
      state.span += elapsed;
      state.count += 1;
      const stalled = state.strikes >= 2;
      const horizon = state.level === 0 ? 1.5 : 2;
      let slow = false;
      if (state.span >= horizon) {
        const rate = state.count / state.span;
        slow = rate < (state.level === 0 ? 20 : 12);
        if (slow) {
          state.slowWindows += 1;
          state.fastWindows = 0;
        } else {
          state.slowWindows = 0;
          state.fastWindows = rate >= 40 ? state.fastWindows + 1 : 0;
          state.healthy += state.span;
          if (state.healthy >= GOVERNOR.provenAfter) state.proven = true;
        }
        state.span = 0;
        state.count = 0;
      }
      // Unproven, or proven at full quality: any stall or slow window steps down one level.
      if (!state.proven || state.level === 0) return stalled || slow ? lower() : 'steady';
      // Proven at the lighter level: a stall alone changes nothing.
      if (stalled) state.strikes = 0;
      if (state.slowWindows >= GOVERNOR.slowWindowsToStop) return lower();
      if (state.fastWindows >= GOVERNOR.fastWindowsToRestore && state.restores < GOVERNOR.restores) {
        state.level = 0;
        state.restores += 1;
        clear();
        return 'changed';
      }
      return 'steady';
    },
  };
}
