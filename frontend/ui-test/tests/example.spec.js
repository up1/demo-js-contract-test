// @ts-check
// const { test, expect } = require('@playwright/test');
const { test, expect } = require('playwright-test-coverage');

test('has title', async ({ page }) => {
  await page.goto('http://localhost:5173/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle("Vite + React");
});
