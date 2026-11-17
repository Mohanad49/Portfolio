import { test, expect } from '@playwright/test';
import { withoutStage } from './support';

test.beforeEach(async ({ page }) => { await withoutStage(page); });

test('enlarging text releases every pinned stage and restoring it pins them again', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('html')).toHaveClass(/is-ready/, { timeout: 15_000 });
  const desktop = (page.viewportSize()?.width ?? 0) >= 1024;
  const pins = page.locator('.pin-spacer');
  // Layers, the three projects, the career figures, and the method hold on wide screens only.
  await expect(pins).toHaveCount(desktop ? 6 : 0);
  const enlarged = await page.addStyleTag({ content: 'html { font-size: 200%; }' });
  // Only a stage whose whole content still fits may stay pinned.
  if (desktop) await expect(page.locator('html')).toHaveClass(/stage-loose/);
  // The rebuild is debounced, so wait for it to settle rather than sampling once.
  await expect.poll(() => page.locator('.pin-spacer > *').evaluateAll(stages => stages.every(stage => stage.scrollHeight <= innerHeight + 2))).toBe(true);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true);
  await enlarged.evaluate(element => { element.parentNode?.removeChild(element); });
  await expect(pins).toHaveCount(desktop ? 6 : 0);
  await expect(page.locator('html')).not.toHaveClass(/stage-loose/);
});

test('featured work identifies each QA project and retains its evidence boundaries', async ({ page }) => {
  await page.goto('/');
  const reporting = page.locator('.project--testpulse');
  await expect(reporting.locator('.project-kind')).toHaveText('QA reporting and flaky-test analysis');
  await expect(reporting).toContainText('I built TestPulse');
  await expect(reporting).toContainText('Recorded CI snapshot');
  const scheduling = page.locator('.project--caldiy');
  await expect(scheduling.getByRole('heading', { name: 'Cal.diy', exact: true })).toHaveCount(1);
  await expect(scheduling.locator('.project-kind')).toHaveText('QA strategy and automation');
  await expect(scheduling).toContainText('Cal.diy v6.2.0');
  const ai = page.locator('.project--llm');
  await expect(ai.getByRole('heading', { name: 'LLM Evaluation Harness', exact: true })).toHaveCount(1);
  await expect(ai.locator('.project-kind')).toHaveText('AI quality assurance');
  await expect(ai).toContainText('local retrieval-augmented');
  await expect(ai).toContainText('outside CI gates');
  await page.goto('/work');
  for (const [slug, purpose] of [['testpulse', 'QA reporting tool'], ['caldiy', 'QA strategy and automation'], ['llm-evaluation', 'AI quality assurance']] as const) {
    const row = page.locator('.case-index-link[href="/work/' + slug + '"]');
    await expect(row).toContainText(purpose);
    await expect(row.locator('.case-description')).not.toBeEmpty();
  }
});

test('complete entry materials finish before the archive and evidence panels', async ({ page }) => {
  for (const reducedMotion of ['no-preference', 'reduce'] as const) {
    await page.emulateMedia({ reducedMotion });
    for (const slug of ['testpulse', 'caldiy', 'llm-evaluation', 'archive']) {
      await page.goto(slug === 'archive' ? '/work' : '/work/' + slug);
      const field = page.locator(slug === 'archive' ? '.material-field--archive' : '.material-field--case');
      await field.scrollIntoViewIfNeeded();
      await expect.poll(() => field.locator('img').evaluateAll(images => images.every(image => (image as HTMLImageElement).complete && (image as HTMLImageElement).naturalWidth > 0))).toBe(true);
      await expect.poll(() => field.evaluate((element, archive) => {
        const object = element.querySelector('.material-object')?.getBoundingClientRect();
        const next = document.querySelector(archive ? '.case-index' : '.case-evidence')?.getBoundingClientRect();
        if (!object || !next) return false;
        return object.left >= 0 && object.right <= innerWidth && object.bottom < next.top - 12;
      }, slug === 'archive')).toBe(true);
    }
  }
});

test('the opening handoff is bounded while the stage is slow and repeat visits are immediate', async ({ page }) => {
  let release: (() => void) | undefined;
  const held = new Promise<void>(resolve => { release = resolve; });
  // The renderer request hangs to stand in for a slow stage, then fails so later loads stay free of software rendering.
  await page.route(/\/StageCanvas\.[^/]+\.js$/, async route => { await held; await route.abort().catch(() => {}); });
  try {
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    // Only wide layouts with a fine pointer show the curtain; the others paint the headline at once.
    if ((page.viewportSize()?.width ?? 0) >= 1024) await expect(page.locator('html')).toHaveClass(/is-preparing/);
    else await expect(page.locator('html')).not.toHaveClass(/is-preparing/);
    // The handoff waits at most 2.8 seconds for the stage, then the hero arrives without it.
    await expect(page.locator('html')).not.toHaveClass(/is-preparing/, { timeout: 4500 });
    await expect(page.locator('h1')).toBeVisible();
  } finally { release?.(); }
  await page.reload({ waitUntil: 'domcontentloaded' });
  await expect(page.locator('html')).not.toHaveClass(/is-preparing/);
  await expect(page.locator('.hero').getByRole('link', { name: 'Resume', exact: true })).toBeVisible();
});

test('the opening handoff yields immediately to keyboard navigation', async ({ page, browserName }) => {
  let release: (() => void) | undefined;
  const held = new Promise<void>(resolve => { release = resolve; });
  // The renderer request hangs to stand in for a slow stage, then fails so later loads stay free of software rendering.
  await page.route(/\/StageCanvas\.[^/]+\.js$/, async route => { await held; await route.abort().catch(() => {}); });
  try {
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    await page.keyboard.press(browserName === 'webkit' && process.platform === 'darwin' ? 'Alt+Tab' : 'Tab');
    await expect(page.locator('html')).not.toHaveClass(/is-preparing/);
    await expect(page.getByRole('link', { name: 'Skip to content' })).toBeFocused();
  } finally { release?.(); }
});
