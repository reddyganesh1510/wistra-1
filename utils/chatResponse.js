const OpenAI = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

module.exports = async function generateChatResponse(messages) {
  try {
    // Format messages for OpenAI API v4

    const response = await openai.responses.create({
      model: "gpt-4o-mini",
      input: messages,
    });

    console.log("OpenAI response:", response.output_text);
    return response.output_text;
    return reply;
  } catch (error) {
    console.error("Error generating chat response:", error);
    throw new Error("Could not generate chat response");
  }
};
