const mongoose = require("mongoose");

const emergencyContactSchema = new mongoose.Schema({
  name: String,
  relation: String,
  phone: String
});

const wearableSchema = new mongoose.Schema({
  deviceName: String,
  deviceId: String,
  heartRate: Number,
  spo2: Number,
  lastSync: Date
});

const locationSchema = new mongoose.Schema({
  latitude: Number,
  longitude: Number,
  lastUpdated: Date
});

const medicalSchema = new mongoose.Schema({
  allergies: [String],
  diseases: [String],
  medications: [String]
});

const userSchema = new mongoose.Schema(
  {
    name: {
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

    phoneNumber: String,

    gender: String,

    dateOfBirth: Date,

    bloodGroup: String,

    age: Number,

    addressLine1: String,

    city: String,

    state: String,

    pincode: String,

    height: Number,

    weight: Number,

    emergencyContactName: String,

    emergencyContactNumber: String,

    allergies: [String],

    medicalConditions: [String],

    familyMember: emergencyContactSchema,

    emergencyContact: emergencyContactSchema,

    wearableDevice: wearableSchema,

    location: locationSchema,

    medicalInfo: medicalSchema
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);