import { useContext } from "react";

import {
  AppDispatchContext,
} from "../context/AppContext.js";

import {
  ACTION_TYPES,
} from "../reducers/initialState.js";

export default function ThemeToggle() {
  const dispatch = useContext(AppDispatchContext);

  function handleToggleTheme() {
    dispatch({
      type: ACTION_TYPES.TOGGLE_THEME,
    });
  }

  return (
    <button
      type="button"
      className="action-button"
      onClick={handleToggleTheme}
    >
      Toggle Theme
    </button>
  );
}