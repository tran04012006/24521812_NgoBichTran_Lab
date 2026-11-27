import "./App.css";

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <div className="brand">
          <span className="brand-label">UIT // S3T</span>

          <h1>Evidence Portal</h1>

          <p>Lab 5 — React State Management</p>
        </div>

        <span className="lab-label">LAB 05</span>
      </header>

      <main className="app-content">
        <section className="welcome-card">
          <span className="section-label">
            EXERCISES 0.1 & 0.2
          </span>

          <h2>React State Management & Responsive Design</h2>

          <p>
            A React application demonstrating pure reducers,
            split context, zero-effect pagination and
            responsive container queries.
          </p>

          <div className="exercise-grid">
            <article className="exercise-card">
              <span>EXERCISE 0.1</span>

              <h3>Pure useReducer</h3>

              <p>
                Centralized state management and
                Split Context architecture.
              </p>
            </article>

            <article className="exercise-card">
              <span>EXERCISE 0.2</span>

              <h3>Zero-Effect Pagination</h3>

              <p>
                Derived pagination state and responsive
                CSS Container Queries.
              </p>
            </article>
          </div>
        </section>
      </main>

      <footer className="app-footer">
        Smart Software System Team — UIT
      </footer>
    </div>
  );
}

export default App;