import { expect, test } from '@playwright/test';
import { CreateBubblePage } from '../pages/CreateBubblePage';
import { LoginPage } from '../pages/LoginPage';

let createBubblePageObj: CreateBubblePage;
let loginPage: LoginPage;

test.beforeEach(async ({ page }) => {
  createBubblePageObj = new CreateBubblePage(page);
  loginPage = new LoginPage(page);

  await loginPage.goto();  
  await loginPage.login("shreamhala004@gmail.com", "9m9qVrVRZ-T8SxV");
  await page.waitForURL("**/main/home");
});


test.describe('Bubble Creation Group', () => {

  test('create Bubble ', async () => {
    await createBubblePageObj.createBubble();
  });

  test('Create bubble with subject empty ', async () => {
    await createBubblePageObj.leaveBubbleSubjectblank();
  });

  test('Create bubble with name less than 3 letters', async () => {
    await createBubblePageObj.bubbleNamelessThan3Letters();
  });


  test('create Bubble with arabic name ', async () => {
    await createBubblePageObj.arabicBubbleName();
  });
  



 test('Create two bubbles with the same name via form', async ({ page }) => {
  const createBubblePage = new CreateBubblePage(page);
  await createBubblePage.createBubble();
  await expect(page).toHaveURL(/conversation/);
  await page.getByRole('button', { name: 'Collaborate with bubbles' }).click();
  await page.getByRole('button', { name: 'Create a bubble' }).click();
  await createBubblePage.createBubble();
  await expect(page).toHaveURL(/conversation/);
});

});


test.describe('Bubble Management Group', () => {

test('Deleta Bubble',async({page})=>{
await createBubblePageObj.deleteBubble();
});

  
test('Edit Bubble Name',async({page})=>{
await createBubblePageObj.editBubbleName();
});


test('Edit Bubble Avatar',async({page})=>{
await createBubblePageObj.editBubbleAvatar();
});



test('edit subject',async({page})=>{
  await createBubblePageObj.editBubbleSubject();

});

});