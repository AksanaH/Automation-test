import {test} from "@playwright/test";
import {HomePage} from "../pages/HomePage";
import {CartPage} from "../pages/CartPage";

test.describe("Subscription in cart page", () => {
  test.beforeEach(async ({page}) => {
    await page.goto("/");
  });

  test("Verify Subscription in cart page", async ({page}) => {
    const home = new HomePage(page);
    const cart = new CartPage(page);
    // 3. Verify that home page is visible successfully
    await home.assertLoaded();
    await home.openCart();

    // 4-5. Scroll down + verify 'SUBSCRIPTION'
    await cart.assertSubscriptionInCartPageVisible();

    // 6. Enter email + click arrow button
    await cart.enterEmail(`aksana${Date.now()}@gmail.com`);

    // 7. Verify success message
    await cart.assertSuccessMessage();
  });
});
