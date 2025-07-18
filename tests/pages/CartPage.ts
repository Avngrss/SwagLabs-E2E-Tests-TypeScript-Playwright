import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";
import { Product } from "../types/Product";

export class CartPage extends BasePage{
  readonly page: Page;
  readonly continueShopping: Locator;
  readonly checkout: Locator;

  readonly removeItemBtn: Locator;
  readonly itemQty: Locator;
  readonly itemName: Locator;
  readonly itemDesc: Locator;
  readonly itemPrice: Locator;
  readonly cartItem: Locator;

  constructor(page: Page) {
    super(page)
    this.page = page;
    //Navigation from cart Locators
    this.continueShopping = page.getByRole("button", {
      name: "Continue Shopping",
    });
    this.checkout = page.getByRole("button", { name: "Checkout" });
    //Item locators
    this.removeItemBtn = page.locator('[data-test^="remove-"]');
    this.itemQty = page.locator('[data-test="item-quantity"]');
    this.itemName = page.locator('[data-test="inventory-item-name"]');
    this.itemDesc = page.locator('[data-test="inventory-item-desc"]');
    this.itemPrice = page.locator('[data-test="inventory-item-price"]');
    this.cartItem = page.locator('[data-test="inventory-item"]');
  }

  async verifyCartItem(productData: Product): Promise<boolean> {
     const cartItems = this.page.locator('[data-test="cart-list"] .cart_item');

    const itemInCart = cartItems.filter({
      has: this.page
        .locator('[data-test="inventory-item-name"]')
        .filter({ hasText: productData.name }),
    });

    const isVisible = await this.base.verifyElementVisible(itemInCart);
    if (!isVisible) return false;

    const qty = itemInCart.locator('[data-test="item-quantity"]');
    const name = itemInCart.locator('[data-test="inventory-item-name"]');
    const desc = itemInCart.locator('[data-test="inventory-item-desc"]');
    const price = itemInCart.locator('[data-test="inventory-item-price"]');

    const actualQty = await this.base.getElementText(qty);
    const actualName = await this.base.getElementText(name);
    const actualDesc = await this.base.getElementText(desc);
    const actualPrice = await this.base.getElementText(price);

    return (
      actualQty.trim() === productData.quantity.trim() &&
      actualName.trim() === productData.name.trim() &&
      actualDesc.trim() === productData.description.trim() &&
      actualPrice.trim() === productData.price.trim()
    );
  }

  async verifyAllCartItems(
    products: Array<{
      quantity: string;
      name: string;
      description: string;
      price: string;
    }>
  ): Promise<void> {
    for (const product of products) {
      await this.verifyCartItem(product);
    }
  }

async removeItemByName(productName: string): Promise<void> {
    const cartItems = this.page.locator('[data-test="cart-list"] .cart_item');
    const itemInCart = cartItems.filter({
      has: this.page
        .locator('[data-test="inventory-item-name"]')
        .filter({ hasText: productName }),
    });

    const removeButton = itemInCart.locator(this.removeItemBtn);
    await this.base.clickElement(removeButton);
  }

  async verifyCartIsEmpty(): Promise<boolean> {
    const count = await this.base.verifyCount(this.cartItem);
    return count === 0;
  }

  async openCheckOutPage() {
    this.base.verifyElementVisible(this.checkout);
    this.base.clickElement(this.checkout);
  }
}
