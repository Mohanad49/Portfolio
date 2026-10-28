const { chromium } = require('@playwright/test');

module.exports = {
  ci: {
    collect: {
      staticDistDir: './dist',
      isSinglePageApplication: false,
      url: ['http://localhost/', 'http://localhost/work/', 'http://localhost/work/testpulse/', 'http://localhost/work/caldiy/', 'http://localhost/work/llm-evaluation/', 'http://localhost/experience/'],
      numberOfRuns: 3,
      chromePath: chromium.executablePath(),
      settings: { formFactor: 'mobile', chromeFlags: '--headless --no-sandbox' },
    },
    assert: {
      assertions: {
        'categories:performance': ['error', { minScore: .9, aggregationMethod: 'median' }],
        'largest-contentful-paint': ['error', { maxNumericValue: 2499, aggregationMethod: 'median' }],
        'cumulative-layout-shift': ['error', { maxNumericValue: .0999, aggregationMethod: 'median' }],
      },
    },
    upload: { target: 'filesystem', outputDir: './.lighthouseci/reports' },
  },
};
