import { test } from "@playwright/test";
import { HomePage } from "../pages/HomePage";

test.describe("Subscription", () => {
    test.beforeEach(async ({ page }) => {
        await page.goto("/");
    });

    test("Verify Subscription in home page", async ({ page }) => {
        const home = new HomePage(page);
        // 3. Verify that home page is visible successfully
        await home.assertLoaded();

        // 4-5. Scroll down + verify 'SUBSCRIPTION'
        await home.assertSubscriptionVisible();

        // 6. Enter email + click arrow button
        await home.subscribe(`aksana${Date.now()}@gmail.com`);

        // 7. Verify success message
        await home.assertSubscriptionSuccess();
    });
});