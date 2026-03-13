const express = require("express");
const router = express.Router();

const { updateLocation } = require("../controllers/location.controller");

const authMiddleware = require("../middleware/auth.middleware");

router.post("/update", authMiddleware, updateLocation);

module.exports = router;