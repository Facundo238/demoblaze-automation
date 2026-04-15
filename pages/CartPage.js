class CartPage {
  constructor(page) {
    this.page = page;

    this.placeOrderButton = page.locator('button.btn-success');

    this.nameField = page.locator('#name');
    this.countryField = page.locator('#country');
    this.cityField = page.locator('#city');
    this.creditCardField = page.locator('#card');
    this.monthField = page.locator('#month');
    this.yearField = page.locator('#year');

    this.purchaseButton = page.locator('button:has-text("Purchase")');

  }

  async goto() {
    await this.page.goto('/cart.html');
    await this.page.waitForTimeout(1000);
  }

  async clickPlaceOrder() {
    await this.placeOrderButton.click();
    await this.page.waitForTimeout(500);
  }

    async getCartItemCount() {
    // Returns the number of items in the cart
    return await this.page.locator('#tbodyid tr').count();
  }

  async fillOrderForm({ name, country, city, creditCard, month, year }) {
    await this.nameField.fill(name);
    await this.countryField.fill(country);
    await this.cityField.fill(city);
    await this.creditCardField.fill(creditCard);
    await this.monthField.fill(month);
    await this.yearField.fill(year);
  }

  async clickPurchase() {
    await this.purchaseButton.click();
    await this.page.waitForTimeout(1500);
  }
}

module.exports = { CartPage };