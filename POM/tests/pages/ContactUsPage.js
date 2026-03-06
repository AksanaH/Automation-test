import {expect} from "@playwright/test";
import {BasePage} from "./BasePage";
import path from "node:path";

export class ContactUsPage extends BasePage {
  constructor(page) {
    super(page);
    this.headingContactUsPage = page.getByRole("heading", {name: "Get In Touch"});
    this.contactUsNameInput = page.locator("form[action='/contact_us'] input[name='name']");
    this.contactUsEmailInput = page.locator("form[action='/contact_us'] input[name='email']");
    this.contactUsSubjectInput = page.locator("form[action='/contact_us'] input[name='subject']");
    this.contactUsMessageInput = page.locator("form[action='/contact_us'] textarea[name='message']");
    this.uploadFileInput = page.locator("input[name='upload_file']");
    this.submitButton = page.locator("input[type='submit']");
    this.successMessage = page.locator("#contact-page .status.alert.alert-success");
  }
  async assertContactUsPageLoaded() {
    await expect(this.headingContactUsPage).toBeVisible();
  }

  async fillForm(data) {
    await this.contactUsNameInput.fill(data.name);
    await this.contactUsEmailInput.fill(data.email);
    await this.contactUsSubjectInput.fill(data.subject);
    await this.contactUsMessageInput.fill(data.message);
  }

  async uploadFile(filePath) {
    await this.uploadFileInput.setInputFiles(filePath);
  }

  async submitForm() {
    await this.submitButton.click();
  }
  async assertSuccessMessageVisible() {
    await expect(this.successMessage).toBeVisible({timeout: 30000});
  }
}
