import React, { useCallback, useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';

import { cards } from './cards.js';
import './styles.css';

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

  return (
    <main className="deck">
      <header className="deck-header">
        <h1>Card Swipe Deck</h1>
        {deck && (
          <p className="score">
            Score <strong>{score}</strong>
          </p>
        )}
      </header>

      {!deck ? (
        <p className="notice" role={error ? 'alert' : 'status'}>
          {error || 'Loading deck…'}
        </p>
      ) : (
        <>
          {card ? (
            <>
              <article
                key={card.id}
                className="card"
                onPointerDown={startSwipe}
                onPointerUp={finishSwipe}
                onPointerCancel={cancelSwipe}
                onLostPointerCapture={cancelSwipe}
              >
                <p className="card-position">Card {directions.length + 1} of {cards.length}</p>
                <h2>{card.name}</h2>
                <p className="card-description">{card.description}</p>
              </article>
              <p className="hint">
                Swipe the card or press <kbd>←</kbd> or <kbd>→</kbd>.
              </p>
            </>
          ) : (
            <p className="notice">No cards left.</p>
          )}

          <footer className="deck-footer">
            <p className="status" role="status">
              {isSaving && 'Saving…'}
              {!isSaving && latestDirection && `Last swipe: ${latestCard.name} (${latestDirection}).`}
            </p>
            <button
              className="undo"
              type="button"
              onClick={undo}
              disabled={!latestDirection || isSaving}
            >
              Undo
            </button>
          </footer>
          {error && <p className="error" role="alert">{error}</p>}
        </>
      )}
    </main>
  );
}

createRoot(document.getElementById('root')).render(<App />);