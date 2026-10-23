import { chromium } from '@playwright/test';
import { mkdir, writeFile } from 'node:fs/promises';

const base = process.env.PORTFOLIO_BASE_URL ?? 'http://127.0.0.1:4173';
const directory = '.impeccable/review';
await mkdir(directory, { recursive: true });
const browser = await chromium.launch({ args: ['--enable-unsafe-swiftshader'] });
const captures = [
  ['desktop', '/', 1440, 1000, true], ['mobile', '/', 390, 844, true],
  ['tablet', '/', 834, 1112, true], ['comp', '/', 1536, 1024, false],
  ['desktop-1280', '/', 1280, 900, false], ['desktop-1600', '/', 1600, 1000, false],
  ['user-1280', '/', 1280, 720, true],
  ['work-desktop', '/work', 1440, 1000, true], ['work-mobile', '/work', 390, 844, true],
  ['testpulse-desktop', '/work/testpulse', 1440, 1000, true], ['testpulse-mobile', '/work/testpulse', 390, 844, true],
  ['caldiy-desktop', '/work/caldiy', 1440, 1000, true], ['caldiy-mobile', '/work/caldiy', 390, 844, true],
  ['llm-desktop', '/work/llm-evaluation', 1440, 1000, true], ['llm-mobile', '/work/llm-evaluation', 390, 844, true],
  ['404-mobile', '/404', 390, 844, true],
];
const manifest = [];
try {
  for (const [name, route, width, height, fullPage] of captures) {
    const page = await browser.newPage({ viewport: { width, height }, deviceScaleFactor: 1, reducedMotion: 'reduce' });
    await page.goto(`${base}${route}`, { waitUntil: 'networkidle' });
    await page.evaluate(async () => {
      await document.fonts.ready;
      const images = [...document.images];
      images.forEach(image => { image.loading = 'eager'; });
      await Promise.all(images.map(image => image.decode()));
      window.scrollTo(0, 0);
    });
    const path = `${directory}/${name}.png`;
    await page.screenshot({ path, fullPage });
    manifest.push({ name, path, route, width, height, fullPage, reducedMotion: true });
    await page.close();
  }
  const interactive = await browser.newPage({ viewport: { width: 1440, height: 1000 }, deviceScaleFactor: 1 });
  await interactive.goto(base, { waitUntil: 'networkidle' });
  await interactive.locator('.inspection-frame').scrollIntoViewIfNeeded();
  await interactive.getByRole('slider', { name: 'Separate layers' }).waitFor({ timeout: 20_000 });
  await interactive.locator('.inspection-study').screenshot({ path: `${directory}/inspection-interactive.png` });
  manifest.push({ name: 'inspection-interactive', path: `${directory}/inspection-interactive.png`, route: '/', width: 1440, height: 1000, reducedMotion: false, component: '.inspection-study' });
  await interactive.close();
  await writeFile(`${directory}/capture-manifest.json`, JSON.stringify(manifest, null, 2));
  console.log(`Captured ${manifest.length} verified page and interaction views.`);
} finally { await browser.close(); }
