import {test} from "@playwright/test";
import {HomePage} from "../pages/HomePage";
import {LoginPage} from "../pages/LoginPage";
import {LoggedInPage} from "../pages/LoggedInPage";

test.describe("Logout user", () => {
  test.beforeEach(async ({page}) => {
    await page.goto("/");
  });

  test("Logout user from account", async ({page}) => {
    const home = new HomePage(page);
    const login = new LoginPage(page);
    const loggedIn = new LoggedInPage(page);

    await home.assertLoaded();
    await home.openSignupLogin();

    await login.assertLoaded();
    await login.login("aksana112@gmail.com", "12345");

    await loggedIn.assertLoggedInAs("Aksana");
    await login.logout();
    await login.assertLoaded();
  });
});
