import { Link } from "react-router-dom";

const dossiers = [
  {
    name: "Himass",
    username: "himass",
    initials: "HM",
  },
  {
    name: "TanVuu",
    username: "tanvuu",
    initials: "TV",
  },
];

function Home() {
  return (
    <main className="page-container">
      <section className="hero">
        <span className="eyebrow">
          FAIR PLAY SYSTEM
        </span>

        <h1>Fair Play Appeal Portal</h1>

        <p>
          Review player dossiers, evaluate
          disproportionality data, and monitor
          appeal deadlines in one centralized
          platform.
        </p>

        <div className="hero-tags">
          <span>React 19</span>
          <span>MongoDB</span>
          <span>Multi-Route Portal</span>
        </div>
      </section>

      <section className="dossier-section">
        <div className="section-heading">
          <div>
            <span className="eyebrow">
              PLAYER MANAGEMENT
            </span>

            <h2>Available Dossiers</h2>
          </div>

          <span className="section-count">
            2 dossiers
          </span>
        </div>

        <div className="dossier-grid">
          {dossiers.map((dossier) => (
            <article
              className="dossier-card"
              key={dossier.username}
            >
              <div className="avatar">
                {dossier.initials}
              </div>

              <div>
                <h3>{dossier.name}</h3>

                <p>Player appeal dossier</p>
              </div>

              <Link
                className="primary-button"
                to={`/dossier/${dossier.username}`}
              >
                View dossier →
              </Link>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

export default Home;