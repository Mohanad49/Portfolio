import { chromium, test, expect } from '@playwright/test';
import { withoutStage } from './support';

test('a restored history page keeps scroll motion and preference listeners', async ({ baseURL }) => {
  const browser = await chromium.launch({ channel: 'chromium', ignoreDefaultArgs: ['--disable-back-forward-cache'] });
  try {
    const page = await browser.newPage({ baseURL, viewport: { width: 1440, height: 1000 } });
    await withoutStage(page);
    await page.addInitScript(() => window.addEventListener('pageshow', event => {
      document.documentElement.dataset.pageShows = `${document.documentElement.dataset.pageShows ?? ''},${event.persisted}`;
    }));
    await page.goto('/');
    await expect(page.locator('html')).toHaveClass(/is-ready/, { timeout: 15_000 });
    const line = page.locator('.hero-line--first');
    const shift = () => line.evaluate(element => new DOMMatrix(getComputedStyle(element).transform).m41);
    await page.evaluate(() => window.scrollTo({ top: 200, behavior: 'instant' }));
    await expect.poll(shift).toBeLessThan(-1);
    await page.goto('/work');
    await page.goBack({ waitUntil: 'commit' });
    await expect(page.locator('html')).toHaveAttribute('data-page-shows', /true/);
    const restored = await shift();
    await page.evaluate(() => window.scrollTo({ top: 500, behavior: 'instant' }));
    await expect.poll(shift).toBeLessThan(restored - 1);
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await expect(page.locator('html')).not.toHaveClass(/is-staged/);
    await expect(line).toHaveCSS('transform', 'none');
    await page.emulateMedia({ reducedMotion: 'no-preference' });
    await expect(page.locator('html')).toHaveClass(/is-staged/);
    await expect.poll(shift).toBeLessThan(-1);
  } finally { await browser.close(); }
});

test('a traversal without a checkpoint cancels an earlier queued restoration', async ({ page }) => {
  await page.goto('/experience');
  await expect(page.locator('.passage-opening')).toHaveClass(/has-passage-motion/);
  await page.locator('.evidence-conclusion').scrollIntoViewIfNeeded();
  await page.waitForFunction(() => scrollY > 0 && history.state?.portfolioReadingPosition?.y === scrollY);
  const checkpoint: unknown = await page.evaluate(() => history.state);
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
  await expect.poll(() => page.evaluate(() => scrollY)).toBe(0);
  const finalPosition = await page.evaluate(saved => new Promise<number>(resolve => {
    window.dispatchEvent(new PopStateEvent('popstate', { state: saved }));
    window.dispatchEvent(new PopStateEvent('popstate', { state: null }));
    requestAnimationFrame(() => requestAnimationFrame(() => resolve(scrollY)));
  }), checkpoint);
  expect(finalPosition).toBe(0);
});

test('reading checkpoints save before link navigation and never during page exit', async ({ page }) => {
  await page.goto('/experience');
  await expect(page.locator('.passage-opening')).toHaveClass(/has-passage-motion/);
  const writes = await page.evaluate(() => {
    const original = history.replaceState.bind(history);
    let count = 0;
    history.replaceState = (...args) => { count++; original(...args); };
    const link = document.querySelector<HTMLAnchorElement>('.passage-project-title a');
    if (!link) throw new Error('The study link is missing.');
    // Let the checkpoint's capture listener run without leaving the test document.
    link.addEventListener('click', event => event.preventDefault(), { once: true });
    link.click();
    const beforeExit = count;
    window.dispatchEvent(new PageTransitionEvent('pagehide', { persisted: false }));
    history.replaceState = original;
    return { beforeExit, afterExit: count };
  });
  expect(writes.beforeExit).toBe(1);
  expect(writes.afterExit).toBe(writes.beforeExit);
});
