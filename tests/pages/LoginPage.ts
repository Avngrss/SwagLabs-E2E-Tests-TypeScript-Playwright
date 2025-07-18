import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class LoginPage extends BasePage{
  readonly userName: Locator;
  readonly password: Locator;
  readonly loginBtn: Locator;
  readonly errorLocator: Locator;

  constructor(page: Page) {
    super(page)
    this.userName = page.locator('[data-test="username"]');
    this.password = page.locator('[data-test="password"]');
    this.loginBtn = page.locator('[data-test="login-button"]');
    this.errorLocator = page.locator('[data-test="error"]');
  }
  
  async verifyLoginFormVisible() {
    await Promise.all([
      this.base.verifyElementVisible(this.userName),
      this.base.verifyElementVisible(this.password),
      this.base.verifyElementVisible(this.loginBtn),
    ]);
  }

  async login(
    username: string,
    password: string,
    options: { 
      validateSuccess?: boolean;
      successUrl?: string | RegExp;
    } = { validateSuccess: true }
  ): Promise<void> {
    await this.verifyLoginFormVisible();
    await this.userName.fill(username);
    await this.password.fill(password);
    await this.base.clickElement(this.loginBtn);

    if (options.validateSuccess && options.successUrl) {
      await this.base.verifyUrl(options.successUrl);
    }
  }

  async assertError(expectedError?: string | RegExp): Promise<void> {
    await this.base.verifyErrorInElement(
      this.errorLocator,
      expectedError || /Epic sadface: (Username|Password) is required/
    );
  } 
}