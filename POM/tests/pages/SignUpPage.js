import {expect} from "@playwright/test";
import {BasePage} from "./BasePage";

export class SignupPage extends BasePage {
  constructor(page) {
    super(page);

    this.enterAccountHeading = page.getByRole("heading", {name: "Enter Account Information"});

    this.titleMrsRadio = page.getByRole("radio", {name: "Mrs."});
    this.password = page.locator('input[name="password"]');

    this.days = page.locator('select[name="days"]');
    this.months = page.locator('select[name="months"]');
    this.years = page.locator('select[name="years"]');

    this.newsletter = page.getByRole("checkbox", {name: "Sign up for our newsletter!"});

    this.firstName = page.locator('input[name="first_name"]');
    this.lastName = page.locator('input[name="last_name"]');
    this.company = page.locator('input[name="company"]');
    this.address1 = page.locator('input[name="address1"]');
    this.address2 = page.locator('input[name="address2"]');
    this.country = page.locator('select[name="country"]');
    this.state = page.locator('input[name="state"]');
    this.city = page.locator('input[name="city"]');
    this.zipcode = page.locator('input[name="zipcode"]');
    this.mobileNumber = page.locator('input[name="mobile_number"]');

    this.createAccountBtn = page.locator('button[data-qa="create-account"]');
  }

  async assertLoaded() {
    await expect(this.enterAccountHeading).toBeVisible({timeout: 15000});
  }

  async fillAccountInfo(user) {
    await this.titleMrsRadio.check();
    await this.password.fill(user.password);

    await this.days.selectOption(user.day);
    await this.months.selectOption(user.month);
    await this.years.selectOption(user.year);

    await this.newsletter.check();

    await this.firstName.fill(user.firstName);
    await this.lastName.fill(user.lastName);
    await this.company.fill(user.company);
    await this.address1.fill(user.address1);
    await this.address2.fill(user.address2);

    await this.country.selectOption(user.country);

    await this.state.fill(user.state);
    await this.city.fill(user.city);
    await this.zipcode.fill(user.zipcode);
    await this.mobileNumber.fill(user.mobile);
  }

  async createAccount() {
    await this.createAccountBtn.click();
  }
}
