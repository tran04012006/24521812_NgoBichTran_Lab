import React from "react";
import { NavLink, Route, Routes, useParams } from "react-router-dom";

const players = [
  { id: "himass", name: "Himass" },
  { id: "tanvuu", name: "TanVuu" },
];

function DossierPage() {
  const { playerID } = useParams();
  const player = players.find(({ id }) => id === playerID);

  if (!player) {
    return (
      <>
        <h2>Case not found</h2>
        <p>Select a player from the navigation to open their dossier.</p>
      </>
    );
  }

  return <h2>{player.name} dossier</h2>;
}

export default function App() {
  return (
    <>
      <header>
        <h1>Esports Fair-Play Appeal Tribunal</h1>

        <nav aria-label="Player dossiers">
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
          <Route path="/" element={<p>Select a player to open their dossier.</p>} />
          <Route path="/dossier/:playerID" element={<DossierPage />} />
        </Routes>
      </main>
    </>
  );
}