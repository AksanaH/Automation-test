import {expect} from "@playwright/test";
import {BasePage} from "./BasePage";

export class LoginPage extends BasePage {
  constructor(page) {
    super(page);

    this.loginHeading = page.getByRole("heading", {
      name: "Login to your account"
    });

    this.newUserSignUpHeading = page.getByRole("heading", {name: "New User Signup!"});
    this.loginEmailInput = page.locator("form[action='/login'] input[type='email']");
    this.loginPasswordInput = page.locator("form[action='/login'] input[type='password']");
    this.loginButton = page.locator("form[action='/login'] button");

    this.loginError = page.getByText("Your email or password is incorrect!");
    this.loginToYourAccountHeading = page.locator(".login-form h2");
    this.signupNameInput = page.locator("form[action='/signup'] input[name='name']");
    this.signupEmailInput = page.locator("form[action='/signup'] input[name='email']");
    this.signupButton = page.locator("form[action='/signup'] button");
  }

  async assertLoaded() {
    await expect(this.loginHeading).toBeVisible({timeout: 15000});
  }

  async login(email, password) {
    await this.loginEmailInput.fill(email);
    await this.loginPasswordInput.fill(password);
    await this.loginButton.click();
  }
  async assertSignupBlockVisible() {
    await expect(this.newUserSignUpHeading).toBeVisible({timeout: 15000});
  }

  async assertLoginErrorVisible() {
    await expect(this.loginError).toBeVisible({timeout: 15000});
  }

  async signup(name, email) {
    await this.signupNameInput.fill(name);
    await this.signupEmailInput.fill(email);
    await this.signupButton.click();
  }
}
