# Swag Labs End-to-End Test Automation

A comprehensive and robust test automation suite for the Swag Labs demo web application. This project implements a full suite of end-to-end (E2E) tests to validate critical user journeys, ensuring high application quality through reliable, fast, and maintainable automated checks.

## 🚀 Tech Stack

*   **Language:** TypeScript
*   **Testing Framework:** Playwright
*   **Test Runner:** Built-in Playwright Test Runner
*   **Reporting:** Allure Report
*   **Browsers:** Chromium, Firefox, WebKit

## ✅ Key Features Tested

This suite covers the core functionalities of an e-commerce platform:

*   **User Authentication:** Successful login and error handling for invalid credentials.
*   **Product Management:** Adding and removing items from the shopping cart.
*   **Cart Validation:** Accurate calculation of total item price and quantity.
*   **End-to-End Checkout Process:** Complete validation of the purchase workflow (info, overview, completion).
*   **Product Sorting:** Verification of all sorting filters (A-Z, Z-A, Price low-high, Price high-low).

## 🏗️ Project Architecture

The suite is built with maintainability and scalability in mind using the **Page Object Model (POM)** pattern.


## ✨ Highlights

*   **High Stability:** Utilizes Playwright's built-in auto-waiting and intelligent tracing to eliminate flaky tests.
*   **Cross-Browser Testing:** Fully configured to run tests on Chromium, Firefox, and WebKit.
*   **Parallel Execution:** Tests are configured to run in parallel for faster execution.
*   **Type Safety:** Built with TypeScript for better developer experience and fewer runtime errors.
*   **Powerful Tooling:** Includes Playwright's UI Mode for easy debugging and insightful HTML reports.
*   **Advanced Reporting:** Integrated with Allure Framework for detailed and interactive test reports with screenshots, traces, and video recordings.
