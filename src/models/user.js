const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  /* ===== EXISTING FIELDS (UNCHANGED) ===== */
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

  /* ===== PROFILE INFORMATION ===== */
  phone: {
    type: String
  },

  gender: {
    type: String
  },

  dob: {
    type: Date
  },

  bloodGroup: {
    type: String
  },

  address: {
    addressLine: {
      type: String
    },
    city: {
      type: String
    },
    state: {
      type: String
    },
    pincode: {
      type: String
    }
  },

  emergencyContact: {
    name: {
      type: String
    },
    phone: {
      type: String
    }
  },

  /* ===== MEDICAL INFORMATION ===== */
  medical: {
    height: {
      type: Number
    },
    weight: {
      type: Number
    },
    allergies: {
      type: [String],
      default: []
    },
    conditions: {
      type: [String],
      default: []
    },
    allergyNotes: {
      type: String
    }
  }

}, {
  timestamps: true
});

module.exports = mongoose.model("User", userSchema);