import { Page } from "@playwright/test";

export class TaskPage {
    constructor(public page: Page) { }

    async navigate() {
        await this.page.getByRole('button', { name: 'Tasks' }).click();
    }

    async createTask(name: string) {
        await this.page.waitForTimeout(1000);
        await this.page.locator('rb-button').getByRole('button', { name: 'Create a task' }).click();
        await this.page.getByRole('textbox', { name: 'Note' }).fill(name);
        await this.page.getByRole('button', { name: 'Create', exact: true }).click();
        await this.page.waitForTimeout(1000);
        return this.page.getByText(name, { exact: true });
    }


    async editTask(newName: string) {
        await this.page.getByLabel('Test Task', { exact: true }).getByRole('button', { name:'Advanced options' }).click();
        await this.page.getByRole('menu').getByText('Edit').click();
        await this.page.getByRole('textbox', { name: 'Note' }).fill(newName);
        await this.page.getByRole('button', { name: 'Apply' }).click();
        await this.page.waitForTimeout(1000);
    }

    async deleteTask(name: string) {
        await this.page.waitForTimeout(1000);
        await this.page.getByLabel('Updated Task', { exact: true }).getByRole('button', { name:'Advanced options' }).click();
        await this.page.getByRole('menuitem', { name: 'Delete from tasks' }).getByRole('img').click();
        await this.page.getByRole('button', { name:'Delete', exact: true }).click();
        await this.page.waitForTimeout(1000);
    }

    async createCategory() {
        await this.page.getByRole('button', { name: 'Advanced options' }).first().click();

        await this.page.getByRole('menu', { name: 'Advanced options ' }).click();
        await this.page.waitForSelector('text= New category', { timeout: 5000 });

        const nameInput = this.page.getByRole('textbox', { name: 'Name' });
        await nameInput.click();
        await nameInput.fill('');
        await nameInput.type('test', { delay: 100 });

        await this.page.getByRole('button', { name: 'Create', exact: true }).click();
        await this.page.waitForSelector('text=test', { timeout: 10000 });
    }




    async completedTasks() {
        await this.page.locator('div').filter({ hasText: 'All tasks ' }).nth(2).click();
        await this.page.waitForTimeout(1000);
        await this.page.getByRole('complementary').getByRole('paragraph').filter({ hasText: 'Terminated tasks ' }).click();
    }

}