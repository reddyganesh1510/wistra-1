const express = require('express');
const { generateChatResponse } = require('../controllers/chatController');

const router = express.Router();

router.post('/chat', async (req, res) => {
    try {
        const userMessage = req.body.message;
        const response = await generateChatResponse(userMessage);
        res.json({ response });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while generating the chat response.' });
    }
});

module.exports = router;