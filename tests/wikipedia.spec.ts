import { test, expect } from '@playwright/test';

test('testOne', async ({ page }) => {
  await page.goto('https://www.wikipedia.org/');
  await expect(page.getByText('Wikipedia', { exact: true })).toBeVisible();
  await expect(page.getByText('L’encyclopédie libre')).toBeVisible();
});