import {expect} from "@playwright/test";
import {BasePage} from "./BasePage";

export class ProductsPagen extends BasePage {
  constructor(page) {
    super(page);

    this.allProductsTitle = page.getByRole("heading", {name: "All Products"});
  }

  async assertLoaded() {
    await expect(this.allProductsTitle).toBeVisible();
  }
}
