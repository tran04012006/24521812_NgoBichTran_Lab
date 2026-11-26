const API_URL =
  import.meta.env.VITE_API_URL ||
  "http://localhost:5000";

export async function getServerTime(signal) {
  const requestStart = performance.now();

  const response = await fetch(
    `${API_URL}/api/time`,
    {
      signal,
      cache: "no-store",
    }
  );

  if (!response.ok) {
    throw new Error(
      "Failed to synchronize with server"
    );
  }

  const data = await response.json();

  const requestEnd = performance.now();

  if (!Number.isFinite(data.serverTime)) {
    throw new Error("Invalid server timestamp");
  }

  const roundTripTime =
    requestEnd - requestStart;

  // Estimate network latency
  const estimatedLatency =
    roundTripTime / 2;

  return {
    serverTime:
      data.serverTime + estimatedLatency,

    referenceTime: requestEnd,
  };
}