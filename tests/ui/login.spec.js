import { expect, test } from '@playwright/test';
import { setupDb, teardownDb } from './hooks';

test('should redirect to login', async ({ page, baseURL }) => {
  await page.goto('/auth/change-password');
  expect(page.url()).toBe(baseURL + '/auth/login');
});

test('should redirect after successful login', async ({ page, baseURL }) => {
  await setupDb();
  await page.goto('/auth/login');
  expect(page.url()).toBe(baseURL + '/auth/login');
  await page.getByLabel('Username').fill('john');
  await page.getByLabel('Password').fill('password');
  await page.getByRole('button', { name: 'Login' }).last().click();
  await page.waitForLoadState('networkidle');
  expect(page.url()).toMatch(new RegExp(baseURL + '/?$'));
  await teardownDb();
});

test('should show error for invalid credentials', async ({ page, baseURL }) => {
  await setupDb();
  await page.goto('/auth/login');
  expect(page.url()).toBe(baseURL + '/auth/login');
  await page.getByLabel('Username').fill('john');
  await page.getByLabel('Password').fill('passwor');
  await page.getByRole('button', { name: 'Login' }).last().click();
  await page.waitForLoadState('networkidle');
  await expect(page.getByRole('alert').first()).toHaveText(
    'Invalid credentials'
  );
  expect(page.url()).toBe(baseURL + '/auth/login');
  await teardownDb();
});
