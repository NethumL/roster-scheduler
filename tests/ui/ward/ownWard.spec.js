import { expect } from '@playwright/test';
import test from '../fixtures';
import { login } from '../util';

test.describe('/ward/ownWard', () => {
  test('should show own ward page', async ({ page, baseURL }) => {
    const credentials = { username: 'doctor1', password: 'password' };

    await login(page, baseURL, credentials);
    await page.goto('/ward/ownWard');
    expect(page.url()).toBe(baseURL + '/ward/ownWard');

    await expect(page.getByText('Test Ward 1')).toBeVisible();
    await expect(page.getByText('Test Description 1')).toBeVisible();
    await expect(page.getByText('Consultant 1')).toBeVisible();
    await expect(page.getByText('Doctor 1 - doctor1')).toBeVisible();
    await expect(page.getByText('Doctor 2 - doctor2')).toBeVisible();
  });
});
