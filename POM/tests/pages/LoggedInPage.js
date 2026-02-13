import { expect } from "@playwright/test";
import { BasePage } from "./BasePage";

export class LoggedInPage extends BasePage {
    constructor(page) {
        super(page);

        this.loggedInAs = page.locator('.navbar-nav li:last-child a');
    }

    async assertLoggedInAs(name) {
        await expect(this.loggedInAs).toHaveText(`Logged in as ${name}`);
    }
}