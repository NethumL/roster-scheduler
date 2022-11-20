import { expect } from '@playwright/test';
import test from '../fixtures';
import { login } from '../util';

test.describe('/admin/new-users', () => {
  test('should show new users page', async ({ page, baseURL }) => {
    const credentials = { username: 'admin', password: 'password' };

    await login(page, baseURL, credentials);
    await page.goto('/admin/new-users');
    expect(page.url()).toBe(baseURL + '/admin/new-users');
    await expect(page.locator('.MuiTypography-h4')).toHaveText('New Users');

    await expect(page.getByText('Doctor 4')).toBeVisible();
    await expect(page.getByText('Username: doctor4')).toBeVisible();

    await expect(page.getByText('Doctor 5')).toBeVisible();
    await expect(page.getByText('Username: doctor5')).toBeVisible();

    await expect(page.getByText('Consultant 3')).toBeVisible();
    await expect(page.getByText('Username: consultant3')).toBeVisible();
  });
});
