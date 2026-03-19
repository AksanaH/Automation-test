import {test, expect} from "@playwright/test";

test("GET products list API", async ({request}) => {
  const response = await request.get("https://automationexercise.com/api/productsList");

  expect(response.ok()).toBeTruthy();
  expect(response.status()).toBe(200);

  const body = await response.text();
  expect(body).toContain("products");
});
