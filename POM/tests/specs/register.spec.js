import {test} from "@playwright/test";
import {HomePage} from "../pages/HomePage";
import {LoginPage} from "../pages/LoginPage";
import {SignupPage} from "../pages/SignUpPage";
import {AccountCreatedPage} from "../pages/AccountCreatedPage";
import {user} from "../data/userData.js";
import {buildUser} from "../data/userFactory.js";

test.describe("Register", () => {
  test.beforeEach(async ({page}) => {
    await page.goto("/");
  });

  test("register user", async ({page}) => {
    const home = new HomePage(page);
    const login = new LoginPage(page);
    const signup = new SignupPage(page);
    const created = new AccountCreatedPage(page);
    const user = buildUser();

    await home.assertLoaded();
    await home.openSignupLogin();

    await login.assertSignupBlockVisible();
    await login.signup(user.name, user.email);
    await signup.assertLoaded();
    await signup.fillAccountInfo(user); // можно передать объект с данными
    await signup.createAccount();

    await created.assertAccountCreatedVisible();
  });
});
