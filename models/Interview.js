const mongoose = require("mongoose");

const answerSchema = new mongoose.Schema(
  {
    transcript: String,
    llm_score: Number,
    interviewer_score: Number,
  },
  { _id: false }
);

const questionSchema = new mongoose.Schema(
  {
    question_id: String,
    source: { type: String, enum: ["llm", "custom", "interview_ninja"] },
    text: String,
    asked_at: Date,
    answer: answerSchema,
  },
  { _id: false }
);

const proctoringEventSchema = new mongoose.Schema(
  {
    event_type: {
      type: String,
      enum: [
        "keystroke_violation",
        "tab_switch",
        "multiple_screens",
        "suspicious_network",
        "other",
      ],
    },
    description: String,
    severity: { type: String, enum: ["low", "medium", "high"] },
    detected_at: Date,
  },
  { _id: false }
);

const teamsLogSchema = new mongoose.Schema(
  {
    action: {
      type: String,
      enum: ["join", "leave", "mute", "unmute", "screen_share"],
    },
    timestamp: Date,
    metadata: mongoose.Schema.Types.Mixed,
  },
  { _id: false }
);

const llmLogSchema = new mongoose.Schema(
  {
    timestamp: Date,
    request: mongoose.Schema.Types.Mixed,
    response: mongoose.Schema.Types.Mixed,
  },
  { _id: false }
);

const interviewSchema = new mongoose.Schema(
  {
    candidate_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Candidate",
      required: true,
    },
    interviewer: {
      id: String,
      name: String,
      email: String,
    },
    status: {
      type: String,
      enum: ["scheduled", "in_progress", "completed", "cancelled"],
      default: "scheduled",
    },
    scheduled_time: Date,
    start_time: Date,
    end_time: Date,
    questions: [questionSchema],
    proctoring_events: [proctoringEventSchema],
    teams_logs: [teamsLogSchema],
    llm_logs: [llmLogSchema],
    final_feedback: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Interview", interviewSchema);
