import { expect } from "@playwright/test";
import { BasePage } from "./BasePage";

export class LoginPage extends BasePage {
    constructor(page) {
        super(page);

        this.loginHeading = page.getByRole("heading", { name: "Login to your account" });

        this.loginEmailInput = page.locator("form[action='/login'] input[type='email']");
        this.loginPasswordInput = page.locator("form[action='/login'] input[type='password']");
        this.loginButton = page.locator("form[action='/login'] button");

        this.loginError = page.getByText("Your email or password is incorrect!");
        this.loginToYourAccountHeading = page.locator(".login-form h2");
    }

    async assertLoaded() {
        await expect(this.loginHeading).toBeVisible({ timeout: 15000 });
    }

    async login(email, password) {
        await this.loginEmailInput.fill(email);
        await this.loginPasswordInput.fill(password);
        await this.loginButton.click();
    }

    async assertLoginErrorVisible() {
        await expect(this.loginError).toBeVisible({ timeout: 15000 });
    }


}