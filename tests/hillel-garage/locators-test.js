import {
    test,
    expect
} from '@playwright/test';
import {
    basePage
} from '../../pages/basePage';
import {
    registerForm
} from '../../Objects/registerForm';
import { user } from '../../fixtures/user';

test.describe('New user registration', () => {
    let randomEmail = basePage.generateUniqueEmail();
    test.beforeEach(async ({
        page
    }) => {
        await page.goto('/');
    });

    test('should register a new user', async ({
        page
    }) => {
        await registerForm.register(user.name, user.lastName, randomEmail, user.password);
    })
})