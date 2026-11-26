function App() {
  return (
    <main className="app">
      <div className="portal-card">
        <span className="eyebrow">
          FAIR PLAY SYSTEM
        </span>

        <h1>Fair Play Appeal Portal</h1>

        <p className="description">
          A centralized portal for reviewing player
          dossiers, evaluating disproportionality,
          and monitoring appeal deadlines.
        </p>

        <div className="feature-list">
          <div className="feature">
            <h3>Player Dossiers</h3>
            <p>Review Himass and TanVuu dossiers.</p>
          </div>

          <div className="feature">
            <h3>Derived Matrix</h3>
            <p>Evaluate disproportionality data.</p>
          </div>

          <div className="feature">
            <h3>Appeal SLA</h3>
            <p>Monitor appeal countdown deadlines.</p>
          </div>
        </div>

        <div className="status">
          <span className="status-dot"></span>
          Project initialized successfully
        </div>
      </div>
    </main>
  );
}

export default App;