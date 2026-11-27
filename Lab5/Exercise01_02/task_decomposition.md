# Task Decomposition

## Task 1 – Project Initialization & Basic Setup

Task 1
├── 1.1. Initialize project
│   ├── Create Exercise01_02 folder
│   ├── Initialize Vite project
│   ├── Install React 19
│   └── Install dependencies
│
├── 1.2. Organize project structure
│   ├── Create components folder
│   ├── Create context folder
│   ├── Create reducers folder
│   └── Create data folder
│
├── 1.3. Implement basic application
│   ├── Configure main.jsx
│   ├── Implement App.jsx
│   ├── Configure index.css
│   └── Implement App.css
│
└── 1.4. Verification
    ├── Verify React version
    ├── Run development server
    ├── Verify production build
    └── Commit changes

## Task 2 – Pure useReducer Implementation

Task 2
├── 2.1. Define application state
│   ├── Define initial theme
│   ├── Define initial active tab
│   └── Define action types
│
├── 2.2. Implement pure reducer
│   ├── Implement TOGGLE_THEME
│   ├── Implement SET_ACTIVE_TAB
│   ├── Handle unknown actions
│   └── Ensure state immutability
│
├── 2.3. Integrate useReducer
│   ├── Import appReducer
│   ├── Initialize useReducer
│   └── Display current application state
│
└── 2.4. Verification
    ├── Verify initial state
    ├── Verify state transitions
    ├── Verify reducer purity
    └── Commit changes
## Task 3 – Split Context Implementation

Task 3
├── 3.1. Create separate contexts
│   ├── Create AppStateContext
│   └── Create AppDispatchContext
│
├── 3.2. Implement AppProvider
│   ├── Import appReducer
│   ├── Import initialState
│   ├── Initialize useReducer
│   └── Implement nested context providers
│
├── 3.3. Create application components
│   ├── Create Header
│   ├── Create ThemeToggle
│   ├── Create TabNavigation
│   └── Create StatePreview
│
├── 3.4. Integrate Split Context
│   ├── Wrap App with AppProvider
│   ├── Remove useReducer from App.jsx
│   ├── Connect state-reading components
│   └── Connect dispatch-only components
│
└── 3.5. Verification
    ├── Verify context state updates
    ├── Verify dispatch actions
    ├── Verify component separation
    ├── Verify production build
    └── Commit changes
Task 4
├── 4.1. Implement theme management
│   ├── Read theme from AppStateContext
│   ├── Create ThemeSync component
│   ├── Synchronize theme using useEffect
│   └── Keep reducer free of side effects
│
├── 4.2. Implement theme styling
│   ├── Define dark theme CSS variables
│   ├── Define light theme CSS variables
│   ├── Replace hardcoded colors
│   └── Style interactive components
│
├── 4.3. Implement active tab management
│   ├── Read activeTab from AppStateContext
│   ├── Create TabContent component
│   ├── Render Reels content
│   └── Render Evidence content
│
├── 4.4. Fix legacy bugs
│   ├── Verify className attributes
│   ├── Verify dataset.theme assignment
│   └── Verify reducer purity
│
└── 4.5. Verification
    ├── Test light and dark themes
    ├── Test active tab switching
    ├── Verify independent state transitions
    ├── Verify lint and production build
    └── Commit changes