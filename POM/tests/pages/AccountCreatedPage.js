import {expect} from "@playwright/test";
import {BasePage} from "./BasePage";

export class AccountCreatedPage extends BasePage {
  constructor(page) {
    super(page);
    this.accountCreatedHeading = page.locator('h2[data-qa="account-created"]');
  }

  async assertAccountCreatedVisible() {
    await expect(this.accountCreatedHeading).toBeVisible({timeout: 15000});
    await expect(this.accountCreatedHeading).toHaveText("Account Created!");
  }
}
