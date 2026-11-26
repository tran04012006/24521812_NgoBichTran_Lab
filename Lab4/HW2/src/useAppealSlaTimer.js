import { useEffect, useState } from "react";

export function useAppealSlaTimer(deadlineMs) {
  const [nowMs, setNowMs] = useState(() => Date.now());

  useEffect(() => {
    let timeoutId;

    function updateCountdown() {
      window.clearTimeout(timeoutId);

      const currentTimeMs = Date.now();
      const remainingMs = deadlineMs - currentTimeMs;

      setNowMs(currentTimeMs);

      if (remainingMs > 0) {
        const nextUpdateMs = remainingMs % 1000 || 1000;
        timeoutId = window.setTimeout(updateCountdown, nextUpdateMs);
      }
    }

    function handleVisibilityChange() {
      if (document.visibilityState === "visible") {
        updateCountdown();
      }
    }

    updateCountdown();
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      window.clearTimeout(timeoutId);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [deadlineMs]);

  return Math.ceil(Math.max(0, deadlineMs - nowMs) / 1000);
}