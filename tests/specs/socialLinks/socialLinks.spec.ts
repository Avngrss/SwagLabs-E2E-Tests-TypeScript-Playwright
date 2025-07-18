import { LoginPage } from "./../../pages/LoginPage";
import { STANDARD_USER } from "../../fixtures/test-data";
import { test, expect } from "@playwright/test";
import { FooterComponent } from "../../components/FooterComponent";

test("Footer social links work correctly", async ({ page, context }) => {
  const loginPage = new LoginPage(page);

  await loginPage.open();
  await loginPage.login(STANDARD_USER.username, STANDARD_USER.password);

  const footer = new FooterComponent(page);

  expect(await footer.isAllLinksVisible()).toBeTruthy();

  for (const link of await footer.getAllSocialLinks()) {
    await test.step(`Verify attributes for ${link.name}`, async () => {
      const href = await link.locator.getAttribute("href");
      expect(href?.trim()).toBe(link.url.trim());

      await expect(link.locator).toHaveAttribute("target", "_blank");
      await expect(link.locator).toHaveAttribute("rel", "noreferrer");
    });
  }
});
