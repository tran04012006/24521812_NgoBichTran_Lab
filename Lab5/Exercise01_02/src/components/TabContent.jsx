import { useContext } from "react";

import {
  AppStateContext,
} from "../context/AppContext.js";

export default function TabContent() {
  const { activeTab } = useContext(AppStateContext);

  switch (activeTab) {
    case "reels":
      return (
        <section className="tab-content">
          <span className="section-label">
            ACTIVE TAB
          </span>

          <h3>Reels</h3>

          <p>
            The Reels tab displays video clips and
            short-form content.
          </p>
        </section>
      );

    case "evidence":
      return (
        <section className="tab-content">
          <span className="section-label">
            EXERCISE 0.2
          </span>

          <h3>Evidence Grid</h3>

          <p>
            Evidence clips will be displayed here using
            zero-effect pagination and responsive
            container queries.
          </p>
        </section>
      );

    default:
      return null;
  }
}