const fs = require("fs");
const path = require("path");
const historyFilePath = path.join(__dirname, "../data/history.json");

const loadHistory = () => {
  if (fs.existsSync(historyFilePath) && fs.statSync(historyFilePath).size > 0) {
    const data = fs.readFileSync(historyFilePath);
    return JSON.parse(data);
  }
  // Default system message if file is missing or empty
  return [
    {
      role: "system",
      content:
        "You are interviewing the user for a front-end React developer position. Ask short questions that are relevant to a junior level developer. Your name is Greg. The user is Travis. Keep responses under 30 words and be funny sometimes.",
    },
  ];
};

const saveHistoryToFile = (history) => {
  fs.writeFileSync(historyFilePath, JSON.stringify(history, null, 2));
};

const getHistory = (req, res) => {
  const history = loadHistory();
  res.json(history);
};

const saveHistory = (req, res) => {
  const newEntry = req.body;
  const history = loadHistory();
  history.push(newEntry);
  saveHistoryToFile(history);
  res.status(201).json(newEntry);
};

const clearHistory = (req, res) => {
  saveHistoryToFile([]);
  res.status(204).send();
};

module.exports = {
  getHistory,
  saveHistory,
  clearHistory,
};
