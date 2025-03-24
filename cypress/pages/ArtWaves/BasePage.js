class BasePage {
    /**
     * Wait for element to be visible and clickable
     * @param {Cypress.Chainable} element 
     * @returns {Cypress.Chainable}
     */
    waitForClickable(element) {
        return element.should('be.visible').and('not.be.disabled');
    }

    /**
     * Click element with wait and verification
     * @param {Cypress.Chainable} element 
     * @returns {Cypress.Chainable}
     */
    clickElement(element) {
        return this.waitForClickable(element).click();
    }

    /**
     * Type text into element with wait
     * @param {Cypress.Chainable} element 
     * @param {string} text 
     * @returns {Cypress.Chainable}
     */
    typeText(element, text) {
        return element.should('be.visible').clear().type(text);
    }
}

export default BasePage; 