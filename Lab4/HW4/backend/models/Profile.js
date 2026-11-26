import mongoose from "mongoose";

const profileSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    displayName: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      default: "",
    },

    dossierData: {
      type: mongoose.Schema.Types.Mixed,
      default: () => ({}),
    },

    appealDeadline: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

const Profile = mongoose.model("Profile", profileSchema);

export default Profile;