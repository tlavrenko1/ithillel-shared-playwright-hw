import {
    expect
} from '@playwright/test';
import {
    user
} from '../fixtures/user';
import {
    EmailHelper
} from '../helpers/emailHelper';
import {
    UniquePass
} from '../helpers/uniquePass';
import {
    RegisterForm
} from '../Objects/registerForm';
import {
    BasePage
} from '../pages/basePage';



export class RegisterFormSteps {

    constructor(page) {
        this.registerForm = new RegisterForm(page);
        this.basePage = new BasePage(page);
        this.page = page;
    }

    async openMainPage() {
        await this.page.goto('');
    } 

    async validateInputs(errorMessage) {
        await expect(this.page.locator(this.registerForm.locators.registerBtn)).toBeDisabled();
        await expect(this.page.locator(this.registerForm.locators.missedDataInField)).toBeVisible();
        await expect(this.page.locator(this.registerForm.locators.errorInputBorder)).toHaveCSS('border-color', 'rgb(220, 53, 69)');
        await expect(this.page.locator(this.registerForm.locators.missedDataInField)).toHaveText(errorMessage);
    }

    async registerUser(user) {

        await this.registerForm.click(this.registerForm.locators.signUpBtn);
        await this.registerForm.register(user.name, user.lastName, user.email, user.password, user.passwordConfirmation);
    }

    buildUser({
        name,
        lastName,
        email,
        password,
        passwordConfirmation
    } = {}) {
        password = this.getValueOrDefault(password, UniquePass.generatePassword());
        return {
            name: this.getValueOrDefault(name, user.name),
            lastName: this.getValueOrDefault(lastName, user.lastName),
            email: this.getValueOrDefault(email, EmailHelper.generateUniqueEmail()),
            password: password,
            passwordConfirmation: this.getValueOrDefault(passwordConfirmation, password)
        };
    }

    getValueOrDefault(value, defaultValue) {
        return (value === null || value === undefined) ? defaultValue : value;
    }

    async sucessfulRegistration() {
        let user = this.buildUser();
        await this.registerUser(user);
        await this.registerForm.click(this.registerForm.locators.registerBtn);
        await expect(this.page).toHaveURL('/panel/garage');
        return user;
    };

    async createUserWithEmptyName() {
        let user = this.buildUser({
            name: ''
        });
        await this.registerUser(user);
        await this.validateInputs('Name required');
    }

    async createUserWithLessThan2CharactersName() {
        let user = this.buildUser({
            name: 'T'
        });
        await this.registerUser(user);
        await this.validateInputs('Name has to be from 2 to 20 characters long');
    }

    async createUserWithEmptyLastName() {
        let user = this.buildUser({
            lastName: ''
        });
        await this.registerUser(user);
        await this.validateInputs('Last name required');
    }

    async createUserWithLessThat2ChactersInLastName() {
        let user = this.buildUser({
            lastName: 'T'
        });
        await this.registerUser(user);
        await this.validateInputs('Last name has to be from 2 to 20 characters long');
    }

    async createUserWithInvalidEmail() {
        let user = this.buildUser({
            email: "test.com"
        });
        await this.registerUser(user);
        await this.validateInputs('Email is incorrect');
    }

    async createUserWithEmptyEmail() {
        let user = this.buildUser({
            email: ""
        });
        await this.registerUser(user);
        await this.validateInputs('Email required');
    }

    async createUserWithEmptyPassword() {
        let user = this.buildUser({
            password: ""
        });
        await this.registerUser(user);
        await this.validateInputs('Password required');
    }

    async createUserWithInvalidPassword() {
        let user = this.buildUser({
            password: "12345"
        });
        await this.registerUser(user);
        await this.validateInputs('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter');
    }

    async createUserWithEmptyConfirmationPassword() {
        let user = this.buildUser({
            passwordConfirmation: ""
        });
        await this.registerUser(user);
        await this.registerForm.click(this.registerForm.locators.password);
        await this.validateInputs('Re-enter password required');
    }

    async createUserWithInvalidConfirmationPassword() {
        let user = this.buildUser({
            passwordConfirmation: "12345"
        });
        await this.registerUser(user);
        await this.registerForm.click(this.registerForm.locators.password);
        await this.validateInputs('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter');
    }
}