import { expect } from "@playwright/test";
import { BasePage } from "./BasePage";

export class CartPage extends BasePage {
    constructor(page) {
        super(page);
        this.subscriptionTitle = page.getByRole("heading", { name: "SUBSCRIPTION" });
        this.subscriptionEmail = page.locator("#susbscribe_email");
        this.subscriptionArrowBtn = page.locator("#subscribe");
        this.subscriptionSuccess = page.locator("#success-subscribe");

    }

    async scrollToSubscription() {
        await this.subscriptionTitle.scrollIntoViewIfNeeded();
    }

    async assertSubscriptionInCartPageVisible() {
        await this.scrollToSubscription();
        await expect(this.subscriptionTitle).toBeVisible();
    }

    async enterEmail(email) {
        await this.scrollToSubscription();
        await this.subscriptionEmail.fill(email);
        await this.subscriptionArrowBtn.click();
    }

    async assertSuccessMessage() {
        // success блок появляется внутри #success-subscribe
        await expect(this.subscriptionSuccess).toBeVisible({ timeout: 15000 });
        await expect(this.subscriptionSuccess).toContainText(
            "You have been successfully subscribed!"
        );
    }
}