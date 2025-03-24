import BasePage from './BasePage';
import HeaderPage from './HeaderPage';

class LoginPage extends BasePage {
    static SELECTORS = {
        EMAIL: '#email',
        PASSWORD: '#password',
        LOGIN_BUTTON: 'div.login-btn-container > input',
        TEST_CREDS_BUTTON: 'div.login-container button',
        REMEMBER_ME: 'div.remember-me-container input',
        FORGOT_PASSWORD: 'a:contains("Forgot your password?")',
        CREATE_ACCOUNT: 'div.login-container a',
        SHOW_PASSWORD: 'button.show-password-button',
        ERROR_MESSAGE: '[data-test="error-message"]'
    }

    constructor() {
        super();
        this.header = HeaderPage;
    }

    elements = {
        emailInput: () => cy.get(LoginPage.SELECTORS.EMAIL),
        passwordInput: () => cy.get(LoginPage.SELECTORS.PASSWORD),
        loginButton: () => cy.get(LoginPage.SELECTORS.LOGIN_BUTTON),
        testCredsButton: () => cy.get(LoginPage.SELECTORS.TEST_CREDS_BUTTON),
        rememberMeCheckbox: () => cy.get(LoginPage.SELECTORS.REMEMBER_ME),
        forgotPasswordLink: () => cy.contains(LoginPage.SELECTORS.FORGOT_PASSWORD),
        createAccountLink: () => cy.get(LoginPage.SELECTORS.CREATE_ACCOUNT),
        showPasswordButton: () => cy.get(LoginPage.SELECTORS.SHOW_PASSWORD)
    }

    /**
     * Login with email and password
     * @param {string} email 
     * @param {string} password 
     * @returns {Cypress.Chainable}
     */
    login(email, password) {
        this.typeText(this.elements.emailInput(), email);
        this.typeText(this.elements.passwordInput(), password);
        return this.clickElement(this.elements.loginButton());
    }

    /**
     * Login with test credentials
     * @returns {Cypress.Chainable}
     */
    loginWithTestCredentials() {
        return this.clickElement(this.elements.testCredsButton());
    }

    /**
     * Toggle remember me checkbox
     * @returns {Cypress.Chainable}
     */
    toggleRememberMe() {
        return this.clickElement(this.elements.rememberMeCheckbox());
    }

    /**
     * Navigate to forgot password page
     * @returns {Cypress.Chainable}
     */
    navigateToForgotPassword() {
        return this.clickElement(this.elements.forgotPasswordLink());
    }

    /**
     * Navigate to create account page
     * @returns {Cypress.Chainable}
     */
    navigateToCreateAccount() {
        return this.clickElement(this.elements.createAccountLink());
    }

    /**
     * Toggle password visibility
     * @returns {Cypress.Chainable}
     */
    togglePasswordVisibility() {
        return this.clickElement(this.elements.showPasswordButton());
    }

    /**
     * Verify error message
     * @param {string} message 
     * @returns {Cypress.Chainable}
     */
    verifyErrorMessage(message) {
        return cy.get(LoginPage.SELECTORS.ERROR_MESSAGE)
            .should('be.visible')
            .and('contain', message);
    }
}

export default new LoginPage();