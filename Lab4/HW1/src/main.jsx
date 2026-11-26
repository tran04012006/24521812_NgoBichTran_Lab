import React, { useCallback, useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';

const cards = [
  { id: 1, name: 'Linh', description: 'Plays badminton on weekends.' },
  { id: 2, name: 'Minh', description: 'Enjoys cooking for friends.' },
  { id: 3, name: 'An', description: 'Listens to podcasts on the bus.' },
];

const SWIPE_DISTANCE = 50;

function App() {
  const [{ queue, history }, setDeck] = useState({
    queue: cards,
    history: [],
  });
  const gesture = useRef(null);
  const card = queue[0];
  const latestSwipe = history.at(-1);

  const swipe = useCallback((direction) => {
    gesture.current = null;
    setDeck((deck) => {
      if (deck.queue.length === 0) return deck;

      const [swipedCard, ...remainingCards] = deck.queue;
      return {
        queue: remainingCards,
        history: [...deck.history, { card: swipedCard, direction }],
      };
    });
  }, []);

  function undo() {
    gesture.current = null;
    setDeck((deck) => {
      const lastSwipe = deck.history.at(-1);
      if (!lastSwipe) return deck;

      return {
        queue: [lastSwipe.card, ...deck.queue],
        history: deck.history.slice(0, -1),
      };
    });
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
    if (!event.isPrimary || event.button !== 0 || gesture.current) return;

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
    <main>
      <h1>Card Swipe Deck</h1>
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
      <button type="button" onClick={undo} disabled={!latestSwipe}>
        Undo
      </button>
      <p role="status">
        {latestSwipe && `Last swipe: ${latestSwipe.card.name} (${latestSwipe.direction}).`}
      </p>
    </main>
  );
}

createRoot(document.getElementById('root')).render(<App />);