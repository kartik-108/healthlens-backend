const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


// ---------------- SIGNUP ----------------
exports.signup = async (req, res) => {
  try {

    console.log("SIGNUP BODY:", req.body);

    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({
        message: "Username, email and password are required"
      });
    }

    // Check if email already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists with this email"
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = await User.create({
      name: username,      // 🔧 Fix: schema expects `name`
      email,
      password: hashedPassword
    });

    res.status(201).json({
      message: "Signup successful",
      userId: newUser._id
    });

  } catch (error) {

    console.error("SIGNUP ERROR:", error);

    res.status(500).json({
      message: "Server error during signup",
      error: error.message
    });

  }
};



// ---------------- LOGIN ----------------
exports.login = async (req, res) => {

  try {

    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required"
      });
    }

    // Find user
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        message: "Invalid credentials"
      });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid credentials"
      });
    }

    // Create JWT token
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET || "healthlens_secret",
      { expiresIn: "1d" }
    );

    res.json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });

  } catch (error) {

    console.error("LOGIN ERROR:", error);

    res.status(500).json({
      message: "Server error during login",
      error: error.message
    });

  }

};



// ---------------- PROFILE (PROTECTED) ----------------
exports.profile = async (req, res) => {

  try {

    const user = await User.findById(req.userId).select("-password");

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    res.json(user);

  } catch (error) {

    console.error("PROFILE ERROR:", error);

    res.status(500).json({
      message: "Failed to fetch profile"
    });

  }

};