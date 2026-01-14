import { test, expect } from "@playwright/test";

test.describe("Tests", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  })
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
    await emailInputSignUpField.fill("aksana11@gmail.com");
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

  });

  test("Login user with correct email and password", async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'AutomationExercise' })).toBeVisible();
    await (page.getByRole('link', { name: ' Signup / Login' })).click();
    await expect(page).toHaveURL('https://www.automationexercise.com/login');
    await expect(page.getByRole('heading', { name: 'Login to your account' })).toBeVisible();
    const emailInputField = page.locator("form[action = '/login'] input[type = 'email']");
    await emailInputField.fill("aksana11@gmail.com");
    const passwordInputField = page.locator("form[action = '/login'] input[type = 'password']");
    await passwordInputField.fill("12345");
    const loginButton = page.locator("form[action = '/login'] button");
    await loginButton.click();
    const loggedInText = page.locator('.navbar-nav li:last-child a');
    await expect(loggedInText).toHaveText(' Logged in as Aksana Hlebik')
    const deleteAccountButton = page.locator('.navbar-nav li:nth-child(5)');
    await deleteAccountButton.click();
    await expect(page.locator('h2 b')).toHaveText('ACCOUNT DELETED!');

  })
});