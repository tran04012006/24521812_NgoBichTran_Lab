Homework 1 — Full-Stack Interactive Card-Swipe Deck
└── Task 1 — Keyboard and pointer swipe controls
    ├── Set up a minimal React 19 app
    ├── Display the front card of a FIFO queue
    │   ├── Start with three sample cards
    │   └── Show a message when the queue is empty
    ├── Handle swipe input
    │   ├── Map Left Arrow and Right Arrow to swipe directions
    │   ├── Detect horizontal mouse and touch swipes
    │   └── Route keyboard and pointer input through the same queue operation
    └── Verify both inputs advance one card at a time and stop at an empty queue
Task 2 — LIFO Undo
│   ├── Push the card and direction onto the undo stack after each swipe
│   ├── Pop the latest swipe and restore its card to the front of the queue
│   ├── Enable Undo whenever the stack has entries
│   └── Verify reverse-order restoration and swiping a restored card
└── Task 3 — Asymmetric scoring
    ├── Assign +2 points to right swipes and -1 point to left swipes
    ├── Derive the score from the current swipe history
    ├── Display the score while cards remain and after the deck ends
    └── Verify both swipe directions and score changes after Undo