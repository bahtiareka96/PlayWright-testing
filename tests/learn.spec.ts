import { test, expect } from '@playwright/test';

test('learn testing magento', async ({ page }) => {
    await page.goto('https://magento.softwaretestingboard.com/');

    await expect(page).toHaveURL('https://magento.softwaretestingboard.com/');
    
});

test('open login page', async ({ page }) => {
    await page.goto('https://magento.softwaretestingboard.com/');
    await page.getByRole('link', { name: 'Sign In'}).click();

    await expect(page).toHaveURL('https://magento.softwaretestingboard.com/customer/account/login/referer/aHR0cHM6Ly9tYWdlbnRvLnNvZnR3YXJldGVzdGluZ2JvYXJkLmNvbS8%2C/');
    expect(page.getByRole("heading", { name: 'Customer Login' }));

})

