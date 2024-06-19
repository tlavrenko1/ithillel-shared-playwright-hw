import {
    chromium
} from '@playwright/test';
import {user} from './fixtures/user.js';
require('dotenv').config({
    path: `.env.${process.env.ENV}`
  })


(async () => {
    const browser = await chromium.launch();
    const context = await browser.newContext();
    const page = await context.newPage();

    // Navigate to the login page and perform login actions
    await page.goto('/'); // Replace with your actual login URL

    await page.fill('input[name="username"]', user.email);
    await page.fill('input[name="password"]', user.password);
    await page.click('button[type="submit"]'); // Replace with your actual login button selector

    // Wait for navigation or some page element indicating a successful login
    await page.waitForURL('/garage');

    // Save storage state into a file
    await context.storageState({
        path: 'storageState.json'
    });

    await browser.close();
})();