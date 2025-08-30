const express = require("express");
const multer = require("multer");
const { uploadAudio, clearHistory } = require("../controllers/audioController");

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post("/talk", upload.single("file"), uploadAudio);
router.get("/clear", clearHistory);

module.exports = router;
