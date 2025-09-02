// routes/interviews.js
const express = require("express");

const router = express.Router();
const Interview = require("../models/Interview");

// Save proctoring event
router.post("/:id/proctoring-events", async (req, res) => {
  try {
    var { event_type, description, severity, detected_at } = req.body;

    if (!event_type) {
      return res.status(400).json({ error: "event_type is required" });
    }

    const interview = await Interview.findById(req.params.id);
    if (!interview) {
      return res.status(404).json({ error: "Interview not found" });
    }
    if (!detected_at) {
      detected_at = new Date();
    }

    interview.proctoring_events.push({
      event_type,
      description,
      severity,
      detected_at,
    });
    await interview.save();

    res.status(201).json({ message: "Proctoring event saved", interview });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
