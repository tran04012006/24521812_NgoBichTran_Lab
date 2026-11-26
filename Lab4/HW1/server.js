import { fileURLToPath } from 'node:url';
import express from 'express';
import mongoose from 'mongoose';
import { cards } from './src/cards.js';

const DECK_ID = 'default';
const port = Number(process.env.PORT ?? 3001);
const mongoUri = process.env.MONGODB_URI ?? 'mongodb://127.0.0.1:27017/card_swipe_deck';

const deckSchema = new mongoose.Schema({
  _id: String,
  directions: [{ type: String, enum: ['left', 'right'] }],
  revision: { type: Number, required: true, min: 0 },
});

const Deck = mongoose.model('Deck', deckSchema);
const app = express();

app.use(express.json());

function deckPayload(deck) {
  return { directions: deck.directions, revision: deck.revision };
}

app.get('/api/deck', async (_req, res) => {
  const deck = await Deck.findById(DECK_ID).lean();
  if (!deck) return res.sendStatus(404);

  res.json(deckPayload(deck));
});

app.put('/api/deck', async (req, res) => {
  const { directions, revision } = req.body ?? {};
  const validDirections =
    Array.isArray(directions) &&
    directions.length <= cards.length &&
    directions.every((direction) => direction === 'left' || direction === 'right');

  if (!validDirections || !Number.isSafeInteger(revision) || revision < 0) {
    return res.status(400).json({ error: 'Invalid swipe history or revision.' });
  }

  const saved = await Deck.findOneAndUpdate(
    { _id: DECK_ID, revision },
    { $set: { directions }, $inc: { revision: 1 } },
    { new: true, runValidators: true },
  ).lean();

  if (saved) return res.json(deckPayload(saved));

  const current = await Deck.findById(DECK_ID).lean();
  if (!current) return res.sendStatus(404);

  res.status(409).json(deckPayload(current));
});

app.use(express.static(fileURLToPath(new URL('./dist', import.meta.url))));

await mongoose.connect(mongoUri, { dbName: process.env.MONGODB_DB });
await Deck.updateOne(
  { _id: DECK_ID },
  { $setOnInsert: { directions: [], revision: 0 } },
  { upsert: true },
);

const server = app.listen(port, '127.0.0.1', () => {
  const activePort = server.address().port;
  console.log(`Card Swipe Deck API is running at http://127.0.0.1:${activePort}`);
  process.send?.(activePort);
});