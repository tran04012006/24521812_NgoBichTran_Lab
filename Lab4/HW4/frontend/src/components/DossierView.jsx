import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
  getProfileByUsername,
} from "../services/profileService.js";

function DossierView({ user }) {
  const [result, setResult] = useState({
    user: null,
    profile: null,
    error: "",
  });

  useEffect(() => {
    const controller = new AbortController();

    async function loadProfile() {
      try {
        const data = await getProfileByUsername(
          user,
          controller.signal
        );

        if (!controller.signal.aborted) {
          setResult({
            user,
            profile: data,
            error: "",
          });
        }
      } catch (error) {
        if (!controller.signal.aborted) {
          setResult({
            user,
            profile: null,
            error: error.message,
          });
        }
      }
    }

    loadProfile();

    return () => {
      controller.abort();
    };
  }, [user]);

  const loading = result.user !== user;
  const profile = result.profile;
  const error = result.error;

  if (loading) {
    return (
      <main className="page-container">
        <div className="state-card">
          <div className="spinner" />

          <h2>Loading dossier...</h2>

          <p>Please wait while loading {user}.</p>
        </div>
      </main>
    );
  }

  if (error || !profile) {
    return (
      <main className="page-container">
        <div className="state-card error-card">
          <h2>Unable to load dossier</h2>

          <p>{error || "Profile not found"}</p>

          <Link
            className="primary-button"
            to="/"
          >
            Back to home
          </Link>
        </div>
      </main>
    );
  }

  const dossierData = profile.dossierData || {};

  return (
    <main className="page-container">
      <Link to="/" className="back-link">
        ← Back to all dossiers
      </Link>

      <section className="profile-header">
        <div className="avatar large-avatar">
          {profile.displayName
            .slice(0, 2)
            .toUpperCase()}
        </div>

        <div className="profile-title">
          <span className="eyebrow">
            PLAYER DOSSIER
          </span>

          <h1>{profile.displayName}</h1>

          <p>@{profile.username}</p>
        </div>

        <span className="profile-badge">
          Dossier loaded
        </span>
      </section>

      <div className="profile-grid">
        <section className="content-card">
          <h2>Profile Information</h2>

          <div className="info-row">
            <span>Display name</span>
            <strong>{profile.displayName}</strong>
          </div>

          <div className="info-row">
            <span>Username</span>
            <strong>{profile.username}</strong>
          </div>

          <div className="description-box">
            <span>Description</span>

            <p>
              {profile.description ||
                "No description available."}
            </p>
          </div>
        </section>

        <section className="content-card">
          <h2>Dossier Statistics</h2>

          <div className="statistics-grid">
            <div className="stat-card">
              <span>Observed Count</span>

              <strong>
                {dossierData.observedCount ?? "N/A"}
              </strong>
            </div>

            <div className="stat-card">
              <span>Expected Count</span>

              <strong>
                {dossierData.expectedCount ?? "N/A"}
              </strong>
            </div>
          </div>
        </section>

        <section className="content-card">
          <h2>Disproportionality Matrix</h2>

          <div className="placeholder">
            <p>
              Derived matrix will be implemented
              in Task 5.
            </p>
          </div>
        </section>

        <section className="content-card">
          <h2>Appeal SLA</h2>

          <div className="info-row">
            <span>Appeal deadline</span>

            <strong>
              {profile.appealDeadline
                ? new Date(
                    profile.appealDeadline
                  ).toLocaleString()
                : "Not available"}
            </strong>
          </div>

          <div className="placeholder">
            <p>
              Live countdown will be implemented
              in Task 6.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}

export default DossierView;