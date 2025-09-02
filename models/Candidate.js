const mongoose = require("mongoose");

const candidateSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    resume_link: { type: String },
    status: {
      type: String,
      enum: ["active", "rejected", "hired"],
      default: "active",
    },
  },
  { timestamps: true }
); // adds createdAt, updatedAt

module.exports = mongoose.model("Candidate", candidateSchema);
