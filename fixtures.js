const { test: base } = require('@playwright/test');
const { HomePage } = require('./pages/HomePages');
const { ProductPage } = require('./pages/ProductPage');
const { CartPage } = require('./pages/CartPage');

const test = base.extend({

  // Fixture for HomePage
  homePage: async ({ page }, use) => {
    const homePage = new HomePage(page);
    await use(homePage);
  },

  // Fixture for ProductPage
  productPage: async ({ page }, use) => {
    const productPage = new ProductPage(page);
    await use(productPage);
  },

  // Fixture for CartPage
  cartPage: async ({ page }, use) => {
    const cartPage = new CartPage(page);
    await use(cartPage);
  },

});

module.exports = { test };