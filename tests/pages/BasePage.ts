import { Page } from "@playwright/test";
import { HeaderComponent } from "../components/HeaderComponent";
import { FooterComponent } from "../components/FooterComponent";
import { BaseActions } from "../utils/BaseActions";

export class BasePage {
  protected readonly page: Page;
  readonly header: HeaderComponent;
  readonly footer: FooterComponent;
  readonly base: BaseActions;

  constructor(page: Page) {
    this.page = page;
    this.base = new BaseActions(page);
    this.header = new HeaderComponent(page);
    this.footer = new FooterComponent(page);
  }

  /**
   * Открытие страницы
   */
  async open(path: string = "") {
    await this.page.goto(path, { waitUntil: "domcontentloaded" });
    await this.page.waitForLoadState("domcontentloaded");
  }
}