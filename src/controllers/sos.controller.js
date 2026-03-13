const SOS = require("../models/sos.model");
const User = require("../models/user");

exports.triggerSOS = async (req, res) => {
  try {

    const userId = req.userId;

    const { latitude, longitude, heartRate, spo2 } = req.body;

    const sos = await SOS.create({
      userId,
      location: {
        latitude,
        longitude
      },
      heartRate,
      spo2
    });

    const user = await User.findById(userId);

    res.status(200).json({
      message: "SOS triggered successfully",
      sos,
      emergencyContacts: [
        user.familyMember,
        user.emergencyContact
      ]
    });

  } catch (error) {
    console.error("SOS error:", error);

    res.status(500).json({
      message: "SOS failed",
      error: error.message
    });
  }
};