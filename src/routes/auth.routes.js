const express = require("express");
const router = express.Router();

const {
  signup,
  login,
  profile,
  updateProfile   // 👈 NEW (added)
} = require("../controllers/auth.controller");

const authMiddleware = require("../middleware/auth.middleware");

// PUBLIC
router.post("/signup", signup);
router.post("/login", login);

// PROTECTED
router.get("/profile", authMiddleware, profile);
router.put("/profile", authMiddleware, updateProfile); // 👈 NEW

module.exports = router;
