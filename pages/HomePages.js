class HomePage {
  constructor(page) {
    this.page = page;

    // Navbar
    this.cartButton = page.locator('#cartur');
    this.homeButton = page.getByRole('link', { name: 'Home' });


    this.phonesCategory = page.locator('#itemc', { hasText: 'Phones' });
    this.laptopsCategory = page.locator('#itemc', { hasText: 'Laptops' });
    this.monitorsCategory = page.locator('#itemc', { hasText: 'Monitors' });

    this.productCards = page.locator('#tbodyid .hrefch');


    this.nextButton = page.locator('#next2');
    this.prevButton = page.locator('#prev2');
  }

  async goto() {
     await this.page.goto('/');
     await this.page.waitForTimeout(1500);
}

  async filterByCategory(category) {
    await this.page.locator('#itemc', { hasText: category }).click();
    await this.page.waitForTimeout(1500);
  }

  async clickFirstProduct() {
    await this.productCards.first().click();
    await this.page.waitForTimeout(1000);
  }

  async getProductNames() {
      return await this.page
          .locator('#tbodyid .hrefch')
          .allTextContents();
  }   

  async goToCart() {
    await this.cartButton.click();
    await this.page.waitForTimeout(1000);
  }

  async clickNext() {
    await this.nextButton.click();
    await this.page.waitForTimeout(1500);
  }

  async clickPrevious() {
    await this.prevButton.click();
    await this.page.waitForTimeout(1500);
  }
}

module.exports = { HomePage };