import {
  defineConfig,
  devices
} from '@playwright/test';
import dotenv from 'dotenv';
dotenv.config({});


/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  setStorageState: './setup',
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
    storageState: 'storageState.json',
  
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
  /* Configure projects for major browsers */
  projects: [{
    name: 'setup',
    use: {
      storageState: 'storageState.json',
      baseURL: process.env.BASE_URL,
      httpCredentials: {
        username: process.env.HTTP_CREDENTIALS_USERNAME,
        password: process.env.HTTP_CREDENTIALS_PASSWORD,
      },
      ...devices['Desktop Chrome'],
    },
  }, ],

});