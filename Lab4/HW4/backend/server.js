import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

import Profile from "./models/Profile.js";
import Swipe from "./models/Swipe.js";

import profileRoutes from "./routes/profile.routes.js";
import swipeRoutes from "./routes/swipe.routes.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin:
      process.env.CLIENT_ORIGIN ||
      "http://localhost:5173",
  })
);

app.use(express.json());

// Environment variable security guard
if (!process.env.MONGODB_URI) {
  throw new Error("MONGODB_URI missing");
}

// Health endpoint
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Fair Play Appeal API is running",
  });
});

// API routes
app.use("/api/profiles", profileRoutes);
app.use("/api/swipe", swipeRoutes);

// Initialize server
async function startServer() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    console.log("MongoDB connected successfully");

    await Promise.all([
      Profile.init(),
      Swipe.init(),
    ]);

    console.log("Profile model initialized");
    console.log("Swipe model initialized");

    app.listen(PORT, () => {
      console.log(
        `Server is running at http://localhost:${PORT}`
      );
    });
  } catch (error) {
    console.error(
      "Server initialization failed:",
      error.message
    );

    process.exit(1);
  }
}

startServer();