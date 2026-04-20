const { test } = require('../fixtures');
const { expect } = require('@playwright/test');

// NOTE: Category filter automation is not typically prioritized in real projects
// because it can be difficult to validate correctly — the catalog may change,
// products may be on multiple pages, and the filter logic is usually simple.
// This type of test is recommended only for critical filters with complex business logic.
// In this case, it was automated to demonstrate data-driven testing
// with multiple datasets and iteration across different filter scenarios.

const categoryData = [
  {
    category: 'Phones',
    expectedProducts: [
      'Samsung galaxy s6',
      'Nokia lumia 1520',
      'Nexus 6',
      'Samsung galaxy s7',
      'Iphone 6 32gb',
      'Sony xperia z5',
      'HTC One M9',
    ]
  },
  {
    category: 'Laptops',
    expectedProducts: [
      'Sony vaio i5',
      'Sony vaio i7',
      'MacBook air',
      'Dell i7 8gb',
      '2017 Dell 15.6 Inch',
      'MacBook Pro',
    ]
  },
  {
    category: 'Monitors',
    expectedProducts: [
      'Apple monitor 24',
      'ASUS Full HD',
    ]
  },
];

test.describe('Product Catalog - Category Filter', () => {

  for (const { category, expectedProducts } of categoryData) {

    test(`TC-001: Filter by ${category} should show only ${category} products`,
      { tag: ['@catalog'] },
      async ({ homePage }) => {

        // Navigate to homepage
        await homePage.goto();

        // Apply category filter
        await homePage.filterByCategory(category);

        // Get filtered products
        const products = await homePage.getProductNames();
        console.log(`Products after ${category} filter:`, products);

        // Verify at least one product is displayed
        expect(
          products.length,
          `No products found after applying ${category} filter`
        ).toBeGreaterThan(0);

        // Verify every displayed product belongs to the selected category
        products.forEach(product => {
          expect(
            expectedProducts,
            `${product.trim()} is not a ${category} product`
          ).toContain(product.trim());
        });
      }
    );

  }

});