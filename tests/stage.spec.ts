import { test, expect, type Page } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { released, settled, withoutStage } from './support';

const stageChunk = /\/StageCanvas\.[^/]+\.js$/;
const chapters = [['Work', '#work'], ['Experience', '#experience'], ['Approach', '#approach'], ['About', '#about'], ['Contact', '#contact']] as const;
const isWide = (page: Page) => (page.viewportSize()?.width ?? 0) >= 1024;

test('the homepage states the role, the featured projects, and their evidence boundaries', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  await expect(page.locator('h1')).toHaveText(/Complex\s+systems\.\s*Clear\s+evidence\./);
  await expect(page.locator('.hero-role')).toHaveText('Software QA Engineer');
  await expect(page.getByRole('link', { name: 'Explore the work', exact: true })).toHaveAttribute('href', '#work');
  await expect(page.locator('.hero').getByRole('link', { name: 'Resume' })).toHaveAttribute('download', 'Mohanad_Yehia_Software_QA_Engineer.pdf');

  for (const [name, href] of [['TestPulse', '/work/testpulse'], ['Cal.diy', '/work/caldiy'], ['LLM Evaluation Harness', '/work/llm-evaluation']] as const) {
    await expect(page.getByRole('heading', { level: 2, name, exact: true }).getByRole('link')).toHaveAttribute('href', href);
  }
  const testpulse = page.locator('.project--testpulse');
  await expect(testpulse.locator('.history-run')).toHaveCount(3);
  await expect(testpulse.locator('.history-run--failed')).toContainText('Failed');
  await expect(testpulse).toContainText('Same commit. Different outcomes.');
  await expect(testpulse).toContainText('Three selected observations; retry counts are unknown.');
  await expect(testpulse).toContainText('They do not identify the cause or show that the test has been repaired.');
  const caldiy = page.locator('.project--caldiy');
  await expect(caldiy).toContainText('Cal.diy v6.2.0');
  await expect(caldiy).toContainText('1 persisted booking');
  await expect(caldiy).toContainText('19 expected conflicts in a recorded contention run');
  const llm = page.locator('.project--llm');
  await expect(llm.locator('.agreement-value')).toHaveText('82%');
  await expect(llm).toContainText('raw agreement with 45 blind human labels');
  await expect(llm).toContainText('The refusal judge remains outside CI gates.');

  const figures = page.locator('.career-figures');
  for (const figure of ['22+', '5,000+', '600+', '85%']) await expect(figures).toContainText(figure);
  await expect(figures).toContainText('automated regression coverage on the admin portal');
  // Experience lists the two software-testing roles only.
  await expect(page.locator('.career-company')).toHaveText(['Blue Ribbon', 'Atos']);
  for (const company of ['Blue Ribbon', 'Atos']) await expect(page.getByRole('heading', { level: 3, name: company, exact: true })).toBeVisible();
  await expect(page.locator('.method-step')).toHaveCount(4);
  await expect(page.getByRole('link', { name: 'mohanned.3262@gmail.com' })).toHaveAttribute('href', 'mailto:mohanned.3262@gmail.com');
  expect(errors).toEqual([]);
});

test('navigation reaches every chapter and records the bookmark', async ({ page }) => {
  await withoutStage(page);
  await page.goto('/');
  await released(page);
  for (const [name, target] of chapters) {
    if (isWide(page)) {
      await page.getByRole('navigation', { name: 'Main navigation' }).getByRole('link', { name, exact: true }).click();
    } else {
      await page.getByRole('button', { name: 'Menu' }).click();
      await page.getByRole('navigation', { name: 'Menu', exact: true }).getByRole('link', { name, exact: true }).click();
    }
    await expect(page).toHaveURL(new RegExp(`${target}$`));
    await expect(page.locator(target)).toBeInViewport({ timeout: 12_000 });
    await page.goto('/');
    await released(page);
  }
});

// A browser window with its toolbars is shorter than the test viewport. Back to top once landed
// on the Cal.diy chapter at exactly these heights, so the in-page jumps are checked there too.
for (const height of [1000, 700]) {
  test(`Back to top, the name, and the navigation land on their targets in a ${height}px tall window`, async ({ page }) => {
    const width = page.viewportSize()?.width ?? 1440;
    await page.setViewportSize({ width, height: Math.min(height, page.viewportSize()?.height ?? height) });
    await withoutStage(page);
    await page.goto('/');
    await released(page);
    for (const control of ['Back to top', 'Mohanad Yehia, back to top']) {
      await page.evaluate(() => window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'instant' }));
      await settled(page);
      await expect(page.locator('#contact')).toBeInViewport();
      // The name sits in the chrome, which is away while reading down: focus brings it back.
      const link = page.getByRole('link', { name: control, exact: true });
      await link.focus();
      await link.press('Enter');
      await expect.poll(() => page.evaluate(() => Math.round(scrollY)), { timeout: 12_000, message: control }).toBeLessThanOrEqual(2);
      await expect(page.locator('h1')).toBeInViewport();
      await expect(page).toHaveURL(/\/$/);
    }
    if (!isWide(page)) return;
    for (const [name, target] of chapters) {
      // By keyboard, as the chrome is away after reading down: focus must bring it back into view.
      const link = page.getByRole('navigation', { name: 'Main navigation' }).getByRole('link', { name, exact: true });
      await link.focus();
      await expect(link).toBeInViewport();
      await link.press('Enter');
      await expect(page).toHaveURL(new RegExp(`${target}$`));
      await settled(page);
      // The chapter's own top edge is at the top of the window, not some other chapter's.
      await expect.poll(() => page.locator(target).evaluate(element => Math.abs(Math.round(element.getBoundingClientRect().top))), { timeout: 12_000, message: name }).toBeLessThanOrEqual(4);
    }
  });
}

test('the compact menu traps nothing, closes with Escape, and returns focus', async ({ page }) => {
  await withoutStage(page);
  test.skip(isWide(page), 'Wide layouts show the navigation directly.');
  await page.goto('/');
  const button = page.locator('.chrome-menu');
  await expect(page.locator('.site-menu')).toHaveAttribute('inert', '');
  await button.click();
  await expect(button).toHaveAttribute('aria-expanded', 'true');
  await expect(page.getByRole('navigation', { name: 'Menu', exact: true }).getByRole('link', { name: 'Work', exact: true })).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(button).toHaveAttribute('aria-expanded', 'false');
  await expect(button).toBeFocused();
  await expect(page.locator('.site-menu')).toHaveAttribute('inert', '');
});

test('reduced motion presents the complete static page and never loads the stage', async ({ page }) => {
  const stageRequests: string[] = [];
  page.on('request', request => { if (stageChunk.test(new URL(request.url()).pathname)) stageRequests.push(request.url()); });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  await expect(page.locator('html')).not.toHaveClass(/is-staged|is-preparing/);
  await expect(page.locator('html')).toHaveClass(/no-stage/);
  await expect(page.locator('canvas')).toHaveCount(0);
  await expect.poll(() => page.locator('.stage-still img').evaluate((image: HTMLImageElement) => image.complete && image.naturalWidth > 0)).toBe(true);
  await expect(page.locator('.layers-notes li')).toHaveCount(4);
  for (const note of await page.locator('.layers-notes li').all()) await expect(note).toBeVisible();
  for (const run of await page.locator('.history-run').all()) await expect(run).toBeVisible();
  await expect(page.locator('.career-stop')).toHaveCount(2);
  for (const stop of await page.locator('.career-stop').all()) await expect(stop).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true);
  expect(stageRequests).toEqual([]);
});

test('without JavaScript the homepage keeps its content, resume, and contact', async ({ browser, baseURL }, testInfo) => {
  const context = await browser.newContext({ javaScriptEnabled: false, viewport: testInfo.project.use.viewport, baseURL });
  const page = await context.newPage();
  await page.goto('/');
  await expect(page.locator('h1')).toBeVisible();
  await expect(page.locator('.stage-loader')).toBeHidden();
  await expect(page.getByRole('heading', { level: 2, name: 'TestPulse', exact: true })).toBeVisible();
  await expect(page.locator('.layers-notes li').first()).toBeVisible();
  await expect(page.locator('.method-step').last()).toBeVisible();
  await expect(page.locator('.hero').getByRole('link', { name: 'Resume' })).toHaveAttribute('href', '/resume.pdf');
  await expect(page.getByRole('link', { name: 'mohanned.3262@gmail.com' })).toHaveAttribute('href', /^mailto:/);
  await page.goto('/#Contact');
  await expect(page.locator('[id="Contact"]')).toBeInViewport();
  await context.close();
});

test('a browser without WebGL2 keeps the still, the motion, and working content', async ({ page }) => {
  await page.addInitScript(() => {
    const original = HTMLCanvasElement.prototype.getContext;
    HTMLCanvasElement.prototype.getContext = function (this: HTMLCanvasElement, type: string, ...rest: unknown[]) {
      if (type === 'webgl2' || type === 'webgl' || type === 'experimental-webgl') return null;
      return (original as (...args: unknown[]) => unknown).call(this, type, ...rest);
    } as typeof HTMLCanvasElement.prototype.getContext;
  });
  const stageRequests: string[] = [];
  page.on('request', request => { if (stageChunk.test(new URL(request.url()).pathname)) stageRequests.push(request.url()); });
  await page.goto('/');
  await released(page);
  await expect(page.locator('html')).toHaveClass(/no-stage/);
  await expect(page.locator('html')).not.toHaveClass(/is-preparing/);
  await expect(page.locator('canvas')).toHaveCount(0);
  await expect(page.locator('.stage-still')).toBeVisible();
  await expect(page.locator('h1')).toBeVisible();
  await expect(page.locator('.hero-hint')).toBeHidden();
  expect(stageRequests).toEqual([]);
});

test('the stage starts where WebGL2 exists and survives a full scroll in both directions', async ({ page }) => {
  // The one test that runs the real renderer. In a headless browser that means software WebGL,
  // which can hold the main thread for seconds at a time, so it gets a wider budget.
  test.setTimeout(120_000);
  const errors: string[] = [];
  page.on('pageerror', error => errors.push(error.message));
  // Ask the browser itself, on a blank page. The page's own no-stage state also covers a renderer
  // that started and was handed back, and that outcome must still be checked below.
  const hasWebGL2 = await page.evaluate(() => {
    try { return Boolean(document.createElement('canvas').getContext('webgl2')); } catch { return false; }
  });
  test.skip(!hasWebGL2, 'This browser build has no WebGL2 context.');
  await page.goto('/');
  await expect(page.locator('html')).toHaveClass(/is-ready/, { timeout: 45_000 });
  // A hardware renderer goes live. A software renderer is expected to be judged too slow and
  // handed back to the still within a few seconds; either outcome leaves a working page.
  await expect(page.locator('html')).toHaveClass(/stage-live|no-stage/, { timeout: 45_000 });
  await expect(page.locator('html')).not.toHaveClass(/is-preparing/, { timeout: 15_000 });
  const height = await page.evaluate(() => document.documentElement.scrollHeight);
  const step = (page.viewportSize()?.height ?? 900) * 0.9;
  for (let y = 0; y < height; y += step) { await page.mouse.wheel(0, step); await page.waitForTimeout(60); }
  await expect(page.locator('#contact')).toBeInViewport({ timeout: 20_000 });
  await page.evaluate(() => window.scrollTo(0, 0));
  await expect(page.locator('h1')).toBeInViewport({ timeout: 20_000 });
  expect(errors).toEqual([]);
});

test('experience and approach stay in the graphite theme with the chapter type scale', async ({ page }) => {
  await withoutStage(page);
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  const ink = await page.locator('body').evaluate(element => getComputedStyle(element).color);
  const size = (selector: string) => page.locator(selector).evaluate(element => parseFloat(getComputedStyle(element).fontSize));
  const hero = await size('h1');
  // The scale the other chapters already use at this viewport.
  const chapterScale = Math.max(await size('.archive-title'), await size('.profile-title'));
  for (const chapter of ['#experience', '#approach']) {
    const seen = await page.locator(chapter).evaluate(element => {
      // Any painted area of real size inside the chapter that is not a dark graphite tone.
      const fields = [element, ...element.querySelectorAll('*')].filter(node => {
        const style = getComputedStyle(node);
        const box = node.getBoundingClientRect();
        if (box.width * box.height < 20_000) return false;
        // A background image pinned to a fixed size without repeating is a mark (a bullet dash), not a field.
        const mark = style.backgroundRepeat.includes('no-repeat') && /px/.test(style.backgroundSize);
        const tones = [style.backgroundColor, ...(mark ? [] : style.backgroundImage.match(/rgba?\([^)]+\)/g) ?? [])];
        return tones.some(tone => { const parts = tone.match(/[\d.]+/g)?.map(Number) ?? []; return (parts[3] ?? 1) > 0.05 && (parts[0]! + parts[1]! + parts[2]!) / 3 > 60; });
      }).map(node => node.className || node.tagName);
      return { ink: getComputedStyle(element).color, fields, title: parseFloat(getComputedStyle(element.querySelector('h2')!).fontSize) };
    });
    expect(seen.ink, chapter).toBe(ink);
    expect(seen.fields, chapter).toEqual([]);
    // A chapter title like the others, not a second hero.
    expect(seen.title, chapter).toBeLessThanOrEqual(chapterScale + 0.5);
    expect(seen.title, chapter).toBeLessThan(hero);
  }
  await expect(page.locator('html')).not.toHaveAttribute('data-chrome', 'ink');
});

test('experience and approach are staged like the other chapters and their text never waits unseen', async ({ page }) => {
  await withoutStage(page);
  await page.goto('/');
  await released(page);
  await expect(page.locator('html')).not.toHaveClass(/is-preparing/, { timeout: 8_000 });
  const rest = async (selector: string, into: number) => {
    await page.evaluate(([target, extra]) => {
      let top = 0;
      let node = document.querySelector<HTMLElement>(target as string);
      while (node) { top += node.offsetTop; node = node.offsetParent as HTMLElement | null; }
      window.scrollTo({ top: top + (extra as number) * innerHeight, behavior: 'instant' });
    }, [selector, into]);
    await settled(page);
  };
  if (isWide(page)) {
    // Held: the figures resolve one at a time, then all four are readable before the stage lets go.
    await rest('#experience', 0);
    await expect(page.locator('.career-stage')).toHaveClass(/is-held/);
    const shown = () => page.locator('.career-line').evaluateAll(lines => lines.filter(line => getComputedStyle(line).clipPath === 'none' || /inset\(0(px|%)? 0(px|%)? 0(px|%)? 0(px|%)?\)/.test(getComputedStyle(line).clipPath)).length);
    await expect.poll(shown).toBeLessThan(4);
    await rest('#experience', 1.68);
    await expect.poll(shown, { timeout: 8_000 }).toBe(4);
    // Held: exactly one step is in focus, and it advances with the scroll in both directions.
    const active = () => page.locator('.method-step.is-active h3').allTextContents();
    await rest('#approach', 0.1);
    await expect(page.locator('.method-stage')).toHaveClass(/is-held/);
    await expect.poll(active).toEqual(['Find the risk']);
    await rest('#approach', 2.2);
    await expect.poll(active).toEqual(['Keep the limits visible']);
    await expect(page.locator('.method-step.is-active .method-body')).toHaveCSS('opacity', '1');
    await rest('#approach', 0.7);
    await expect.poll(active).toEqual(['Follow the evidence']);
  } else {
    // In flow every step keeps its text on the page; only the emphasis moves.
    await rest('#approach', 0.5);
    for (const body of await page.locator('.method-body').all()) await expect(body).toHaveCSS('opacity', '1');
    await expect(page.locator('.career-stage')).not.toHaveClass(/is-held/);
  }
  // Every step's text stays in the accessibility tree whether or not it is the one in focus.
  await expect(page.getByText('Separate a passing check from a justified quality decision.')).toBeAttached();
  await expect(page.getByRole('heading', { level: 3, name: 'Keep the limits visible' })).toBeVisible();
});

test('scrolling back up restores every chapter to the state it had on the way down', async ({ page }) => {
  await withoutStage(page);
  await page.goto('/');
  await released(page);
  await expect(page.locator('html')).not.toHaveClass(/is-preparing/, { timeout: 8_000 });
  // Opacity and focus state of everything the scroll choreographs, read once the page is at rest.
  const state = () => page.evaluate(() => [...document.querySelectorAll('.hero-line, .hero-foot, .layers-word, .layers-notes li, .history-run, .contention span, .agreement, .archive-copy, .career-line, .career-stop, .method-step, .profile-facts > div, .closing-body > *')].map(element => {
    const style = getComputedStyle(element);
    return `${Math.round(parseFloat(style.opacity) * 10) / 10}${style.visibility === 'hidden' ? 'h' : ''}${element.classList.contains('is-active') ? 'a' : ''}`;
  }).join(' '));
  const rest = async (top: number) => { await page.evaluate(y => window.scrollTo({ top: y, behavior: 'instant' }), top); await settled(page); };
  const height = await page.evaluate(() => document.documentElement.scrollHeight - innerHeight);
  const stops = Array.from({ length: 9 }, (_, index) => Math.round(height * index / 8));
  const down: string[] = [];
  for (const stop of stops) {
    await rest(stop);
    // Reveals that play once on arrival need their own duration before the state is final.
    await expect.poll(async () => { const first = await state(); await page.waitForTimeout(350); return first === await state(); }, { timeout: 10_000 }).toBe(true);
    down.push(await state());
  }
  for (const [index, stop] of [...stops.entries()].reverse()) {
    await rest(stop);
    await expect.poll(state, { timeout: 10_000, message: `state at ${stop}px on the way up` }).toBe(down[index]);
  }
  await expect(page.locator('h1')).toBeInViewport();
});

test('the opening handoff is bounded and repeat visits skip it', async ({ page }) => {
  await withoutStage(page);
  await page.goto('/');
  await released(page);
  await expect(page.locator('html')).not.toHaveClass(/is-preparing/, { timeout: 8_000 });
  await expect(page.locator('.stage-loader')).toBeHidden();
  expect(await page.evaluate(() => sessionStorage.getItem('portfolio-stage-seen'))).toBe('1');
  await page.goto('/work');
  await page.goto('/');
  expect(await page.evaluate(() => document.documentElement.classList.contains('is-preparing'))).toBe(false);
});

test('legacy and current bookmarks land on their chapters', async ({ page }) => {
  await withoutStage(page);
  for (const hash of ['Home', 'Portofolio', 'About', 'Contact', 'work', 'experience', 'approach', 'about', 'contact']) {
    await page.goto('/work');
    await page.goto(`/#${hash}`);
    await expect(page.locator(`[id="${hash}"]`)).toBeInViewport({ timeout: 12_000 });
  }
});

test('the homepage has zero serious or critical axe findings, static and in motion', async ({ page }, testInfo) => {
  await withoutStage(page);
  for (const reducedMotion of ['reduce', 'no-preference'] as const) {
    await page.emulateMedia({ reducedMotion });
    await page.goto('/');
    if (reducedMotion === 'no-preference') await released(page);
    const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa']).analyze();
    await testInfo.attach(`axe-home-${reducedMotion}`, { body: JSON.stringify(results, null, 2), contentType: 'application/json' });
    expect(results.violations.filter(item => item.impact === 'serious' || item.impact === 'critical')).toEqual([]);
  }
});

test('320px reflow keeps the homepage within the viewport', async ({ page }) => {
  await withoutStage(page);
  await page.setViewportSize({ width: 320, height: 640 });
  for (const reducedMotion of ['reduce', 'no-preference'] as const) {
    await page.emulateMedia({ reducedMotion });
    await page.goto('/');
    if (reducedMotion === 'no-preference') await released(page);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true);
    await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true);
  }
});
