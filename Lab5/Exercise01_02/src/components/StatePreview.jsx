import { useContext } from "react";

import {
  AppStateContext,
} from "../context/AppContext.js";

export default function StatePreview() {
  const state = useContext(AppStateContext);

  return (
    <section className="state-panel">
      <h3>Current Application State</h3>

      <pre>
        {JSON.stringify(state, null, 2)}
      </pre>
    </section>
  );
}