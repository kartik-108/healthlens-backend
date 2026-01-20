const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
    phoneNumber: {
    type: String,
    required: true
  },
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Other'],
    required: true
  },
  dateOfBirth: {
    type: Date,
    required: true
  },
  bloodGroup: {
    type: String,
    required: true
  },
  addressLine1: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  state: {
    type: String,
    required: true
  },
  pincode: {
    type: String,
    required: true
  },
  emergencyContactName: {
    type: String,
    required: true
  },
  emergencyContactNumber: {
    type: String,
    required: true
  },
  height: {
    type: Number,
    required: false
  },
  weight: {
    type: Number,
    required: false
  },
  allergies: {
    drug: { type: Boolean, default: false },
    food: { type: Boolean, default: false },
    dust: { type: Boolean, default: false },
    none: { type: Boolean, default: false }
  },
  medicalConditions: {
    diabetes: { type: Boolean, default: false },
    asthma: { type: Boolean, default: false },
    heartDisease: { type: Boolean, default: false },
    highBP: { type: Boolean, default: false },
    thyroid: { type: Boolean, default: false },
    none: { type: Boolean, default: false }
  }
});

module.exports = mongoose.model("User", userSchema);
