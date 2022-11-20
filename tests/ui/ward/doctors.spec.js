import { expect } from '@playwright/test';
import test from '../fixtures';
import { login } from '../util';

test.describe('/ward/doctors/?w_id=5f9f1c9b9c9b9c9b9c9b9c11', () => {
  test('should show doctors page', async ({ page, baseURL }) => {
    const credentials = { username: 'admin', password: 'password' };

    await login(page, baseURL, credentials);
    await page.goto('/ward/doctors?w_id=5f9f1c9b9c9b9c9b9c9b9c11');
    expect(page.url()).toBe(
      baseURL + '/ward/doctors?w_id=5f9f1c9b9c9b9c9b9c9b9c11'
    );

    await expect(page.getByText('Doctor 1')).toBeVisible();
    await expect(page.getByText('doctor1')).toBeVisible();

    await expect(page.getByText('Doctor 2')).toBeVisible();
    await expect(page.getByText('doctor2')).toBeVisible();
  });
});
