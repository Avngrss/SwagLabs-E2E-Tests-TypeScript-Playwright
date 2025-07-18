import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class ProductPage  extends BasePage{
  //Locators
  readonly addToCartButton: Locator;
  readonly itemName: Locator;
  readonly itemDescription: Locator;
  readonly itemPrice: Locator;

  constructor(page: Page) {
   super(page)
    this.addToCartButton = page.locator('[data-test="add-to-cart"]');
    this.itemName = page.locator('[data-test="inventory-item-name"]');
    this.itemDescription = page.locator('[data-test="inventory-item-desc"]');
    this.itemPrice = page.locator('[data-test="inventory-item-price"]');
  }

  async addToCart(): Promise<void> {
    await this.base.clickElement(this.addToCartButton);
  }
  
  async getSelectedItemInfo() {
    return {
      name: await this.itemName.textContent(),
      description: await this.itemDescription.textContent(),
      price: await this.itemPrice.textContent(),
    };
  }
}
