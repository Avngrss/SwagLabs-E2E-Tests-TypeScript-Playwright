import { Locator, Page } from "@playwright/test";
import { BaseActions } from "../utils/BaseActions";

export class HeaderComponent {
  private base: BaseActions;

  readonly openMenu: Locator;
  readonly logoutLink: Locator;
  readonly cartIcon: Locator;
  readonly cartBadge: Locator

  constructor(page: Page) {
    this.base = new BaseActions(page);
    // Locators
    this.openMenu = page.getByRole("button", { name: "Open Menu" });
    this.logoutLink = page.locator('[data-test="logout-sidebar-link"]');
    this.cartIcon = page.locator('[data-test="shopping-cart-link"]');
    this.cartBadge = page.locator('[data-test="shopping-cart-badge"]');
  }

  async logout(): Promise<void> {
    await this.base.verifyElementVisible(this.openMenu);
    await this.base.clickElement(this.openMenu);
    await this.base.verifyElementVisible(this.logoutLink);
    await this.base.clickElement(this.logoutLink);
    await this.base.verifyUrl("/");
  }

  async openCart(): Promise<void> {
    await this.base.verifyElementVisible(this.cartIcon);
    await this.base.clickElement(this.cartIcon)
    await this.base.verifyUrl('/cart.html');
  }

  async verifyCartBadge(expectedCount: string): Promise<void> {
    await this.base.verifyElementText(this.cartBadge, expectedCount);
  }
}
