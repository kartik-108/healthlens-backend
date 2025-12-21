const express = require("express");
const router = express.Router();

const { signup, login, getProfile } = require("../controllers/auth.controller");
const authMiddleware = require("../middleware/auth.middleware");

// PUBLIC ROUTES
router.post("/signup", signup);
router.post("/login", login);

// PROTECTED ROUTE
router.get("/profile", authMiddleware, getProfile);

module.exports = router;
