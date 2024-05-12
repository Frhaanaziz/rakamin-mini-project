import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  // Go to the home page
  await page.goto('http://localhost:4232');

  // Click on the todo item actions button to open the popover
  await page.getByTestId('todo-item-actions-button').first().click();

  // Check if the popover is visible
  await expect(page.getByTestId('todo-item-actions-popover')).toBeVisible();
});

test('TodoItemActions deletes the item', async ({ page }) => {
  // Click on the delete button
  await page.getByTestId('delete-todo-item-button').click();

  // Check if the delete dialog is visible
  await expect(page.getByTestId('delete-todo-item-dialog')).toBeVisible();

  // Click on the confirm button
  await page.getByTestId('confirm-button').click();
});

test('TodoItemActions updates the item', async ({ page }) => {
  // Click on the update button
  await page.getByTestId('update-todo-item-button').click();

  // Check if the update dialog is visible
  await expect(page.getByTestId('update-todo-item-dialog')).toBeVisible();

  // Fill the name field
  const nameInput = page.getByTestId('update-todo-item-name');
  await nameInput.fill('Updated Todo Item');
  await expect(nameInput).toHaveValue('Updated Todo Item');

  // Click on the submit button
  await page.getByTestId('submit-button').click();

  // Wait for the response
  await page.waitForResponse(
    (res) => res.url().includes('/') && res.status() === 200
  );
});
