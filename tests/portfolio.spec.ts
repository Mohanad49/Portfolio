import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { createHash } from 'node:crypto';

const routes = ['/', '/work', '/work/testpulse', '/work/caldiy', '/work/llm-evaluation'];
const resumeDigest = '683ede439d00f58b2323c78629635ea674558fee1f5e1cce9d7132d7ae47735d';

test('every main route has a readable heading, working images, and direct contact', async ({ page }) => {
  const errors: string[] = [];
  const sceneRequests: string[] = [];
  page.on('pageerror', error => errors.push(error.message));
  page.on('request', request => { if (/\/(?:InspectionIsland|InspectionCanvas|client)\.[^/]+\.js/.test(new URL(request.url()).pathname)) sceneRequests.push(request.url()); });
  for (const route of routes) {
    const response = await page.goto(route);
    expect(response?.status()).toBe(200);
    await expect(page.locator('h1')).toHaveCount(1);
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.getByRole('link', { name: 'LinkedIn', exact: true })).toHaveAttribute('href', 'https://www.linkedin.com/in/mohanad49/');
    await expect(page.getByRole('link', { name: 'GitHub', exact: true })).toHaveAttribute('href', 'https://github.com/Mohanad49');
    await expect(page.getByRole('link', { name: 'mohanned.3262@gmail.com' })).toHaveAttribute('href', 'mailto:mohanned.3262@gmail.com');
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true);
    // Keep stable image identities as the opening leaves the viewport.
    for (const image of await page.locator('img').all()) {
      if (!await image.isVisible()) continue;
      await image.scrollIntoViewIfNeeded();
      await expect.poll(() => image.evaluate((element: HTMLImageElement) => {
        const replaced = element.classList.contains('inspection-fallback') && element.closest('.inspection-frame')?.querySelector('[data-ready="true"] canvas') && getComputedStyle(element).opacity === '0';
        return !!replaced || (element.complete && element.naturalWidth > 0);
      })).toBe(true);
    }
  }
  expect(errors).toEqual([]);
  if ((page.viewportSize()?.width ?? 0) < 1024) expect(sceneRequests).toEqual([]);
});

test('navigation exposes selected work, approach, profile, and contact', async ({ page }) => {
  await page.goto('/');
  for (const [name, target] of [['Work', '#work'], ['Approach', '#approach'], ['About', '#about'], ['Contact', '#contact']] as const) {
    await page.getByRole('navigation', { name: 'Main navigation' }).getByRole('link', { name, exact: true }).click();
    await expect(page).toHaveURL(new RegExp(`${target}$`));
    await expect(page.locator(target)).toBeInViewport();
    await page.goto('/');
  }
  await page.getByRole('link', { name: 'Read the case study', exact: true }).click();
  await expect(page).toHaveURL(/\/work\/testpulse\/?$/);
  await expect(page.getByRole('link', { name: 'Source evidence' })).toHaveAttribute('href', /7d9ac7a3466889265bb0799a2f96aed759481084/);
});

test('framework filters preserve source links and bookmark visibility', async ({ page }) => {
  await page.goto('/work');
  await expect(page.locator('.framework-item:visible')).toHaveCount(6);
  for (const [category, count] of [['Web', 2], ['API', 2], ['Mobile', 1], ['Performance', 1]] as const) {
    await page.getByRole('radio', { name: new RegExp(`^${category}`) }).check();
    await expect(page.locator('.framework-item:visible')).toHaveCount(count);
    await expect(page).toHaveURL(new RegExp(`type=${category}`));
  }
  await page.goto('/work?type=Mobile#github-api');
  await expect(page.getByRole('radio', { name: /^All/ })).toBeChecked();
  await expect(page.locator('#github-api')).toBeVisible();
  await expect(page.locator('#github-api').getByRole('link', { name: /^Source code/ })).toHaveAttribute('href', 'https://github.com/Mohanad49/github-api-tests');
  await page.getByRole('radio', { name: /^Mobile/ }).check();
  await expect(page).toHaveURL(/\/work\?type=Mobile$/);
  await page.reload();
  await expect(page.getByRole('radio', { name: /^Mobile/ })).toBeChecked();
  await expect(page.locator('.framework-item:visible')).toHaveCount(1);
});

test('the resume download is the exact updated PDF', async ({ page, request }) => {
  const response = await request.get('/resume.pdf');
  expect(response.ok()).toBe(true);
  expect(response.headers()['content-type']).toContain('application/pdf');
  expect(createHash('sha256').update(await response.body()).digest('hex')).toBe(resumeDigest);
  await page.goto('/');
  const download = page.waitForEvent('download');
  await page.getByRole('link', { name: 'Resume', exact: true }).click();
  expect((await download).suggestedFilename()).toBe('Mohanad_Yehia_Software_QA_Engineer.pdf');
});

test('copy email reports success and passes the correct address to the browser', async ({ page }) => {
  await page.addInitScript(() => Object.defineProperty(navigator, 'clipboard', { value: { writeText: async (text: string) => { document.documentElement.dataset.copiedEmail = text; } } }));
  await page.goto('/');
  await page.getByRole('button', { name: 'Copy email' }).click();
  await expect(page.locator('.copy-status')).toHaveText('Email address copied.');
  await expect(page.locator('html')).toHaveAttribute('data-copied-email', 'mohanned.3262@gmail.com');
});

test('clipboard denial has useful recovery feedback', async ({ page }) => {
  await page.addInitScript(() => Object.defineProperty(navigator, 'clipboard', { value: { writeText: async () => { throw new DOMException('Denied', 'NotAllowedError'); } } }));
  await page.goto('/');
  await page.getByRole('button', { name: 'Copy email' }).click();
  await expect(page.locator('.copy-status')).toContainText('You can select the email address');
  await expect(page.getByRole('link', { name: 'mohanned.3262@gmail.com' })).toBeVisible();
});

test('keyboard navigation exposes a visible skip link and focus ring', async ({ page, browserName }) => {
  await page.goto('/');
  await page.keyboard.press(browserName === 'webkit' && process.platform === 'darwin' ? 'Alt+Tab' : 'Tab');
  const skip = page.getByRole('link', { name: 'Skip to content' });
  await expect(skip).toBeFocused();
  await expect(skip).toBeInViewport();
  await page.keyboard.press('Enter');
  await expect(page.locator('main')).toBeFocused();
  await page.getByRole('navigation', { name: 'Main navigation' }).getByRole('link', { name: 'Work', exact: true }).focus();
  expect(await page.locator(':focus').evaluate(element => getComputedStyle(element).outlineStyle)).toBe('solid');
});

test('all routes retain their content without JavaScript', async ({ browser, baseURL }, testInfo) => {
  const context = await browser.newContext({ javaScriptEnabled: false, viewport: testInfo.project.use.viewport, baseURL });
  const page = await context.newPage();
  for (const route of routes) { await page.goto(route); await expect(page.locator('h1')).toBeVisible(); await expect(page.getByRole('link', { name: 'mohanned.3262@gmail.com' })).toHaveAttribute('href', /^mailto:/); }
  await page.goto('/work');
  await expect(page.locator('.framework-item:visible')).toHaveCount(6);
  await expect(page.getByRole('form', { name: 'Filter frameworks' })).toBeHidden();
  await page.goto('/#About');
  await expect(page.locator('#About')).toBeInViewport();
  await context.close();
});

test('reduced motion keeps the complete fallback and omits the scene', async ({ page }) => {
  const sceneRequests: string[] = [];
  page.on('request', request => { if (/\/(?:InspectionIsland|InspectionCanvas|client)\.[^/]+\.js/.test(new URL(request.url()).pathname)) sceneRequests.push(request.url()); });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  await page.locator('#approach').scrollIntoViewIfNeeded();
  await expect(page.locator('canvas')).toHaveCount(0);
  await expect(page.getByRole('slider', { name: 'Separate layers' })).toHaveCount(0);
  await expect(page.locator('.inspection-fallback')).toBeVisible();
  await expect.poll(() => page.locator('.inspection-fallback').evaluate((image: HTMLImageElement) => image.complete && image.naturalWidth > 0)).toBe(true);
  await expect(page.locator('.passage-opening')).not.toHaveClass(/has-passage-motion/);
  await expect(page.locator('.passage-arrival')).toBeVisible();
  expect(sceneRequests).toEqual([]);
});

test('scroll reveals become fully readable and respect live motion preferences', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.goto('/');
  await page.locator('.evidence-study').scrollIntoViewIfNeeded();
  const copy = page.locator('.about-copy');
  await expect.poll(() => copy.evaluate(element => getComputedStyle(element).transform)).not.toBe('none');
  await expect(copy).toHaveCSS('opacity', '1');
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await expect.poll(() => page.locator('[data-reveal]').evaluateAll(elements => elements.every(element => {
    const style = getComputedStyle(element);
    return style.opacity === '1' && style.transform === 'none';
  }))).toBe(true);
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await expect.poll(() => copy.evaluate(element => getComputedStyle(element).transform)).not.toBe('none');
  await expect(copy).toHaveCSS('opacity', '1');
  await copy.scrollIntoViewIfNeeded();
  await expect(copy).toBeInViewport();
  await expect(copy).toHaveCSS('opacity', '1');
  await expect(copy).toHaveCSS('transform', 'none');
  const viewport = page.viewportSize();
  if (!viewport) throw new Error('The motion test requires a viewport.');
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
  await page.setViewportSize({ width: viewport.width < 761 ? 1000 : 600, height: viewport.height });
  await expect(copy).toHaveCSS('opacity', '1');
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await expect(copy).toHaveCSS('opacity', '1');
  await copy.scrollIntoViewIfNeeded();
  await expect(copy).toHaveCSS('opacity', '1');
  await expect(page.getByRole('link', { name: 'The full resume' })).toBeVisible();
});

test('WebGL failure preserves artwork and working content', async ({ page }) => {
  await page.addInitScript(() => {
    const original = HTMLCanvasElement.prototype.getContext;
    Object.defineProperty(HTMLCanvasElement.prototype, 'getContext', { value: function (type: string, ...args: unknown[]) { return type.startsWith('webgl') ? null : Reflect.apply(original, this, [type, ...args]); } });
  });
  await page.goto('/');
  await page.locator('#approach').scrollIntoViewIfNeeded();
  if ((page.viewportSize()?.width ?? 0) >= 1024) {
    await page.getByRole('button', { name: /Inspect in 3D/ }).click();
    await expect(page.getByRole('status').filter({ hasText: '3D is unavailable' })).toBeVisible();
  }
  await expect(page.locator('.inspection-fallback')).toBeVisible();
  await expect.poll(() => page.locator('.inspection-fallback').evaluate((image: HTMLImageElement) => image.complete && image.naturalWidth > 0)).toBe(true);
  await expect(page.getByRole('slider', { name: 'Separate layers' })).toHaveCount(0);
  await expect(page.locator('canvas')).toHaveCount(0);
  await expect(page.getByRole('link', { name: 'The full resume' })).toBeVisible();
});

test('desktop inspection responds to keyboard input and returns to its fallback', async ({ page }, testInfo) => {
  test.skip(!testInfo.project.name.endsWith('desktop'), 'The interactive scene is a desktop enhancement.');
  const browserErrors: string[] = [];
  page.on('console', message => { if (message.type() === 'error') browserErrors.push(message.text()); });
  page.on('pageerror', error => browserErrors.push(error.message));
  const canvasRequests: string[] = [];
  page.on('request', request => { if (new URL(request.url()).pathname.includes('/InspectionCanvas.')) canvasRequests.push(request.url()); });
  await page.goto('/');
  await page.waitForLoadState('networkidle');
  expect(canvasRequests).toEqual([]);
  await page.locator('.inspection-frame').scrollIntoViewIfNeeded();
  await expect(page.getByRole('button', { name: /Inspect in 3D/ })).toBeVisible();
  expect(canvasRequests).toEqual([]);
  await expect(page.locator('canvas')).toHaveCount(0);
  const launch = page.getByRole('button', { name: /Inspect in 3D/ });
  await launch.focus();
  await launch.press('Enter');
  const slider = page.getByRole('slider', { name: 'Separate layers' });
  await expect(slider).toBeVisible({ timeout: 20_000 });
  await expect(slider).toBeFocused();
  expect(canvasRequests).toHaveLength(1);
  const canvas = page.locator('canvas');
  const before = await canvas.screenshot();
  await slider.focus();
  await slider.press('End');
  await expect(slider).toHaveValue('100');
  await expect(async () => expect(Buffer.compare(before, await canvas.screenshot())).not.toBe(0)).toPass({ timeout: 5_000 });
  await page.getByRole('button', { name: 'Reset', exact: true }).click();
  await expect(slider).toHaveValue('22');
    const readingPosition = await page.locator('.inspection-frame').evaluate(element => element.getBoundingClientRect().top);
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await expect(canvas).toHaveCount(0);
  await expect(page.locator('.inspection-fallback')).toHaveCSS('opacity', '1');
  await expect.poll(() => page.locator('.inspection-fallback').evaluate((image: HTMLImageElement) => image.complete && image.naturalWidth > 0)).toBe(true);
  await expect.poll(() => page.locator('.inspection-frame').evaluate(element => element.getBoundingClientRect().top)).toBeCloseTo(readingPosition, -1);
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await expect(slider).toBeVisible();
  expect(await canvas.evaluate((element: HTMLCanvasElement) => {
    const extension = element.getContext('webgl2')?.getExtension('WEBGL_lose_context');
    extension?.loseContext();
    return !!extension;
  })).toBe(true);
  await expect(canvas).toHaveCount(0);
  await expect(page.locator('.inspection-fallback')).toHaveCSS('opacity', '1');
  await expect.poll(() => page.locator('.inspection-fallback').evaluate((image: HTMLImageElement) => image.complete && image.naturalWidth > 0)).toBe(true);
  await testInfo.attach('inspection-browser-errors', { body: JSON.stringify(browserErrors), contentType: 'application/json' });
  expect(browserErrors).toEqual([]);
});

test('all public routes have zero serious or critical axe findings', async ({ page }, testInfo) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  for (const route of [...routes, '/404']) {
    await page.goto(route);
    const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa']).analyze();
    await testInfo.attach(`axe-${route.replaceAll('/', '-') || 'home'}`, { body: JSON.stringify(results, null, 2), contentType: 'application/json' });
    expect(results.violations.filter(item => item.impact === 'serious' || item.impact === 'critical')).toEqual([]);
  }
});

test('motion-enabled routes keep waiting reveals and source links accessible', async ({ page }, testInfo) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  for (const route of [...routes, '/experience']) {
    await page.goto(route);
    if (route === '/') await page.locator('.evidence-study').scrollIntoViewIfNeeded();
    if (route === '/experience') await expect(page.locator('.passage-opening')).toHaveClass(/has-passage-motion/);
    else await expect.poll(() => page.locator('.ambient-warm').evaluate((element: HTMLElement) => element.style.transform)).not.toBe('');
    const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa']).analyze();
    await testInfo.attach(`axe-motion-${route.replaceAll('/', '-') || 'home'}`, { body: JSON.stringify(results, null, 2), contentType: 'application/json' });
    expect(results.violations.filter(item => item.impact === 'serious' || item.impact === 'critical')).toEqual([]);
    expect(await page.locator('.framework-item, .case-index-link, .next-case > a, .about-copy, .chapter-title:has(a)').evaluateAll(elements => elements.every(element => {
      const style = getComputedStyle(element);
      return style.opacity === '1' && style.clipPath === 'none';
    }))).toBe(true);
  }
});

test('320px reflow and 200% text resizing keep the page within the viewport', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 900 });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  for (const route of routes) {
    await page.goto(route);
    await page.addStyleTag({ content: 'html { font-size: 200%; }' });
    await page.evaluate(() => document.fonts.ready);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), route).toBe(true);
    await expect(page.locator('h1')).toBeVisible();
    const splitWords = await page.locator('h1, h2, h3, .production-metrics dd').evaluateAll(elements => {
      const split: string[] = [];
      for (const element of elements) {
        if (!element.getClientRects().length) continue;
        const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT);
        for (let node = walker.nextNode(); node; node = walker.nextNode()) {
          const text = node.textContent ?? '';
          for (const match of text.matchAll(/[\p{L}\p{N}][\p{L}\p{N}.,’']+/gu)) {
            const range = document.createRange();
            range.setStart(node, match.index);
            range.setEnd(node, match.index + match[0].length);
            const lines = new Set([...range.getClientRects()].filter(rect => rect.width > .5).map(rect => Math.round(rect.top)));
            if (lines.size > 1) split.push(match[0]);
          }
        }
      }
      return split;
    });
    expect(splitWords, route).toEqual([]);
  }
});

test('old project links and section bookmarks reach their replacement', async ({ page }, testInfo) => {
  test.skip(!testInfo.project.name.endsWith('desktop'), 'Static redirect compatibility is verified once per browser.');
  for (const [id, destination] of [['1', '/work/testpulse'], ['4', '/work#orangehrm'], ['13', '/work#lafefny']] as const) {
    await page.goto(`/project/${id}`);
    await expect.poll(() => { const url = new URL(page.url()); return `${url.pathname.replace(/\/$/, '')}${url.hash}`; }).toBe(destination);
  }
  for (const hash of ['Home', 'Portofolio', 'About', 'Contact']) {
    await page.goto('/work');
    await page.goto(`/#${hash}`);
    await expect(page.locator(`[id="${hash}"]`)).toBeInViewport();
  }
});
