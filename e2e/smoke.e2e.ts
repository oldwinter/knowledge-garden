import { test } from '@e2e-dev/web';
import { expect } from 'e2e';

test('repository root opens', async ({ app, browser }) => {
  await app.open('/');
  await expect(browser.locator('body')).toBeVisible();
});
