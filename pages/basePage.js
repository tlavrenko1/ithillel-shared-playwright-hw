
export class BasePage {
    constructor(page) {
        this.page = page;
    }
    locators = {
        signOutBtn: '.btn.btn-link.text-danger.btn-sidebar.sidebar_btn',
    }

    async textInput(locator, input) {
        await this.page.locator(locator).fill(input);
    }
    async click(locator) {
        await this.page.locator(locator).click();
    }

    async logOut() {
        await this.click(this.locators.signOutBtn);
    }

    getRandomCar(carData) {
        const randomNumber = Math.floor(Math.random() * 1001);
        var featured = carData["featured"];
        const randomBrand = featured[randomNumber % featured.length];

        const randomNumberModel = Math.floor(Math.random() * 1001);
        const randomModel = randomBrand.model[randomNumberModel % randomBrand.model.length];

        return {
            brand: randomBrand.brand,
            model: randomModel
        };
    }
}
export const basePage = new BasePage();