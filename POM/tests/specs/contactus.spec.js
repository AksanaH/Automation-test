import {test, expect} from "@playwright/test";
import {HomePage} from "../pages/HomePage";
import {ContactUsPage} from "../pages/ContactUsPage";
import {contactFormData} from "../data/formData";

test.describe("Contact Us Form", () => {
  test.beforeEach(async ({page}) => {
    await page.goto("/");
  });

  test("Filling out Contact Us Form", async ({page}) => {
    const home = new HomePage(page);
    const contactUs = new ContactUsPage(page);

    await home.assertLoaded();
    await home.openContactUs();
    await contactUs.assertContactUsPageLoaded();

    await contactUs.fillForm(contactFormData);
    await contactUs.uploadFile("tests/fixtures/TC_1.png");
    await expect(contactUs.uploadFileInput).toHaveValue(/TC_1\.png$/i);

    page.once("dialog", async dialog => {
      await dialog.accept();
    });

    await contactUs.submitForm();
    await contactUs.assertSuccessMessageVisible();
    await contactUs.goHome();
    await home.assertLoaded();
  });
});
