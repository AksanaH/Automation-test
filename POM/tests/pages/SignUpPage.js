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

  async fillAccountInfo() {
    await this.titleMrsRadio.check();
    await this.password.fill("12345");

    await this.days.selectOption("9");
    await expect(this.days).toHaveValue("9");

    await this.months.selectOption("8");
    await expect(this.months).toHaveValue("8");

    await this.years.selectOption("1992");
    await expect(this.years).toHaveValue("1992");

    await this.newsletter.check();

    await this.firstName.fill("Aksana");
    await this.lastName.fill("Hlebik");
    await this.company.fill("WWW");
    await this.address1.fill("111 ABC Ave");
    await this.address2.fill("apt 111");

    await this.country.selectOption("United States");
    await expect(this.country).toHaveValue("United States");

    await this.state.fill("Texas");
    await this.city.fill("Houston");
    await this.zipcode.fill("78787");
    await this.mobileNumber.fill("512-512-5522");
  }

  async createAccount() {
    await this.createAccountBtn.click();
  }
}
