import { PRODUCTS, STANDARD_USER } from "./../../fixtures/test-data";
import { LoginPage } from "../../pages/LoginPage";
import { CartPage } from "../../pages/CartPage";
import { InventoryPage } from "../../pages/InventoryPage";
import { ProductPage } from "../../pages/ProductPage";
import { test, expect } from "@playwright/test";
import { allure } from "allure-playwright";

test.describe("Cart", () => {
  let inventoryPage: InventoryPage;

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);

    await allure.step("Open inventory page", async () => {
      await loginPage.open();
      await allure.attachment(
        "Inventory Page Initial",
        await page.screenshot(),
        "image/png"
      );
    });

    await allure.step("Perform login", async () => {
      await loginPage.login(STANDARD_USER.username, STANDARD_USER.password, {
        successUrl: "/inventory.html",
      });
      inventoryPage = new InventoryPage(page);
      await allure.attachment(
        "After Login",
        await page.screenshot(),
        "image/png"
      );
    });
  });

  test("Add product and verify in cart", async ({ page }) => {
    allure.severity("critical");
    allure.owner("QA Team");
    allure.tag("cart");
    allure.tag("regression");

    await allure.step("Add item to cart", async () => {
      await inventoryPage.addItemsToCart(inventoryPage.sauseLabsBacpackAddBtn);
      await allure.attachment(
        "After adding item to cart",
        await page.screenshot(),
        "image/png"
      );
    });

    await inventoryPage.header.verifyCartBadge("1");

    await allure.step("Open cart page", async () => {
      await inventoryPage.header.openCart();
      await allure.attachment(
        "Cart page opened",
        await page.screenshot(),
        "image/png"
      );
    });

    const cartPage = new CartPage(page);

    await allure.step("Verify item details in cart", async () => {
      await cartPage.verifyCartItem(PRODUCTS.backpack);
      await allure.attachment(
        "Cart with item details",
        await page.screenshot(),
        "image/png"
      );
    });
  });

  test("Add and remove product from cart", async ({ page }) => {
    allure.severity("normal");
    allure.owner("QA Team");
    allure.tag("cart");
    allure.tag("smoke");

    await allure.step("Add item to cart", async () => {
      await inventoryPage.addItemsToCart(inventoryPage.sauseLabsBacpackAddBtn);
      await allure.attachment(
        "After adding item",
        await page.screenshot(),
        "image/png"
      );
    });

    await allure.step("Open cart page", async () => {
      await inventoryPage.header.openCart();
      await allure.attachment(
        "Cart opened",
        await page.screenshot(),
        "image/png"
      );
    });

    const cartPage = new CartPage(page);

    await allure.step("Verify item is present before removal", async () => {
      await expect(cartPage.cartItem).toBeVisible();
    });

    await allure.step("Click Remove button", async () => {
      await cartPage.removeItemByName(PRODUCTS.backpack.name);
      await cartPage.base.waitForElementToDisappear(cartPage.cartItem.filter({ hasText: "Sauce Labs Backpack" }));
      await allure.attachment(
        "After removing item",
        await page.screenshot(),
        "image/png"
      );
    });

    await allure.step("Verify item is no longer visible in cart", async () => {
      await expect(cartPage.cartItem).not.toBeVisible();
      await allure.attachment(
        "Cart after removal",
        await page.screenshot(),
        "image/png"
      );
    });

    await expect(inventoryPage.header.cartBadge).not.toBeVisible();

    await allure.step("Verify cart is empty", async () => {
       expect(await cartPage.verifyCartIsEmpty()).toBe(true);
      await allure.attachment(
        "Cart is empty",
        await page.screenshot(),
        "image/png"
      );
    });
  });

  test("Add product from the product details page", async ({ page }) => {
    allure.severity("critical");
    allure.owner("QA Team");
    allure.tag("cart");
    allure.tag("product-details");

    await allure.step("Open product details page", async () => {
      await inventoryPage.openProductDetail(4);
      await allure.attachment(
        "Product Details Page",
        await page.screenshot(),
        "image/png"
      );
    });
    const productPage = new ProductPage(page);
    await allure.step("Verify product details are correct", async () => {
      const info = await productPage.getSelectedItemInfo();

      expect(info.name).toBe(PRODUCTS.backpack.name);
      expect(info.description).toBe(PRODUCTS.backpack.description);
      expect(info.price).toBe(PRODUCTS.backpack.price);

      await allure.attachment(
        "Product Info",
        JSON.stringify(info, null, 2),
        "application/json"
      );
    });
    await allure.step("Add product to cart", async () => {
      await productPage.addToCart();
      await allure.attachment(
        "After adding to cart",
        await page.screenshot(),
        "image/png"
      );
    });

    await allure.step("Verify cart badge is updated", async () => {
      await inventoryPage.header.verifyCartBadge("1");
      await allure.attachment(
        "Cart Badge Visible",
        await page.screenshot(),
        "image/png"
      );
    });

    await allure.step("Open cart page", async () => {
      inventoryPage.header.openCart();
      await allure.attachment(
        "Cart Page Opened",
        await page.screenshot(),
        "image/png"
      );
    });
    const cartPage = new CartPage(page);
    await allure.step("Verify item details in cart", async () => {
      await cartPage.verifyCartItem(PRODUCTS.backpack);
      await allure.attachment(
        "Cart with Item",
        await page.screenshot(),
        "image/png"
      );
    });
  });

  test("Add multy items in cart", async ({ page }) => {
    allure.severity("critical");
    allure.owner("QA Team");
    allure.tag("cart");
    allure.tag("product-details");

    await allure.step("Add items to cart", async () => {
      await inventoryPage.addItemsToCart(
        inventoryPage.sauseLabsBacpackAddBtn,
        inventoryPage.sauceLabsOnesieAddBtn
      );
      await allure.attachment(
        "After adding items to cart",
        await page.screenshot(),
        "image/png"
      );
    });

    await inventoryPage.header.verifyCartBadge("2");

    await allure.step("Open cart page", async () => {
      await inventoryPage.header.openCart();
      await allure.attachment(
        "Cart page opened",
        await page.screenshot(),
        "image/png"
      );
    });

    const cartPage = new CartPage(page);

    await allure.step("Verify all item details in cart", async () => {
      await cartPage.verifyCartItem(PRODUCTS.backpack);
      await cartPage.verifyCartItem(PRODUCTS.onisie);

      await allure.attachment(
        "Cart with items details",
        await page.screenshot(),
        "image/png"
      );
    });
  });
});
