import { expect } from '@playwright/test';
import test from '../fixtures';
import { login } from '../util';

test.describe('/request', () => {
  test('should show reports of doctor', async ({ page, baseURL }) => {
    const credentials = { username: 'doctor1', password: 'password' };

    await login(page, baseURL, credentials);
    await page.goto('/request');
    expect(page.url()).toBe(baseURL + '/request');
    await expect(page.locator('.MuiTypography-h4')).toHaveText('My Requests');

    await expect(page.getByText('Test Subject 1')).toBeVisible();
    await expect(page.getByText('Status: Pending')).toBeVisible();
    await expect(page.getByText('Test Description 1')).toBeVisible();

    await expect(page.getByText('Test Subject 2')).toBeVisible();
    await expect(page.getByText('Status: Resolved')).toBeVisible();
    await expect(page.getByText('Test Description 2')).toBeVisible();
  });

  test('should show reports of consultant', async ({ page, baseURL }) => {
    const credentials = { username: 'consultant1', password: 'password' };

    await login(page, baseURL, credentials);
    await page.goto('/request');
    expect(page.url()).toBe(baseURL + '/request');
    await expect(page.locator('.MuiTypography-h4')).toHaveText('Requests');

    await expect(page.getByText('Test Subject 1')).toBeVisible();
    await expect(page.getByText('Test Description 1')).toBeVisible();

    await expect(page.getByText('Test Subject 2')).toBeVisible();
    await expect(page.getByText('Test Description 2')).toBeVisible();

    await expect(page.getByText('Test Subject 3')).toBeVisible();
    await expect(page.getByText('Test Description 3')).toBeVisible();
  });
});
