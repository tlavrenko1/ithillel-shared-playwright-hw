import {
    test as base,
    expect
} from '@playwright/test';
import GaragePage from '../pages/garagePage';

export const test = base.extend({
    garagePage: async ({
        page,
        context
    }, use) => {
        const garagePage = new GaragePage(page);
        // Ensure storage state is used
        await context.addInitScript(() => {
            localStorage.setItem('storageState', './storageState.json');
        });
        await page.goto('/');
        await use(garagePage);
        await page.close();
    }
});

export {
    expect
};