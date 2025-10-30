
import { expect, test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test('The email and password are correct', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login("shreamhala004@gmail.com","9m9qVrVRZ-T8SxV")
  await page.waitForURL("**/main/home",{timeout:20000});
  expect(page.url()).toContain("/main/home");
});



test('The email is correct and the password is incorrect', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.goto();
  await loginPage.login("shreamhala004@gmail.com","9m9qVrVRZ")
  await loginPage.expectError();
});


/*test('Check logo appearance', async ({ page }) => {

const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.expectLogo();
});



test('Check test logo appearance', async ({ page }) => {

const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.expectTestLogo();
});

*/


//BUG
test('Entering an incorrect email address and pressing Continue', async ({ page }) => {
const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login("shreamhala004@g","9m9qVrVRZ")
  await loginPage.expectError();


});


test('Go to the page  "forget your password? "', async ({ page }) => {
const loginPage = new LoginPage(page);

  await loginPage.goto();
  await loginPage.expectForgot("shreamhala004@gmail.com");
   await page.waitForTimeout(6000);

});

/*
test('Dont have an account? Sign Up button working', async ({ page }) => {

const loginPage = new LoginPage(page);

  await loginPage.goto();
  await page.waitForTimeout(1000);
  await loginPage.expectsignUpButton();
  await page.waitForTimeout(6000);
  await loginPage.enterNewEmail("shreamhala004+59@gmail.com");
 // await page.waitForTimeout(6000);
  
});  


*/