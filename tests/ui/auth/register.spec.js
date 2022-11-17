import { expect } from '@playwright/test';
import mongoose from 'mongoose';
import NewUser from '../../../lib/models/NewUser';
import test from '../fixtures';

test.describe('/auth/register', () => {
  test('should redirect after successful register', async ({
    page,
    baseURL,
  }) => {
    await page.goto('/auth/register');
    expect(page.url()).toBe(baseURL + '/auth/register');
    await page.getByLabel('Name', { exact: true }).fill('John Doe');
    await page.getByLabel('Username').fill('john');
    await page.getByLabel('Password', { exact: true }).fill('Password1!');
    await page.getByLabel('Confirm password').fill('Password1!');
    await page.getByRole('button', { name: /Type/ }).click();
    await page.getByRole('option', { name: 'Doctor' }).click();
    await page.getByRole('button', { name: 'Register' }).last().click();
    await page.waitForURL(new RegExp(baseURL + '/?$'), {
      waitUntil: 'networkidle',
    });
    expect(page.url()).toMatch(new RegExp(baseURL + '/?$'));

    await mongoose.connect(process.env.MONGODB_URI);
    const newUsers = await NewUser.find({ username: 'john' }).lean();
    expect(newUsers.length).toBe(1);
  });
});
