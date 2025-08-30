const axios = require("axios");

async function textToSpeech(text) {
  // OpenAI API Example
  const url = "https://api.openai.com/v1/audio/speech";

  const body = {
    model: "gpt-4o-mini-tts", // TTS model
    voice: "alloy", // neutral professional voice
    input: text, // text you want to convert
  };

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
  };

  const response = await axios.post(url, body, {
    headers,
    responseType: "stream", // 👈 get raw audio buffer
  });
  return response.data;

  //ELEVEN LABS API Example
  // Uncomment the following code if you want to use Eleven Labs API for TTS
  // const voice_id = "bMxLr8fP6hzNRRi9nJxU";
  // const url = `https://api.elevenlabs.io/v1/text-to-speech/${voice_id}`;
  // const body = {
  //   text,
  //   model_id: "eleven_monolingual_v1",
  //   voice_settings: {
  //     stability: 0,
  //     similarity_boost: 0,
  //     style: 0.5,
  //     use_speaker_boost: true,
  //   },
  // };
  // const headers = {
  //   "Content-Type": "application/json",
  //   accept: "audio/mpeg",
  //   "xi-api-key": process.env.ELEVENLABS_API_KEY,
  // };
  // const response = await axios.post(url, body, {
  //   headers,
  //   responseType: "arraybuffer",
  // });
  // return response.data;
}

module.exports = { textToSpeech };
