import { expect } from '@playwright/test';
import test from '../fixtures';
import { login } from '../util';

test.describe('/ward/user-preferences', () => {
  test('should show preferences page', async ({ page, baseURL }) => {
    const credentials = { username: 'doctor1', password: 'password' };

    await login(page, baseURL, credentials);
    await page.goto('/ward/user-preferences');
    expect(page.url()).toBe(baseURL + '/ward/user-preferences');

    await expect(page.getByText('12/14/2022')).toBeVisible();
    await expect(page.getByText('12/7/2022')).toBeVisible();

    await expect(page.getByText('Shift 1 [12:00 - 13:00]')).toBeVisible();
    await expect(page.getByText('Shift 2 [13:00 - 14:00]')).toBeVisible();
  });
});
