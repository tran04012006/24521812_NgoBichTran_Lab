Task 1 — Add app styling
├── Create src/styles.css
│   ├── Define the dark theme and base typography
│   ├── Style the navigation and active route
│   ├── Style the main content and page action links
│   └── Add responsive spacing and visible keyboard focus
├── Import the stylesheet in src/main.jsx
└── Verify the layout on desktop and mobile
    ├── Check the active route on Home and Gallery
    └── Tab through the links and check their focus indicators
└── Task 2 — Build the photo grid and URL filters
    ├── Define photo records with stable IDs, categories, and alt text
    ├── Read the category from the URL with useSearchParams()
    ├── Render category links and highlight the active filter
    ├── Display matching photos in a responsive grid
    └── Verify direct links, refresh, and browser history
└── Task 3 — Add the native photo lightbox
    ├── Add a shareable photo link to each gallery card
    ├── Use photoId to open the matching photo in an HTML dialog
    ├── Remove photoId on Close or Escape and preserve the category
    ├── Restore keyboard focus when the dialog closes
    ├── Style the lightbox for desktop and mobile
    └── Verify direct links, refresh, and browser history
└── Task 4 — Improve and verify accessibility
    ├── Add a visible-on-focus skip link
    ├── Set a browser title for each route
    ├── Move focus to the main content after a page change
    ├── Announce the gallery category and result count
    └── Check keyboard navigation, screen-reader output, and zoom