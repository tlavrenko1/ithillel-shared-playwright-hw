import {
    chromium
} from '@playwright/test';
import {
    existedUser
} from './fixtures/user.js';
import dotenv from 'dotenv';
dotenv.config({});

export const setStorageState = async () => {
    const browser = await chromium.launch({headless: false});
    const context = await browser.newContext();
    const page = await context.newPage();

    try {
        await page.goto('https://guest:welcome2qauto@qauto2.forstudy.space/');
            await page.click(`.btn.btn-outline-white.header_signin`);
            await page.fill('#signinEmail', userGaragePage.email);
            await page.fill('#signinPassword', userGaragePage.password);
            await page.click(`button[class='btn btn-primary']`);
            await page.waitForURL('https://qauto2.forstudy.space/panel/garage');

        // Save storage state
        await context.storageState({ path: 'storageState.json' });
        console.log('Storage state saved to storageState.json');
    } catch (error) {
        console.error('Error during login or saving storage state:', error);
    } finally {
        await browser.close();
        console.log('Browser closed');
    }
};

setStorageState();
