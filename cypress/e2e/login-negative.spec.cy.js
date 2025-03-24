import LoginPage from '../pages/ArtWaves/loginPage';
import HeaderPage from '../pages/ArtWaves/HeaderPage';

describe('Login - Negative Cases', () => {
    beforeEach(() => {
        cy.visit('/login');
    });

        it('should show error for non-registered email', () => {
            LoginPage.login('nonexistent@test.com', 'password123')
                .then(() => {
                    cy.get('.error')
                        .should('be.visible')
                        .and('contain', 'The email you entered is not Registered');
                });
        });

        it('should show error for incorrect password', () => {
            LoginPage.login('aniketsaini65@gmail.com', 'wrongpassword')
                .then(() => {
                    cy.get('.error')
                        .should('contain', 'The credentials you entered are invalid. Unauthorized access error.');
                });
        });
    });


    

        
