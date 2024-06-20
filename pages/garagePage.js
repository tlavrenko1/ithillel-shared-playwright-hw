import BasePage from './basePage';

export default class GaragePage extends BasePage {
    constructor(page) {
        super(page);
        this.locators = {
            addCarButton: this.page.locator(`.btn.btn-primary`),
            addCarBrandDropDown: this.page.locator(`#addCarBrand`),
            addCarModelDropDown: this.page.locator(`#addCarModel`),
            addCarMileageInput: this.page.locator(`#addCarMileage`),
            saveCarButton: this.page.locator(`//button[normalize-space()='Add']`),
            addNewCarModal: this.page.locator(`.modal-header`),
        };
    }
}
