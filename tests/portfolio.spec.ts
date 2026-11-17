import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { createHash } from 'node:crypto';
import { bring, released, withoutStage } from './support';

const routes = ['/', '/work', '/work/testpulse', '/work/caldiy', '/work/llm-evaluation'];
const resumeDigest = '683ede439d00f58b2323c78629635ea674558fee1f5e1cce9d7132d7ae47735d';

// The stage has its own tests in stage.spec.ts.
test.beforeEach(async ({ page }) => { await withoutStage(page); });

test('every main route has a readable heading, working images, and direct contact', async ({ page }) => {
  const errors: string[] = [];
  const sceneRequests: string[] = [];
  let current = '/';
  page.on('pageerror', error => errors.push(error.message));
  // Only the homepage owns a stage. Every other route stays free of the renderer and its runtime.
  page.on('request', request => { if (current !== '/' && /\/(?:StageCanvas|SceneIsland|client)\.[^/]+\.js/.test(new URL(request.url()).pathname)) sceneRequests.push(request.url()); });
  for (const route of routes) {
    current = route;
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
      await bring(image);
      await expect.poll(() => image.evaluate((element: HTMLImageElement) => {
        const replaced = element.classList.contains('inspection-fallback') && element.closest('.inspection-frame')?.querySelector('[data-ready="true"] canvas') && getComputedStyle(element).opacity === '0';
        return !!replaced || (element.complete && element.naturalWidth > 0);
      })).toBe(true);
    }
  }
  expect(errors).toEqual([]);
  expect(sceneRequests).toEqual([]);
});

test('the homepage leads into a case study and its source evidence', async ({ page }) => {
  await page.goto('/');
  await released(page);
  const study = page.getByRole('link', { name: 'Read the case study', exact: true });
  await bring(study);
  await study.click();
  await expect(page).toHaveURL(/\/work\/testpulse\/?$/);
  await expect(page.getByRole('link', { name: 'Source evidence' })).toHaveAttribute('href', /7d9ac7a3466889265bb0799a2f96aed759481084/);
  // Case studies carry the homepage chrome: the full navigation on wide screens, the menu on narrow ones.
  if ((page.viewportSize()?.width ?? 0) >= 1024) await page.getByRole('navigation', { name: 'Main navigation' }).getByRole('link', { name: 'Contact', exact: true }).click();
  else {
    await page.locator('.chrome-menu').click();
    await page.getByRole('navigation', { name: 'Menu', exact: true }).getByRole('link', { name: 'Contact', exact: true }).click();
  }
  await expect(page).toHaveURL(/\/#contact$/);
  await expect(page.locator('#contact')).toBeInViewport({ timeout: 12_000 });
});

test('the archive, case studies, and not-found page share the homepage chrome, voice, and closing', async ({ page }) => {
  const wide = (page.viewportSize()?.width ?? 0) >= 1024;
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  const home = await page.evaluate(() => {
    const read = (selector: string) => { const style = getComputedStyle(document.querySelector(selector)!); return { family: style.fontFamily, weight: style.fontWeight, color: style.color }; };
    return { title: read('h1'), voice: read('h1 em'), brand: read('.chrome-brand'), closing: read('.closing-title'), ground: getComputedStyle(document.body).backgroundColor };
  });
  for (const route of ['/work', '/work/testpulse', '/work/caldiy', '/work/llm-evaluation', '/404']) {
    await page.goto(route);
    const seen = await page.evaluate(() => {
      const read = (selector: string) => { const element = document.querySelector(selector); if (!element) return null; const style = getComputedStyle(element); return { family: style.fontFamily, weight: style.fontWeight, color: style.color }; };
      // No light field anywhere: a painted area of real size may not be lighter than a mid tone.
      // Thin amber rules and controls are accents, not fields.
      const light = [...document.querySelectorAll('main *, footer')].filter(element => {
        const tone = getComputedStyle(element).backgroundColor.match(/[\d.]+/g)?.map(Number) ?? [];
        const box = element.getBoundingClientRect();
        return tone.length >= 3 && (tone[3] ?? 1) > 0.5 && (tone[0]! + tone[1]! + tone[2]!) / 3 > 120 && box.width * box.height > 20_000 && !element.closest('a, button, label');
      }).map(element => element.className);
      return { title: read('h1'), voice: read('h1 em, .case-evidence h2 em'), brand: read('.chrome-brand'), closing: read('.closing-title'), ground: getComputedStyle(document.body).backgroundColor, light };
    });
    expect(seen.title, route).toEqual(home.title);
    expect(seen.voice, route).toMatchObject({ family: home.voice.family, weight: home.voice.weight });
    expect(seen.brand, route).toEqual(home.brand);
    expect(seen.closing, route).toEqual(home.closing);
    expect(seen.ground, route).toBe(home.ground);
    expect(seen.light, route).toEqual([]);
    await expect(page.locator('.closing-title')).toHaveText(/Let’s talk\s*about quality\./);
    const navigation = wide ? page.getByRole('navigation', { name: 'Main navigation' }) : page.getByRole('navigation', { name: 'Menu', exact: true });
    if (!wide) await page.locator('.chrome-menu').click();
    for (const [name, href] of [['Work', '/#work'], ['Experience', '/#experience'], ['Approach', '/#approach'], ['About', '/#about'], ['Contact', '/#contact']] as const) {
      await expect(navigation.getByRole('link', { name, exact: true })).toHaveAttribute('href', href);
    }
    await expect((wide ? page.locator('.site-chrome') : navigation).getByRole('link', { name: 'Resume', exact: true })).toHaveAttribute('download', 'Mohanad_Yehia_Software_QA_Engineer.pdf');
    await expect(page.getByRole('link', { name: 'Mohanad Yehia, home' })).toHaveAttribute('href', '/');
  }
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
  await page.locator('.hero').getByRole('link', { name: 'Resume', exact: true }).click();
  expect((await download).suggestedFilename()).toBe('Mohanad_Yehia_Software_QA_Engineer.pdf');
});

test('copy email reports success and passes the correct address to the browser', async ({ page }) => {
  await page.addInitScript(() => Object.defineProperty(navigator, 'clipboard', { value: { writeText: async (text: string) => { document.documentElement.dataset.copiedEmail = text; } } }));
  await page.goto('/');
  await released(page);
  await bring(page.getByRole('button', { name: 'Copy email' }));
  await page.getByRole('button', { name: 'Copy email' }).click();
  await expect(page.locator('.closing-status')).toHaveText('Email address copied.');
  await expect(page.locator('html')).toHaveAttribute('data-copied-email', 'mohanned.3262@gmail.com');
});

test('clipboard denial has useful recovery feedback', async ({ page }) => {
  await page.addInitScript(() => Object.defineProperty(navigator, 'clipboard', { value: { writeText: async () => { throw new DOMException('Denied', 'NotAllowedError'); } } }));
  await page.goto('/');
  await released(page);
  await bring(page.getByRole('button', { name: 'Copy email' }));
  await page.getByRole('button', { name: 'Copy email' }).click();
  await expect(page.locator('.closing-status')).toContainText('You can select the email address');
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
  const wide = (page.viewportSize()?.width ?? 0) >= 1024;
  await (wide ? page.getByRole('navigation', { name: 'Main navigation' }).getByRole('link', { name: 'Work', exact: true }) : page.locator('.chrome-menu')).focus();
  await page.keyboard.press(browserName === 'webkit' && process.platform === 'darwin' ? 'Alt+Tab' : 'Tab');
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

test('scroll reveals become fully readable and respect live motion preferences', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.goto('/');
  await expect(page.locator('html')).toHaveClass(/is-ready/, { timeout: 15_000 });
  await expect(page.locator('html')).toHaveClass(/is-staged/);
  const waiting = page.locator('.layers-word, .layers-notes li, .history-run, .career-line, .profile-facts > div, .project-summary');
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await expect(page.locator('html')).not.toHaveClass(/is-staged/);
  await expect.poll(() => waiting.evaluateAll(elements => elements.every(element => {
    const style = getComputedStyle(element);
    return style.opacity === '1' && style.transform === 'none' && style.visibility === 'visible';
  }))).toBe(true);
  await expect(page.locator('canvas')).toHaveCount(0);
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await expect(page.locator('html')).toHaveClass(/is-staged/);
  const facts = page.locator('.profile-facts > div').first();
  await bring(facts);
  await expect(facts).toHaveCSS('opacity', '1');
  await expect(page.getByRole('link', { name: 'The full resume' })).toBeVisible();
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
    if (route === '/') await expect(page.locator('html')).toHaveClass(/is-ready/, { timeout: 15_000 });
    else if (route === '/experience') await expect(page.locator('.passage-opening')).toHaveClass(/has-passage-motion/);
    else await expect.poll(() => page.locator('.ambient-warm').evaluate((element: HTMLElement) => element.style.transform)).not.toBe('');
    const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa']).analyze();
    await testInfo.attach(`axe-motion-${route.replaceAll('/', '-') || 'home'}`, { body: JSON.stringify(results, null, 2), contentType: 'application/json' });
    expect(results.violations.filter(item => item.impact === 'serious' || item.impact === 'critical')).toEqual([]);
    expect(await page.locator('.framework-item, .case-index-link, .next-case > a, .about-copy, .chapter-title:has(a), .project-links, .closing-email, .closing-links').evaluateAll(elements => elements.every(element => {
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
    const splitWords = await page.locator('h1, h2, h3, .career-figures b').evaluateAll(elements => {
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
