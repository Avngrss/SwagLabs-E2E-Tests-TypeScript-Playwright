import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class CheckOutCompletePage extends BasePage {
  readonly checkOutContainer: Locator;
  readonly backHomeBtn: Locator;

  constructor(page: Page) {
    super(page);

    this.checkOutContainer = page.locator(
      '[data-test="checkout-complete-container"]'
    );
    this.backHomeBtn = page.locator('[data-test="back-to-products"]');
  }

  async verifyCheckOutComplete(): Promise<void> {
    await this.base.verifyUrl("/checkout-complete.html");
    await this.base.verifyElementVisible(this.checkOutContainer);
    await this.base.verifyElementVisible(this.backHomeBtn);
  }
}
