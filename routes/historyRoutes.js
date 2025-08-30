const express = require("express");
const router = express.Router();
const historyController = require("../controllers/historyController");

router.get("/history", historyController.getHistory);
router.post("/history", historyController.saveHistory);
router.delete("/history", historyController.clearHistory);

module.exports = router;
