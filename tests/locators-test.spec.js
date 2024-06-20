// import {
//     test,
//     expect
// } from '@playwright/test';
import {
    test,
    expect
} from '../fixtures/userGaragePage';


test.describe('login', () => {

    test('add a car', async ({
        garagePage,
    }) => {
        let car = {
            brand: 'Audi',
            model: ['TT', 'R8', 'A8'],
            mileage: '100',
        };

        await garagePage.locators.addCarButton.click();
        await garagePage.locators.addCarMileageInput.fill(car.mileage);
        await garagePage.locators.saveCarButton.click();
        await expect(garagePage.locators.addNewCarModal).not.toBeVisible();

    });
});