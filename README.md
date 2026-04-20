# DemoBlaze Automation 🎭

Playwright automation suite for the [DemoBlaze](https://www.demoblaze.com) e-commerce demo application.

---

## 🤖 AI Usage Disclosure

This project was developed with the assistance of **Claude (Anthropic)** as an AI tool. AI was primarily used for:

- **Typing speed** — generating boilerplate code and repetitive structures faster
- **Error solving** — debugging test failures and configuration issues
- **Prior knowledge base** — validating best practices for Playwright and Page Object Model patterns

All test logic, decisions, and validations were reviewed and validated manually against the live application.

---

## 📁 Project Structure

```
demoblaze-automation/
├── tests/
│   ├── category-filter.spec.js     → TC-001: Filter products by category (parameterized)
│   ├── add-to-cart.spec.js         → TC-002: Add product to cart
│   └── purchase.spec.js            → TC-003: Complete purchase flow (E2E)
├── pages/
│   ├── HomePages.js                → Home page locators and actions
│   ├── ProductPage.js              → Product detail page actions
│   └── CartPage.js                 → Cart and checkout actions
├── data/
│   └── categoryData.js             → Test data for category filter tests
├── fixtures.js                     → Custom Playwright fixtures (Page Objects)
├── playwright.config.js            → Playwright configuration
├── package.json                    → Project dependencies
└── README.md                       → This file
```

---

## ⚙️ Setup

### Prerequisites

- [Node.js](https://nodejs.org) v18 or higher
- [Git](https://git-scm.com/downloads/win) — includes Git Bash, required on Windows

### Installation

```bash
# Clone the repository
git clone https://github.com/Facundo238/demoblaze-automation.git
cd demoblaze-automation

# Install dependencies
npm install

# Install Playwright browsers
npx playwright install chromium
```

---

## 🚀 Running the Tests

```bash
# Run all tests
npx playwright test

# Run all tests with browser visible
npx playwright test --headed

# Run a specific test file
npx playwright test tests/category-filter.spec.js --headed

# Run tests by tag
npx playwright test --grep @e2e
npx playwright test --grep @catalog
npx playwright test --grep @cart
npx playwright test --grep @purchase

# View the HTML report after running
npx playwright show-report
```

---

## 🧪 Test Cases

### TC-001 — Filter Products by Category
**File:** `tests/category-filter.spec.js`
**Tags:** `@catalog`

> **Note:** Category filter automation is not typically prioritized in real projects because it can be difficult to validate correctly — the catalog may change, products may span multiple pages, and the filter logic is usually simple. This type of test is recommended only for critical filters with complex business logic. In this case, it was automated to demonstrate data-driven testing with multiple datasets and iteration across different filter scenarios.

This test is **parameterized** — it runs once per category using data from `data/categoryData.js`:

- Phones → validates only phone products are shown
- Laptops → validates only laptop products are shown
- Monitors → validates only monitor products are shown

**Validations:**
- At least one product is shown after applying the filter
- Every displayed product belongs to the selected category
- No products from other categories appear in the results

---

### TC-002 — Add Product to Cart
**File:** `tests/add-to-cart.spec.js`
**Tags:** `@cart`

Verifies that a product can be added to the shopping cart and appears correctly.

**Validations:**
- Confirmation dialog appears after clicking Add to cart
- Cart has at least one item after adding

---

### TC-003 — Complete Purchase Flow
**File:** `tests/purchase.spec.js`
**Tags:** `@e2e` `@purchase`

End-to-end test that verifies the complete checkout process from adding a product to confirming the purchase. This is the most critical test as it covers the core business flow.

**Validations:**
- Cart has at least one item before proceeding to checkout
- Order form can be filled with valid data
- Purchase confirmation message appears after submitting

> **Note:** This test includes a setup step that adds a product to the cart before running the checkout flow, since an empty cart cannot proceed to purchase.

---

### Custom Fixtures

Page Objects are injected into tests via **Playwright fixtures** defined in `fixtures.js`. Each test only requests the fixtures it needs:

```javascript
// Only needs homePage
test('TC-001', async ({ homePage }) => { ... });

// Needs all three
test('TC-003', async ({ page, homePage, productPage, cartPage }) => { ... });
```

### Test Data Separation

Test data is stored separately in the `data/` folder, following the principle of separating data from logic:

```javascript
// data/categoryData.js
const categoryData = [
  { category: 'Phones', expectedProducts: [...] },
  { category: 'Laptops', expectedProducts: [...] },
  { category: 'Monitors', expectedProducts: [...] },
];
```

This makes the tests more maintainable — if the catalog changes, only the data file needs to be updated.

### Test Tags

Tests are tagged to allow selective execution:

| Tag | Description | Tests |
|---|---|---|
| `@catalog` | Catalog and filter tests | TC-001 |
| `@cart` | Shopping cart tests | TC-002 |
| `@purchase` | Purchase flow tests | TC-003 |
| `@e2e` | End-to-end tests | TC-003 |
