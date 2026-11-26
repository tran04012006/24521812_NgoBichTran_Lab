import express from "express";
import mongoose from "mongoose";

import Profile from "../models/Profile.js";
import Swipe from "../models/Swipe.js";

const router = express.Router();

// POST /api/swipe
router.post("/", async (req, res) => {
  try {
    const { profileId, direction } = req.body;

    // Validate profile ID
    if (!mongoose.isObjectIdOrHexString(profileId)) {
      return res.status(400).json({
        error: "Invalid profile ID",
      });
    }

    // Validate swipe direction
    if (!["left", "right"].includes(direction)) {
      return res.status(400).json({
        error: "Direction must be left or right",
      });
    }

    // Check whether the profile exists
    const profile = await Profile.exists({
      _id: profileId,
    });

    if (!profile) {
      return res.status(404).json({
        error: "Profile not found",
      });
    }

    // Save swipe record
    const record = await Swipe.create({
      profileId,
      direction,
    });

    res.status(201).json(record);
  } catch (error) {
    console.error(error.message);

    if (
      error.name === "ValidationError" ||
      error.name === "CastError"
    ) {
      return res.status(400).json({
        error: error.message,
      });
    }

    res.status(500).json({
      error: "Failed to create swipe record",
    });
  }
});

export default router;