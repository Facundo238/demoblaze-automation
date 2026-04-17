class ProductPage {
  constructor(page) {
    this.page = page;

    this.addToCartButton = page.getByRole('link', { name: 'Add to cart' })
  }

  async addToCart() {
    //this.page.once('dialog', dialog => dialog.accept());
    await this.addToCartButton.click();
    await this.page.waitForTimeout(1000);
  }
}

module.exports = { ProductPage };