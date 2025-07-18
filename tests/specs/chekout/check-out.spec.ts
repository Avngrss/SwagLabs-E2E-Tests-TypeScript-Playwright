import { PRODUCTS, STANDARD_USER, USER_DATA } from "./../../fixtures/test-data";
import { LoginPage } from "../../pages/LoginPage";
import { CartPage } from "../../pages/CartPage";
import { InventoryPage } from "../../pages/InventoryPage";
import { ProductPage } from "../../pages/ProductPage";
import { CheckoutStepOnePage } from "../../pages/CheckoutStepOnePage";
import { CheckoutStepTwoPage } from "../../pages/CheckoutStepTwoPage";
import { CheckOutCompletePage } from "../../pages/CheckOutCompletePage";
import { test, expect } from "@playwright/test";
import { allure } from "allure-playwright";

test.describe("Check Out", () => {
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

  test("Check out from the cart", async ({ page }) => {
    allure.severity("normal");
    allure.owner("QA Team");
    allure.tag("check-out");
    allure.tag("smoke");

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

    await allure.step("Open step-1 check-out page", async () => {
      await cartPage.openCheckOutPage();
      await allure.attachment(
        "Check-out page opened",
        await page.screenshot(),
        "image/png"
      );
    });

    const checkOutStepOnePage = new CheckoutStepOnePage(page);

    await allure.step("Fill in the check-out form", async () => {
      await checkOutStepOnePage.fillStepOneCheckout(
        USER_DATA.firstName,
        USER_DATA.lastName,
        USER_DATA.zipCode
      );
      await allure.attachment(
        "Filled form",
        await page.screenshot(),
        "image/png"
      );
    });

    const checkOutStepTwoPage = new CheckoutStepTwoPage(page);

    await allure.step("Verify item details before order", async () => {
      await cartPage.verifyCartItem(PRODUCTS.backpack);
      await allure.attachment(
        "Cart with Item",
        await page.screenshot(),
        "image/png"
      );
    });

    await allure.step("Verify payment info", async () => {
      await checkOutStepTwoPage.verifyPaymentInfo([
        { price: 29.99 },
      ]);
      await allure.attachment(
        "Payment info",
        await page.screenshot(),
        "image/png"
      );
    });

    await allure.step("Open complete check-out page", async () => {
      await checkOutStepTwoPage.finishCheckOut();
      await allure.attachment(
        "Complete check-out page",
        await page.screenshot(),
        "image/png"
      );
    });

    const completeCheckOutPage = new CheckOutCompletePage(page);

    await allure.step("Verify order complete", async () => {
      await completeCheckOutPage.verifyCheckOutComplete();
      await allure.attachment(
        "Order complete",
        await page.screenshot(),
        "image/png"
      );
    });

    await expect(completeCheckOutPage.header.cartBadge).not.toBeVisible();
  });

  test("Check out from product page", async ({ page }) => {
    allure.severity("normal");
    allure.owner("QA Team");
    allure.tag("check-out");
    allure.tag("smoke");

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

    await allure.step("Open step-1 check-out page", async () => {
      await cartPage.openCheckOutPage();
      await allure.attachment(
        "Check-out page opened",
        await page.screenshot(),
        "image/png"
      );
    });

    const checkOutStepOnePage = new CheckoutStepOnePage(page);

    await allure.step("Fill in the check-out form", async () => {
      await checkOutStepOnePage.fillStepOneCheckout(
        USER_DATA.firstName,
        USER_DATA.lastName,
        USER_DATA.zipCode
      );
      await allure.attachment(
        "Filled form",
        await page.screenshot(),
        "image/png"
      );
    });

    const checkOutStepTwoPage = new CheckoutStepTwoPage(page);

    await allure.step("Verify item details before order", async () => {
      await cartPage.verifyCartItem(PRODUCTS.backpack);
      await allure.attachment(
        "Cart with Item",
        await page.screenshot(),
        "image/png"
      );
    });

    await allure.step("Verify payment info", async () => {
      await checkOutStepTwoPage.verifyPaymentInfo([
        { price: 29.99 },
      ]);
      await allure.attachment(
        "Payment info",
        await page.screenshot(),
        "image/png"
      );
    });

    await allure.step("Open complete check-out page", async () => {
      await checkOutStepTwoPage.finishCheckOut();
      await allure.attachment(
        "Complete check-out page",
        await page.screenshot(),
        "image/png"
      );
    });

    const completeCheckOutPage = new CheckOutCompletePage(page);

    await allure.step("Verify order complete", async () => {
      await completeCheckOutPage.verifyCheckOutComplete();
      await allure.attachment(
        "Order complete",
        await page.screenshot(),
        "image/png"
      );
    });

    await expect(completeCheckOutPage.header.cartBadge).not.toBeVisible();
  });

  test("Check out multy items", async ({ page }) => {
    allure.severity("critical");
    allure.owner("QA Team");
    allure.tag("Check out");
    allure.tag("smoke");

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

    await allure.step("Open step-1 check-out page", async () => {
      await cartPage.openCheckOutPage();
      await allure.attachment(
        "Check-out page opened",
        await page.screenshot(),
        "image/png"
      );
    });

    const checkOutStepOnePage = new CheckoutStepOnePage(page);

    await allure.step("Fill in the check-out form", async () => {
      await checkOutStepOnePage.fillStepOneCheckout(
        USER_DATA.firstName,
        USER_DATA.lastName,
        USER_DATA.zipCode
      );
      await allure.attachment(
        "Filled form",
        await page.screenshot(),
        "image/png"
      );
    });

    const checkOutStepTwoPage = new CheckoutStepTwoPage(page);

    await allure.step("Verify item details before order", async () => {
      await cartPage.verifyCartItem(PRODUCTS.backpack);
      await allure.attachment(
        "Cart with Item",
        await page.screenshot(),
        "image/png"
      );
    });

    await allure.step("Verify payment info", async () => {
      await checkOutStepTwoPage.verifyPaymentInfo([
        { price: 29.99 },
        { price: 7.99 },
      ]);
      await allure.attachment(
        "Payment info",
        await page.screenshot(),
        "image/png"
      );
    });

    await allure.step("Open complete check-out page", async () => {
      await checkOutStepTwoPage.finishCheckOut();
      await allure.attachment(
        "Complete check-out page",
        await page.screenshot(),
        "image/png"
      );
    });

    const completeCheckOutPage = new CheckOutCompletePage(page);

    await allure.step("Verify order complete", async () => {
      await completeCheckOutPage.verifyCheckOutComplete();
      await allure.attachment(
        "Order complete",
        await page.screenshot(),
        "image/png"
      );
    });

    await expect(completeCheckOutPage.header.cartBadge).not.toBeVisible();
  });
});
