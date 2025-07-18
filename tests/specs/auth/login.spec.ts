import { test } from "@playwright/test";
import { LoginPage } from "../../pages/LoginPage";
import { allure } from "allure-playwright";

test.describe("Login tests", () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);

    await loginPage.open();

    await allure.step("Open login page", async () => {
      await allure.attachment("Initial page", await page.screenshot(), "image/png");
    });
  });

  test("Successful login", async ({ page }) => {
    allure.severity("critical");
    allure.owner("QA Team");
    allure.tag("login");
    allure.tag("smoke");

    await allure.step("Fill valid credentials", async () => {
      await loginPage.login("standard_user", "secret_sauce", {
        successUrl: "/inventory.html",
      });

      await allure.attachment(
        "After credentials input",
        await page.screenshot(),
        "image/png"
      );
    });

    await allure.step("Verify successful login", async () => {
      await allure.attachment("Successful login", await page.screenshot(), "image/png");
    });
  });

  test("Attempt to login with empty credentials", async ({ page }) => {
    allure.severity("critical");
    allure.owner("QA Team");
    allure.tag("login");
    allure.tag("smoke");

    const errorLocator = page.locator('[data-test="error"]');

    await allure.step("Submit empty login form", async () => {
      await loginPage.login("", "", { validateSuccess: false });

      await allure.attachment(
        "Empty form submitted",
        await page.screenshot(),
        "image/png"
      );
    });

    await allure.step("Verify error message is displayed", async () => {
      await loginPage.assertError();

      await allure.attachment(
        "Error message",
        await page.screenshot(),
        "image/png"
      );
    });

    await allure.step("Capture screenshot of the error message", async () => {
      await allure.attachment(
        "Error close-up",
        await errorLocator.screenshot(),
        "image/png"
      );
    });
  });

  test("Attempt to login with empty username", async ({ page }) => {
    allure.severity("critical");
    allure.owner("QA Team");
    allure.tag("login");
    allure.tag("smoke");

    const errorLocator = page.locator('[data-test="error"]');

    await allure.step("Attempt login with empty username", async () => {
      await allure.step("Submit form with empty username", async () => {
        await loginPage.login("", "secret_sauce", { validateSuccess: false });

        await allure.attachment(
          "Form with empty username",
          await page.screenshot(),
          "image/png"
        );
      });

      await allure.step("Validate error state", async () => {
        await loginPage.assertError();

        await allure.attachment(
          "Username error details",
          await errorLocator.screenshot(),
          "image/png"
        );
      });
    });
  });

  test("Attempt to login with empty password", async ({ page }) => {
    allure.severity("critical");
    allure.owner("QA Team");
    allure.tag("login");
    allure.tag("smoke");

    const errorLocator = page.locator('[data-test="error"]');

    await allure.step("Attempt login with empty password", async () => {
      await allure.step("Submit form with empty password", async () => {
        await loginPage.login("standard_user", "", { validateSuccess: false });

        await allure.attachment(
          "Form with empty password",
          await page.screenshot(),
          "image/png"
        );
      });

      await allure.step("Validate error state", async () => {
        await loginPage.assertError();

        await allure.attachment(
          "Password error details",
          await errorLocator.screenshot(),
          "image/png"
        );
      });
    });
  });
});