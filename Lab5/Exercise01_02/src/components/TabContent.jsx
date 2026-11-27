import { useContext } from "react";

import {
  AppStateContext,
} from "../context/AppContext.js";

import EvidenceContent from "./EvidenceContent.jsx";

export default function TabContent() {
  const { activeTab } = useContext(
    AppStateContext
  );

  switch (activeTab) {
    case "reels":
      return (
        <section className="tab-content">
          <span className="section-label">
            ACTIVE TAB
          </span>

          <h3>Reels</h3>

          <p>
            The Reels tab displays video clips
            and short-form content.
          </p>
        </section>
      );

    case "evidence":
      return <EvidenceContent />;

    default:
      return null;
  }
}