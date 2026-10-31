
import { test, expect } from '@playwright/test';

test('my first test', async ({ page }) => {
await page.goto('https://www.wikipedia.org/');
await expect(page).toHaveTitle('Wikipedia');
await expect(page.getByText('L’encyclopédie libre')).toBeVisible();

});
