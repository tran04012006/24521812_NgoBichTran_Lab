import React, { useCallback, useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';

import { cards } from './cards.js';

const SWIPE_DISTANCE = 50;
const POINTS_BY_DIRECTION = { left: -1, right: 2 };

function App() {
  const [deck, setDeck] = useState(null);
  const [error, setError] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const saving = useRef(false);
  const gesture = useRef(null);

  const directions = deck?.directions ?? [];
  const card = cards[directions.length];
  const latestDirection = directions.at(-1);
  const latestCard = cards[directions.length - 1];
  const score = directions.reduce(
    (total, direction) => total + POINTS_BY_DIRECTION[direction],
    0,
  );

  useEffect(() => {
    const controller = new AbortController();

    async function loadDeck() {
      try {
        const response = await fetch('/api/deck', { signal: controller.signal });
        if (!response.ok) throw new Error('Could not load the deck.');

        setDeck(await response.json());
      } catch {
        if (!controller.signal.aborted) {
          setError('Could not load the deck. Check the server and reload.');
        }
      }
    }

    void loadDeck();
    return () => controller.abort();
  }, []);

  const saveDirections = useCallback(async (nextDirections) => {
    if (!deck || saving.current) return;

    saving.current = true;
    gesture.current = null;
    setIsSaving(true);
    setError('');

    try {
      const response = await fetch('/api/deck', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ directions: nextDirections, revision: deck.revision }),
      });

      if (response.status === 409) {
        setDeck(await response.json());
        setError('The deck changed in another tab. Try your action again.');
        return;
      }

      if (!response.ok) throw new Error('Could not save the deck.');

      setDeck(await response.json());
    } catch {
      setError('Could not confirm the save. Try your action again or reload.');
    } finally {
      saving.current = false;
      setIsSaving(false);
    }
  }, [deck]);

  const swipe = useCallback((direction) => {
    if (!deck || deck.directions.length >= cards.length) return;

    void saveDirections([...deck.directions, direction]);
  }, [deck, saveDirections]);

  function undo() {
    if (directions.length > 0) {
      void saveDirections(directions.slice(0, -1));
    }
  }

  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;

      event.preventDefault();
      if (!event.repeat) {
        swipe(event.key === 'ArrowLeft' ? 'left' : 'right');
      }
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [swipe]);

  function startSwipe(event) {
    if (!event.isPrimary || event.button !== 0 || gesture.current || saving.current) return;

    const { pointerId, clientX, clientY, currentTarget } = event;
    currentTarget.setPointerCapture(pointerId);
    gesture.current = { pointerId, x: clientX, y: clientY };
  }

  function finishSwipe(event) {
    const start = gesture.current;
    if (!start || start.pointerId !== event.pointerId) return;

    gesture.current = null;
    const dx = event.clientX - start.x;
    const dy = event.clientY - start.y;

    if (Math.abs(dx) >= SWIPE_DISTANCE && Math.abs(dx) > Math.abs(dy)) {
      swipe(dx < 0 ? 'left' : 'right');
    }
  }

  function cancelSwipe(event) {
    if (gesture.current?.pointerId === event.pointerId) {
      gesture.current = null;
    }
  }

  if (!deck) {
    return (
      <main>
        <h1>Card Swipe Deck</h1>
        <p role="status">{error || 'Loading deck…'}</p>
      </main>
    );
  }

  return (
    <main>
      <h1>Card Swipe Deck</h1>
      <p>Score: {score}</p>
      {card ? (
        <>
          <p>Use the arrow keys or swipe the card left or right.</p>
          <article
            key={card.id}
            style={{
              touchAction: 'pan-y',
              userSelect: 'none',
              maxWidth: '22rem',
              border: '1px solid',
              borderRadius: '0.5rem',
              padding: '1rem',
            }}
            onPointerDown={startSwipe}
            onPointerUp={finishSwipe}
            onPointerCancel={cancelSwipe}
            onLostPointerCapture={cancelSwipe}
          >
            <h2>{card.name}</h2>
            <p>{card.description}</p>
          </article>
        </>
      ) : (
        <p>No cards left.</p>
      )}
      <button type="button" onClick={undo} disabled={!latestDirection || isSaving}>
        Undo
      </button>
      {error && <p role="alert">{error}</p>}
      <p role="status">
        {isSaving && 'Saving…'}
        {!isSaving && latestDirection && `Last swipe: ${latestCard.name} (${latestDirection}).`}
      </p>
    </main>
  );
}

createRoot(document.getElementById('root')).render(<App />);