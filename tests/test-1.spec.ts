import { test, expect } from "@playwright/test";

test("test", async ({ page }) => {
  await page.goto("https://practicesoftwaretesting.com/");
  await page.getByTestId("nav-sign-in").click();
  await page.getByTestId("register-link").click();
  await page.getByTestId("first-name").fill("Test");
  await page.getByTestId("last-name").fill("User");
  await page.getByTestId("dob").fill("2000-02-04");
  await page.getByTestId("dob").press("Enter");
  await page.getByTestId("country").selectOption("US");
  await page.getByTestId("postal_code").click();
  await page.getByTestId("postal_code").fill("55555");
  await page.getByTestId("house_number").fill("11");
  await page.getByTestId("street").fill("101 Testing Way");
  await page.getByTestId("city").fill("New York");
  await page.getByTestId("state").fill("New York");
  await page.getByTestId("phone").fill("5555555");
  await page.getByTestId("email").fill("testlinkedinlearningdata@test.com");
  await page.getByTestId("password").fill("Lovetest1104$");
  await page.getByTestId("register-submit").click();
});
