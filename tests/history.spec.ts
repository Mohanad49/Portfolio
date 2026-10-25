import { chromium, test, expect } from '@playwright/test';

test('a restored history page keeps scroll motion and preference listeners', async ({ baseURL }) => {
  const browser = await chromium.launch({ channel: 'chromium', ignoreDefaultArgs: ['--disable-back-forward-cache'] });
  try {
    const page = await browser.newPage({ baseURL, viewport: { width: 1440, height: 1000 } });
    await page.addInitScript(() => window.addEventListener('pageshow', event => {
      document.documentElement.dataset.pageShows = `${document.documentElement.dataset.pageShows ?? ''},${event.persisted}`;
    }));
    await page.goto('/');
    const scene = page.locator('.passage-plate');
    await expect(page.locator('.passage-opening')).toHaveClass(/has-passage-motion/);
    await page.evaluate(() => window.scrollTo({ top: 200, behavior: 'instant' }));
    await expect.poll(() => scene.evaluate((element: HTMLElement) => element.style.transform)).not.toBe('');
    await page.goto('/work');
    await page.goBack({ waitUntil: 'commit' });
    await expect(page.locator('html')).toHaveAttribute('data-page-shows', /true/);
    const restoredTransform = await scene.evaluate((element: HTMLElement) => element.style.transform);
    await page.evaluate(() => window.scrollTo({ top: 400, behavior: 'instant' }));
    await expect.poll(() => scene.evaluate((element: HTMLElement) => element.style.transform)).not.toBe(restoredTransform);
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await expect.poll(() => scene.evaluate((element: HTMLElement) => element.style.transform)).toBe('');
    await page.emulateMedia({ reducedMotion: 'no-preference' });
    await expect.poll(() => scene.evaluate((element: HTMLElement) => element.style.transform)).not.toBe('');
  } finally { await browser.close(); }
});
