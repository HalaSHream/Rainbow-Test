
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




//BUG
test('Entering an incorrect email address and pressing Continue', async ({ page }) => {
const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login("shreamhala004@g","9m9qVrVRZ")
  await loginPage.expectError();


});





