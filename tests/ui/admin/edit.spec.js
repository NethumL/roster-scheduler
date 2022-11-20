import { expect } from '@playwright/test';
import test from '../fixtures';
import { login } from '../util';

test.describe('/admin/edit', () => {
  test('should show edit page', async ({ page, baseURL }) => {
    const credentials = { username: 'admin', password: 'password' };

    await login(page, baseURL, credentials);
    await page.goto('/admin/edit');
    expect(page.url()).toBe(baseURL + '/admin/edit');
    await expect(page.locator('.MuiTypography-h4')).toHaveText('Edit Users');
    await expect(page.getByText('Doctor 1')).toBeVisible();
    await expect(page.getByText('Doctor 2')).toBeVisible();
    await expect(page.getByText('Doctor 3')).toBeVisible();
    await expect(page.getByText('Consultant 1')).toBeVisible();
    await expect(page.getByText('Consultant 2')).toBeVisible();
  });
});
