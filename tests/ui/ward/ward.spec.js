import { expect } from '@playwright/test';
import test from '../fixtures';
import { login } from '../util';

test.describe('/ward', () => {
  test('should show ward page', async ({ page, baseURL }) => {
    const credentials = { username: 'admin', password: 'password' };

    await login(page, baseURL, credentials);
    await page.goto('/ward');
    expect(page.url()).toBe(baseURL + '/ward');

    await expect(page.getByText('Test Ward 1')).toBeVisible();
    await expect(page.getByText('Test Description 1')).toBeVisible();

    await expect(page.getByText('Test Ward 2')).toBeVisible();
    await expect(page.getByText('Test Description 2')).toBeVisible();
  });
});
