import { fork } from 'node:child_process';
import { randomUUID } from 'node:crypto';
import { once } from 'node:events';
import mongoose from 'mongoose';

export function deckFixture(t) {
  const uri = process.env.MONGODB_TEST_URI ?? 'mongodb://127.0.0.1:27017';
  const dbName = `swipe_test_${randomUUID().replaceAll('-', '')}`;
  let child;

  async function stop() {
    if (!child || child.exitCode !== null || child.signalCode !== null) return;

    const finished = once(child, 'exit');
    child.kill();
    await finished;
  }

  async function start() {
    child = fork(new URL('../server.js', import.meta.url), [], {
      env: { ...process.env, MONGODB_URI: uri, MONGODB_DB: dbName, PORT: '0' },
    });
    const [port] = await once(child, 'message', {
      signal: AbortSignal.timeout(15_000),
    });
    return `http://127.0.0.1:${port}`;
  }

  t.after(async () => {
    await stop();
    const connection = mongoose.createConnection(uri, {
      dbName,
      serverSelectionTimeoutMS: 5_000,
    });
    try {
      await connection.asPromise();
      await connection.dropDatabase();
    } finally {
      await connection.close();
    }
  });

  return { start, stop };
}