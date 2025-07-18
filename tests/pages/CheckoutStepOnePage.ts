import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class CheckoutStepOnePage extends BasePage {
  //Check-out form locators
  readonly firstName: Locator;
  readonly lastname: Locator;
  readonly zipCode: Locator;
  readonly continueBtn: Locator;

  constructor(page: Page) {
    super(page);

    this.firstName = page.locator('[data-test="firstName"]');
    this.lastname = page.locator('[data-test="lastName"]');
    this.zipCode = page.locator('[data-test="postalCode"]');
    this.continueBtn = page.locator('[data-test="continue"]');
  }

  async verifyCheckOutFormVisible() {
    await Promise.all([
      this.base.verifyElementVisible(this.firstName),
      this.base.verifyElementVisible(this.lastname),
      this.base.verifyElementVisible(this.zipCode),
      this.base.verifyElementVisible(this.continueBtn),
    ]);
  }

  async fillStepOneCheckout(
    firstName: string,
    lastName: string,
    zipCode: string
  ): Promise<void> {
    await this.verifyCheckOutFormVisible();
    await this.firstName.fill(firstName);
    await this.lastname.fill(lastName);
    await this.zipCode.fill(zipCode);
    await this.base.clickElement(this.continueBtn);
  }
}
