export function computeMatrix(dossierData) {
  const observed = dossierData?.observedCount;
  const expected = dossierData?.expectedCount;

  const isValid =
    Number.isFinite(observed) &&
    Number.isFinite(expected) &&
    observed >= 0 &&
    expected >= 0;

  if (!isValid) {
    return {
      observed: null,
      expected: null,
      difference: null,
      ratio: null,
      deviation: null,
      status: "Insufficient data",
      statusType: "neutral",
    };
  }

  const difference = observed - expected;

  // Prevent division by zero
  if (expected === 0) {
    return {
      observed,
      expected,
      difference,
      ratio: null,
      deviation: null,
      status: "Insufficient data",
      statusType: "neutral",
    };
  }

  const ratio = observed / expected;

  const deviation =
    ((observed - expected) / expected) * 100;

  let status;
  let statusType;

  if (ratio > 1) {
    status = "Overrepresented";
    statusType = "over";
  } else if (ratio < 1) {
    status = "Underrepresented";
    statusType = "under";
  } else {
    status = "Proportionate";
    statusType = "balanced";
  }

  return {
    observed,
    expected,
    difference,
    ratio,
    deviation,
    status,
    statusType,
  };
}