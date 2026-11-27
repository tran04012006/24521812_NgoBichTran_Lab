import { useReducer } from "react";

import { appReducer } from "./reducers/appReducer.js";

import {
  initialState,
  ACTION_TYPES,
} from "./reducers/initialState.js";

import "./App.css";

function App() {
  const [state, dispatch] = useReducer(
    appReducer,
    initialState
  );

  function handleToggleTheme() {
    dispatch({
      type: ACTION_TYPES.TOGGLE_THEME,
    });
  }

  function handleChangeTab(tab) {
    dispatch({
      type: ACTION_TYPES.SET_ACTIVE_TAB,
      payload: tab,
    });
  }

  return (
    <div className="app">
      <header className="app-header">
        <div className="brand">
          <span className="brand-label">
            UIT // S3T
          </span>

          <h1>Evidence Portal</h1>

          <p>Lab 5 — React State Management</p>
        </div>

        <span className="lab-label">LAB 05</span>
      </header>

      <main className="app-content">
        <section className="welcome-card">
          <span className="section-label">
            EXERCISE 0.1
          </span>

          <h2>Pure useReducer</h2>

          <p>
            Centralized state management using a pure
            reducer without side effects.
          </p>

          <div className="exercise-grid">
            <article className="exercise-card">
              <span>APPLICATION STATE</span>

              <h3>Theme</h3>

              <p>
                Current theme:
                <strong> {state.theme}</strong>
              </p>

              <button
                className="action-button"
                onClick={handleToggleTheme}
              >
                Toggle Theme
              </button>
            </article>

            <article className="exercise-card">
              <span>APPLICATION STATE</span>

              <h3>Active Tab</h3>

              <p>
                Current tab:
                <strong> {state.activeTab}</strong>
              </p>

              <div className="tab-actions">
                <button
                  className={`action-button ${
                    state.activeTab === "reels"
                      ? "active"
                      : ""
                  }`}
                  onClick={() =>
                    handleChangeTab("reels")
                  }
                >
                  Reels
                </button>

                <button
                  className={`action-button ${
                    state.activeTab === "evidence"
                      ? "active"
                      : ""
                  }`}
                  onClick={() =>
                    handleChangeTab("evidence")
                  }
                >
                  Evidence
                </button>
              </div>
            </article>
          </div>

          <section className="state-panel">
            <h3>Current Application State</h3>

            <pre>
              {JSON.stringify(state, null, 2)}
            </pre>
          </section>
        </section>
      </main>

      <footer className="app-footer">
        Smart Software System Team — UIT
      </footer>
    </div>
  );
}

export default App;