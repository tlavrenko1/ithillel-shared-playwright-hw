import {
    test,
    expect,
    request
} from '@playwright/test';
import {
    RegisterFormSteps
} from '../Steps/registerFormSteps';
import {
    basePage
} from '../pages/basePage';
import {
    carData
} from '../fixtures/carData';
import {
    utils
} from '../Steps/api-utils';

const newData = {
    name: 'MyTest',
    lastName: 'IsWorking',
};


test.describe('New user registration', () => {

    let registerFormSteps;
    let page;
    let apiContext;
    let createdUser;
    const randomCar = basePage.getRandomCar(carData);
    let randomCarObj = {
        carBrandId: randomCar.brand,
        carModelId: randomCar.model,
        mileage: 100
    }
    let randomInvalidCar = {
        carModelId: randomCar.model,
        mileage: 100
    }

    let randomCarWithInvalidMileage = {
        carBrandId: randomCar.brand,
        carModelId: randomCar.model,
        mileage: -1
    }


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
        apiContext = await request.newContext();
        await registerFormSteps.openMainPage();
        createdUser = await registerFormSteps.sucessfulRegistration();

        const authResponse = await apiContext.post('/api/auth/signin', {
            data: {
                email: createdUser.email,
                password: createdUser.password
            }
        });
        expect(authResponse.ok()).toBeTruthy();
    });

    test('intercept profile request', async () => {
        await page.route('**/api/users/profile', async (route) => {
            const response = await route.fetch();
            const json = await response.json();

            json.data.name = newData.name;
            json.data.lastName = newData.lastName;
            await route.fulfill({
                response,
                json
            });
        });
        await page.locator('.btn.btn-white.btn-sidebar.sidebar_btn.-profile').click();
        await expect(page).toHaveURL('panel/profile');
        await expect(page.locator('.profile_name.display-4')).toHaveText(`${newData.name} ${newData.lastName}`);
    });
    test('create a new car via API', async () => {
        const response = await apiContext.post('/api/cars', {
            data: randomCarObj,
        });
        const responseBody = await response.json();
        expect(responseBody.data.mileage).toBe(randomCarObj.mileage);
        expect(response.ok()).toBeTruthy();
    })

    test('create a new car via API with missed car brand ID', async () => {
        const response = await apiContext.post('/api/cars', {
            data: randomInvalidCar,
        });
        utils.validateStatusCode(response, 400);
    })
    test('create a new car via API with invalid mileage', async () => {
        const response = await apiContext.post('/api/cars', {
            data: randomCarWithInvalidMileage,
        });
        utils.validateStatusCode(response, 400);
    })
});