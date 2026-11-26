import dotenv from "dotenv";
import mongoose from "mongoose";

import Profile from "./models/Profile.js";

dotenv.config();

if (!process.env.MONGODB_URI) {
  throw new Error("MONGODB_URI missing");
}

const profiles = [
  {
    username: "himass",
    displayName: "Himass",
    description: "Sample appeal dossier for Himass.",

    dossierData: {
      observedCount: 80,
      expectedCount: 50,
    },
  },

  {
    username: "tanvuu",
    displayName: "TanVuu",
    description: "Sample appeal dossier for TanVuu.",

    dossierData: {
      observedCount: 40,
      expectedCount: 50,
    },
  },
];

async function seedDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    console.log("MongoDB connected successfully");

    await Profile.init();

    for (const profile of profiles) {
      await Profile.updateOne(
        {
          username: profile.username,
        },
        {
          $setOnInsert: {
            ...profile,

            // Sample deadline: 24 hours after insertion
            appealDeadline: new Date(
              Date.now() + 24 * 60 * 60 * 1000
            ),
          },
        },
        {
          upsert: true,
        }
      );

      console.log(
        `Profile available: ${profile.displayName}`
      );
    }

    console.log("Database seeded successfully");
  } catch (error) {
    console.error("Database seeding failed:", error.message);

    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
}

seedDatabase();