const mongoose = require("mongoose");

const sosSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    location: {
      latitude: Number,
      longitude: Number
    },

    heartRate: Number,

    spo2: Number,

    status: {
      type: String,
      default: "active"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("SOS", sosSchema);