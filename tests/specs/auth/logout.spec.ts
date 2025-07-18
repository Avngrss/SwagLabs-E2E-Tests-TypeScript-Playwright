import { test, expect } from "@playwright/test";
import { LoginPage } from "../../pages/LoginPage";
import { InventoryPage } from "../../pages/InventoryPage";
import { allure } from "allure-playwright";

test.describe("Logout Tests", () => {
  let inventoryPage: InventoryPage;

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    
    await loginPage.open();
    await allure.step("Open login page", async () => {
      await allure.attachment("Login Page", await page.screenshot(), "image/png");
    });

    await loginPage.login("standard_user", "secret_sauce");
    inventoryPage = new InventoryPage(page);
  });

  test("Successful logout", async ({ page }) => {
    allure.severity("critical");
    allure.owner("QA Team");
    allure.tag("logout");
    allure.tag("smoke");

    await allure.step("Perform logout via header", async () => {
      await inventoryPage.header.logout();
      await allure.attachment("Post-Logout", await page.screenshot(), "image/png");
    });

    await allure.step("Verify redirect to login page", async () => {
      await expect(page).toHaveURL("/");
      await allure.attachment("Login Redirect", await page.screenshot(), "image/png");
    });

    await allure.step("Verify session termination", async () => {
      await page.goto('/inventory.html');
      await expect(page).toHaveURL("/");
      await allure.attachment("Session Termination", await page.screenshot(), "image/png");
    });
  });
});