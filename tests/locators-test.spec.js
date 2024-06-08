import {
    test,
    expect
} from '@playwright/test';
import {
    RegisterForm
} from '../objects/registerForm';
import {
    user
} from '../fixtures/user';
import {
    EmailHelper
} from '../helpers/emailHelper';
import {
    UniquePass
} from '../helpers/uniquePass';


test.describe('New user registration', () => {
    let randomEmail = EmailHelper.generateUniqueEmail();
    let password = UniquePass.generatePassword();

    test.beforeEach(async ({
        page
    }) => {
        await page.goto('/');
    });

    test('should register a new user', async ({
        page
    }) => {
        const registerForm = new RegisterForm(page);
        await registerForm.click(registerForm.locators.signUpBtn);
        await registerForm.register(user.name, user.lastName, randomEmail, user.password);
        await registerForm.click(registerForm.locators.registerBtn);
        await expect(page).toHaveURL('/panel/garage');
    });

    test('Try to create a user with empty name', async ({
        page
    }) => {
        const registerForm = new RegisterForm(page);
        await registerForm.click(registerForm.locators.signUpBtn);
        await registerForm.register('', user.lastName, randomEmail, user.password);
        await expect(page.locator(registerForm.locators.registerBtn)).toBeDisabled();
        await expect(page.locator(registerForm.locators.missedDataInField)).toBeVisible();
        await expect(page.locator(registerForm.locators.missedDataInField)).toHaveText('Name required');
    });

    test('Try to create a user with less that 2 chacter in name', async ({
        page
    }) => {
        const registerForm = new RegisterForm(page);
        await registerForm.click(registerForm.locators.signUpBtn);
        await registerForm.register('T', user.lastName, randomEmail, user.password);
        await expect(page.locator(registerForm.locators.registerBtn)).toBeDisabled();
        await expect(page.locator(registerForm.locators.errorInputBorder)).toHaveCSS('border-color', 'rgb(220, 53, 69)');
        await expect(page.locator(registerForm.locators.missedDataInField)).toBeVisible();
        await expect(page.locator(registerForm.locators.missedDataInField)).toHaveText('Name has to be from 2 to 20 characters long');
    });

    test('Try to create a user with empty last name', async ({
        page
    }) => {
        const registerForm = new RegisterForm(page);
        await registerForm.click(registerForm.locators.signUpBtn);
        await registerForm.register(user.name, '', randomEmail, user.password);
        await expect(page.locator(registerForm.locators.registerBtn)).toBeDisabled();
        await expect(page.locator(registerForm.locators.errorInputBorder)).toHaveCSS('border-color', 'rgb(220, 53, 69)');
        await expect(page.locator(registerForm.locators.missedDataInField)).toBeVisible();
        await expect(page.locator(registerForm.locators.missedDataInField)).toHaveText('Last name required');
    });

    test('Try to create a user with less that 2 chacters in last name', async ({
        page
    }) => {
        const registerForm = new RegisterForm(page);
        await registerForm.click(registerForm.locators.signUpBtn);
        await registerForm.register(user.name, 'T', randomEmail, user.password);
        await expect(page.locator(registerForm.locators.registerBtn)).toBeDisabled();
        await expect(page.locator(registerForm.locators.errorInputBorder)).toHaveCSS('border-color', 'rgb(220, 53, 69)');
        await expect(page.locator(registerForm.locators.missedDataInField)).toBeVisible();
        await expect(page.locator(registerForm.locators.missedDataInField)).toHaveText('Last name has to be from 2 to 20 characters long');
    });


    test('Try to create a user with invalid email', async ({
        page
    }) => {
        let invalidEmail = randomEmail.replace('@', '');
        const registerForm = new RegisterForm(page);
        await registerForm.click(registerForm.locators.signUpBtn);
        await registerForm.register(user.name, user.lastName, invalidEmail, user.password);
        await expect(page.locator(registerForm.locators.registerBtn)).toBeDisabled();
        await expect(page.locator(registerForm.locators.errorInputBorder)).toHaveCSS('border-color', 'rgb(220, 53, 69)');
        await expect(page.locator(registerForm.locators.missedDataInField)).toBeVisible();
        await expect(page.locator(registerForm.locators.missedDataInField)).toHaveText('Email is incorrect');
    });

    test('Try to create a user with empty email', async ({
        page
    }) => {
        const registerForm = new RegisterForm(page);
        await registerForm.click(registerForm.locators.signUpBtn);
        await registerForm.register(user.name, user.lastName, '', user.password);
        await expect(page.locator(registerForm.locators.registerBtn)).toBeDisabled();
        await expect(page.locator(registerForm.locators.errorInputBorder)).toHaveCSS('border-color', 'rgb(220, 53, 69)');
        await expect(page.locator(registerForm.locators.missedDataInField)).toBeVisible();
        await expect(page.locator(registerForm.locators.missedDataInField)).toHaveText('Email required');
    })

    test('Try to create a user with empty password', async ({
        page
    }) => {
        const registerForm = new RegisterForm(page);
        await registerForm.click(registerForm.locators.signUpBtn);
        await registerForm.register(user.name, user.lastName, randomEmail, '');
        await expect(page.locator(registerForm.locators.registerBtn)).toBeDisabled();
        await expect(page.locator(registerForm.locators.errorInputBorder)).toHaveCSS('border-color', 'rgb(220, 53, 69)');
        await expect(page.locator(registerForm.locators.missedDataInField)).toBeVisible();
        await expect(page.locator(registerForm.locators.missedDataInField)).toHaveText('Password required');
    })

    test('Try to create a user with invalid password', async ({
        page
    }) => {
        let incorrectPass = user.password.slice(0, 5);
        const registerForm = new RegisterForm(page);
        await registerForm.click(registerForm.locators.signUpBtn);
        await registerForm.register(user.name, user.lastName, randomEmail, incorrectPass);
        await expect(page.locator(registerForm.locators.registerBtn)).toBeDisabled();
        await expect(page.locator(registerForm.locators.errorInputBorder)).toHaveCSS('border-color', 'rgb(220, 53, 69)');
        await expect(page.locator(registerForm.locators.missedDataInField)).toBeVisible();
        await expect(page.locator(registerForm.locators.missedDataInField)).toHaveText('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter');
    })

    test('Try to create a user with empty confirmation password', async ({
        page
    }) => {
        const registerForm = new RegisterForm(page);
        await registerForm.click(registerForm.locators.signUpBtn);
        await registerForm.register(user.name, user.lastName, randomEmail, password, '');
        await registerForm.click(registerForm.locators.passwordConfirmation);
        await registerForm.click(registerForm.locators.password);
        await expect(page.locator(registerForm.locators.registerBtn)).toBeDisabled();
        await expect(page.locator(registerForm.locators.errorInputBorder)).toHaveCSS('border-color', 'rgb(220, 53, 69)');
        await expect(page.locator(registerForm.locators.missedDataInField)).toBeVisible();
        await expect(page.locator(registerForm.locators.missedDataInField)).toHaveText('Re-enter password required');
    })

    test('Try to create a user with invalid confirmation password', async ({
        page
    }) => {
        let incorrectPass = user.password.slice(0, 5);
        const registerForm = new RegisterForm(page);
        await registerForm.click(registerForm.locators.signUpBtn);
        await registerForm.register(user.name, user.lastName, randomEmail, password, incorrectPass);
        await registerForm.click(registerForm.locators.password);
        await expect(page.locator(registerForm.locators.registerBtn)).toBeDisabled();
        await expect(page.locator(registerForm.locators.errorInputBorder)).toHaveCSS('border-color', 'rgb(220, 53, 69)');
        await expect(page.locator(registerForm.locators.missedDataInField)).toBeVisible();
        await expect(page.locator(registerForm.locators.missedDataInField)).toHaveText('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter');
    })
})