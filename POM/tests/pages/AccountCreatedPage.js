import { expect } from "@playwright/test";
import { BasePage } from "./BasePage";

export class AccountCreatedPage extends BasePage {
    constructor(page) {
        super(page);
        this.heading = page.locator('h2[data-qa="account-created"]');
    }

    async assertAccountCreatedVisible() {
        await expect(this.heading).toBeVisible();
    }
}
