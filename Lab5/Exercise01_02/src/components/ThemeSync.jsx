import { useContext, useEffect } from "react";

import {
  AppStateContext,
} from "../context/AppContext.js";

export default function ThemeSync() {
  const { theme } = useContext(AppStateContext);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  return null;
}