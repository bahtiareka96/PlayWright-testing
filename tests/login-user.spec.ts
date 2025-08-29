import { test, expect } from '@playwright/test';
import { beforeEach } from 'node:test';
import { PlaywrightBlocker } from '@ghostery/adblocker-playwright';
import fetch from 'cross-fetch';
import fs from 'fs';
import path from 'path';

const usersFilePath = path.join(__dirname, '..', 'fixtures', 'registered_users.json');
const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

let blocker

test.beforeAll(async ({ browser }) => {
    blocker = await PlaywrightBlocker.fromPrebuiltAdsAndTracking(fetch);
});

// Use a simpler beforeEach to only handle the ad blocker setup
test.beforeEach(async ({ page }) => {
    await blocker.enableBlockingInPage(page);
});



test.describe('Login Page Test', () => {
    test('Login using registered user', async ({ page }) => {
        await page.goto('https://magento.softwaretestingboard.com/customer/account/login/referer/aHR0cHM6Ly9tYWdlbnRvLnNvZnR3YXJldGVzdGluZ2JvYXJkLmNvbS8%2C/');

        const randomIndex = Math.floor(Math.random() * users.length);
        const user = users[randomIndex];
        await page.getByRole('textbox', { name: 'Email*' }).fill(user.email);
        await page.getByRole('textbox', { name: 'Password*' }).fill(user.password);
        await page.locator('div').filter({ hasText: /^Sign In$/ }).click();
        await expect(page.locator('#maincontent > div.page-title-wrapper > h1 > span')).toContainText('Home Page');
        // const successMessage = page.locator('.message-success');
        // await expect(successMessage).toBeVisible();
    });
        
})


