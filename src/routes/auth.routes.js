const express = require("express");
const router = express.Router();

const {
  signup,
  login,
  getProfile
} = require("../controllers/auth.controller");

const authMiddleware = require("../middleware/auth.middleware");

// =========================
// AUTH ROUTES
// =========================

// SIGNUP
router.post("/signup", signup);

// LOGIN
router.post("/login", login);

// PROTECTED ROUTE (TEST JWT)
router.get("/profile", authMiddleware, getProfile);

module.exports = router;