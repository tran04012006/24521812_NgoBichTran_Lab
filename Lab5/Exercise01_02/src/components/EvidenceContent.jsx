import { useState } from "react";

import EvidenceGrid from "./EvidenceGrid.jsx";

import { clips as initialClips } from "../data/clips.js";

export default function EvidenceContent() {
  const [clips] = useState(initialClips);

  return (
    <section className="tab-content">
      <span className="section-label">
        EXERCISE 0.2
      </span>

      <h3>Evidence Grid</h3>

      <p>
        Zero-effect pagination using derived
        values calculated during rendering.
      </p>

      <EvidenceGrid clips={clips} />
    </section>
  );
}