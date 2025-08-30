const fs = require("fs");
const path = require("path");

const historyFilePath = path.join(__dirname, "chatHistory.json");

const loadHistory = () => {
  if (fs.existsSync(historyFilePath)) {
    const data = fs.readFileSync(historyFilePath, "utf8");
    return JSON.parse(data);
  }
  return [];
};

const saveHistory = (history) => {
  fs.writeFileSync(historyFilePath, JSON.stringify(history, null, 2));
};

const clearHistory = () => {
  if (fs.existsSync(historyFilePath)) {
    fs.unlinkSync(historyFilePath);
  }
};

function loadMessages() {
  const file = "database.json";
  if (!fs.existsSync(file) || fs.statSync(file).size === 0) {
    return [
      {
        role: "system",
        content:
          "You are Wistra, a professional interviewer for a junior React developer named Travis. Ask 10 ques.",
      },
    ];
  }
  const data = JSON.parse(fs.readFileSync(file));
  return data;
}

function saveMessages(userMessage, gptResponse) {
  const file = "database.json";
  let messages = loadMessages();
  messages.push({ role: "user", content: userMessage });
  messages.push({ role: "assistant", content: gptResponse });
  fs.writeFileSync(file, JSON.stringify(messages));
}

module.exports = {
  loadHistory,
  saveHistory,
  clearHistory,
  loadMessages,
  saveMessages,
};
