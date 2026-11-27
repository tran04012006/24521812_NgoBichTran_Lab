export const clips = Array.from(
  { length: 18 },
  (_, index) => ({
    _id: `clip-${String(index + 1).padStart(3, "0")}`,

    title: `Evidence Clip ${String(index + 1).padStart(2, "0")}`,

    description: `Evidence recording number ${index + 1}.`,

    category: ["Match Review", "Incident", "Appeal"][
      index % 3
    ],

    duration: `00:${String(
      15 + (index * 7) % 45
    ).padStart(2, "0")}`,
  })
);