import mongoose from "mongoose";

const newletterSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Email = mongoose.model("Email", newletterSchema);
