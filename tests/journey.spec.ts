import { test, expect } from '@playwright/test';

function chapterRange(element: Element) {
  const chapter = element.closest('.work-chapter');
  const sticky = chapter?.classList.contains('has-chapter-motion');
  const rect = (sticky ? chapter : element)?.getBoundingClientRect();
  if (!rect) throw new Error('Project motion range is missing.');
  return { start: rect.top + scrollY - (sticky ? 0 : innerHeight * .9), end: rect.bottom + scrollY - (sticky ? innerHeight : innerHeight * .45) };
}

test('later motion uses the expanded opening geometry even when its module loads first', async ({ page }) => {
  let releaseOpening: (() => void) | undefined;
  const openingReady = new Promise<void>(resolve => { releaseOpening = resolve; });
  await page.route(/\/experience-motion\.[^/]+\.js$/, async route => {
    await openingReady;
    await route.continue();
  });
  await page.goto('/');
  const winner = page.locator('.contention-bars .winner');
  try {
    await expect.poll(() => winner.evaluate((element: HTMLElement) => element.style.transform)).not.toBe('');
    await expect(page.locator('.passage-opening')).not.toHaveClass(/has-passage-motion/);
  } finally { releaseOpening?.(); }
  await expect(page.locator('.passage-opening')).toHaveClass(/has-passage-motion/);
  const range = await page.locator('.contention-figure').evaluate(chapterRange);
  await page.evaluate(top => scrollTo({ top, behavior: 'instant' }), range.start + 1);
  await expect.poll(() => winner.evaluate(element => new DOMMatrix(getComputedStyle(element).transform).m22)).toBeLessThan(.3);
  await page.evaluate(top => scrollTo({ top, behavior: 'instant' }), range.end + 20);
  await expect.poll(() => winner.evaluate(element => new DOMMatrix(getComputedStyle(element).transform).m22)).toBeGreaterThan(.99);
});

test('the homepage opening arrives at one TestPulse section and continues into the other work', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('.passage-opening')).toHaveClass(/has-passage-motion/);
  await expect(page.getByRole('heading', { name: 'TestPulse', exact: true })).toHaveCount(1);
  await page.getByRole('link', { name: 'Explore the work', exact: true }).click();
  await expect(page).toHaveURL(/#work$/);
  await expect(page.locator('#passage-title')).toHaveCSS('opacity', '0');
  await expect(page.locator('.passage-project-title')).toBeInViewport();
  await page.locator('.caldiy-project').scrollIntoViewIfNeeded();
  await expect(page.getByRole('link', { name: 'Inspect Cal.diy', exact: true })).toBeVisible();
  await page.locator('.llm-project').scrollIntoViewIfNeeded();
  await expect(page.getByRole('link', { name: 'Read the evaluation', exact: true })).toBeVisible();
});

test('later project motion advances and reverses while the recorded figures stay fixed', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('.passage-opening')).toHaveClass(/has-passage-motion/);
  const figure = page.locator('.contention-figure');
  await expect(figure.locator('.contention-bars span')).toHaveCount(20);
  await expect(figure.locator('.winner')).toHaveCount(1);
  const range = await figure.evaluate(chapterRange);
  await page.evaluate(top => scrollTo({ top, behavior: 'instant' }), range.start);
  const winner = figure.locator('.winner');
  await expect.poll(() => winner.evaluate(element => getComputedStyle(element).transform)).not.toBe('none');
  const before = await winner.evaluate(element => getComputedStyle(element).transform);
  await page.evaluate(top => scrollTo({ top, behavior: 'instant' }), range.end + 20);
  await expect.poll(() => winner.evaluate(element => getComputedStyle(element).transform)).not.toBe(before);
  const after = await winner.evaluate(element => getComputedStyle(element).transform);
  await page.evaluate(top => scrollTo({ top, behavior: 'instant' }), range.start);
  await expect.poll(() => winner.evaluate(element => getComputedStyle(element).transform)).not.toBe(after);
  await expect(figure.locator('figcaption')).toContainText('1 persisted booking');
  await expect(figure.locator('figcaption')).toContainText('19 expected conflicts');
  const agreement = page.locator('.judge-figure');
  await agreement.scrollIntoViewIfNeeded();
  await expect(agreement.locator('.agreement > span')).toHaveText('82%');
  await expect(agreement).toContainText('45 blind human labels');
  await expect(agreement).toContainText('outside CI gates');
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await expect(winner).toHaveCSS('transform', 'none');
  await expect(page.locator('.agreement-track span')).toHaveCSS('transform', 'none');
  await expect(page.locator('.caldiy-project .material-sculpture')).toHaveJSProperty('complete', true);
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
