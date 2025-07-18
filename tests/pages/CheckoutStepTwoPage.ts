import { Locator, Page } from "@playwright/test";
import { OrderSummary, Price } from "../types/Product";
import { BasePage } from "./BasePage";

export class CheckoutStepTwoPage extends BasePage {
  readonly paymentInfoValue: Locator;
  readonly shippingInfoValue: Locator;
  readonly subTotalLabel: Locator;
  readonly taxLabel: Locator;
  readonly totalLabel: Locator;
  readonly finishBtn: Locator;
  

  constructor(page: Page) {
    super(page);
    this.paymentInfoValue = page.locator('[data-test="payment-info-value"]');
    this.shippingInfoValue = page.locator('[data-test="shipping-info-value"]');
    this.subTotalLabel = page.locator('[data-test="subtotal-label"]');
    this.taxLabel = page.locator('[data-test="tax-label"]');
    this.totalLabel = page.locator('[data-test="total-label"]');
    this.finishBtn = page.locator('[data-test="finish"]');
  }

  async verifyCheckOutInfoIsVisible() {
    await Promise.all([
      this.base.verifyElementVisible(this.paymentInfoValue),
      this.base.verifyElementVisible(this.shippingInfoValue),
      this.base.verifyElementVisible(this.subTotalLabel),
      this.base.verifyElementVisible(this.taxLabel),
      this.base.verifyElementVisible(this.totalLabel),
      this.base.verifyElementVisible(this.finishBtn),
    ]);
  }

  async verifyPaymentInfo(products: Price[], taxRate: number = 0.08): Promise<void> {
  const subtotal = products.reduce((sum, product) => sum + product.price, 0);
  const tax = subtotal * taxRate;
  const total = subtotal + tax;

  await Promise.all([
    this.base.verifyUrl("/checkout-step-two.html"),
    this.base.verifyElementText(this.paymentInfoValue, 'SauceCard #31337'),
    this.base.verifyElementText(this.shippingInfoValue, 'Free Pony Express Delivery!'),
    this.base.verifyElementText(this.subTotalLabel, `Item total: $${subtotal.toFixed(2)}`),
    this.base.verifyElementText(this.taxLabel, `Tax: $${tax.toFixed(2)}`),
    this.base.verifyElementText(this.totalLabel, `Total: $${total.toFixed(2)}`),
    this.verifyCheckOutInfoIsVisible(),
  ]);
}

  async finishCheckOut(): Promise<void> {
    await this.base.clickElement(this.finishBtn);
  }
}
