import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { PlaywrightBlocker } from '@ghostery/adblocker-playwright';
import fetch from 'cross-fetch';
import fs from 'fs';
import path from 'path';


let blocker;

const usersFilePath = path.join('fixtures', 'users.json');
const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

test.beforeAll(async ({ browser }) => {
    blocker = await PlaywrightBlocker.fromPrebuiltAdsAndTracking(fetch);
});

// Use a simpler beforeEach to only handle the ad blocker setup
test.beforeEach(async ({ page }) => {
    await blocker.enableBlockingInPage(page);
});

test.describe('Create Account with Data', () => {
    test('Create a new user account successfully', async ({ page }) => {
        // Navigate to the form to get a fresh, valid form key
        await page.goto('https://magento.softwaretestingboard.com/customer/account/create/');

        const firstName = faker.person.firstName();
        const lastName = faker.person.lastName();
        const email = faker.internet.email({ firstName, lastName });
        const password = faker.internet.password({ length: 12, pattern: /[A-Za-z0-9!@#$%^&*-]/ });

        await page.fill('#firstname', firstName);
        await page.fill('#lastname', lastName);
        await page.fill('#email_address', email);
        await page.fill('#password', password);
        await page.fill('#password-confirmation', password);

        await page.click('button.action.submit.primary');

        const successMessage = page.locator('.message-success');
        await expect(successMessage).toBeVisible();
        await expect(successMessage).toContainText('Thank you for registering with Main Website Store.');
    });

    test('Create a new user account with JSON', async ({ page }) => {
        // Navigate to the form to get a fresh, valid form key
        await page.goto('https://magento.softwaretestingboard.com/customer/account/create/');

        // Use the first user object from the array
        const user = users[0];
        // Generate a dynamic email to avoid duplicate account errors
        const uniqueEmail = faker.internet.email({ firstName: user.firstName, lastName: user.lastName, provider: 'test.com' });

        await page.fill('#firstname', user.firstName);
        await page.fill('#lastname', user.lastName);
        await page.fill('#email_address', uniqueEmail);
        await page.fill('#password', user.password);
        await page.fill('#password-confirmation', user.password);

        await page.click('button.action.submit.primary');

        const successMessage = page.locator('.message-success');
        await expect(successMessage).toBeVisible();
        await expect(successMessage).toContainText('Thank you for registering with Main Website Store.');
    });
});