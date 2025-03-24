import ProductListingPage from '../pages/ArtWaves/product-listingPage';

describe('Product Filtering and Sorting', () => {
    beforeEach(() => {
        cy.visit('/product-listing');
        // Wait for products to load
        cy.get('.product-card').should('be.visible');
    });

    describe('Price Filters', () => {
        it('should filter products below 200', () => {
            // Click the below $200 checkbox
            cy.get('#below-200').check({force: true});
            
            // Verify all visible products are below 200
            cy.get('.discount-price').each(($price) => {
                const price = parseFloat($price.text().replace('$', ''));
                expect(price).to.be.lessThan(200);
            });
        });

        it('should filter products between 201-999', () => {
            cy.get('#201-999').check({force: true});
            
            // Verify all visible products are within range
            cy.get('.discount-price').each(($price) => {
                const price = parseFloat($price.text().replace('$', ''));
                expect(price).to.be.within(201, 999);
            });
        });
    });

    describe('Rating Filters', () => {
        it('should filter products by minimum rating', () => {
            const minRating = 1.4;  // Set minimum rating threshold

            // Set the rating filter
            cy.get('.ratings-container input[type="range"]')
                .invoke('val', minRating)
                .trigger('change')
                .trigger('input');
            
            cy.wait(1000);
            
            // Verify all displayed products have ratings >= minimum rating
            cy.get('.ratings').each(($rating) => {
                const productRating = parseFloat($rating.text().split('(')[0].trim());
                expect(productRating).to.be.at.least(minRating, 
                    `Product rating ${productRating} should be >= minimum rating ${minRating}`);
            });
        });
    });

    describe('Category Filters', () => {
        it('should filter products by category', () => {
            cy.get('.category-container input[type="checkbox"]')
                .first()
                .check({force: true});
            
            cy.wait(1000);
            
            // Verify the category is applied
            cy.get('.product-card-details p').should('contain', 'Genre:');
        });
    });

    describe('Price Sorting', () => {
        it('should sort products from high to low price', () => {
            cy.get('#high-to-low').check({force: true});
            
            cy.wait(1000); // Wait for sorting
            
            cy.get('.discount-price').then($prices => {
                const prices = $prices.map((i, el) => parseFloat(el.innerText.replace('$', ''))).get();
                const sortedPrices = [...prices].sort((a, b) => b - a);
                expect(prices).to.deep.equal(sortedPrices);
            });
        });

        it('should sort products from low to high price', () => {
            cy.get('#low-to-high').check({force: true});
            
            cy.wait(1000);
            
            cy.get('.discount-price').then($prices => {
                const prices = $prices.map((i, el) => parseFloat(el.innerText.replace('$', ''))).get();
                const sortedPrices = [...prices].sort((a, b) => a - b);
                expect(prices).to.deep.equal(sortedPrices);
            });
        });
    });
}); 