// @ts-check
const {
  test,
  expect
} = require('@playwright/test');

test.describe('First test', () => {

  test('Visit main page', async ({
    page
  }) => {
    await test.step('Step 1:Visit main URL', async () => {
      await page.goto('/');
    });
  })
})