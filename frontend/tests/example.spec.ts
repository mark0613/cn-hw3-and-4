import { test, expect } from '@playwright/test'

test.describe('Todo', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173')
  })

  test('has title', async ({ page }) => {
    await expect(page.locator('h1')).toHaveText('My Todos')
  })

  test('add todo', async ({ page }) => {
    const nameInput = page.getByLabel('Name')
    const descriptionInput = page.getByLabel('Description')
    const addButton = page.getByRole('button', { name: 'Add Todo' })

    await nameInput.fill('AAA')
    await descriptionInput.fill('123')
    await addButton.click()

    await expect(page.locator('.Card--text h1')).toContainText('AAA')
    await expect(page.locator('.Card--text span')).toContainText('123')
  })

  test('complete', async ({ page }) => {
    const completeButton = page.getByRole('button', { name: 'Complete' })
    await completeButton.click()

    await expect(page.locator('.Card--text h1')).toHaveClass(/line-through/)
  })

  test('delete', async ({ page }) => {
    const deleteButton = page.getByRole('button', { name: 'Delete' })
    await deleteButton.click()

    await expect(page.locator('.Card--text h1')).not.toContainText('AAA')
  })
})
