import BasePage from './BasePage';
import HeaderPage from './HeaderPage';

class ProductListingPage extends BasePage {
    constructor() {
        super();
        this.header = HeaderPage;
    }

    // Define selectors before using them
    static SELECTORS = {
        FILTERS: {
            CONTAINER: '.filters-container',
            RESET_BUTTON: '.reset-filters',
            PRICE: {
                CONTAINER: '.price-filters',
                BELOW_200: 'input[type="checkbox"][value="below200"]',
                RANGE_201_999: 'input[type="checkbox"][value="201-999"]',
                RANGE_1000_1999: 'input[type="checkbox"][value="1000-1999"]',
                ABOVE_2000: 'input[type="checkbox"][value="above2000"]'
            },
            RATING: {
                CONTAINER: '.rating-filters',
                MIN_RATING: 'input[type="range"]'
            },
            CATEGORY: {
                CONTAINER: '.category-filters',
                INPUT: '.category-search-input'
            }
        },
        SORT: {
            CONTAINER: '.sort-container',
            HIGH_TO_LOW: 'input[type="checkbox"][value="Price-high to low"]',
            LOW_TO_HIGH: 'input[type="checkbox"][value="Price-low to high"]'
        },
        PRODUCT: {
            CONTAINER: '.product-card',
            PRICE: '.discount-price',
            CATEGORY: '.product-card-details p:contains("Genre")',
            RATING: '.ratings',
            TITLE: 'h3',
            IMAGE: '.product-card-image img',
            CART_BUTTON: '.cart-btn'
        }
    };

    // Elements - using the static selectors
    elements = {
        // Filter elements
        filtersContainer: () => cy.get(this.constructor.SELECTORS.FILTERS.CONTAINER),
        filtersResetButton: () => cy.get(this.constructor.SELECTORS.FILTERS.RESET_BUTTON),
        minRatingFilter: () => cy.get(this.constructor.SELECTORS.FILTERS.RATING.MIN_RATING),
        
        // Price filter elements
        priceFilters: {
            below200: () => cy.get(this.constructor.SELECTORS.FILTERS.PRICE.BELOW_200),
            range201_999: () => cy.get(this.constructor.SELECTORS.FILTERS.PRICE.RANGE_201_999),
            range1000_1999: () => cy.get(this.constructor.SELECTORS.FILTERS.PRICE.RANGE_1000_1999),
            above2000: () => cy.get(this.constructor.SELECTORS.FILTERS.PRICE.ABOVE_2000)
        },

        // Category elements
        categoryContainer: () => cy.get(this.constructor.SELECTORS.FILTERS.CATEGORY.CONTAINER),
        categoryInput: () => cy.get(this.constructor.SELECTORS.FILTERS.CATEGORY.INPUT),

        // Product elements
        productContainer: () => cy.get(this.constructor.SELECTORS.PRODUCT.CONTAINER),
        productPrice: () => cy.get(this.constructor.SELECTORS.PRODUCT.PRICE),
        productCategory: () => cy.get(this.constructor.SELECTORS.PRODUCT.CATEGORY),
        productRating: () => cy.get(this.constructor.SELECTORS.PRODUCT.RATING)
    }

    /**
     * Gets a product card by its name
     * @param {string} productName - The name of the product to find
     * @returns {Cypress.Chainable}
     */
    getProductCardByName(productName) {
        return this.elements.productCards()
            .contains(this.constructor.SELECTORS.PRODUCT.TITLE, productName)
            .closest(this.constructor.SELECTORS.PRODUCT.CARD);
    }

    /**
     * Adds a product to the cart
     * @param {string} productName - The name of the product to add
     * @returns {Cypress.Chainable}
     */
    addToCart(productName) {
        return this.getProductCardByName(productName)
            .find(this.constructor.SELECTORS.PRODUCT.CART_BUTTON)
            .should('be.visible')
            .click();
    }

    /**
     * Gets product details
     * @param {string} productName - The name of the product
     * @returns {Object}
     */
    getProductDetails(productName) {
        const card = this.getProductCardByName(productName);
        return {
            title: () => card.find(this.constructor.SELECTORS.PRODUCT.TITLE),
            originalPrice: () => card.find(this.constructor.SELECTORS.PRODUCT.ORIGINAL_PRICE),
            discountedPrice: () => card.find(this.constructor.SELECTORS.PRODUCT.DISCOUNTED_PRICE),
            rating: () => card.find(this.constructor.SELECTORS.PRODUCT.RATING),
            image: () => card.find(this.constructor.SELECTORS.PRODUCT.IMAGE)
        };
    }

    /**
     * Filters products by category
     * @param {string} categoryName - The category to filter by
     * @returns {Cypress.Chainable}
     */
    filterByCategory(categoryName) {
        return this.elements.categoryInput()
            .should('be.visible')
            .type(categoryName)
            .type('{enter}');
    }

    /**
     * Filters products by price range
     * @param {string} range - The price range to filter by ('below200', '201-999', '1000-1999', 'above2000')
     * @returns {Cypress.Chainable}
     */
    filterByPrice(range) {
        const priceFilters = {
            'below200': () => this.elements.priceFilters.below200(),
            '201-999': () => this.elements.priceFilters.range201_999(),
            '1000-1999': () => this.elements.priceFilters.range1000_1999(),
            'above2000': () => this.elements.priceFilters.above2000()
        };

        if (!priceFilters[range]) {
            throw new Error(`Invalid price range: ${range}`);
        }

        return priceFilters[range]()
            .should('be.visible')
            .click();
    }

    /**
     * Sorts products by price
     * @param {string} order - The sort order ('highToLow' or 'lowToHigh')
     * @returns {Cypress.Chainable}
     */
    sortByPrice(order) {
        const selector = order === 'highToLow' ? 
            this.constructor.SELECTORS.SORT.HIGH_TO_LOW : 
            this.constructor.SELECTORS.SORT.LOW_TO_HIGH;
        
        return cy.get(selector)
            .should('be.visible')
            .click();
    }

    /**
     * Resets all filters
     * @returns {Cypress.Chainable}
     */
    resetFilters() {
        return this.elements.filtersResetButton()
            .should('be.visible')
            .click();
    }
}

export default new ProductListingPage();