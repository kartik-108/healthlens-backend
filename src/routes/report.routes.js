const express = require("express");
const router = express.Router();

const upload = require("../middleware/upload.middleware");

const { analyzeReport } = require("../controllers/report.controller");

const authMiddleware = require("../middleware/auth.middleware");

router.post("/analyze", authMiddleware, upload.single("report"), analyzeReport);

module.exports = router;