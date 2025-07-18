import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class InventoryPage extends BasePage{
  // Locators
  readonly inventoryContainer: Locator;
  readonly items: Locator;
  readonly sortDropdown: Locator;
  readonly productNames: Locator;
  readonly productPrices: Locator;

  readonly sauseLabsBacpack: Locator;
  readonly sauseLabsBacpackAddBtn: Locator;
  readonly sauceLabsOnesie: Locator;
  readonly sauceLabsOnesieAddBtn: Locator;


  constructor(page: Page) {
    super(page);

    // Inventory locators
    this.inventoryContainer = page.locator('[data-test="inventory-container"]');
    this.items = page.locator('[data-test="inventory-item"]');

    //Sauce Labs Backpack
    this.sauseLabsBacpack = page.locator('[data-test="item-4-title-link"]');
    this.sauseLabsBacpackAddBtn = page.locator('[data-test="add-to-cart-sauce-labs-backpack"]')

    //Sauce Labs Onesie
    this.sauceLabsOnesie = page.locator('[data-test="item-2-title-link"]');
    this.sauceLabsOnesieAddBtn = page.locator('[data-test="add-to-cart-sauce-labs-onesie"]');

    // Sort locators
    this.sortDropdown = page.locator('[data-test="product-sort-container"]');
    this.productNames = page.locator(".inventory_item_name");
    this.productPrices = page.locator(".inventory_item_price");
  }

  // Count items on the page
  async getItemCount(): Promise<number> {
    return await this.items.count();
  }

  // Sort items on the page
  async selectSortOption(value: string) {
    await this.sortDropdown.selectOption(value);
    await this.page.waitForLoadState("networkidle"); 
  }

  async getSelectedSortOption(): Promise<string> {
    return this.sortDropdown.evaluate(select => (select as HTMLSelectElement).value);
  }

  async getProductNames(): Promise<string[]> {
    return this.productNames.allTextContents();
  }

  async getProductPrices(): Promise<number[]> {
    const prices = await this.productPrices.allTextContents();
    return prices.map((p) => parseFloat(p.replace("$", "")));
  }

async addItemsToCart(...addButtonLocators: Locator[]): Promise<void> {
  for (const btn of addButtonLocators) {
    const dataTestAttribute = await btn.getAttribute('data-test');
    if (!dataTestAttribute) throw new Error('Не найден атрибут data-test у кнопки');
    const productKey = dataTestAttribute.replace('add-to-cart-', '');
    const removeLocator = this.page.locator(`[data-test="remove-${productKey}"]`);
    await this.base.verifyElementVisible(btn);
    await this.base.clickElement(btn);
    await this.base.verifyElementText(removeLocator, 'Remove');
  }
}

  async openProductDetail(productId: number): Promise<void> {
    await this.base.verifyElementVisible(this.sauseLabsBacpack);
    await this.base.clickElement(this.sauseLabsBacpack);
    await this.base.verifyUrl(`/inventory-item.html?id=${productId}`);
  }
}