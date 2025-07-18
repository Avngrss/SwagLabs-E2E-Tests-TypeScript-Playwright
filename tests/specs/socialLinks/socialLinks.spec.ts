import { LoginPage } from "./../../pages/LoginPage";
import { STANDARD_USER } from "../../fixtures/test-data";
import { test, expect } from "@playwright/test";
import { FooterComponent } from "../../components/FooterComponent";
import { allure } from "allure-playwright";

test("Footer social links work correctly", async ({ page }) => {
  const loginPage = new LoginPage(page);

  await allure.step("Fill valid credentials", async () => {
    await loginPage.login(STANDARD_USER.username, STANDARD_USER.password, {
      successUrl: "/inventory.html",
    });

    await allure.attachment(
      "After credentials input",
      await page.screenshot(),
      "image/png"
    );
  });

  const footer = new FooterComponent(page);

  await allure.step("Links are visible", async () => {
    expect(await footer.isAllLinksVisible()).toBeTruthy();

    await allure.attachment(
      "Links are visible on the page",
      await page.screenshot(),
      "image/png"
    );
  })

  for (const link of await footer.getAllSocialLinks()) {
    await test.step(`Verify attributes for ${link.name}`, async () => {
      const href = await link.locator.getAttribute("href");
      expect(href?.trim()).toBe(link.url.trim());

      await expect(link.locator).toHaveAttribute("target", "_blank");
      await expect(link.locator).toHaveAttribute("rel", "noreferrer");
    });
  }
});
