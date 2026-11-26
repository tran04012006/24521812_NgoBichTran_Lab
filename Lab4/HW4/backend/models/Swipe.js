import mongoose from "mongoose";

const swipeSchema = new mongoose.Schema(
  {
    profileId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Profile",
      required: true,
    },

    direction: {
      type: String,
      enum: ["left", "right"],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Swipe = mongoose.model("Swipe", swipeSchema);

export default Swipe;