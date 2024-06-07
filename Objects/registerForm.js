import {
    BasePage
} from "./basePage";
export default class RegisterForm extends BasePage {
    constructor(name, email, password) {
        this.name = name
        this.lastName = lastName
        this.email = email
        this.password = password
    }
    locators = {
        name: '#signupName',
        lastName: '#signupLastName',
        email: '#signupEmail',
        password: '#signupPassword',
        passwordConfirmation: '#signupPassword',
        registerBtn: `#button[class='btn btn-primary']`
    }

    async register(name, lastName, email, password) {
        await this.textInput(this.locators.name, name);
        await this.textInput(this.locators.lastName, lastName);
        await this.textInput(this.locators.email, email);
        await this.textInput(this.locators.password, password);
        await this.textInput(this.locators.passwordConfirmation, password);
        await this.textInput(this.locators.registerBtn, password);
    }
}

const registerForm = new RegisterForm();