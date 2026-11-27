import { useContext } from "react";

import {
  AppStateContext,
} from "../context/AppContext.js";

export default function StateValue({ name }) {
  const state = useContext(AppStateContext);

  return (
    <strong>
      {state[name]}
    </strong>
  );
}