import {
  useAppealSlaTimer,
} from "../hooks/useAppealSlaTimer.js";

import "./AppealSlaCountdown.css";

function formatUnit(value) {
  return String(value).padStart(2, "0");
}

const syncLabels = {
  synced: "Server synchronized",
  syncing: "Synchronizing...",
  offline: "Server unavailable",
  unavailable: "Not available",
};

function AppealSlaCountdown({ deadline }) {
  const {
    days,
    hours,
    minutes,
    seconds,
    syncStatus,
    isExpired,
    isValidDeadline,
  } = useAppealSlaTimer(deadline);

  if (!isValidDeadline) {
    return (
      <div className="sla-unavailable">
        <p>No appeal deadline available.</p>
      </div>
    );
  }

  const units = [
    {
      label: "Days",
      value: days,
    },
    {
      label: "Hours",
      value: hours,
    },
    {
      label: "Minutes",
      value: minutes,
    },
    {
      label: "Seconds",
      value: seconds,
    },
  ];

  return (
    <div className="sla-container">
      <div className="sla-header">
        <span className="sla-label">
          Appeal status
        </span>

        <span
          className={`sla-status ${
            isExpired
              ? "expired"
              : "active"
          }`}
        >
          {isExpired
            ? "Deadline expired"
            : "Appeal open"}
        </span>
      </div>

      <div
        className={`sla-countdown ${
          isExpired ? "countdown-expired" : ""
        }`}
        role="timer"
        aria-label="Appeal time remaining"
        aria-live="off"
      >
        {units.map((unit) => (
          <div
            className="sla-unit"
            key={unit.label}
          >
            <strong>
              {formatUnit(unit.value)}
            </strong>

            <span>{unit.label}</span>
          </div>
        ))}
      </div>

      <div className="sla-deadline">
        <span>Appeal deadline</span>

        <strong>
          {new Date(deadline).toLocaleString()}
        </strong>
      </div>

      <div
        className={`sla-sync ${syncStatus}`}
        role="status"
      >
        <span className="sla-sync-dot" />

        <span>
          {syncLabels[syncStatus]}
        </span>
      </div>

      {isExpired && (
        <div className="sla-expired-message">
          The appeal submission deadline
          has passed.
        </div>
      )}

      <p className="sla-note">
        Countdown calculated using absolute
        timestamps and automatically
        synchronized when returning to this tab.
      </p>
    </div>
  );
}

export default AppealSlaCountdown;