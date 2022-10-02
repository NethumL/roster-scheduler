import { expect, test } from '@playwright/test';

test('should redirect to login', async ({ page, baseURL }) => {
  await page.goto('/auth/change-password');
  expect(page.url()).toBe(baseURL + '/auth/login');
});
