import { expect } from "@playwright/test";
import { BasePage } from "./BasePage";

export class LoginPage extends BasePage {
    constructor(page) {
        super(page);

        this.newUserHeading = page.locator(".signup-form h2");
        this.nameInput = page.locator("form[action='/signup'] input[name='name']");
        this.emailInput = page.locator("form[action='/signup'] input[name='email']");
        this.signupButton = page.locator("form[action='/signup'] button");
    }

    async assertNewUserSignupVisible() {
        await expect(this.newUserHeading).toBeVisible();
    }

    async signup(name) {
        const email = `aksana${Date.now()}@gmail.com`;

        await this.nameInput.fill(name);
        await this.emailInput.fill(email);
        await this.signupButton.click();

        return email;
    }
}