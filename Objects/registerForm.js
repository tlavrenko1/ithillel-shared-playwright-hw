import {
    BasePage
} from "../pages/basePage.js";

export class RegisterForm extends BasePage {
    constructor(page) {
        super(page);
    }

    locators = {
        signUpBtn: '.hero-descriptor_btn.btn.btn-primary',
        name: '#signupName',
        lastName: '#signupLastName',
        email: '#signupEmail',
        password: '#signupPassword',
        passwordConfirmation: '#signupRepeatPassword',
        registerBtn: `button[class='btn btn-primary']`,
        missedDataInField:'.invalid-feedback > p',
        errorInputBorder:`.form-control.ng-invalid.is-invalid.ng-touched`
    };

    async register(name, lastName, email, password, passwordConfirmation) {
        await this.textInput(this.locators.name, name);
        await this.textInput(this.locators.lastName, lastName);
        await this.textInput(this.locators.email, email);
        await this.textInput(this.locators.password, password);
        await this.textInput(this.locators.passwordConfirmation, passwordConfirmation);
    }

}
