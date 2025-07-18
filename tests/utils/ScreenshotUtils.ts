import { Page, Locator } from "@playwright/test";

export const ScreenshotUtils = {
  /**
   * Делает скриншот всей страницы
   */
  async takeFullPageScreenshot(page: Page, viewportType: string, name: string): Promise<void> {
    const path = `screenshots/${viewportType}/${name}.png`;
    await page.screenshot({ path, fullPage: true });
  },

  /**
   * Делает скриншот конкретного элемента (например, ошибки)
   */
  async takeElementScreenshot(locator: Locator, viewportType: string, name: string): Promise<void> {
    const path = `screenshots/${viewportType}/error-${name}.png`;
    await locator.screenshot({ path });
  },
};