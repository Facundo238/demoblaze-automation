const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  workers: 1,         
  use: {
    baseURL: 'https://www.demoblaze.com',
    headless: false,
    slowMo: 800,
  },
});