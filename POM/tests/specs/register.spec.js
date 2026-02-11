import { test } from "@playwright/test";
import { HomePage } from "../pages/HomePage";
import { LoginPage } from "../pages/LoginPage";
import { SignupPage } from "../pages/SignUpPage";
import { AccountCreatedPage } from "../pages/AccountCreatedPage";

test.describe("Register", () => {
    test.beforeEach(async ({ page }) => {
        await page.goto("/");
    });

    test("register user", async ({ page }) => {
        const home = new HomePage(page);
        const login = new LoginPage(page);
        const signup = new SignupPage(page);
        const created = new AccountCreatedPage(page);

        await home.assertLoaded();
        await home.openSignupLogin();

        await login.assertNewUserSignupVisible();
        await login.signup("Aksana", "aksana112@gmail.com");

        await signup.assertLoaded();
        await signup.fillAccountInfo();
        await signup.createAccount();

        await created.assertAccountCreatedVisible();
    });
});
