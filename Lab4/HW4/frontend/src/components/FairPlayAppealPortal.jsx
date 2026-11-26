import {
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Navbar from "./components/Navbar.jsx";
import DossierView from "./components/DossierView.jsx";
import Home from "./pages/Home.jsx";

function FairPlayAppealPortal() {
  return (
    <div className="portal-layout">
      <Navbar />

      <Routes>
        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/dossier/himass"
          element={<DossierView user="Himass" />}
        />

        <Route
          path="/dossier/tanvuu"
          element={<DossierView user="TanVuu" />}
        />

        <Route
          path="*"
          element={<Navigate to="/" replace />}
        />
      </Routes>

      <footer className="footer">
        <p>
          FairPlay Appeal Portal · Homework 4
        </p>
      </footer>
    </div>
  );
}

export default FairPlayAppealPortal;