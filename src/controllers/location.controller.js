const User = require("../models/user");

exports.updateLocation = async (req, res) => {
  try {

    const userId = req.userId;

    const { latitude, longitude, accuracy } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        location: {
          latitude,
          longitude,
          accuracy,
          lastUpdated: new Date()
        }
      },
      { new: true }
    );

    res.status(200).json({
      message: "Location updated successfully",
      location: updatedUser.location
    });

  } catch (error) {
    res.status(500).json({
      message: "Location update failed",
      error: error.message
    });
  }
};