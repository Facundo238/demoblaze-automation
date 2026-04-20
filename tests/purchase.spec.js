const { test } = require('../fixtures');
const { expect } = require('@playwright/test');

test.describe('Checkout - Complete Purchase Flow', () => {

  test('TC-003: Should complete a purchase with valid data',
  { tag: ['@e2e','@purchase'] },
  async ({ page, homePage, productPage, cartPage }) => {

    // ── SETUP: Add product to cart first ──────────────────
    // This test depends on having at least one item in the cart
    await homePage.goto();
    await homePage.clickFirstProduct();

    // Click Add to cart
    await productPage.addToCart();

    // ── TEST: Complete purchase flow ───────────────────────

    // Navigate to cart
    await cartPage.goto();

    // Verify cart has at least one item before proceeding
    const cartItems = await cartPage.getCartItemCount();
    expect(cartItems, 'Cart should have at least one item before checkout').toBeGreaterThan(0);

    // Click Place Order
    await cartPage.clickPlaceOrder();

    // Fill in the order form
    await cartPage.fillOrderForm({
      name: 'Test User',
      country: 'Uruguay',
      city: 'Montevideo',
      creditCard: '1234567890123456',
      month: 'April',
      year: '2026'
    });

    // Click Purchase
    await cartPage.clickPurchase();

    // Verify confirmation message appears
    const confirmation = page.locator('h2:has-text("Thank you for your purchase!")');
    await expect(confirmation, 'Confirmation message should be visible after purchase').toBeVisible();
  });

});