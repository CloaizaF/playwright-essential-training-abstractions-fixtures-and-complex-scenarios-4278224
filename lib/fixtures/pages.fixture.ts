import { AccountPage } from "@pages/account/account.page";
import { MessagesPage } from "@pages/account/messages.page";
import { ContactPage } from "@pages/contact/contact.page";
import { LoginPage } from "@pages/login/login.page";
import { test as baseTest } from "@playwright/test";

// type annotation
type MyPages = {
  loginPage: LoginPage;
  accountPage: AccountPage;
  contactPage: ContactPage;
  messagesPage: MessagesPage;
};

export const test = baseTest.extend<MyPages>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  accountPage: async ({ page }, use) => {
    await use(new AccountPage(page));
  },
  contactPage: async ({ page }, use) => {
    await use(new ContactPage(page));
  },
  messagesPage: async ({ page }, use) => {
    await use(new MessagesPage(page));
  },
});

export { expect } from "@playwright/test";
