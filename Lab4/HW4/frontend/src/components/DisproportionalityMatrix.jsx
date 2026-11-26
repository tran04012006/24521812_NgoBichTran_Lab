import "./DisproportionalityMatrix.css";

function formatNumber(value, decimals = 0) {
  if (value === null || !Number.isFinite(value)) {
    return "N/A";
  }

  return value.toFixed(decimals);
}

function formatSignedNumber(value, decimals = 0) {
  if (value === null || !Number.isFinite(value)) {
    return "N/A";
  }

  const sign = value > 0 ? "+" : "";

  return `${sign}${value.toFixed(decimals)}`;
}

function DisproportionalityMatrix({ matrix }) {
  const {
    observed,
    expected,
    difference,
    ratio,
    deviation,
    status,
    statusType,
  } = matrix;

  const maxCount = Math.max(
    observed ?? 0,
    expected ?? 0,
    1
  );

  const observedWidth =
    ((observed ?? 0) / maxCount) * 100;

  const expectedWidth =
    ((expected ?? 0) / maxCount) * 100;

  return (
    <div className="matrix-container">
      <div className="matrix-header">
        <span className="matrix-label">
          Comparison status
        </span>

        <span
          className={`matrix-status ${statusType}`}
        >
          {status}
        </span>
      </div>

      <div className="matrix-chart">
        <div className="matrix-bar-row">
          <div className="matrix-bar-heading">
            <span>Observed</span>
            <strong>{formatNumber(observed)}</strong>
          </div>

          <div className="matrix-track">
            <div
              className="matrix-bar observed-bar"
              style={{
                width: `${observedWidth}%`,
              }}
            />
          </div>
        </div>

        <div className="matrix-bar-row">
          <div className="matrix-bar-heading">
            <span>Expected</span>
            <strong>{formatNumber(expected)}</strong>
          </div>

          <div className="matrix-track">
            <div
              className="matrix-bar expected-bar"
              style={{
                width: `${expectedWidth}%`,
              }}
            />
          </div>
        </div>
      </div>

      <div className="matrix-table-wrapper">
        <table className="matrix-table">
          <thead>
            <tr>
              <th>Metric</th>
              <th>Value</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>Observed count</td>
              <td>{formatNumber(observed)}</td>
            </tr>

            <tr>
              <td>Expected count</td>
              <td>{formatNumber(expected)}</td>
            </tr>

            <tr>
              <td>Difference</td>
              <td>{formatSignedNumber(difference)}</td>
            </tr>

            <tr>
              <td>Disproportionality ratio</td>
              <td>
                {ratio === null
                  ? "N/A"
                  : `${formatNumber(ratio, 2)}x`}
              </td>
            </tr>

            <tr>
              <td>Percentage deviation</td>
              <td>
                {deviation === null
                  ? "N/A"
                  : `${formatSignedNumber(deviation, 2)}%`}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <p className="matrix-note">
        Metrics are derived from the original
        dossier data during rendering.
      </p>
    </div>
  );
}

export default DisproportionalityMatrix;