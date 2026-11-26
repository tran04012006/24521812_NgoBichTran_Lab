Task 1 — Dynamic dossier routing
├── 1. Set up the project in Lab4/HW2
│   ├── Configure React 19, Vite, and React Router
│   └── Create the HTML and React entry points
├── 2. Implement dossier navigation
│   ├── Add links to the Himass and TanVuu dossiers
│   ├── Read playerID from /dossier/:playerID
│   └── Display the matching dossier or a case-not-found message
└── 3. Verify and commit
    ├── Open both dossiers from the navigation
    ├── Refresh a dossier URL and check that it still opens
    ├── Verify the message for an unknown player ID
    └── Run the production build
└── Task 2 — Appeal form with live validation
    ├── Create the appeal form Context and provider
    │   ├── Store field values and interaction state
    │   └── Derive validation errors from current values
    ├── Build the appeal form
    │   ├── Show field errors as the user edits
    │   └── Validate all fields on submit
    ├── Mount the form inside each valid dossier
    │   └── Reset form state when playerID changes
    └── Verify validation, dossier navigation, and the production build
└── Task 3 — Zero-drift countdown and CSS
    ├── Build useAppealSlaTimer()
    │   ├── Calculate time remaining from the deadline and system clock
    │   ├── Update when the tab becomes visible again
    │   └── Stop at zero and clean up on unmount
    ├── Add the countdown to both dossiers
    │   └── Keep the demo start time across same-tab refreshes
    ├── Style the navigation, countdown, and appeal form
    └── Verify refresh, expiry, mobile layout, and the production build