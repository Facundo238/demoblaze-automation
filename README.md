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
│   ├── category-filter.spec.js     → TC-001: Filter products by category
│   ├── add-to-cart.spec.js         → TC-002: Add product to cart
│   └── purchase.spec.js            → TC-003: Complete purchase flow
├── pages/
│   ├── HomePages.js                → Home page locators and actions
│   ├── ProductPage.js              → Product detail page actions
│   └── CartPage.js                 → Cart and checkout actions
├── fixtures.js                     → Custom Playwright fixtures (Page Objects)
├── playwright.config.js            → Playwright configuration
├── package.json                    → Project dependencies
└── README.md                       → This file
```

---

## ⚙️ Setup

### Prerequisites

- [Node.js](https://nodejs.org) v18 or higher
- [Git](https://git-scm.com/downloads/win) (required for Claude Code on Windows)

### Installation

```bash
# Clone the repository
git clone <repository-url>
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

# Run tests in UI mode (recommended for debugging)
npx playwright test --ui

# View the HTML report after running
npx playwright show-report
```

---

## 🧪 Test Cases

### TC-001 — Filter Products by Category
**File:** `tests/category-filter.spec.js`

Verifies that when a category filter is applied (Phones), only products belonging to that category are displayed in the catalog.

**Validations:**
- At least one product is shown after applying the filter
- Every displayed product belongs to the selected category
- No products from other categories appear in the results

---

### TC-002 — Add Product to Cart
**File:** `tests/add-to-cart.spec.js`

Verifies that a product can be added to the shopping cart and appears correctly.

**Validations:**
- Confirmation dialog appears after clicking Add to cart
- Product appears in the cart after adding
- Cart has at least one item

---

### TC-003 — Complete Purchase Flow
**File:** `tests/purchase.spec.js`

End-to-end test that verifies the complete checkout process from adding a product to confirming the purchase.

**Validations:**
- Cart has at least one item before proceeding to checkout
- Order form can be filled with valid data
- Purchase confirmation message appears after submitting

**Note:** This test includes a setup step that adds a product to the cart before running the checkout flow, since an empty cart cannot proceed to purchase.

---

### Custom Fixtures

Page Objects are injected into tests via **Playwright fixtures** defined in `fixtures.js`. Each test only requests the fixtures it needs:

```javascript
// Only needs homePage
test('TC-001', async ({ homePage }) => { ... });

// Needs all three
test('TC-003', async ({ page, homePage, productPage, cartPage }) => { ... });
```

