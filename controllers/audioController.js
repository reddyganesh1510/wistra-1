const { transcribeAudio } = require("../utils/transcription");
const generateChatResponse = require("../utils/chatResponse");
const { saveMessages, loadMessages } = require("../utils/historyManager");
const { textToSpeech } = require("../utils/textToSpeech");
const fs = require("fs");

const SUPPORTED_FORMATS = [
  "flac",
  "m4a",
  "mp3",
  "mp4",
  "mpeg",
  "mpga",
  "oga",
  "ogg",
  "wav",
  "webm",
];

module.exports = {
  uploadAudio: async (req, res) => {
    try {
      const audioFile = req.file;
      if (!audioFile) {
        return res.status(400).json({ error: "No audio file uploaded" });
      }
      const ext = audioFile.originalname.split(".").pop().toLowerCase();
      if (!SUPPORTED_FORMATS.includes(ext)) {
        return res
          .status(400)
          .json({ error: `Unsupported file format: ${ext}` });
      }
      // Pass both path and originalname to transcription
      const transcription = await transcribeAudio(
        audioFile.path,
        audioFile.originalname
      );

      // 2. Get chat response
      const messages = loadMessages();
      messages.push({ role: "user", content: transcription });
      const chatResponse = await generateChatResponse(messages);
      // 3. Save chat history
      saveMessages(transcription, chatResponse);
      // res.send(chatResponse);

      // 4. Generate TTS audio
      const audioOutput = await textToSpeech(chatResponse);

      res.set({
        "Content-Type": "audio/mpeg",
        "Content-Disposition": "inline; filename=response.mp3",
      });

      audioOutput.pipe(res);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error processing audio file" });
    }
  },
  clearHistory: (req, res) => {
    fs.writeFileSync("database.json", "");
    res.json({ message: "Chat history has been cleared" });
  },
};
