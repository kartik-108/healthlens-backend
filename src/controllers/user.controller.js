const User = require('../models/user');

// Update user profile
exports.updateProfile = async (req, res) => {
  try {
        console.log('Request body:', req.body);
    console.log('User ID:', req.userId);
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

    const updateData = {
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
    };

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: updateData },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.status(200).json({
      message: 'Profile updated successfully',
      user: updatedUser
    });
  } catch (error) {
    console.error('Profile update error:', error);
    return res.status(500).json({
      message: 'Failed to update profile',
      error: error.message
    });
  }
};