import { test, expect } from '@playwright/test';

test('homepage loads correctly', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/Agenda de Viaje/);
});

test('theme toggle works', async ({ page }) => {
  await page.goto('/');
  const themeButton = page.getByLabel(/Switch to/i);
  await themeButton.click();
  // Add assertions for theme change
});

