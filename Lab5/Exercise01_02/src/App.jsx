import Header from "./components/Header.jsx";

import ThemeToggle from "./components/ThemeToggle.jsx";

import TabNavigation from "./components/TabNavigation.jsx";

import StatePreview from "./components/StatePreview.jsx";

import StateValue from "./components/StateValue.jsx";

import TabContent from "./components/TabContent.jsx";

import "./App.css";

function App() {
  return (
    <div className="app">
      <Header />

      <main className="app-content">
        <section className="welcome-card">
          <span className="section-label">
            EXERCISE 0.1
          </span>

          <h2>Pure useReducer & Split Context</h2>

          <p>
            Centralized state management using a pure
            reducer, separate state and dispatch
            contexts, and synchronized application
            themes.
          </p>

          <div className="exercise-grid">
            <article className="exercise-card">
              <span>APPLICATION STATE</span>

              <h3>Theme</h3>

              <p>
                Current theme:{" "}
                <StateValue name="theme" />
              </p>

              <ThemeToggle />
            </article>

            <article className="exercise-card">
              <span>APPLICATION STATE</span>

              <h3>Active Tab</h3>

              <p>
                Current tab:{" "}
                <StateValue name="activeTab" />
              </p>

              <TabNavigation />
            </article>
          </div>

          <TabContent />

          <StatePreview />
        </section>
      </main>

      <footer className="app-footer">
        Smart Software System Team — UIT
      </footer>
    </div>
  );
}

export default App;