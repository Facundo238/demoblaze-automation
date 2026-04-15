const { test } = require('../fixtures');
const { expect } = require('@playwright/test');

test.describe('Product Catalog - Category Filter', () => {

  test('TC-001: Filter by Phones should show only Phone products', async ({ homePage }) => {

    // Navigate to homepage
    await homePage.goto();

    // Apply Phones category filter
    await homePage.filterByCategory('Phone');

    // Get all product names currently displayed
    const products = await homePage.getProductNames();
    console.log('Products after filter:', products);

    // Verify at least one product is displayed
    expect(products.length, 'No products found after applying filter').toBeGreaterThan(0);

    // Known phone products in DemoBlaze
    const phoneProducts = [
      'Samsung galaxy s6',
      'Nokia lumia 1520',
      'Nexus 6',
      'Samsung galaxy s7',
      'Iphone 6 32gb',
      'Sony xperia z5',
      'HTC One M9',
    ];

    // Verify every displayed product belongs to the category
    products.forEach(product => {
      expect(phoneProducts, `${product.trim()} is not a Phone product`).toContain(product.trim());
    });
  });

});