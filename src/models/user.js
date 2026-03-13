const mongoose = require("mongoose");


// ---------------- EMERGENCY CONTACT ----------------
const emergencyContactSchema = new mongoose.Schema({
  name: {
    type: String
  },
  relation: {
    type: String
  },
  phone: {
    type: String
  }
});


// ---------------- WEARABLE DEVICE ----------------
const wearableSchema = new mongoose.Schema({
  deviceName: {
    type: String
  },
  deviceId: {
    type: String
  },
  heartRate: {
    type: Number
  },
  spo2: {
    type: Number
  },
  steps: {
    type: Number
  },
  temperature: {
    type: Number
  },
  lastSync: {
    type: Date,
    default: Date.now
  }
});


// ---------------- GPS LOCATION ----------------
const locationSchema = new mongoose.Schema({
  latitude: {
    type: Number
  },
  longitude: {
    type: Number
  },
  accuracy: {
    type: Number
  },
  address: {
    type: String
  },
  lastUpdated: {
    type: Date,
    default: Date.now
  }
});


// ---------------- MEDICAL INFORMATION ----------------
const medicalSchema = new mongoose.Schema({
  allergies: [String],
  diseases: [String],
  medications: [String],
  bloodPressure: String,
  diabetes: Boolean,
  heartCondition: Boolean
});


// ---------------- MEDICAL REPORT HISTORY ----------------
const reportSchema = new mongoose.Schema({
  fileName: String,
  uploadedAt: {
    type: Date,
    default: Date.now
  },
  extractedText: String,
  aiSummary: String,
  aiSuggestions: String
});


// ---------------- USER SCHEMA ----------------
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

    phoneNumber: {
      type: String
    },

    gender: {
      type: String
    },

    dateOfBirth: {
      type: Date
    },

    age: {
      type: Number
    },

    bloodGroup: {
      type: String
    },


    // ---------------- ADDRESS ----------------
    address: {
      addressLine1: String,
      city: String,
      state: String,
      pincode: String
    },


    // ---------------- BODY METRICS ----------------
    bodyMetrics: {
      height: Number,
      weight: Number,
      bmi: Number
    },


    // ---------------- EMERGENCY CONTACTS ----------------
    familyMember: emergencyContactSchema,

    emergencyContact: emergencyContactSchema,


    // ---------------- WEARABLE DEVICE ----------------
    wearableDevice: wearableSchema,


    // ---------------- LOCATION ----------------
    location: locationSchema,


    // ---------------- MEDICAL HISTORY ----------------
    medicalInfo: medicalSchema,


    // ---------------- REPORT HISTORY ----------------
    reports: [reportSchema]

  },
  {
    timestamps: true
  }
);


module.exports = mongoose.model("User", userSchema);