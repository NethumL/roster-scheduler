import { expect } from '@playwright/test';

/**
 * @param {import('@playwright/test').Page} page
 * @param {string} baseURL
 * @param {{username: string, password: string}} credentials
 */
export async function login(page, baseURL, credentials) {
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
