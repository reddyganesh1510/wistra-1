const fs = require("fs");
const path = require("path");
const OpenAI = require("openai");

if (!globalThis.File) {
  globalThis.File = require("node:buffer").File;
}

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function transcribeAudio(filePath, originalName) {
  const buffer = fs.readFileSync(filePath);
  const ext = path.extname(originalName).slice(1);
  const file = new File([buffer], originalName, { type: `audio/${ext}` });

  const response = await openai.audio.transcriptions.create({
    file,
    model: "whisper-1",
  });
  return response.text;
}

module.exports = { transcribeAudio };
