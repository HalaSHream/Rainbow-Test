import { Page, Locator, expect } from '@playwright/test';

export class CreateBubblePage {
    constructor(public page: Page) { }

async createBubble() {
    await this.page.getByRole('button', { name: 'Collaborate with bubbles' }).click();

    await this.page.getByRole('button', { name: 'Create a bubble' }).click();

    const bubbleName = this.page.getByRole('textbox', { name: 'Bubble name' });
    await bubbleName.fill("final Test");
    await bubbleName.press('Tab');

    const bubbleSubject = this.page.getByRole('textbox', { name: 'Bubble subject (optional)' });
    await bubbleSubject.fill("Done");
    await bubbleSubject.press('Tab');

    const nextButton = this.page.getByRole('button', { name: 'Next' });
    await nextButton.waitFor({ state: 'visible' });
    await nextButton.click({ force: true });

    await this.page.waitForTimeout(2000);
    await this.page.getByRole('button', { name: 'Next' }).click();
    await this.page.waitForTimeout(2000);
    await this.page.getByRole('button', { name: 'Next' }).click();

    await this.page.getByRole('button', { name: 'Create', exact: true }).click();
   
  await expect(this.page).toHaveURL(/conversation/);


}


  async leaveBubbleSubjectblank(){
    await this.page.getByRole('button', { name: 'Collaborate with bubbles' }).click();
    await this.page.getByRole('button', { name: 'Create a bubble' }).click();
    await this.page.waitForTimeout(1000);
    await this.page.getByRole('textbox', { name: 'Bubble name' }).fill("TestHHALAA");
    await this.page.getByRole('button', { name: 'Next' }).click();
    await this.page.waitForTimeout(2000);
    await this.page.getByRole('button', { name: 'Next' }).click();
    await this.page.waitForTimeout(2000);
    await this.page.getByRole('button', { name: 'Create', exact: true }).click();


  }


  async bubbleNamelessThan3Letters(){
   await this.page.getByRole('button', { name: 'Collaborate with bubbles' }).click();
   await this.page.getByRole('button', { name: 'Create a bubble' }).click();
   await this.page.waitForTimeout(1000);
   await this.page.getByRole('textbox', { name: 'Bubble name' }).fill('hi');
   await this.page.waitForTimeout(2000);
   await this.page.getByText('Bubble name must be at least').isVisible();
   await this.page.waitForTimeout(2000);
  }

    
 async arabicBubbleName(){
  await this.page.getByRole('button', { name: 'Collaborate with bubbles' }).click();

    await this.page.getByRole('button', { name: 'Create a bubble' }).click();

    const bubbleName = this.page.getByRole('textbox', { name: 'Bubble name' });
    await bubbleName.fill("اختبار اللغة العربية");
    await bubbleName.press('Tab');

    const bubbleSubject = this.page.getByRole('textbox', { name: 'Bubble subject (optional)' });
    await bubbleSubject.fill("لا يوجد");
    await bubbleSubject.press('Tab');

    const nextButton = this.page.getByRole('button', { name: 'Next' });
    await nextButton.waitFor({ state: 'visible' });
    await nextButton.click({ force: true });

    await this.page.waitForTimeout(2000);
    await this.page.getByRole('button', { name: 'Next' }).click();
    await this.page.waitForTimeout(2000);
    await this.page.getByRole('button', { name: 'Next' }).click();

    await this.page.getByRole('button', { name: 'Create', exact: true }).click();
   
  await expect(this.page).toHaveURL(/conversation/);


 }


  async deleteBubble(){
  await this.page.getByRole('button', { name: 'Collaborate with bubbles' }).click();
  await this.page.getByLabel('t1t1').getByRole('button', { name: 'Advanced options' }).click();
  await this.page.getByLabel('t1t1').getByText('Delete bubble').click();
  await this.page.waitForTimeout(2000);
  await this.page.getByRole('button', { name: 'Delete' }).click();
  await this.page.waitForTimeout(2000);
  }



async editBubbleName() {
  await this.page.getByRole('button', { name: 'Collaborate with bubbles' }).click();
  await this.page.getByLabel('t1t1').getByRole('button', { name: 'Advanced options' }).click();
  await this.page.getByLabel('t1t1').getByText('Edit bubble info').click();

  const nameInput = this.page.getByRole('textbox', { name: 'Bubble name' });

  await nameInput.click();
  await nameInput.press('Control+A'); 
  await nameInput.press('Backspace');
  await nameInput.fill('dooone');
  await nameInput.press('Enter');

  const applyBtn = this.page.getByRole('button', { name: 'Apply' });
  await expect(applyBtn).toBeEnabled();
  await applyBtn.click();

 await expect(
  this.page.locator('[aria-label="t1t1"]')
).toContainText('dooone');
}



async editBubbleSubject() {
  await this.page.getByRole('button', { name: 'Collaborate with bubbles' }).click();
  await this.page.getByLabel('t1t1').getByRole('button', { name: 'Advanced options' }).click();
  await this.page.getByLabel('t1t1').getByText('Edit bubble info').click();

  const subjectInput = this.page.getByRole('textbox', { name: 'Bubble subject (optional)' });

  await subjectInput.click();
  await subjectInput.fill("The subject has been modified");
  await subjectInput.press('Enter');

  const applyBtn = this.page.getByRole('button', { name: 'Apply' });
  await expect(applyBtn).toBeEnabled();

  await Promise.all([
    this.page.waitForResponse(res =>
      res.url().includes('/bubbles') && res.status() === 200
    ),
    applyBtn.click(),
  ]);

  await this.page.reload();
  await expect(
    this.page.getByRole('textbox', { name: 'Bubble subject (optional)' })
  ).toHaveValue("The subject has been modified");
}


async editBubbleAvatar() {
  await this.page.getByRole('button', { name: 'Collaborate with bubbles' }).click();
  await this.page.getByLabel('t1t1').getByRole('button', { name: 'Advanced options' }).click();
  await this.page.getByLabel('t1t1').getByText('Edit bubble info').click();

  await this.page.getByRole('button', { name: 'Change avatar' }).click();

  await this.page.locator('.imagesGridComponent_listitem--img').first().click();

  const applyBtn = this.page.getByRole('button', { name: 'Apply' });
  await expect(applyBtn).toBeEnabled();

  await Promise.all([
    this.page.waitForResponse(res =>
      res.url().includes('avatar') && res.status() === 200
    ),
    applyBtn.click(),
  ]);

  await this.page.reload();

 await expect(
  this.page.locator('[aria-label="t1t1"] img')
).toBeAttached();

}




  }
