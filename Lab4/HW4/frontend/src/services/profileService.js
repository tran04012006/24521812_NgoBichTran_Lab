const API_URL =
  import.meta.env.VITE_API_URL ||
  "http://localhost:5000";

export async function getProfiles(signal) {
  const response = await fetch(
    `${API_URL}/api/profiles`,
    { signal }
  );

  if (!response.ok) {
    throw new Error("Failed to retrieve profiles");
  }

  return response.json();
}

export async function getProfileByUsername(
  username,
  signal
) {
  const profiles = await getProfiles(signal);

  const profile = profiles.find(
    (item) =>
      item.username.toLowerCase() ===
      username.toLowerCase()
  );

  if (!profile) {
    throw new Error(`Profile ${username} not found`);
  }

  return profile;
}