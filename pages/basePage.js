export default class BasePage {
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
}