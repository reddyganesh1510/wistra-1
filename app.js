const express = require("express");
const cors = require("cors");
require("dotenv").config();
globalThis.File = require("node:buffer").File;
const audioRoutes = require("./routes/audioRoutes");
const chatRoutes = require("./routes/chatRoutes");
const historyRoutes = require("./routes/historyRoutes");

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());
app.use("/api/audio", audioRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/history", historyRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
