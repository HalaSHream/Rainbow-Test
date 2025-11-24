import { test, expect, chromium, Browser, Page } from '@playwright/test';
import { TaskPage } from '../pages/taskPage';
import { LoginPage } from '../pages/LoginPage';
import { EnvConfig } from "../utils/envConfig";

test.describe.configure({ mode: 'serial' });
test.describe('Rainbow Task Screen Tests (Single Browser Session)', () => {
    let browser: Browser;
    let page: Page;
    let taskPage: TaskPage;
    let loginPage: LoginPage;

    test.beforeAll(async () => {
        browser = await chromium.launch();
        const context = await browser.newContext();
        page = await context.newPage();

        loginPage = new LoginPage(page);
        taskPage = new TaskPage(page);

        await page.goto('https://web.openrainbow.net');
        await loginPage.login(EnvConfig.rainbowEmail, EnvConfig.rainbowPassword);
        await taskPage.navigate();
    });

    test('Create a new task', async () => {
        const taskName = "Test Task";
        const newTask = await taskPage.createTask(taskName);
        await expect(newTask).toBeVisible();
    });

    test('Edit existing task', async () => {
        await taskPage.editTask('Updated Task');
        const updatedTask = taskPage.page.locator('h4.todoCell-title--personal', { hasText: 'Updated Task' });
        await expect(updatedTask).toBeVisible();
    });

    test('Delete a task', async () => {
        await taskPage.deleteTask('Updated Task');
        const deletedTask = taskPage.page.locator('h4.todoCell-title--personal', { hasText: 'Updated Task' });
        await expect(deletedTask).toHaveCount(0);
    });

    test('View completed tasks', async () => {
        await taskPage.completedTasks();
    });

    test('Create a new Category', async () => {
        await taskPage.createCategory();
    });

    test.afterAll(async () => {
        await browser.close();
    });
});