const express = require("express");
const router = express.Router();

const { signup, login, profile } = require("../controllers/auth.controller");
const authMiddleware = require("../middleware/auth.middleware");

// signup
router.post("/signup", signup);

// login
router.post("/login", login);

// protected profile route
router.get("/profile", authMiddleware, profile);

module.exports = router;
