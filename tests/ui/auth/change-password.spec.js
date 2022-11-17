import User from '../../../lib/models/User';
import { expect } from '@playwright/test';
import mongoose from 'mongoose';
import test from '../fixtures';
import { compareSync } from 'bcryptjs';

test('should change password', async ({ page, baseURL }) => {
  const credentials = { username: 'admin', password: 'password' };
  const newPassword = 'Password1!';

  await login(page, baseURL, credentials);
  await page.goto('/auth/change-password');
  expect(page.url()).toBe(baseURL + '/auth/change-password');
  await page.getByLabel('Current password').fill(credentials.password);
  await page.getByLabel('New password').fill(newPassword);
  await page.getByLabel('Confirm password').fill(newPassword);
  await page.getByRole('button', { name: 'Update' }).last().click();
  await page.waitForURL(new RegExp(baseURL + '/?$'), {
    waitUntil: 'networkidle',
  });
  expect(page.url()).toMatch(new RegExp(baseURL + '/?$'));
  await mongoose.connect(process.env.MONGODB_URI);
  const user = await User.findOne({ username: credentials.username })
    .select('+password')
    .lean();
  expect(compareSync(newPassword, user.password)).toBe(true);
  await login(page, baseURL, { ...credentials, password: newPassword });
});

/**
 * @param {import('@playwright/test').Page} page
 * @param {string} baseURL
 * @param {{username: string, password: string}} credentials
 */
async function login(page, baseURL, credentials) {
  await page.goto('/auth/login');
  expect(page.url()).toBe(baseURL + '/auth/login');
  await page.getByLabel('Username').fill(credentials.username);
  await page.getByLabel('Password').fill(credentials.password);
  await page.getByRole('button', { name: 'Login' }).last().click();
  await page.waitForURL(new RegExp(baseURL + '/?$'), {
    waitUntil: 'networkidle',
  });
  expect(page.url()).toMatch(new RegExp(baseURL + '/?$'));
}
