# Art Gallery E-commerce - Cypress Test Suite

This repository contains the end-to-end testing suite for the Art Gallery e-commerce application using Cypress.

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Art Gallery application running locally on port 3000

## Installation

1. Clone the repository:
```bash
git clone https://github.com/0xNmarioni/art-gallery-skill-test-cypress.git
cd art-gallery-skill-test-cypress
```

2. Install dependencies:
```bash
npm install # or yarn install if the npm throws an error with the dependency snort-log 
```

## Running Tests

### Open Cypress UI (Chrome Browser)
```bash
npm run cypress:open
```
This will open the Cypress Test Runner where you can select and run individual tests.

### Run All Tests Headlessly
```bash
npm run cypress:run
```

### Run Specific Test File
```bash
npx cypress run --spec "cypress/e2e/product-filters.spec.cy.js"
```

### Run Tests with HTML Report Generation
```bash
# Clean previous reports and run tests
npm run cypress:clean && npm run cypress:report
```

## Test Reports

After running tests with the reporting option, you can find the HTML reports in:
```
cypress/reports/html/index.html
```

The report includes:
- Test results summary
- Failed test screenshots
- Test execution time
- Detailed error messages

## Test Structure

```
cypress/
├── e2e/                    # Test files
│   ├── login-negative.spec.cy.js
│   └── product-filters.spec.cy.js
├── pages/                  # Page Object Models
│   └── ArtWaves/
│       ├── BasePage.js
│       ├── HeaderPage.js
│       ├── LoginPage.js
│       └── Product-listingPage.js
├── support/                # Support files
│   ├── commands.js        # Custom commands
│   └── e2e.js            # Global configuration
└── fixtures/              # Test data
```

## Available Scripts

- `cypress:open`: Opens Cypress Test Runner
- `cypress:run`: Runs tests headlessly
- `cypress:report`: Runs tests with HTML report generation
- `cypress:clean`: Cleans previous reports


## Notes

- Make sure the Art Gallery application is running on `http://localhost:3000` before running tests ( more info in the README.md of the Art Gallery repository)
- Screenshots of failed tests are automatically saved in `cypress/screenshots`
- Videos of test runs are saved in `cypress/videos` (when enabled)