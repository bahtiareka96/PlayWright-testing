import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    await page.goto('https://magento.softwaretestingboard.com/');
})


test('Create user', async ({ page }) => {
    await expect(page.getByText('Home Page')).toBeVisible();

    await page.getByRole('link', { name: 'Create an Account' }).click();
    await expect(page.getByRole('heading', { name: 'Create New Customer Account' })).toBeVisible();
})

