import { expect } from "@playwright/test";
import { BasePage } from "./BasePage";

export class HomePage extends BasePage {
    constructor(page) {
        super(page);
        this.heading = page.getByRole("heading", { name: "AutomationExercise" });
        this.signupLoginLink = page.getByRole("link", { name: /Signup \/ Login/i });
    }

    async assertLoaded() {
        await expect(this.heading).toBeVisible();
    }

    async openSignupLogin() {
        await this.signupLoginLink.click();
    }
}