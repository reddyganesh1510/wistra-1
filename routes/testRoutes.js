const Candidate = require("../models/Candidate");
const Interview = require("../models/Interview");
const express = require("express");

const router = express.Router();

/**
 * POST /api/candidates
 * Create a new candidate
 */
router.post("/candidates", async (req, res) => {
  try {
    const { name, email } = req.body;

    const candidate = new Candidate({ name, email });
    await candidate.save();

    res.status(201).json({ message: "Candidate created", candidate });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create candidate" });
  }
});

/**
 * POST /api/interviews
 * Create a new interview for a candidate
 */
router.post("/interviews", async (req, res) => {
  try {
    const { candidate_id } = req.body; // expects candidate _id
    if (!candidate_id) {
      return res.status(400).json({ error: "Candidate ID is required" });
    }
    console.log(candidate_id);

    const interview = new Interview({ candidate_id });
    await interview.save();

    res.status(201).json({ message: "Interview created", interview });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create interview" });
  }
});

module.exports = router;
