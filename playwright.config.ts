 import * as  dotenv from 'dotenv';
dotenv.config();
import { defineConfig, devices } from '@playwright/test';
import { getBaseURL } from './utils/env';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */

// import path from 'path';
 
//console.log('ENV VALUE FROM CONFIG:', process.env.ENV);
console.log('BASE_URL from ENV:', process.env.BASE_URL);
/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  
testDir: './tests',

  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  timeout: 60000,

  reporter: [
    ['html', { outputFolder: 'playwright-report', open: 'never' }]
  ],


  globalSetup: './global_setup.ts',

  use: {
    screenshot: 'on',
    trace: 'on-first-retry',
  },

  /* Configure projects for major browsers */
  projects: [
    
{
      name: 'login-tests',
      testMatch: /login\.spec\.ts/,
      use: {
        ...devices['Desktop Chrome'],
        baseURL: getBaseURL(),
        storageState: undefined
      }
    },

    {
      name: 'admin-tests',
      testMatch: /AdminPage\.spec\.ts/,
      use: {
        ...devices['Desktop Chrome'],
        baseURL: getBaseURL(),
        storageState: 'storageState.json'
      }
    },
  

    // {
    //   name: 'chromium',
    //   use: { ...devices['Desktop Chrome'] },
    // },

    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },

    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
