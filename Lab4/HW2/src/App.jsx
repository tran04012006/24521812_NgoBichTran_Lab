import React from "react";
import { NavLink, Route, Routes, useParams } from "react-router-dom";
import AppealForm from "./AppealForm.jsx";
import { AppealFormProvider } from "./AppealFormContext.jsx";
import { useAppealSlaTimer } from "./useAppealSlaTimer.js";
import "./styles.css";

const DEMO_START_KEY = "hw2-appeal-demo-start";

const players = [
  { id: "himass", name: "Himass", appealWindowMinutes: 15 },
  { id: "tanvuu", name: "TanVuu", appealWindowMinutes: 20 },
];

function getDemoStartMs() {
  const nowMs = Date.now();

  try {
    const savedStartMs = Number(window.sessionStorage.getItem(DEMO_START_KEY));

    if (Number.isFinite(savedStartMs) && savedStartMs > 0) {
      return savedStartMs;
    }

    window.sessionStorage.setItem(DEMO_START_KEY, String(nowMs));
  } catch {
    // The countdown can still run when browser storage is unavailable.
  }

  return nowMs;
}

const demoStartMs = getDemoStartMs();

function AppealCountdown({ deadlineMs }) {
  const remainingSeconds = useAppealSlaTimer(deadlineMs);
  const minutes = String(Math.floor(remainingSeconds / 60)).padStart(2, "0");
  const seconds = String(remainingSeconds % 60).padStart(2, "0");

  return (
    <section className="countdown" aria-labelledby="countdown-title">
      <h3 id="countdown-title">Appeal time remaining</h3>

      <p className="countdown-value" role="timer">
        {minutes}:{seconds}
      </p>

      {remainingSeconds === 0 && (
        <p className="countdown-expired" role="status">
          The appeal window has closed.
        </p>
      )}
    </section>
  );
}

function DossierPage() {
  const { playerID } = useParams();
  const player = players.find(({ id }) => id === playerID);

  if (!player) {
    return (
      <section className="panel">
        <h2>Case not found</h2>
        <p>Select a player from the navigation to open their dossier.</p>
      </section>
    );
  }

  const deadlineMs = demoStartMs + player.appealWindowMinutes * 60_000;

  return (
    <article className="panel dossier">
      <h2>{player.name} dossier</h2>

      <AppealCountdown key={player.id} deadlineMs={deadlineMs} />

      <AppealFormProvider key={player.id}>
        <AppealForm />
      </AppealFormProvider>
    </article>
  );
}

export default function App() {
  return (
    <div className="page">
      <header className="site-header">
        <h1>Esports Fair-Play Appeal Tribunal</h1>

        <nav className="player-nav" aria-label="Player dossiers">
          <ul>
            {players.map(({ id, name }) => (
              <li key={id}>
                <NavLink to={`/dossier/${id}`}>{name}</NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      <main>
        <Routes>
          <Route
            path="/"
            element={
              <section className="panel">
                <h2>Player dossiers</h2>
                <p>Select a player to open their dossier.</p>
              </section>
            }
          />
          <Route path="/dossier/:playerID" element={<DossierPage />} />
        </Routes>
      </main>
    </div>
  );
}