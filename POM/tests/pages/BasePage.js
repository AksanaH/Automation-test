import {expect} from "@playwright/test";

export class BasePage {
  constructor(page) {
    this.page = page;

    this.homeButton = page.locator(".shop-menu").getByRole("link", {name: /home/i});
  }

  async goHome() {
    await Promise.all([this.page.waitForURL(/automationexercise\.com\/?$/), this.homeButton.click()]);
    await this.page.waitForLoadState("domcontentloaded");
  }
}
