import { expect, Page, Locator } from "@playwright/test";

export class BaseActions {
  constructor(readonly page: Page) {
    this.page = page;
  }
  /**
   * Проверяет URL
   */
 async verifyUrl(expectedUrl: string | RegExp): Promise<boolean> {
  const currentUrl = this.page.url();
  if (expectedUrl instanceof RegExp) {
    return expectedUrl.test(currentUrl);
  }
  return currentUrl === expectedUrl;
}

  /**
   * Проверяет заголовок страницы
   */
  async isTitleMatch(expectedTitle: string | RegExp): Promise<boolean> {
    const title = await this.page.title();
    if (expectedTitle instanceof RegExp) {
      return expectedTitle.test(title);
    }
    return title === expectedTitle;
  }
  /**
   * Кликает по элементу
   */
  async clickElement(locator: Locator): Promise<void> {
    await locator.click();
  }

  /**
   * Проверяет, что элемент виден на странице
   */
  async verifyElementVisible(locator: Locator): Promise<boolean> {
    return await locator.isVisible();
  }

  /**
   * Получает текст элемента
   */
  async getElementText(locator: Locator): Promise<string> {
    return await locator.textContent() || "";
  }

  /**
   * Проверяет текст элемента
   */
  async verifyElementText(locator: Locator, expectedText: string | RegExp): Promise<void> {
    if (expectedText instanceof RegExp) {
      await expect(locator).toHaveText(expectedText);
    } else {
      await expect(locator).toHaveText(expectedText);
    }
  }

  /**
   * Проверяет видимость и текст ошибки
   */
  async verifyErrorInElement(errorLocator: Locator, expectedText: string | RegExp) {
    await expect(errorLocator).toBeVisible();
    await expect(errorLocator).toContainText(expectedText);
  }
  
  /**
   * Проверяет количество элементов 
   */
  async verifyCount(locator: Locator): Promise<number> {
    return await locator.count();
  }
  
 async takeScreenshot(viewportType: string, name: string) {
    const path = `screenshots/${viewportType}/${name}.png`;
    await this.page.screenshot({ path, fullPage: true });
  }

  /**
   * Ожидает, пока элемент станет невидимым
   */
  async waitForElementToDisappear(locator: Locator, timeout: number = 5000): Promise<void> {
    try {
      await locator.waitFor({ state: "detached", timeout });
    } catch (error) {
      // Если элемент не исчез за время timeout, игнорируем ошибку
    }
  }
}