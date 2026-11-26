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