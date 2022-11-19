import { expect } from '@playwright/test';
import { compareSync } from 'bcryptjs';
import mongoose from 'mongoose';
import User from '../../../lib/models/User';
import test from '../fixtures';
import { login } from '../util';

test.describe('/auth/change-password', () => {
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
});
