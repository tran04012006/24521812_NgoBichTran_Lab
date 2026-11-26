import {
  useEffect,
  useState,
} from "react";

import {
  getServerTime,
} from "../services/timeService.js";

function calculateRemainingTime(
  deadline,
  currentTime
) {
  return Math.max(
    0,
    deadline - currentTime
  );
}

function formatRemainingTime(milliseconds) {
  const totalSeconds = Math.ceil(
    milliseconds / 1000
  );

  const days = Math.floor(
    totalSeconds / 86400
  );

  const hours = Math.floor(
    (totalSeconds % 86400) / 3600
  );

  const minutes = Math.floor(
    (totalSeconds % 3600) / 60
  );

  const seconds = totalSeconds % 60;

  return {
    days,
    hours,
    minutes,
    seconds,
  };
}

export function useAppealSlaTimer(
  deadline
) {
  const deadlineTimestamp =
    deadline == null
      ? NaN
      : new Date(deadline).getTime();

  const isValidDeadline =
    Number.isFinite(deadlineTimestamp);

  const [timer, setTimer] = useState(() => ({
    deadline: deadlineTimestamp,

    remainingTime: isValidDeadline
      ? calculateRemainingTime(
          deadlineTimestamp,
          Date.now()
        )
      : 0,

    syncStatus: isValidDeadline
      ? "syncing"
      : "unavailable",
  }));

  useEffect(() => {
    if (!isValidDeadline) {
      return;
    }

    let active = true;

    let requestController = null;

    let clock = {
      serverTime: Date.now(),
      referenceTime: performance.now(),
    };

    let syncStatus = "syncing";

    // Estimate current time using a monotonic clock
    function getCurrentTime() {
      return (
        clock.serverTime +
        (
          performance.now() -
          clock.referenceTime
        )
      );
    }

    function updateCountdown() {
      if (!active) {
        return;
      }

      const remainingTime =
        calculateRemainingTime(
          deadlineTimestamp,
          getCurrentTime()
        );

      setTimer({
        deadline: deadlineTimestamp,
        remainingTime,
        syncStatus,
      });
    }

    // Synchronize local countdown with server
    async function resyncTimerWithServer() {
      requestController?.abort();

      const controller =
        new AbortController();

      requestController = controller;

      syncStatus = "syncing";

      updateCountdown();

      const timeout = setTimeout(() => {
        controller.abort();
      }, 5000);

      try {
        const serverClock =
          await getServerTime(
            controller.signal
          );

        if (
          !active ||
          controller.signal.aborted ||
          requestController !== controller
        ) {
          return;
        }

        clock = serverClock;

        syncStatus = "synced";
      } catch {
        if (
          !active ||
          requestController !== controller
        ) {
          return;
        }

        // Continue using the last available clock
        syncStatus = "offline";
      } finally {
        clearTimeout(timeout);

        if (
          active &&
          requestController === controller
        ) {
          updateCountdown();
        }
      }
    }

    // Page Visibility API
    function handleVisibilityChange() {
      if (
        document.visibilityState ===
        "visible"
      ) {
        updateCountdown();

        resyncTimerWithServer();
      }
    }

    // Update countdown from absolute timestamps
    const countdownInterval = setInterval(
      updateCountdown,
      250
    );

    // Periodic server synchronization
    const syncInterval = setInterval(() => {
      if (
        document.visibilityState ===
        "visible"
      ) {
        resyncTimerWithServer();
      }
    }, 60000);

    document.addEventListener(
      "visibilitychange",
      handleVisibilityChange
    );

    // Initial synchronization
    const initialSync = setTimeout(
      resyncTimerWithServer,
      0
    );

    // Cleanup when component unmounts
    return () => {
      active = false;

      clearTimeout(initialSync);

      clearInterval(countdownInterval);

      clearInterval(syncInterval);

      requestController?.abort();

      document.removeEventListener(
        "visibilitychange",
        handleVisibilityChange
      );
    };
  }, [
    deadlineTimestamp,
    isValidDeadline,
  ]);

  const isCurrentDeadline =
    isValidDeadline &&
    timer.deadline === deadlineTimestamp;

  const remainingTime = isCurrentDeadline
    ? timer.remainingTime
    : 0;

  const syncStatus = !isValidDeadline
    ? "unavailable"
    : isCurrentDeadline
      ? timer.syncStatus
      : "syncing";

  return {
    ...formatRemainingTime(remainingTime),

    remainingTime,

    syncStatus,

    isValidDeadline,

    isExpired:
      isCurrentDeadline &&
      remainingTime === 0,
  };
}