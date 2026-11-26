import assert from 'node:assert/strict';
import { test } from 'node:test';
import { chromium } from 'playwright';
import { deckFixture } from './fixture.js';

test('swipes advance the cards and Undo restores them in reverse order', async (t) => {
  const fixture = deckFixture(t);
  const origin = await fixture.start();
  const browser = await chromium.launch();
  try {
    const page = await browser.newPage();

    async function expectDeck(name, score) {
      await page.getByRole('heading', { name, exact: true }).waitFor();
      assert.equal(await page.locator('.score strong').textContent(), String(score));
    }

    await page.goto(origin);
    await expectDeck('Linh', 0);

    await page.keyboard.press('ArrowRight');
    await expectDeck('Minh', 2);
    await page.keyboard.press('ArrowLeft');
    await expectDeck('An', 1);

    const undo = page.getByRole('button', { name: 'Undo' });
    await undo.click();
    await expectDeck('Minh', 2);
    await undo.click();
    await expectDeck('Linh', 0);
    assert.equal(await undo.isDisabled(), true);
  } finally {
    await browser.close();
  }
});