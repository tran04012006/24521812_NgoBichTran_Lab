import assert from 'node:assert/strict';
import { test } from 'node:test';
import { deckFixture } from './fixture.js';

test('a swipe and its Undo survive Express restarts', async (t) => {
  const fixture = deckFixture(t);
  let origin = await fixture.start();

  async function readDeck() {
    const response = await fetch(`${origin}/api/deck`);
    assert.equal(response.status, 200);
    return response.json();
  }

  async function saveDeck(directions, revision) {
    const response = await fetch(`${origin}/api/deck`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ directions, revision }),
    });
    assert.equal(response.status, 200);
    return response.json();
  }

  const empty = await readDeck();
  assert.deepEqual(empty, { directions: [], revision: 0 });

  const swiped = await saveDeck(['right'], empty.revision);
  assert.deepEqual(swiped, { directions: ['right'], revision: 1 });
  await fixture.stop();
  origin = await fixture.start();
  assert.deepEqual(await readDeck(), swiped);

  const undone = await saveDeck([], swiped.revision);
  assert.deepEqual(undone, { directions: [], revision: 2 });
  await fixture.stop();
  origin = await fixture.start();
  assert.deepEqual(await readDeck(), undone);
});