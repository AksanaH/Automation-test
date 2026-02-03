import { test, expect } from "@playwright/test";
import path from "node:path";

test.describe("Tests", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("verify page title", async ({ page }) => {
    const title = await page.title();
    console.log(title);
    expect(title).toEqual("Automation Exercise");

  });

  test("register user", async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'AutomationExercise' })).toBeVisible();
    await (page.getByRole('link', { name: ' Signup / Login' })).click();
    const newUserSignUp = page.locator('.signup-form h2');
    await expect(newUserSignUp).toBeVisible();
    const nameInputSignUpField = page.locator("form[action = '/signup'] input[name = 'name']");
    await nameInputSignUpField.fill("Aksana");
    const emailInputSignUpField = page.locator("form[action = '/signup'] input[name = 'email']");
    await emailInputSignUpField.fill("aksana112@gmail.com");
    const signUpButton = page.locator("form[action = '/signup'] button");
    await signUpButton.click();
    await expect(page.getByRole('heading', { name: 'Enter Account Information' })).toBeVisible();
    await page.getByRole('radio', { name: "Mrs." }).setChecked(true);
    await page.locator('input[name="password"]').fill('12345');
    await page.selectOption('select[name="days"]', '9');
    await expect(page.locator('select[name="days"]')).toHaveValue('9');
    await page.selectOption('select[name="months"]', '8');
    await expect(page.locator('select[name="months"]')).toHaveValue('8');
    await page.selectOption('select[name="years"]', '1992');
    await expect(page.locator('select[name="years"]')).toHaveValue('1992');
    await page.getByRole('checkbox', { name: "Sign up for our newsletter!" }).setChecked(true);
    const firstNameInput = page.locator('input[name="first_name"]');
    await firstNameInput.fill("Aksana");
    await expect(firstNameInput).toHaveValue("Aksana");
    const lastNameInput = page.locator('input[name="last_name"]');
    await lastNameInput.fill("Hlebik");
    await expect(lastNameInput).toHaveValue("Hlebik");
    const companyInput = page.locator('input[name="company"]');
    await companyInput.fill("WWW");
    await expect(companyInput).toHaveValue("WWW");
    const addressInput = page.locator('input[name="address1"]');
    await addressInput.fill("111 ABC Ave");
    await expect(addressInput).toHaveValue("111 ABC Ave");
    const address2Input = page.locator('input[name="address2"]');
    await address2Input.fill("apt 111");
    await expect(address2Input).toHaveValue("apt 111");
    await page.selectOption('select[name="country"]', 'United States');
    await expect(page.locator('select[name="country"]')).toHaveValue('United States');
    const stateInput = page.locator('input[name="state"]');
    await stateInput.fill("Texas");
    await expect(stateInput).toHaveValue("Texas");
    const cityInput = page.locator('input[name="city"]');
    await cityInput.fill("Houston");
    await expect(cityInput).toHaveValue("Houston");
    const zipcodeInput = page.locator('input[name="zipcode"]');
    await zipcodeInput.fill("78787");
    await expect(zipcodeInput).toHaveValue("78787");
    const mobileNumberInput = page.locator('input[name="mobile_number"]');
    await mobileNumberInput.fill("512-512-5522");
    await expect(mobileNumberInput).toHaveValue("512-512-5522");
    const createAccountButton = page.locator('button[data-qa="create-account"]');
    createAccountButton.click();
    const accountCreatedHeading = page.locator('h2[data-qa="account-created"]');
    await expect(accountCreatedHeading).toBeVisible();
  });

  test("Login user with correct email and password", async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'AutomationExercise' })).toBeVisible();
    await (page.getByRole('link', { name: ' Signup / Login' })).click();
    await expect(page).toHaveURL('https://www.automationexercise.com/login');
    await expect(page.getByRole('heading', { name: 'Login to your account' })).toBeVisible();
    const emailInputField = page.locator("form[action = '/login'] input[type = 'email']");
    await emailInputField.fill("aksana112@gmail.com");
    const passwordInputField = page.locator("form[action = '/login'] input[type = 'password']");
    await passwordInputField.fill("12345");
    const loginButton = page.locator("form[action = '/login'] button");
    await loginButton.click();
    const loggedInText = page.locator('.navbar-nav li:last-child a');
    await expect(loggedInText).toHaveText('Logged in as Aksana')
    const deleteAccountButton = page.locator('.navbar-nav li:nth-child(5)');
    await deleteAccountButton.click();
    await expect(page.locator('h2[data-qa="account-deleted"]')).toHaveText('Account Deleted!');
  })

  test("Login User with incorrect email and password", async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'AutomationExercise' })).toBeVisible();
    await (page.getByRole('link', { name: ' Signup / Login' })).click();
    await expect(page.getByRole('heading', { name: 'Login to your account' })).toBeVisible();
    const emailInputField = page.locator("form[action = '/login'] input[type = 'email']");
    await emailInputField.fill("aksana1122@gmail.com");
    const passwordInputField = page.locator("form[action = '/login'] input[type = 'password']");
    await passwordInputField.fill("123456");
    const loginButton = page.locator("form[action = '/login'] button");
    await loginButton.click();
    await expect(page.locator('form p', { hasText: 'Your email or password is incorrect!' })).toBeVisible();
  })

  test("Logout user", async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'AutomationExercise' })).toBeVisible();
    await (page.getByRole('link', { name: ' Signup / Login' })).click();
    await expect(page.getByRole('heading', { name: 'Login to your account' })).toBeVisible();
    const emailInputField = page.locator("form[action = '/login'] input[type = 'email']");
    await emailInputField.fill("aksana112@gmail.com");
    const passwordInputField = page.locator("form[action = '/login'] input[type = 'password']");
    await passwordInputField.fill("12345");
    const loginButton = page.locator("form[action = '/login'] button");
    await loginButton.click();
    const loggedInText = page.locator('.navbar-nav li:last-child a');
    await expect(loggedInText).toHaveText('Logged in as Aksana');
    const logoutButton = page.locator('a[href="/logout"]');
    await logoutButton.click();
  })

  test("Register User with existing email", async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'AutomationExercise' })).toBeVisible();
    await (page.getByRole('link', { name: ' Signup / Login' })).click();
    await expect(page.getByRole('heading', { name: 'New User Signup!' })).toBeVisible();
    const nameInputSignUpField = page.locator("form[action = '/signup'] input[name = 'name']");
    await nameInputSignUpField.fill("Aksana");
    const emailInputSignUpField = page.locator("form[action = '/signup'] input[name = 'email']");
    await emailInputSignUpField.fill("aksana112@gmail.com");
    const signUpButton = page.locator("form[action = '/signup'] button");
    await signUpButton.click();
    await expect(page.locator('form p', { hasText: 'Email Address already exist!' })).toBeVisible();

  })

  test("Contact Us Form", async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'AutomationExercise' })).toBeVisible();
    const contactUsButton = page.locator('a[href="/contact_us"]');
    await contactUsButton.click();
    await expect(page.getByRole('heading', { name: 'Get In Touch' })).toBeVisible();
    const nameInput = page.locator('input[name="name"]');
    await nameInput.fill("Aksana Hlebik");
    const emailInputField = page.locator("form[action = '/contact_us'] input[name = 'email']");
    await emailInputField.fill("aksana112@gmail.com");
    const subjectInputField = page.locator("form[action = '/contact_us'] input[name = 'subject']");
    await subjectInputField.fill("Test Case");
    const messageInputField = page.locator("form[action = '/contact_us'] textarea[name = 'message']");
    await messageInputField.fill("I need more Test Cases");

    const fileInput = page.locator('input[type="file"][name="upload_file"]');
    const filePath = path.resolve("tests/fixtures/TC_1.png");
    await fileInput.setInputFiles(filePath);
    await expect(fileInput).toHaveValue(/TC_1\.png$/);

    page.once("dialog", d => d.accept());

    await page.locator('input[type="submit"]').click();

    await expect(
      page.locator('div.status.alert.alert-success')
        .filter({ hasText: 'Success! Your details have been submitted successfully.' })
    ).toHaveText('Success! Your details have been submitted successfully.');

    await page.locator('a.btn.btn-success', { hasText: "Home" }).click();
    await expect(page).toHaveURL("/");
  });
})


