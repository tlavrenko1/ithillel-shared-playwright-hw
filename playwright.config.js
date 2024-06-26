import {
  defineConfig,
  devices
} from '@playwright/test';
require('dotenv').config({
  path: `.env.${process.env.ENV || 'stage'}`
})

/**
 * @see https://playwright.dev/docs/test-configuration
 */
module.exports = defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  //grep: /@smoke/,

  //turn off test that were marked this way
  //grepInvert: /@smoke/,
  use: {
    baseURL: process.env.BASE_URL,
    httpCredentials: {
      username: process.env.HTTP_CREDENTIALS_USERNAME,
      password: process.env.HTTP_CREDENTIALS_PASSWORD,
    },
    trace: 'on-first-retry',
    viewport: {
      width: 1920,
      height: 1080
    },
    screenshot: 'only-on-failure',
  },
  //globalSetup: './globalSetup',
  //globalTeardown: './globalTeardown',

  /* Configure projects for major browsers */
  projects: [{
      name: 'stage',
      use: {
        baseURL: 'https://qauto2.forstudy.space/',
        httpCredentials: {
          username: 'guest',
          password: 'welcome2qauto',
        },
        ...devices['Desktop Chrome']
      },
    },
  ],
});