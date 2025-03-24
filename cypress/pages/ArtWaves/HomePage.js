import BasePage from './BasePage';
import HeaderPage from './HeaderPage';

class HomePage extends BasePage {
    static SELECTORS = {
        SHOP_NOW_BUTTON: 'div.home-page button',
        FEATURED_PRODUCTS: '.featured-products-container',
        HERO_SECTION: '.hero-section',
        CATEGORIES_SECTION: '.categories-section'
    }

    constructor() {
        super();
        this.header = HeaderPage;
    }

    elements = {
        shopNowButton: () => cy.get(HomePage.SELECTORS.SHOP_NOW_BUTTON),
        featuredProducts: () => cy.get(HomePage.SELECTORS.FEATURED_PRODUCTS),
        heroSection: () => cy.get(HomePage.SELECTORS.HERO_SECTION),
        categoriesSection: () => cy.get(HomePage.SELECTORS.CATEGORIES_SECTION)
    }

    /**
     * Navigate to product listing via Shop Now button
     * @returns {Cypress.Chainable}
     */
    navigateToProductListing() {
        return this.clickElement(this.elements.shopNowButton());
    }

    /**
     * Verify home page is loaded
     * @returns {Cypress.Chainable}
     */
    verifyHomePageLoaded() {
        return this.elements.heroSection()
            .should('be.visible')
            .and('exist');
    }
}

export default new HomePage();

