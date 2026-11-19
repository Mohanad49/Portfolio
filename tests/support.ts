import { expect, type Locator, type Page } from '@playwright/test';

const stageChunk = /\/StageCanvas\.[^/]+\.js$/;

/**
 * Headless browsers render WebGL in software at a frame or two per second, which starves
 * every timer on the page. Tests about the document fail the renderer chunk instead: the
 * page then takes its real "renderer unavailable" path and keeps the still.
 */
export const withoutStage = (page: Page) => page.route(stageChunk, route => route.abort());

/** The opening handoff has finished and the hero has been released. */
export const released = (page: Page) => expect(page.locator('html')).toHaveClass(/is-ready/, { timeout: 15_000 });

/** Smoothed scrolling has come to rest, so coordinates are safe to click. */
export async function settled(page: Page) {
  await page.waitForFunction(() => new Promise<boolean>(resolve => {
    const content = document.querySelector('#smooth-content') ?? document.body;
    let last = content.getBoundingClientRect().top;
    let still = 0;
    const tick = () => {
      const now = content.getBoundingClientRect().top;
      still = Math.abs(now - last) < 0.5 ? still + 1 : 0;
      last = now;
      if (still >= 6) resolve(true);
      else requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }));
}

/**
 * Scroll the window, as a visitor does, until the element is in view. The homepage's content
 * sits in a smoothed wrapper, so the browser's own scroll-into-view cannot be relied on there.
 */
export async function bring(locator: Locator, block: 'start' | 'center' = 'center') {
  const page = locator.page();
  // The page can still be settling its height after a rebuild, so aim again until the element has arrived.
  await expect(async () => {
    await locator.evaluate((element, placement) => {
      let top = 0;
      let node: HTMLElement | null = element as HTMLElement;
      while (node) { top += node.offsetTop; node = node.offsetParent as HTMLElement | null; }
      const offset = placement === 'center' ? Math.max(0, (innerHeight - (element as HTMLElement).offsetHeight) / 2) : 0;
      window.scrollTo({ top: Math.max(0, top - offset), behavior: 'instant' });
    }, block);
    await settled(page);
    const box = await locator.evaluate(element => { const rect = element.getBoundingClientRect(); return { top: rect.top, bottom: rect.bottom, height: innerHeight }; });
    expect(box.bottom).toBeGreaterThan(0);
    expect(box.top).toBeLessThan(box.height);
  }).toPass({ timeout: 10_000 });
}
