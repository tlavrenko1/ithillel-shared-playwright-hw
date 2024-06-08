export class BasePage {
    constructor(page) {
        this.page = page;
    }

    async textInput(locator, input) {
        await this.page.locator(locator).fill(input);
    }
    async click(locator) {
        await this.page.locator(locator).click();
    }
}