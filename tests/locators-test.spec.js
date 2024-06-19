import {
    test,
    expect
} from '@playwright/test';
import {
    RegisterFormSteps
} from '../steps/registerFormSteps';



test.describe('New user registration', () => {
    let registerFormSteps;
    let page;
    test.beforeAll(async ({
        browser
    }) => {
        const context = await browser.newContext({
            viewport: {
                width: 1920,
                height: 1080
            },
        });
        page = await context.newPage();
        registerFormSteps = new RegisterFormSteps(page);
    });
    test.beforeEach(async ({
        page
    }) => {
        
        await registerFormSteps.openMainPage();
    });

    test.afterAll(async () => {
        //await page.close();
       // await browser.close();
    });


    test('should register a new user', async ({
        page
    }) => {
        await registerFormSteps.sucessfulRegistration();
    });

    test('Try to create a user with empty name', async ({
        page
    }) => {
        await registerFormSteps.createUserWithEmptyName();
    });

    test('Try to create a user with less that 2 chacter in name', async ({
        page
    }) => {
        await registerFormSteps.createUserWithLessThan2CharactersName();
    });

    test('Try to create a user with empty last name', async ({
        page
    }) => {
        await registerFormSteps.createUserWithEmptyLastName();
    });

    test('Try to create a user with less that 2 chacters in last name', async ({
        page
    }) => {
        await registerFormSteps.createUserWithLessThat2ChactersInLastName();
    });


    test('Try to create a user with invalid email', async ({
        page
    }) => {
        await registerFormSteps.createUserWithInvalidEmail();
    });

    test('Try to create a user with empty email', async ({
        page
    }) => {
        await registerFormSteps.createUserWithEmptyEmail();
    })

    test('Try to create a user with empty password', async ({
        page
    }) => {
        await registerFormSteps.createUserWithEmptyPassword();
    })

    test('Try to create a user with invalid password', async ({
        page
    }) => {
        await registerFormSteps.createUserWithInvalidPassword();
    })

    test('Try to create a user with empty confirmation password', async ({
        page
    }) => {
        await registerFormSteps.createUserWithEmptyConfirmationPassword();
    })

    test('Try to create a user with invalid confirmation password', async ({
        page
    }) => {
        await registerFormSteps.createUserWithInvalidConfirmationPassword();
    })
})