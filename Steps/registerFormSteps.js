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
} from '../objects/registerForm';
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
        await this.page.goto('/');
    }

    async sucessfulRegistration() {
        let randomEmail = EmailHelper.generateUniqueEmail();
        let password = UniquePass.generatePassword();
        await this.registerForm.click(this.registerForm.locators.signUpBtn);
        await this.registerForm.register(user.name, user.lastName, randomEmail, password, password);
        await this.registerForm.click(this.registerForm.locators.registerBtn);
        await expect(this.page).toHaveURL('/panel/garage');
        await this.basePage.logOut();
    };

    async createUserWithEmptyName() {
        let randomEmail = EmailHelper.generateUniqueEmail();
        let password = UniquePass.generatePassword();
        await this.registerForm.click(this.registerForm.locators.signUpBtn);
        await this.registerForm.register('', user.lastName, randomEmail, password, password);
        await expect(this.page.locator(this.registerForm.locators.registerBtn)).toBeDisabled();
        await expect(this.page.locator(this.registerForm.locators.missedDataInField)).toBeVisible();
        await expect(this.page.locator(this.registerForm.locators.missedDataInField)).toHaveText('Name required');
    }

    async createUserWithLessThan2CharactersName() {
        let randomEmail = EmailHelper.generateUniqueEmail();
        let password = UniquePass.generatePassword();
        await this.registerForm.click(this.registerForm.locators.signUpBtn);
        await this.registerForm.register('T', user.lastName, randomEmail, password, password);
        await expect(this.page.locator(this.registerForm.locators.registerBtn)).toBeDisabled();
        await expect(this.page.locator(this.registerForm.locators.errorInputBorder)).toHaveCSS('border-color', 'rgb(220, 53, 69)');
        await expect(this.page.locator(this.registerForm.locators.missedDataInField)).toBeVisible();
        await expect(this.page.locator(this.registerForm.locators.missedDataInField)).toHaveText('Name has to be from 2 to 20 characters long');
    }

    async createUserWithEmptyLastName() {
        let randomEmail = EmailHelper.generateUniqueEmail();
        let password = UniquePass.generatePassword();
        await this.registerForm.click(this.registerForm.locators.signUpBtn);
        await this.registerForm.register(user.name, '', randomEmail, password, password);
        await expect(this.page.locator(this.registerForm.locators.registerBtn)).toBeDisabled();
        await expect(this.page.locator(this.registerForm.locators.errorInputBorder)).toHaveCSS('border-color', 'rgb(220, 53, 69)');
        await expect(this.page.locator(this.registerForm.locators.missedDataInField)).toBeVisible();
        await expect(this.page.locator(this.registerForm.locators.missedDataInField)).toHaveText('Last name required');
    }

    async createUserWithLessThat2ChactersInLastName() {
        let randomEmail = EmailHelper.generateUniqueEmail();
        let password = UniquePass.generatePassword();
        await this.registerForm.click(this.registerForm.locators.signUpBtn);
        await this.registerForm.register(user.name, 'T', randomEmail, password, password);
        await expect(this.page.locator(this.registerForm.locators.registerBtn)).toBeDisabled();
        await expect(this.page.locator(this.registerForm.locators.errorInputBorder)).toHaveCSS('border-color', 'rgb(220, 53, 69)');
        await expect(this.page.locator(this.registerForm.locators.missedDataInField)).toBeVisible();
        await expect(this.page.locator(this.registerForm.locators.missedDataInField)).toHaveText('Last name has to be from 2 to 20 characters long');
    }

    async createUserWithInvalidEmail() {
        let randomEmail = EmailHelper.generateUniqueEmail();
        let password = UniquePass.generatePassword();
        let invalidEmail = randomEmail.replace('@', '');
        await this.registerForm.click(this.registerForm.locators.signUpBtn);
        await this.registerForm.register(user.name, user.lastName, invalidEmail, password, password);
        await expect(this.page.locator(this.registerForm.locators.registerBtn)).toBeDisabled();
        await expect(this.page.locator(this.registerForm.locators.errorInputBorder)).toHaveCSS('border-color', 'rgb(220, 53, 69)');
        await expect(this.page.locator(this.registerForm.locators.missedDataInField)).toBeVisible();
        await expect(this.page.locator(this.registerForm.locators.missedDataInField)).toHaveText('Email is incorrect');
    }

    async createUserWithEmptyEmail() {
        let password = UniquePass.generatePassword();
        await this.registerForm.click(this.registerForm.locators.signUpBtn);
        await this.registerForm.register(user.name, user.lastName, '', password, password);
        await expect(this.page.locator(this.registerForm.locators.registerBtn)).toBeDisabled();
        await expect(this.page.locator(this.registerForm.locators.errorInputBorder)).toHaveCSS('border-color', 'rgb(220, 53, 69)');
        await expect(this.page.locator(this.registerForm.locators.missedDataInField)).toBeVisible();
        await expect(this.page.locator(this.registerForm.locators.missedDataInField)).toHaveText('Email required');
    }

    async createUserWithEmptyPassword() {
        let randomEmail = EmailHelper.generateUniqueEmail();
        let password = UniquePass.generatePassword();
        await this.registerForm.click(this.registerForm.locators.signUpBtn);
        await this.registerForm.register(user.name, user.lastName, randomEmail, '', password);
        await expect(this.page.locator(this.registerForm.locators.registerBtn)).toBeDisabled();
        await expect(this.page.locator(this.registerForm.locators.errorInputBorder)).toHaveCSS('border-color', 'rgb(220, 53, 69)');
        await expect(this.page.locator(this.registerForm.locators.missedDataInField)).toBeVisible();
        await expect(this.page.locator(this.registerForm.locators.missedDataInField)).toHaveText('Password required');
    }

    async createUserWithInvalidPassword() {
        let randomEmail = EmailHelper.generateUniqueEmail();
        let password = UniquePass.generatePassword();
        let incorrectPass = password.slice(0, 5);
        await this.registerForm.click(this.registerForm.locators.signUpBtn);
        await this.registerForm.register(user.name, user.lastName, randomEmail, incorrectPass, password);
        await expect(this.page.locator(this.registerForm.locators.registerBtn)).toBeDisabled();
        await expect(this.page.locator(this.registerForm.locators.errorInputBorder)).toHaveCSS('border-color', 'rgb(220, 53, 69)');
        await expect(this.page.locator(this.registerForm.locators.missedDataInField)).toBeVisible();
        await expect(this.page.locator(this.registerForm.locators.missedDataInField)).toHaveText('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter');
    }

    async createUserWithEmptyConfirmationPassword() {
        let randomEmail = EmailHelper.generateUniqueEmail();
        let password = UniquePass.generatePassword();
        await this.registerForm.click(this.registerForm.locators.signUpBtn);
        await this.registerForm.register(user.name, user.lastName, randomEmail, password, '');
        await this.registerForm.click(this.registerForm.locators.passwordConfirmation);
        await this.registerForm.click(this.registerForm.locators.password);
        await expect(this.page.locator(this.registerForm.locators.registerBtn)).toBeDisabled();
        await expect(this.page.locator(this.registerForm.locators.errorInputBorder)).toHaveCSS('border-color', 'rgb(220, 53, 69)');
        await expect(this.page.locator(this.registerForm.locators.missedDataInField)).toBeVisible();
        await expect(this.page.locator(this.registerForm.locators.missedDataInField)).toHaveText('Re-enter password required');
    }

    async createUserWithInvalidConfirmationPassword() {
        let randomEmail = EmailHelper.generateUniqueEmail();
        let password = UniquePass.generatePassword();
        let incorrectPass = password.slice(0, 5);
        await this.registerForm.click(this.registerForm.locators.signUpBtn);
        await this.registerForm.register(user.name, user.lastName, randomEmail, password, incorrectPass);
        await this.registerForm.click(this.registerForm.locators.password);
        await expect(this.page.locator(this.registerForm.locators.registerBtn)).toBeDisabled();
        await expect(this.page.locator(this.registerForm.locators.errorInputBorder)).toHaveCSS('border-color', 'rgb(220, 53, 69)');
        await expect(this.page.locator(this.registerForm.locators.missedDataInField)).toBeVisible();
        await expect(this.page.locator(this.registerForm.locators.missedDataInField)).toHaveText('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter');
    }
}