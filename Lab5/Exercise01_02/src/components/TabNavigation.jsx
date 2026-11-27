import { useContext } from "react";

import {
  AppStateContext,
  AppDispatchContext,
} from "../context/AppContext.js";

import {
  ACTION_TYPES,
} from "../reducers/initialState.js";

export default function TabNavigation() {
  const state = useContext(AppStateContext);

  const dispatch = useContext(AppDispatchContext);

  function handleChangeTab(tab) {
    dispatch({
      type: ACTION_TYPES.SET_ACTIVE_TAB,
      payload: tab,
    });
  }

  return (
    <div className="tab-actions">
      <button
        type="button"
        className={`action-button ${
          state.activeTab === "reels"
            ? "active"
            : ""
        }`}
        aria-pressed={state.activeTab === "reels"}
        onClick={() => handleChangeTab("reels")}
      >
        Reels
      </button>

      <button
        type="button"
        className={`action-button ${
          state.activeTab === "evidence"
            ? "active"
            : ""
        }`}
        aria-pressed={state.activeTab === "evidence"}
        onClick={() => handleChangeTab("evidence")}
      >
        Evidence
      </button>
    </div>
  );
}