import { test, expect } from '@playwright/test';
import { released, settled, withoutStage } from './support';

test.beforeEach(async ({ page }) => { await withoutStage(page); });

test('the homepage introduces one TestPulse chapter and continues into the other work', async ({ page }) => {
  await page.goto('/');
  await released(page);
  await expect(page.getByRole('heading', { name: 'TestPulse', exact: true })).toHaveCount(1);
  await page.getByRole('link', { name: 'Explore the work', exact: true }).click();
  await expect(page).toHaveURL(/#work$/);
  await expect(page.locator('#work')).toBeInViewport({ timeout: 12_000 });
  await page.locator('.project--caldiy .project-links').scrollIntoViewIfNeeded();
  await expect(page.getByRole('link', { name: 'Inspect Cal.diy', exact: true })).toBeVisible();
  await page.locator('.project--llm .project-links').scrollIntoViewIfNeeded();
  await expect(page.getByRole('link', { name: 'Read the evaluation', exact: true })).toBeVisible();
});

test('project evidence advances and reverses with the scroll while the recorded figures stay fixed', async ({ page }) => {
  await page.goto('/');
  await released(page);
  const figure = page.locator('.evidence--contention');
  const bars = figure.locator('.contention span');
  await expect(bars).toHaveCount(20);
  await expect(figure.locator('.winner')).toHaveCount(1);
  const loser = bars.nth(5);
  // The scrubbed range is the pin on wide screens and the chapter's passage through the viewport elsewhere.
  const range = await page.locator('.project--caldiy').evaluate(element => {
    const spacer = element.querySelector('.pin-spacer');
    const rect = (spacer ?? element).getBoundingClientRect();
    const top = rect.top + scrollY;
    return spacer ? { start: top, end: top + rect.height - innerHeight } : { start: top - innerHeight * 0.3, end: top + rect.height - innerHeight * 0.9 };
  });
  const height = () => loser.evaluate(element => element.getBoundingClientRect().height);
  // Smoothed scrolling passes through the figure's earlier states on its way to a position, so the
  // figure is read only once scrolling has come to rest.
  await page.evaluate(top => scrollTo({ top, behavior: 'instant' }), range.start + (range.end - range.start) * 0.4);
  await settled(page);
  await expect.poll(height).toBeGreaterThan(10);
  const early = await height();
  await page.evaluate(top => scrollTo({ top, behavior: 'instant' }), range.end - 2);
  await settled(page);
  await expect.poll(height).toBeLessThan(early * 0.6);
  await page.evaluate(top => scrollTo({ top, behavior: 'instant' }), range.start + (range.end - range.start) * 0.4);
  await settled(page);
  await expect.poll(height).toBeGreaterThan(early * 0.9);
  await expect(figure.locator('figcaption')).toContainText('1 persisted booking');
  await expect(figure.locator('figcaption')).toContainText('19 expected conflicts');
  const agreement = page.locator('.evidence--agreement');
  await expect(agreement.locator('.agreement-value')).toHaveText('82%');
  await expect(agreement).toContainText('45 blind human labels');
  await expect(agreement).toContainText('outside CI gates');
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await expect(loser).toHaveCSS('transform', 'none');
  await expect(page.locator('.agreement-track span')).toHaveCSS('transform', 'none');
  await expect.poll(() => loser.evaluate(element => element.getAttribute('style') ?? '')).toBe('');
});

test('every case-study heading is readable once it is scrolled into view', async ({ page }) => {
  for (const slug of ['testpulse', 'caldiy', 'llm-evaluation']) {
    await page.goto(`/work/${slug}`);
    // Motion is running, and the serif face that arrives after load (and can move what follows it) is in.
    await expect.poll(() => page.locator('.ambient-warm').evaluate((element: HTMLElement) => element.style.transform)).not.toBe('');
    await expect.poll(() => page.evaluate(() => [...document.fonts].some(face => face.family.includes('Bodoni') && face.status === 'loaded')), { timeout: 10_000 }).toBe(true);
    for (const heading of await page.locator('.case-prose h2').all()) {
      // Place the heading's own slot (its layout position, not where an entrance offset has moved it)
      // 82% down the window. The text that follows it is in view there, so the heading must be too.
      await heading.evaluate(element => {
        let top = 0;
        for (let node: HTMLElement | null = element as HTMLElement; node; node = node.offsetParent as HTMLElement | null) top += node.offsetTop;
        window.scrollTo({ top: top - innerHeight * 0.82, behavior: 'instant' });
      });
      await expect(heading, `${slug}: ${await heading.textContent()}`).toHaveCSS('clip-path', 'none', { timeout: 5_000 });
    }
  }
});

test('case studies move their artwork and reading progress while the prose remains steady', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', error => errors.push(error.message));
  for (const slug of ['testpulse', 'caldiy', 'llm-evaluation']) {
    await page.goto(`/work/${slug}`);
    const artwork = page.locator('.material-field--case .material-object');
    await expect.poll(() => artwork.evaluate(element => getComputedStyle(element).transform)).toContain('matrix3d');
    const initial = await artwork.evaluate(element => getComputedStyle(element).transform);
    const prose = page.locator('.case-prose');
    await prose.locator('h2').first().scrollIntoViewIfNeeded();
    await expect.poll(() => artwork.evaluate(element => getComputedStyle(element).transform)).not.toBe(initial);
    const progress = page.locator('.reading-progress');
    const progressBefore = await progress.evaluate(element => getComputedStyle(element).transform);
    await prose.locator('h2').last().scrollIntoViewIfNeeded();
    await expect.poll(() => progress.evaluate(element => getComputedStyle(element).transform)).not.toBe(progressBefore);
    expect(await prose.locator('p').evaluateAll(elements => elements.every(element => {
      const style = getComputedStyle(element);
      return style.opacity === '1' && style.transform === 'none';
    }))).toBe(true);
    const next = page.locator('.next-case > a');
    const destination = await next.getAttribute('href');
    await next.click();
    await expect(page).toHaveURL(new RegExp(`${destination}/?$`));
    await expect(page.locator('h1')).toBeVisible();
    await page.goBack();
    await expect(page).toHaveURL(new RegExp(`/work/${slug}/?$`));
  }
  expect(errors).toEqual([]);
});
