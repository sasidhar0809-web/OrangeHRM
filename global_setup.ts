
import { chromium } from '@playwright/test';
import { getBaseURL } from './utils/env';

async function globalSetup() {

  const browser = await chromium.launch();
  const page = await browser.newPage();

  const url = getBaseURL();

  console.log('Running ENV URL:', url);

  // Navigate
  //await page.goto(url);
  await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 });


  if (url.includes('orangehrmlive')) {

    await page.fill('input[placeholder="Username"]', 'Admin');
    await page.fill('input[placeholder="Password"]', 'admin123');
    await page.click('button[type="submit"]');

    await page.waitForSelector('text=Dashboard');

    await page.context().storageState({
      path: 'storageState.json'
    });


  }

  await browser.close();
}

export default globalSetup;
