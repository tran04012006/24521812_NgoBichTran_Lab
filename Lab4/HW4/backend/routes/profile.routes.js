import express from "express";
import Profile from "../models/Profile.js";

const router = express.Router();

// GET /api/profiles
router.get("/", async (req, res) => {
  try {
    const profiles = await Profile.find().lean();

    res.status(200).json(profiles);
  } catch (error) {
    console.error(error.message);

    res.status(500).json({
      error: "Failed to retrieve profiles",
    });
  }
});

export default router;