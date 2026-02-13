import { test } from "@playwright/test";
import { HomePage } from "../pages/HomePage";
import { LoginPage } from "../pages/LoginPage";
import { LoggedInPage } from "../pages/LoggedInPage";

test.describe("Login user with correct email and password", () => {
    test.beforeEach(async ({ page }) => {
        await page.goto("/");
    });

    test("Login user with correct email and password", async ({ page }) => {
        const home = new HomePage(page);
        const login = new LoginPage(page);
        const loggedIn = new LoggedInPage(page);

        await home.assertLoaded();
        await home.openSignupLogin();

        await login.assertLoaded();
        await login.login("aksana112@gmail.com", "12345");

        await loggedIn.assertLoggedInAs("Aksana");
    });
});