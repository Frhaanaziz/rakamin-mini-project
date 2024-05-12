import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  // Go to the home page
  await page.goto('http://localhost:4232');
});

// Define the todo items
const TODO_ITEMS = {
  title: 'Playwright Testing',
  description: 'Testing - Testing',
};

test.describe('New Todo', () => {
  test.beforeEach(async ({ page }) => {
    // Click for opening the create todo dialog
    await page.getByTestId('add-new-group-button').click();

    // Check if create todo dialog is visible
    await expect(page.getByTestId('create-todo-dialog')).toBeVisible();
  });

  test('should show validation errors', async ({ page }) => {
    // Click on submit button
    await page.getByTestId('submit-button').click();

    // Check if validation errors are visible
    await expect(page.getByTestId('create-todo-title-error')).toBeVisible();
    await expect(
      page.getByTestId('create-todo-description-error')
    ).toBeVisible();
  });

  test('should create a new group', async ({ page }) => {
    // Fill the title
    const titleInput = page.getByTestId('create-todo-title');
    await titleInput.fill(TODO_ITEMS.title);
    await expect(titleInput).toHaveValue(TODO_ITEMS.title);

    // Fill the description
    const descriptionInput = page.getByTestId('create-todo-description');
    await descriptionInput.fill(TODO_ITEMS.description);
    await expect(descriptionInput).toHaveValue(TODO_ITEMS.description);

    // Click on submit button
    await page.getByTestId('submit-button').click();

    // Wait for the response
    await page.waitForResponse(
      (res) => res.url().includes('/') && res.status() === 200
    );

    // Check if create todo dialog is closed
    await expect(page.getByTestId('create-todo-dialog')).not.toBeVisible();
  });
});
