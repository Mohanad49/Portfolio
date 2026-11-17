import { defineConfig } from '@playwright/test';
import base from './playwright.config';

// The one check that starts the real renderer. Firefox runs it in its own headed session.
const renderer = /the stage starts where WebGL2 exists and survives a full scroll in both directions/;
// The renderer's pure rules do not vary by browser: they run once, in Chrome.
const once = ['**/history.spec.ts', '**/governor.spec.ts'];
// Mozilla's automation setting keeps the runner's refresh driver foreground-active.
const firefoxUserPrefs = { 'layout.testing.top-level-always-active': true };

export default defineConfig({
  ...base,
  // Keep the headed Firefox session isolated on the shared Windows desktop.
  workers: 1,
  projects: [
    ...(['chrome', 'msedge'] as const).map(channel => ({
      name: `${channel}-desktop`,
      testIgnore: channel === 'chrome' ? '**/history.spec.ts' : once,
      use: {
        browserName: 'chromium' as const,
        channel,
        viewport: { width: 1440, height: 1000 },
        launchOptions: { args: ['--enable-unsafe-swiftshader'] },
      },
    })),
    {
      name: 'firefox-desktop',
      testIgnore: once,
      grepInvert: renderer,
      use: {
        browserName: 'firefox',
        viewport: { width: 1440, height: 1000 },
        launchOptions: { firefoxUserPrefs },
      },
    },
    {
      name: 'firefox-renderer-desktop',
      testMatch: '**/stage.spec.ts',
      grep: renderer,
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
