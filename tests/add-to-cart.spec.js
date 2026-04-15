const { test } = require('../fixtures');
const { expect } = require('@playwright/test');

test.describe('Shopping Cart - Add to Cart', () => {

  test('TC-002: Should add first product to cart and verify it appears', async ({ page, homePage, productPage, cartPage }) => {

    // Navigate to homepage
    await homePage.goto();

    // Click on the first product
    await homePage.clickFirstProduct();

    // Click Add to cart
    await productPage.addToCart();

    // Navigate to cart
    await homePage.goToCart();

    // Verify cart has at least one item
    const cartItems = await cartPage.getCartItemCount();
    console.log('Items in cart:', cartItems);
    expect(cartItems, 'Cart should have at least one item').toBeGreaterThan(0);
  });

});