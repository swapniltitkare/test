import mongoose from "mongoose";

const profileSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
      unique: true,
    },
    drivesApplied: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "placement",

        // unique: true,
      },
    ],
    photourl: {
      type: String,
    },
    resume: {
      type: String,
    },

    placed: {
      type: Boolean,
      default: false,
    },
    placedData: [
      {
        driveId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "placement",
          required: true,
        },
        Package: {
          type: Number,
          required: true,
        },
        placedOn: {
          type: Date,
          default: Date.now,
        },
      },
    ],

    branch: { type: String, required: true },
    engineering_division: { type: String, required: true },
    engineeringpercent: { type: Number, required: true },
    engineeringAggrpercent: { type: Number, required: true },
    liveKt: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("profile-details", profileSchema);
