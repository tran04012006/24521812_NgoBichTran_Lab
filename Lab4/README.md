# Card Swipe Deck

## Run the app

Use Node.js 22.12+ and start MongoDB. The default connection is
`mongodb://127.0.0.1:27017/card_swipe_deck`. For another database connection,
set `MONGODB_URI` in `.env`.

From `Lab4/HW1`, install dependencies and start the API.

```bash
npm install --no-package-lock
npm run server
```

In a second terminal in the same directory, start Vite and open the URL it prints.

```bash
npm run dev
```

Swipe right, then left. Refresh to check that the third card and score of 1
remain. Press Undo to restore the second card and score of 2.

## Run the tests

Keep MongoDB running, then run:

```bash
npx playwright install chromium
npm test
```

The tests use a disposable database on local MongoDB. Set `MONGODB_TEST_URI`
in the terminal environment to connect to a different MongoDB server. The test
user needs permission to create and drop the disposable database.