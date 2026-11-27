import { useReducer } from "react";

import {
  AppStateContext,
  AppDispatchContext,
} from "./AppContext.js";

import { appReducer } from "../reducers/appReducer.js";

import { initialState } from "../reducers/initialState.js";

import ThemeSync from "../components/ThemeSync.jsx";

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(
    appReducer,
    initialState
  );

  return (
    <AppStateContext.Provider value={state}>
      <AppDispatchContext.Provider value={dispatch}>
        <ThemeSync />

        {children}
      </AppDispatchContext.Provider>
    </AppStateContext.Provider>
  );
}