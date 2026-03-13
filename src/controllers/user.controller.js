const User = require("../models/user");

// Update user profile
exports.updateProfile = async (req, res) => {
  try {
    console.log("Request body:", req.body);
    console.log("User ID:", req.userId);

    const userId = req.userId; // from auth middleware

    const {
      phoneNumber,
      gender,
      dateOfBirth,
      bloodGroup,
      addressLine1,
      city,
      state,
      pincode,
      emergencyContactName,
      emergencyContactNumber,
      height,
      weight,
      allergies,
      medicalConditions
    } = req.body;

    // Remove undefined values
    const updateData = {};

    if (phoneNumber) updateData.phoneNumber = phoneNumber;
    if (gender) updateData.gender = gender;
    if (dateOfBirth) updateData.dateOfBirth = dateOfBirth;
    if (bloodGroup) updateData.bloodGroup = bloodGroup;
    if (addressLine1) updateData.addressLine1 = addressLine1;
    if (city) updateData.city = city;
    if (state) updateData.state = state;
    if (pincode) updateData.pincode = pincode;
    if (emergencyContactName) updateData.emergencyContactName = emergencyContactName;
    if (emergencyContactNumber) updateData.emergencyContactNumber = emergencyContactNumber;
    if (height) updateData.height = height;
    if (weight) updateData.weight = weight;
    if (allergies) updateData.allergies = allergies;
    if (medicalConditions) updateData.medicalConditions = medicalConditions;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: updateData },
      {
        new: true,
        runValidators: true
      }
    );

    if (!updatedUser) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    return res.status(200).json({
      message: "Profile updated successfully",
      user: updatedUser
    });

  } catch (error) {
    console.error("Profile update error:", error);

    return res.status(500).json({
      message: "Failed to update profile",
      error: error.message
    });
  }
};