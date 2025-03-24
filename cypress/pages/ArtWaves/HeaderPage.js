import BasePage from './BasePage';

class HeaderPage extends BasePage {
    static SELECTORS = {
        NAV_LOGO: 'div.nav-logo-home-button',
        SEARCH_BAR: 'input.search-bar',
        EXPLORE_LINK: 'div.nav-link-container > a:nth-of-type(1)',
        LOGIN_LINK: 'a:nth-of-type(2)',
        FAVORITE_BUTTON: 'a:nth-of-type(3) > svg',
        CART_BUTTON: 'a:nth-of-type(4) > svg'
    }

    elements = {
        navLogo: () => cy.get(HeaderPage.SELECTORS.NAV_LOGO),
        searchBar: () => cy.get(HeaderPage.SELECTORS.SEARCH_BAR),
        exploreLink: () => cy.get(HeaderPage.SELECTORS.EXPLORE_LINK),
        loginLink: () => cy.get(HeaderPage.SELECTORS.LOGIN_LINK),
        favoriteButton: () => cy.get(HeaderPage.SELECTORS.FAVORITE_BUTTON),
        cartButton: () => cy.get(HeaderPage.SELECTORS.CART_BUTTON)
    }

    /**
     * Search for a product
     * @param {string} productName 
     * @returns {Cypress.Chainable}
     */
    searchForProduct(productName) {
        return this.typeText(this.elements.searchBar(), productName)
            .type('{enter}');
    }

    /**
     * Navigate to explore page
     * @returns {Cypress.Chainable}
     */
    navigateToExplore() {
        return this.clickElement(this.elements.exploreLink());
    }

    /**
     * Navigate to login page
     * @returns {Cypress.Chainable}
     */
    navigateToLogin() {
        return this.clickElement(this.elements.loginLink());
    }

    /**
     * Navigate to favorites
     * @returns {Cypress.Chainable}
     */
    navigateToFavorites() {
        return this.clickElement(this.elements.favoriteButton());
    }

    /**
     * Navigate to cart
     * @returns {Cypress.Chainable}
     */
    navigateToCart() {
        return this.clickElement(this.elements.cartButton());
    }

    /**
     * Navigate to home
     * @returns {Cypress.Chainable}
     */
    navigateToHome() {
        return this.clickElement(this.elements.navLogo());
    }
}

export default new HeaderPage();
    
    