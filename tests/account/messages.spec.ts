import { test, expect } from "@playwright/test";
import { LoginPage } from "@pages/login/login.page";
import { registerUser } from "@datafactory/register";

test("send message with newly registered user", async ({ page, request }) => {
  const email = `testdataemail${Date.now()}@test.com`;
  const password = "Lovetest1104$";
  const message =
    "This is the test message for the playwrigth course I'm working on.";

  await registerUser(email, password);
  const apiUrl = "https://api.practicesoftwaretesting.com";
  const loginResponse = await request.post(apiUrl + "/users/login", {
    data: {
      email: email,
      password: password,
    },
  });

  expect(loginResponse.status()).toBe(200);
  const loginBody = await loginResponse.json();
  expect(loginBody.access_token).toBeTruthy();

  const messageResponse = await request.post(apiUrl + "/messages", {
    headers: {
      Authorization: `Bearer ${loginBody.access_token}`,
    },
    data: {
      name: "Tester",
      subject: "customer-service",
      message: message,
      email: email,
    },
  });

  expect(messageResponse.status()).toBe(200);
  const messageBody = await messageResponse.json();
  expect(messageBody.message).toBe(message);

  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login(email, password);

  await page.getByTestId("nav-menu").click();
  await page.getByTestId("nav-my-messages").click();
  await page.locator('a:has-text("Details")').click();

  await expect(page.locator(".card-body .card-text")).toHaveText(message);

  await page.getByTestId("message").fill("test reply");
  await page.getByTestId("reply-submit").click();
});
