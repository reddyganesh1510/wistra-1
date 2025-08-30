const express = require("express");
const { generateChatResponse } = require("../utils/chatResponse");

const router = express.Router();

router.post("/chat", async (req, res) => {
  const userMessage = req.body.message;

  try {
    const response = await generateChatResponse(userMessage);
    res.json({ response });
  } catch (error) {
    res.status(500).json({ error: "Error generating chat response" });
  }
});

module.exports = router;
