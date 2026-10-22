import { defineConfig } from '@playwright/test';

const browsers = ['chromium', 'firefox', 'webkit'] as const;
const sizes = [
  { name: 'desktop', viewport: { width: 1440, height: 1000 } },
  { name: 'tablet', viewport: { width: 834, height: 1112 } },
  { name: 'mobile', viewport: { width: 390, height: 844 } },
];
const baseURL = process.env.PORTFOLIO_BASE_URL ?? 'http://127.0.0.1:4173';

export default defineConfig({
  testDir: './tests',
  timeout: 40_000,
  expect: { timeout: 8_000 },
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: 0,
  workers: 2,
  reporter: [['line'], ['html', { open: 'never' }], ['json', { outputFile: 'test-results/results.json' }]],
  use: { baseURL, trace: 'retain-on-failure', screenshot: 'only-on-failure', actionTimeout: 10_000, navigationTimeout: 20_000 },
  projects: browsers.flatMap(browserName => sizes.map(size => ({
    name: `${browserName}-${size.name}`,
    testIgnore: browserName === 'chromium' && size.name === 'desktop' ? undefined : '**/history.spec.ts',
    use: {
      browserName,
      viewport: size.viewport,
      launchOptions: browserName === 'chromium'
        ? { args: ['--enable-unsafe-swiftshader'] }
        : browserName === 'firefox' && process.env.CI && process.platform === 'linux'
          ? { headless: false, firefoxUserPrefs: { 'webgl.force-enabled': true, 'webgl.enable-software-renderer': true } }
          : {},
    },
  }))),
  webServer: process.env.PORTFOLIO_BASE_URL ? undefined : { command: 'pnpm preview --port 4173', url: baseURL, reuseExistingServer: !process.env.CI, timeout: 60_000 },
});
