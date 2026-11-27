import { ACTION_TYPES } from "./initialState.js";

export function appReducer(state, action) {
  switch (action.type) {
    case ACTION_TYPES.TOGGLE_THEME:
      return {
        ...state,
        theme: state.theme === "dark" ? "light" : "dark",
      };

    case ACTION_TYPES.SET_ACTIVE_TAB:
      return {
        ...state,
        activeTab: action.payload,
      };

    default:
      return state;
  }
}