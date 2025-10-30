
import { Page } from "@playwright/test";

export class verifyPage{
    constructor(private page: Page) {}

    async completeVerify(code: string, password: string) {
       await this.page.locator('#codeInput').fill(code);
       await this.page.waitForTimeout(1000);

       const Password = await this.page.locator('#pwdInput');
       await Password.click();
       await Password.fill(password);
       await this.page.waitForTimeout(1000);

       const checkboxLocator = this.page.locator('label:has-text("I have read and agree")');
       await checkboxLocator.click();
       await this.page.waitForTimeout(1000);

       await this.page.getByRole('button', { name: 'Continue' }).click();
    }
}
