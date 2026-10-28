import { defineConfig } from '@playwright/test';
import base from './playwright.config';

const inspection = /desktop inspection responds to keyboard input and returns to its fallback/;
// Mozilla's automation setting keeps the runner's refresh driver foreground-active.
const firefoxUserPrefs = { 'layout.testing.top-level-always-active': true };

export default defineConfig({
  ...base,
  // Keep the headed Firefox session isolated on the shared Windows desktop.
  workers: 1,
  projects: [
    ...(['chrome', 'msedge'] as const).map(channel => ({
      name: `${channel}-desktop`,
      testIgnore: '**/history.spec.ts',
      use: {
        browserName: 'chromium' as const,
        channel,
        viewport: { width: 1440, height: 1000 },
        launchOptions: { args: ['--enable-unsafe-swiftshader'] },
      },
    })),
    {
      name: 'firefox-desktop',
      testIgnore: '**/history.spec.ts',
      grepInvert: inspection,
      use: {
        browserName: 'firefox',
        viewport: { width: 1440, height: 1000 },
        launchOptions: { firefoxUserPrefs },
      },
    },
    {
      name: 'firefox-renderer-desktop',
      testMatch: '**/portfolio.spec.ts',
      grep: inspection,
      use: {
        browserName: 'firefox',
        viewport: { width: 1440, height: 1000 },
        launchOptions: {
          headless: false,
          firefoxUserPrefs: { ...firefoxUserPrefs, 'webgl.force-enabled': true, 'webgl.enable-software-renderer': true },
        },
      },
    },
  ],
});
