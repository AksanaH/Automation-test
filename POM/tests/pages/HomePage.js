import {expect} from "@playwright/test";
import {BasePage} from "./BasePage";

export class HomePage extends BasePage {
  constructor(page) {
    super(page);
    this.heading = page.getByRole("heading", {name: "AutomationExercise"});
    this.signupLoginLink = page.getByRole("link", {name: /Signup \/ Login/i});
    this.subscriptionTitle = page.getByRole("heading", {name: "SUBSCRIPTION"});
    this.subscriptionEmail = page.locator("#susbscribe_email");
    this.subscriptionArrowBtn = page.locator("#subscribe");
    this.subscriptionSuccess = page.locator("#success-subscribe");
    this.cartLink = page.getByRole("link", {name: "Cart"});
    this.contactUsButton = page.locator('a[href="/contact_us"]');
  }

  async assertLoaded() {
    await expect(this.heading).toBeVisible();
  }

  async openSignupLogin() {
    await this.signupLoginLink.click();
  }

  async scrollToSubscription() {
    await this.subscriptionTitle.scrollIntoViewIfNeeded();
  }

  async assertSubscriptionVisible() {
    await this.scrollToSubscription();
    await expect(this.subscriptionTitle).toBeVisible();
  }

  async subscribe(email) {
    await this.scrollToSubscription();
    await this.subscriptionEmail.fill(email);
    await this.subscriptionArrowBtn.click();
  }

  async assertSubscriptionSuccess() {
    // success блок появляется внутри #success-subscribe
    await expect(this.subscriptionSuccess).toBeVisible({timeout: 15000});
    await expect(this.subscriptionSuccess).toContainText("You have been successfully subscribed!");
  }

  async openCart() {
    await this.cartLink.click();
  }

  async openContactUs() {
    await this.contactUsButton.click();
  }
}
