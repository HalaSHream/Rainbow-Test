import { Page, Locator, expect } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly continueButton: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly errorMessage: Locator;
  readonly forgotButton:Locator;
  readonly logo:Locator;
  readonly testLogo:Locator;
  readonly signUpButton:Locator;
  readonly signUpEmail:Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.locator('#username');
    this.continueButton =page.getByRole('button', { name: 'continue' });
    this.passwordInput = page.locator('#authPwd');
    this.loginButton =page.getByRole('button', { name: 'connect' });
    this.errorMessage = page.locator('text=Incorrect username or password');
    this.forgotButton=page.getByRole('button', { name: 'Forgot your password?'});
    this.logo=page.getByRole('complementary').locator('img');
    this.testLogo=page.getByRole('button', { name: 'Pro Santé Connect Authentication Method' });
    this.signUpButton=page.locator('#notAlreadyAnAccount_buttonId');
    this.signUpEmail=page.locator('#inputEmail');
  }

  async goto() {
    await this.page.goto('https://web.openrainbow.net/rb/2.163.0/index.html#/login');
    
  }


async login(username: string, password: string) {
await this.page.locator("#username").fill(username);
await this.page.getByRole('button',{name:'Continue'}).click();
await this.page.locator("#authPwd").fill(password);
await this.page.getByRole('button',{name:'Connect',exact:true}).click();
}

 async expectError() {
    await expect(this.errorMessage).toBeVisible();
  }

  async expectHomePage() {
    await expect(this.page).toHaveURL('https://web.openrainbow.net/rb/2.163.0/index.html#/main/home');
  }


  async expectForgot(username: string){
    await this.page.locator("#username").fill(username);
    await this.page.getByRole('button',{name:'Continue'}).click();
    await expect(this.forgotButton).toBeVisible();
    await this.page.getByRole('button', { name:'Forgot your password?'}).click();
    await this.page.goto('https://web.openrainbow.net/rb/2.163.2/index.html#/lostPassword');

  }

 async expectLogo(){
        await expect(this.logo).toBeVisible();

 }

  async expectTestLogo(){
        await expect(this.testLogo).toBeVisible();

 }




        async expectsignUpButton() {
    await expect(this.signUpButton).toBeVisible({ timeout: 15000 });
    await this.signUpButton.click();

    // الانتظار للصفحة الجديدة بدل timeout ثابت
    await expect(this.page.locator('#inputEmail')).toBeVisible({ timeout: 20000 });
}




 async enterNewEmail(Email:string){
   // await expect(this.signUpEmail).toBeVisible();
   await this.page.locator("#inputEmail").fill(Email)
   await this.page.getByRole('button',{name:'Continue'}).click();
        
}
 



}