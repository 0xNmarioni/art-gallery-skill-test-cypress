import BasePage from './BasePage';
import HeaderPage from './HeaderPage';

class ProductDetailsPage extends BasePage {
    static SELECTORS = {
        PRODUCT: {
            TITLE: '.product-title',
            PRICE: '.product-price',
            DESCRIPTION: '.product-description',
            MAIN_IMAGE: '.product-main-image',
            THUMBNAIL_IMAGES: '.product-thumbnail-images img',
            ADD_TO_CART: '.add-to-cart-button',
            QUANTITY: {
                INCREMENT: '.quantity-increment',
                DECREMENT: '.quantity-decrement',
                INPUT: '.quantity-input'
            },
            FAVORITE: '.favorite-button',
            CATEGORY: '.product-category',
            RATING: '.product-rating',
            REVIEWS: '.product-reviews'
        }
    }

    constructor() {
        super();
        this.header = HeaderPage;
    }

    elements = {
        productTitle: () => cy.get(ProductDetailsPage.SELECTORS.PRODUCT.TITLE),
        productPrice: () => cy.get(ProductDetailsPage.SELECTORS.PRODUCT.PRICE),
        productDescription: () => cy.get(ProductDetailsPage.SELECTORS.PRODUCT.DESCRIPTION),
        mainImage: () => cy.get(ProductDetailsPage.SELECTORS.PRODUCT.MAIN_IMAGE),
        thumbnailImages: () => cy.get(ProductDetailsPage.SELECTORS.PRODUCT.THUMBNAIL_IMAGES),
        addToCartButton: () => cy.get(ProductDetailsPage.SELECTORS.PRODUCT.ADD_TO_CART),
        quantityIncrement: () => cy.get(ProductDetailsPage.SELECTORS.PRODUCT.QUANTITY.INCREMENT),
        quantityDecrement: () => cy.get(ProductDetailsPage.SELECTORS.PRODUCT.QUANTITY.DECREMENT),
        quantityInput: () => cy.get(ProductDetailsPage.SELECTORS.PRODUCT.QUANTITY.INPUT),
        favoriteButton: () => cy.get(ProductDetailsPage.SELECTORS.PRODUCT.FAVORITE),
        category: () => cy.get(ProductDetailsPage.SELECTORS.PRODUCT.CATEGORY),
        rating: () => cy.get(ProductDetailsPage.SELECTORS.PRODUCT.RATING),
        reviews: () => cy.get(ProductDetailsPage.SELECTORS.PRODUCT.REVIEWS)
    }

    /**
     * Add product to cart with specified quantity
     * @param {number} quantity - Quantity to add
     * @returns {Cypress.Chainable}
     */
    addToCart(quantity = 1) {
        if (quantity > 1) {
            this.setQuantity(quantity);
        }
        return this.clickElement(this.elements.addToCartButton());
    }

    /**
     * Set product quantity
     * @param {number} quantity - Desired quantity
     * @returns {Cypress.Chainable}
     */
    setQuantity(quantity) {
        return this.typeText(this.elements.quantityInput(), quantity.toString());
    }

    /**
     * Toggle favorite status
     * @returns {Cypress.Chainable}
     */
    toggleFavorite() {
        return this.clickElement(this.elements.favoriteButton());
    }

    /**
     * Select thumbnail image
     * @param {number} index - Index of thumbnail to select
     * @returns {Cypress.Chainable}
     */
    selectThumbnail(index) {
        return this.elements.thumbnailImages()
            .eq(index)
            .should('be.visible')
            .click();
    }

    /**
     * Get product details
     * @returns {Object} Product details
     */
    getProductDetails() {
        return {
            title: () => this.elements.productTitle(),
            price: () => this.elements.productPrice(),
            description: () => this.elements.productDescription(),
            category: () => this.elements.category(),
            rating: () => this.elements.rating()
        };
    }

    /**
     * Verify product details page is loaded
     * @returns {Cypress.Chainable}
     */
    verifyProductPageLoaded() {
        return this.elements.productTitle()
            .should('be.visible')
            .and('exist');
    }
}

export default new ProductDetailsPage();