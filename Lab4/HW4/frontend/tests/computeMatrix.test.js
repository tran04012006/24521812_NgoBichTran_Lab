import { test } from "node:test";
import assert from "node:assert/strict";

import {
  computeMatrix,
} from "../src/utils/computeMatrix.js";

// Test 1: Himass sample data
test("calculate overrepresentation correctly", () => {
  const result = computeMatrix({
    observedCount: 80,
    expectedCount: 50,
  });

  assert.equal(result.observed, 80);
  assert.equal(result.expected, 50);
  assert.equal(result.difference, 30);
  assert.equal(result.ratio, 1.6);
  assert.equal(result.deviation, 60);
  assert.equal(result.status, "Overrepresented");
  assert.equal(result.statusType, "over");
});

// Test 2: TanVuu sample data
test("calculate underrepresentation correctly", () => {
  const result = computeMatrix({
    observedCount: 40,
    expectedCount: 50,
  });

  assert.equal(result.difference, -10);
  assert.equal(result.ratio, 0.8);
  assert.equal(result.deviation, -20);
  assert.equal(result.status, "Underrepresented");
  assert.equal(result.statusType, "under");
});

// Test 3: Equal observed and expected values
test("identify proportionate data", () => {
  const result = computeMatrix({
    observedCount: 50,
    expectedCount: 50,
  });

  assert.equal(result.difference, 0);
  assert.equal(result.ratio, 1);
  assert.equal(result.deviation, 0);
  assert.equal(result.status, "Proportionate");
  assert.equal(result.statusType, "balanced");
});

// Test 4: Division by zero
test("handle zero expected count", () => {
  const result = computeMatrix({
    observedCount: 80,
    expectedCount: 0,
  });

  assert.equal(result.difference, 80);
  assert.equal(result.ratio, null);
  assert.equal(result.deviation, null);
  assert.equal(result.status, "Insufficient data");
});

// Test 5: Missing dossier data
test("handle missing dossier data", () => {
  const result = computeMatrix();

  assert.equal(result.observed, null);
  assert.equal(result.expected, null);
  assert.equal(result.ratio, null);
  assert.equal(result.status, "Insufficient data");
});

// Test 6: Negative values
test("reject negative count values", () => {
  const result = computeMatrix({
    observedCount: -10,
    expectedCount: 50,
  });

  assert.equal(result.ratio, null);
  assert.equal(result.status, "Insufficient data");
});

// Test 7: Invalid data types
test("reject non-numeric values", () => {
  const result = computeMatrix({
    observedCount: "80",
    expectedCount: 50,
  });

  assert.equal(result.ratio, null);
  assert.equal(result.status, "Insufficient data");
});

// Test 8: Zero observed count
test("handle zero observed count", () => {
  const result = computeMatrix({
    observedCount: 0,
    expectedCount: 50,
  });

  assert.equal(result.difference, -50);
  assert.equal(result.ratio, 0);
  assert.equal(result.deviation, -100);
  assert.equal(result.status, "Underrepresented");
});

// Test 9: Verify pure function behavior
test("computeMatrix does not mutate original data", () => {
  const dossierData = Object.freeze({
    observedCount: 80,
    expectedCount: 50,
  });

  const result = computeMatrix(dossierData);

  assert.deepEqual(dossierData, {
    observedCount: 80,
    expectedCount: 50,
  });

  assert.equal(result.ratio, 1.6);
});

// Test 10: Verify deterministic calculation
test("same input produces the same result", () => {
  const dossierData = {
    observedCount: 80,
    expectedCount: 50,
  };

  const firstResult = computeMatrix(dossierData);
  const secondResult = computeMatrix(dossierData);

  assert.deepEqual(firstResult, secondResult);
});