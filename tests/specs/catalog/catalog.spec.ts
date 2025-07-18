import { LoginPage } from "../../pages/LoginPage";
import { test, expect } from "@playwright/test";
import { InventoryPage } from "../../pages/InventoryPage";
import { sortOptions } from "../../fixtures/test-data";
import { allure } from "allure-playwright";

test.describe("Catalog", () => {
  let loginPage: LoginPage;
  let inventoryPage: InventoryPage;

  test.beforeEach(async ({ page }) => {
    inventoryPage = new InventoryPage(page);
    loginPage = new LoginPage(page);

    await allure.step("Open inventory page", async () => {
      await loginPage.open();
      await allure.attachment(
        "Inventory Page Initial",
        await page.screenshot(),
        "image/png"
      );
    });

    await allure.step("Perform login", async () => {
      await loginPage.login("standard_user", "secret_sauce", {
        successUrl: "/inventory.html",
      });
      await allure.attachment(
        "After Login",
        await page.screenshot(),
        "image/png"
      );
    });
  });

  test("Count items", async ({ page }) => {
    allure.severity("critical");
    allure.owner("QA Team");
    allure.tag("catalog");
    allure.tag("smoke");

    await allure.step("Verify item count", async () => {
      const itemCount = await inventoryPage.getItemCount();
      await allure.step(`Actual item count: ${itemCount}`, async () => {
        await allure.attachment(
          "Item Count",
          String(itemCount),
          "text/plain"
        );
      });

      expect(itemCount).toBe(6);
      await allure.attachment(
        "Catalog Items",
        await inventoryPage.items.first().screenshot(),
        "image/png"
      );
    });

    await allure.step("Verify all items are visible", async () => {
      await expect(inventoryPage.items).toHaveCount(6);
      await allure.attachment(
        "Full Catalog View",
        await page.screenshot(),
        "image/png"
      );
    });
  });

  for (const sortOption of sortOptions) {
    test(`Verify ${sortOption.name} sorting`, async ({ page }) => {
      allure.severity("critical");
      allure.owner("QA Team");
      allure.tag("sorting");
      allure.tag("smoke");

      await allure.step(`Select ${sortOption.name} option`, async () => {
        await inventoryPage.selectSortOption(sortOption.value);
        await allure.attachment(
          "Sort Dropdown",
          await inventoryPage.sortDropdown.screenshot(),
          "image/png"
        );
      });

      await allure.step("Verify sorting results", async () => {
        if (sortOption.type === 'name') {
          const productNames = await inventoryPage.getProductNames();
          await allure.attachment(
            "Sorted Product Names",
            JSON.stringify(productNames, null, 2),
            "application/json"
          );

          const expectedNames = [...productNames].sort((a, b) =>
            sortOption.order === 'asc' ? a.localeCompare(b) : b.localeCompare(a)
          );
          expect(productNames).toEqual(expectedNames);
        } else {
          const productPrices = await inventoryPage.getProductPrices();
          await allure.attachment(
            "Sorted Product Prices",
            JSON.stringify(productPrices, null, 2),
            "application/json"
          );

          const expectedPrices = [...productPrices].sort((a, b) =>
            sortOption.order === 'asc' ? a - b : b - a
          );
          expect(productPrices).toEqual(expectedPrices);
        }

        await allure.attachment(
          `After ${sortOption.name} Sorting`,
          await page.screenshot(),
          "image/png"
        );
      });
    });
  }

  test("Verify default sorting", async () => {
    allure.severity("normal");
    allure.owner("QA Team");
    allure.tag("sorting");
    allure.tag("smoke");

    await allure.step("Check default sort option", async () => {
      const defaultOption = await inventoryPage.getSelectedSortOption();
      await allure.attachment(
        "Default Sort Option",
        defaultOption,
        "text/plain"
      );
      expect(defaultOption).toBe('az');
    });

    await allure.step("Verify default name sorting", async () => {
      const productNames = await inventoryPage.getProductNames();
      const sortedNames = [...productNames].sort((a, b) => a.localeCompare(b));
      expect(productNames).toEqual(sortedNames);
    });
  });
});