
import { Page } from "@playwright/test";

export class signUpPage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto('https://web.openrainbow.net/rb/2.163.0/index.html#/login');
  }

  async goToSignUp() {
    await this.page.locator('#notAlreadyAnAccount_buttonId').click();
  }

  async enterNewEmail(email: string) {
    await this.page.locator("#inputEmail").fill(email);
    await this.page.getByRole('button', { name: 'Continue' }).click();
    await this.page.waitForSelector('#codeInput', { state: 'visible', timeout: 20000 });
  }
}
