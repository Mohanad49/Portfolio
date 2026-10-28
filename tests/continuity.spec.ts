import { test, expect } from '@playwright/test';

test('enlarging text releases project pinning and restoring it enables fitting scenes', async ({ page }) => {
  await page.goto('/');
  const stages = page.locator('.project-stage');
  const desktop = (page.viewportSize()?.width ?? 0) >= 1024;
  await expect(page.locator('.passage-opening')).toHaveClass(/has-passage-motion/);
  await expect(stages.first()).toHaveCSS('position', 'relative');
  await page.locator('.evidence-study').scrollIntoViewIfNeeded();
  if (desktop) await expect(stages.first()).toHaveCSS('position', 'sticky');
  const enlarged = await page.addStyleTag({ content: 'html { font-size: 200%; }' });
  for (const stage of await stages.all()) await expect(stage).toHaveCSS('position', 'relative');
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true);
  await enlarged.evaluate(element => { element.parentNode?.removeChild(element); });
  if (desktop) for (const stage of await stages.all()) await expect(stage).toHaveCSS('position', 'sticky');
});

test('featured work identifies each QA project and retains its evidence boundaries', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('.passage-project-summary')).toContainText('QA reporting');
  await expect(page.locator('.passage-arrival-content')).toContainText('I built TestPulse');
  await expect(page.locator('.snapshot-boundary')).toContainText('Recorded CI snapshot');
  const scheduling = page.locator('.caldiy-project');
  await expect(scheduling.getByRole('heading', { name: 'Cal.diy', exact: true })).toHaveCount(1);
  await expect(scheduling.locator('.project-type')).toHaveText('QA strategy and automation');
  await expect(scheduling).toContainText('Cal.diy v6.2.0');
  const ai = page.locator('.llm-project');
  await expect(ai.getByRole('heading', { name: 'LLM Evaluation Harness', exact: true })).toHaveCount(1);
  await expect(ai.locator('.project-type')).toHaveText('AI quality assurance');
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

test('the first desktop handoff is bounded by readiness and repeat visits are immediate', async ({ page }) => {
  let release: (() => void) | undefined;
  const held = new Promise<void>(resolve => { release = resolve; });
  await page.route(/passage-material.*\.webp/, async route => { await held; await route.continue(); });
  try {
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    if ((page.viewportSize()?.width ?? 0) >= 1024) await expect(page.locator('html')).toHaveClass(/preparing-opening/);
    await expect(page.locator('html')).not.toHaveClass(/preparing-opening/, { timeout: 2500 });
  } finally { release?.(); }
  await expect(page.locator('.passage-opening')).toHaveClass(/has-passage-motion/);
  await page.reload({ waitUntil: 'domcontentloaded' });
  await expect(page.locator('html')).not.toHaveClass(/preparing-opening/);
  await expect(page.getByRole('link', { name: 'Resume', exact: true })).toBeVisible();
});

test('the startup handoff yields immediately to keyboard navigation', async ({ page, browserName }) => {
  let release: (() => void) | undefined;
  const held = new Promise<void>(resolve => { release = resolve; });
  await page.route(/passage-material.*\.webp/, async route => { await held; await route.continue(); });
  try {
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    await page.keyboard.press(browserName === 'webkit' && process.platform === 'darwin' ? 'Alt+Tab' : 'Tab');
    await expect(page.locator('html')).not.toHaveClass(/preparing-opening/);
    await expect(page.getByRole('link', { name: 'Skip to content' })).toBeFocused();
  } finally { release?.(); }
});
