import {test} from "@playwright/test";
import {HomePage} from "../pages/HomePage";
import {LoginPage} from "../pages/LoginPage";
import {SignupPage} from "../pages/SignUpPage";
import {AccountCreatedPage} from "../pages/AccountCreatedPage";

test.describe("Register", () => {
  test.beforeEach(async ({page}) => {
    await page.goto("/");
  });

  test("register user", async ({page}) => {
    const home = new HomePage(page);
    const login = new LoginPage(page);
    const signup = new SignupPage(page);
    const created = new AccountCreatedPage(page);

    const email = `aksana${Date.now()}@gmail.com`;

    await home.assertLoaded();
    await home.openSignupLogin();

    await login.assertSignupBlockVisible();
    await login.signup("Aksana", email);
    await signup.assertLoaded();
    await signup.fillAccountInfo(); // можно передать объект с данными
    await signup.createAccount();

    await created.assertAccountCreatedVisible();
  });
});
