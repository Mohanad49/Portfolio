import { test, expect, type Locator } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

async function expectFullyInViewport(locator: Locator) {
  await expect.poll(() => locator.evaluate(element => {
    const rect = element.getBoundingClientRect();
    return Math.min(rect.left, rect.top, innerWidth - rect.right, innerHeight - rect.bottom);
  })).toBeGreaterThanOrEqual(-.5);
}

test('the study presents the frozen evidence and clear comparison actions', async ({ page }) => {
  await page.goto('/experience#evidence');
  await expect(page.locator('#evidence')).toBeInViewport();
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'noindex, follow');
  await expect(page.locator('h1')).toHaveCount(1);
  await expect(page.getByRole('heading', { level: 2, name: 'TestPulse', exact: true })).toHaveCount(1);
  await expect(page.locator('.observation')).toHaveCount(3);
  await expect(page.locator('.observation-status')).toHaveText(['Passed', 'Failed', 'Passed']);
  await expect(page.locator('.observation-run')).toHaveText(['Run 1220', 'Run 1224', 'Run 1364']);
  await expect(page.locator('.shared-commit code')).toHaveText('5c0869a');
  await expect(page.locator('.snapshot-boundary')).toContainText('retry counts are unknown');
  await expect(page.locator('time').nth(2)).toHaveAttribute('datetime', '2026-09-21T09:02:13.068837+00:00');
  await expect(page.getByRole('link', { name: 'View the current version' })).toHaveAttribute('href', '/');
  await expect(page.getByRole('link', { name: 'Read the case study', exact: true })).toHaveAttribute('href', '/work/testpulse');
  await expect(page.locator('.passage-resume')).toHaveAttribute('download', 'Mohanad_Yehia_Software_QA_Engineer.pdf');
});

test('one TestPulse heading grows into the work before native scrolling resumes', async ({ page }) => {
  await page.goto('/experience');
  await expect(page.locator('.passage-opening')).toHaveClass(/has-passage-motion/);
  const title = page.getByRole('heading', { level: 2, name: 'TestPulse', exact: true });
  await expect(title).toHaveCount(1);
  await expect(page.locator('.passage-arrival')).toBeHidden();
  const range = await page.locator('.passage-opening').evaluate(element => ({ top: element.getBoundingClientRect().top + scrollY, travel: element.clientHeight - document.querySelector<HTMLElement>('.passage-frame')!.offsetHeight }));
  const widths: number[] = [];
  for (const progress of [.25, .75, .92, 1]) {
    await page.evaluate(top => window.scrollTo({ top, behavior: 'instant' }), range.top + range.travel * progress);
    await page.waitForTimeout(350);
    widths.push(await title.evaluate(element => element.getBoundingClientRect().width));
  }
  for (let index = 1; index < widths.length; index++) expect(widths[index]!).toBeGreaterThan(widths[index - 1]! + .2);
  await expectFullyInViewport(title);
  await expectFullyInViewport(page.locator('.passage-arrival-content'));
  await expect(page.locator('.passage-arrival')).toHaveCSS('opacity', '1');
  await expect(page.locator('.passage-arrival-content')).toHaveCSS('opacity', '1');
  for (const selector of ['#passage-title', '.passage-role', '.passage-introduction', '.passage-work', '.passage-resume']) {
    await expect(page.locator(selector)).toHaveCSS('opacity', '0');
    await expect(page.locator(selector)).toBeHidden();
  }
  const arrived = await title.boundingBox();
  await page.evaluate(top => window.scrollTo({ top, behavior: 'instant' }), range.top + range.travel + 80);
  await expect.poll(async () => (await title.boundingBox())?.y).toBeCloseTo(arrived!.y - 80, 0);
  const released = await title.boundingBox();
  expect(released!.width).toBeCloseTo(arrived!.width, 0);
  await expect(title).toHaveCount(1);
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
  await expect(page.locator('#passage-title')).toHaveCSS('opacity', '1');
  await expect(page.locator('.passage-work')).toBeVisible();
});

test('native scrolling advances and reverses the opening on every viewport', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.goto('/experience');
  await expect(page.locator('.passage-opening')).toHaveClass(/has-passage-motion/);
  const title = page.locator('#passage-title');
  await expect(title).toHaveCSS('opacity', '1');
  await page.mouse.move(Math.round((page.viewportSize()?.width ?? 390) * .25), Math.round((page.viewportSize()?.height ?? 844) * .5));
  await page.mouse.wheel(0, Math.round((page.viewportSize()?.height ?? 844) * .42));
  await expect.poll(() => page.evaluate(() => scrollY)).toBeGreaterThan(100);
  await expect.poll(() => title.evaluate(element => Number(getComputedStyle(element).opacity))).toBeLessThan(.99);
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
  await expect(title).toHaveCSS('opacity', '1');
  const work = page.getByRole('link', { name: 'Explore the work', exact: true });
  await expect(work).toBeInViewport({ ratio: 1 });
  await work.click({ scroll: 'none' });
  await expect(page.locator('#evidence')).toBeInViewport();
  await expectFullyInViewport(page.getByRole('heading', { level: 2, name: 'TestPulse', exact: true }));
  await expect(page).toHaveURL(/#evidence$/);
  expect(errors).toEqual([]);
});

test('live preferences preserve readable evidence without loading a renderer', async ({ page }) => {
  const rendererRequests: string[] = [];
  page.on('request', request => { if (/PassageCanvas|PassageIsland|\/client\.[^/]+\.js/.test(request.url())) rendererRequests.push(request.url()); });
  await page.goto('/experience#evidence');
  await expect(page.locator('.passage-opening')).toHaveClass(/has-passage-motion/);
  await expect(page.locator('#evidence')).toBeInViewport();
  await page.locator('.run-history').scrollIntoViewIfNeeded();
  await expect(page.locator('.observation').first()).toHaveCSS('opacity', '1');
  const before = await page.locator('.observation').first().evaluate(element => element.getBoundingClientRect().top);
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await expect(page.locator('.passage-opening')).not.toHaveClass(/has-passage-motion/);
  await expect(page.locator('.passage-project-summary')).toHaveCSS('opacity', '1');
  await expect(page.locator('.passage-arrival')).toBeVisible();
  await expect(page.locator('canvas')).toHaveCount(0);
  await expect.poll(() => page.locator('.observation').first().evaluate((element, position) => Math.abs(element.getBoundingClientRect().top - position), before)).toBeLessThan(3);
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await expect(page.locator('.passage-opening')).toHaveClass(/has-passage-motion/);
  await expect(page.locator('.observation').first()).toHaveCSS('opacity', '1');
  await page.setViewportSize({ width: 390, height: 844 });
  await expect(page.locator('canvas')).toHaveCount(0);
  await expect(page.locator('.observation').first()).toHaveCSS('opacity', '1');
  await expect(page.locator('.observation').first()).toBeInViewport();
  expect(rendererRequests).toEqual([]);
});

test('static and unsupported rendering paths retain the complete study', async ({ browser, baseURL }, testInfo) => {
  const context = await browser.newContext({ javaScriptEnabled: false, baseURL, viewport: testInfo.project.use.viewport });
  const page = await context.newPage();
  await page.goto('/experience');
  await expect(page.locator('h1')).toBeVisible();
  await expect(page.locator('.passage-project-summary')).toHaveCSS('opacity', '1');
  await expect(page.locator('.passage-arrival')).toBeVisible();
  await page.getByRole('link', { name: 'Explore the work', exact: true }).click();
  await expect(page.locator('#evidence')).toBeInViewport();
  await expect(page.locator('.observation-status')).toHaveText(['Passed', 'Failed', 'Passed']);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true);
  await context.close();
  const supported = await browser.newContext({ baseURL, viewport: testInfo.project.use.viewport });
  const fallback = await supported.newPage();
  await fallback.addInitScript(() => {
    const original = HTMLCanvasElement.prototype.getContext;
    HTMLCanvasElement.prototype.getContext = function (this: HTMLCanvasElement, ...args: Parameters<typeof original>) {
      if (String(args[0]).startsWith('webgl')) return null;
      return Reflect.apply(original, this, args);
    } as typeof original;
  });
  await fallback.goto('/experience');
  await expect(fallback.locator('.passage-opening')).toHaveClass(/has-passage-motion/);
  await expect(fallback.locator('canvas')).toHaveCount(0);
  await fallback.getByRole('link', { name: 'Explore the work', exact: true }).click();
  await expect(fallback.locator('#evidence')).toBeInViewport();
  await supported.close();
});

test('the study keeps accessible semantics and narrow reflow', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/experience');
  await expect(page.locator('.passage-project-summary')).toHaveCSS('opacity', '1');
  await expect(page.locator('.passage-arrival')).toBeVisible();
  const results = await new AxeBuilder({ page }).analyze();
  expect(results.violations.filter(result => ['serious', 'critical'].includes(result.impact ?? ''))).toEqual([]);
  await page.setViewportSize({ width: 320, height: 844 });
  for (const target of ['.passage-actions', '#evidence', '.evidence-conclusion', '.experience-comparison']) {
    await page.locator(target).scrollIntoViewIfNeeded();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true);
  }
});

test('artwork moves on scroll, returns intact, and rests without a renderer', async ({ page }, testInfo) => {
  const errors: string[] = [];
  const rendererRequests: string[] = [];
  const artworkRequests: string[] = [];
  page.on('pageerror', error => errors.push(error.message));
  page.on('console', message => { if (message.type() === 'error') errors.push(message.text()); });
  page.on('request', request => { if (/PassageCanvas|PassageIsland|\/client\.[^/]+\.js/.test(request.url())) rendererRequests.push(request.url()); });
  page.on('request', request => { if (/passage-(material|upper|lower).*\.webp/.test(request.url())) artworkRequests.push(request.url()); });
  await page.goto('/experience');
  await expect(page.locator('.passage-opening')).toHaveClass(/has-passage-motion/);
  const desktop = (testInfo.project.use.viewport?.width ?? 0) >= 1024;
  const upper = page.locator(desktop ? '.passage-plate' : '.passage-upper');
  const layers = desktop ? [upper] : [upper, page.locator('.passage-lower')];
  for (const layer of layers) {
    await expect(layer).toBeVisible();
    await expect.poll(() => layer.evaluate((image: HTMLImageElement) => image.complete && image.naturalWidth > 0)).toBe(true);
  }
  if (desktop) {
    const source = await upper.evaluate((image: HTMLImageElement) => image.currentSrc);
    expect(await page.evaluate(url => performance.getEntriesByName(url).length, source)).toBe(1);
    expect(artworkRequests.filter(url => /passage-(upper|lower)/.test(url))).toEqual([]);
  } else {
    expect(artworkRequests.filter(url => url.includes('passage-material'))).toEqual([]);
  }
  const pose = () => upper.evaluate(element => new DOMMatrixReadOnly(getComputedStyle(element).transform).toString());
  const initial = await pose();
  await page.mouse.move(Math.round((page.viewportSize()?.width ?? 1440) * .25), Math.round((page.viewportSize()?.height ?? 1000) * .5));
  await page.mouse.wheel(0, Math.round((page.viewportSize()?.height ?? 844) * .35));
  await expect.poll(pose).not.toBe(initial);
  await page.waitForTimeout(600);
  const settled = await upper.evaluate(element => element.getAttribute('style'));
  await page.waitForTimeout(400);
  expect(await upper.getAttribute('style')).toBe(settled);
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
  await expect.poll(pose).toBe(initial);
  await expect(page.locator('canvas')).toHaveCount(0);
  expect(rendererRequests).toEqual([]);
  expect(errors).toEqual([]);
});
