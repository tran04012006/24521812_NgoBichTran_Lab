# Lab 5 – React State Management & Responsive Design

## 1. Overview

This project is part of Lab 5 of the Smart Software System
(S3T) course at the University of Information Technology
(UIT – VNUHCM).

The project focuses on refactoring legacy React applications
to improve state management, rendering performance,
pagination, and responsive design.

## 2. Objectives

- Implement centralized state management using useReducer.
- Separate state and dispatch using Split Context.
- Maintain pure reducer functions without side effects.
- Reduce unnecessary component re-renders.
- Implement pagination without useEffect.
- Build responsive layouts using CSS Container Queries.
- Fix bugs in legacy React applications.

## 3. Technologies

- React 19
- Vite
- JavaScript (ES6+)
- HTML5
- CSS3
- React Hooks
- Context API
- Git and GitHub

## 4. Exercise Requirements

### Exercise 0.1 – Pure useReducer & Split Context

- Replace legacy state management with useReducer.
- Implement a pure appReducer(state, action).
- Create AppStateContext and AppDispatchContext.
- Implement AppProvider.
- Replace incorrect class attributes with className.
- Correct the dataset.theme toggle logic.
- Remove side effects from reducer functions.
- Reduce unnecessary context-driven re-renders.

### Exercise 0.2 – Zero-Effect Pagination & Container Queries

- Initialize array state correctly using useState([]).
- Calculate totalPages directly during rendering.
- Calculate startIdx and visibleItems as derived values.
- Implement pagination without useEffect.
- Use key={clip._id} for rendered items.
- Replace rigid 800px layouts with responsive layouts.
- Use 100dvh for dynamic viewport height.
- Implement CSS @container queries.
- Ensure interactive touch targets are at least 44x44px.

## 5. Task Decomposition

### Task 1 – Project Initialization & Basic Setup

- [ ] Initialize React 19 with Vite.
- [ ] Create the project folder structure.
- [ ] Configure the basic application.
- [ ] Create README.md.

### Task 2 – Pure useReducer Implementation

- [ ] Create appReducer.js.
- [ ] Define the initial application state.
- [ ] Define reducer actions.
- [ ] Implement pure state transitions.
- [ ] Ensure the reducer contains no side effects.

### Task 3 – Split Context Implementation

- [ ] Create AppStateContext.
- [ ] Create AppDispatchContext.
- [ ] Implement AppProvider.
- [ ] Wrap the application with AppProvider.
- [ ] Separate state-reading and dispatch-only components.

### Task 4 – Theme & Active Tab Management

- [ ] Implement light and dark theme switching.
- [ ] Synchronize the theme with dataset.theme.
- [ ] Implement active tab switching.
- [ ] Fix legacy JSX bugs.
- [ ] Verify state updates.

### Task 5 – Zero-Effect Pagination

- [ ] Create sample evidence data.
- [ ] Create EvidenceCard.
- [ ] Create EvidenceGrid.
- [ ] Calculate totalPages during rendering.
- [ ] Calculate visibleItems using slice().
- [ ] Implement pagination controls.
- [ ] Verify pagination without useEffect.

### Task 6 – Responsive Container Queries

- [ ] Implement responsive grid layouts.
- [ ] Configure CSS container-type.
- [ ] Implement CSS @container queries.
- [ ] Use 100dvh for viewport-based layouts.
- [ ] Ensure minimum 44x44px touch targets.
- [ ] Test different container and screen sizes.

### Task 7 – Final Integration, Verification & Cleanup

- [ ] Integrate all components.
- [ ] Verify reducer purity.
- [ ] Verify Split Context architecture.
- [ ] Verify pagination functionality.
- [ ] Verify responsive design.
- [ ] Remove unused code.
- [ ] Check console errors.
- [ ] Verify production build.
- [ ] Verify Git commit history.

## 6. Project Structure

```text
Exercise01_02/
├── src/
│   ├── components/
│   │   ├── Header.jsx
│   │   ├── ThemeToggle.jsx
│   │   ├── TabNavigation.jsx
│   │   ├── EvidenceCard.jsx
│   │   ├── EvidenceGrid.jsx
│   │   └── Pagination.jsx
│   ├── context/
│   │   └── AppProvider.jsx
│   ├── reducers/
│   │   └── appReducer.js
│   ├── data/
│   │   └── clips.js
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
├── public/
├── task_decomposition.md
├── README.md
├── package.json
├── index.html
├── vite.config.js
└── .gitignore
```

## 7. Application Architecture

### State Management

```text
AppProvider
│
├── useReducer(appReducer, initialState)
│
├── AppStateContext
│   └── Components that read application state
│
└── AppDispatchContext
    └── Components that dispatch actions
```

Initial application state:

```javascript
const initialState = {
    theme: "dark",
    activeTab: "reels",
};
```

The reducer is responsible only for calculating the next
application state. External side effects are handled
outside the reducer.

### Pagination

Pagination values are calculated directly during rendering.

```javascript
const totalPages = Math.ceil(clips.length / pageSize) || 1;

const startIdx = (page - 1) * pageSize;

const visibleItems = clips.slice(
    startIdx,
    startIdx + pageSize
);
```

Derived pagination values are not stored in separate state
variables and do not require useEffect.

## 8. Installation and Running

### Install dependencies

```bash
npm install
```

### Start the development server

```bash
npm run dev
```

### Build for production

```bash
npm run build
```

### Preview the production build

```bash
npm run preview
```

## 9. Project Rules

1. Use React 19.
2. Make more than 10 meaningful Git commits.
3. Create or update task_decomposition.md before
   implementing each task.
4. Implement only the required features.
5. Maintain clean and organized source code.
6. Ensure the application builds successfully.

## 10. Planned Git Commits

| No. | Commit Message |
|-----|----------------|
| 1 | docs: initialize project README |
| 2 | chore: initialize React 19 project with Vite |
| 3 | feat: define initial application state |
| 4 | feat: implement pure application reducer |
| 5 | feat: create split application contexts |
| 6 | feat: implement AppProvider |
| 7 | feat: implement theme switching |
| 8 | feat: implement active tab management |
| 9 | feat: create evidence card and grid components |
| 10 | feat: implement zero-effect pagination |
| 11 | style: implement responsive container queries |
| 12 | style: improve viewport layout and touch targets |
| 13 | chore: verify integration and clean up project |

## 11. Expected Results

- Centralized application state using useReducer.
- Separate state and dispatch contexts.
- Pure reducer functions without side effects.
- Reduced unnecessary context-driven re-renders.
- Functional pagination without useEffect.
- Responsive layouts using CSS Container Queries.
- Touch-friendly interactive components.
- Successful production build.
- More than 10 meaningful Git commits.

## 12. Project Status

| Task | Status |
|------|--------|
| Task 1 – Project Initialization | Not Started |
| Task 2 – Pure useReducer | Not Started |
| Task 3 – Split Context | Not Started |
| Task 4 – Theme & Active Tab | Not Started |
| Task 5 – Zero-Effect Pagination | Not Started |
| Task 6 – Container Queries | Not Started |
| Task 7 – Final Integration | Not Started |

## 13. Author

- Student: Ngô Bích Trân
- Student ID: 24521812
- University: University of Information Technology (UIT)
- Lab: Lab 5
- Exercises: 0.1 and 0.2