const User = require("../models/user");

// PROFILE CONTROLLER
const profile = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "Profile fetched successfully",
      user
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  signup,
  login,
  profile
};
exports.profile = async (req, res) => {
  res.status(200).json({
    message: "Profile fetched successfully",
    user: req.user
  });
};
