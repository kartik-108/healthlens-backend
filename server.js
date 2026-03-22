const fetch = require("node-fetch");
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

// ---------------- MIDDLEWARE ----------------
app.use(cors({
  origin: "*", // production me specific domain use karna
  methods: ["GET", "POST", "PUT", "DELETE"]
}));

app.use(express.json());

// ---------------- HEALTH CHECK ROUTE ----------------
app.get("/", (req, res) => {
  res.status(200).json({
    message: "HealthLens Backend API Running 🚀",
    status: "success"
  });
});


// ================= 🔥 NEW ROUTE (IMPORTANT) =================
// 🏥 Fetch hospitals from Overpass API
app.post("/hospitals", async (req, res) => {

  const { lat, lon, radius } = req.body;

  if (!lat || !lon || !radius) {
    return res.status(400).json({ error: "Missing parameters" });
  }

  const query = `
[out:json][timeout:15];
(
  node["amenity"="hospital"](around:${radius},${lat},${lon});
  way["amenity"="hospital"](around:${radius},${lat},${lon});
  relation["amenity"="hospital"](around:${radius},${lat},${lon});
);
out center;
`;

  try {
    const response = await fetch("https://overpass-api.de/api/interpreter", {
      method: "POST",
      body: query
    });

    if (!response.ok) {
      throw new Error("Overpass API failed");
    }

    const data = await response.json();

    res.json(data);

  } catch (err) {
    console.error("❌ Overpass Error:", err.message);
    res.status(500).json({ error: "Failed to fetch hospitals" });
  }
});


// ---------------- ROUTES ----------------
const authRoutes = require("./src/routes/auth.routes");
const userRoutes = require("./src/routes/user.routes");
const sosRoutes = require("./src/routes/sos.routes");
const locationRoutes = require("./src/routes/location.routes");
const reportRoutes = require("./src/routes/report.routes");
const appointmentRoutes = require("./src/routes/appointment.routes");

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/sos", sosRoutes);
app.use("/api/location", locationRoutes);
app.use("/api/report", reportRoutes);
app.use("/api/appointments", appointmentRoutes);


// ---------------- DATABASE CONNECTION ----------------
const connectDB = async () => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI is not defined in environment variables");
    }

    await mongoose.connect(process.env.MONGO_URI);

    console.log("✅ MongoDB Connected");

    const PORT = process.env.PORT || 5000;

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });

  } catch (error) {
    console.error("❌ MongoDB connection failed:", error.message);
    process.exit(1);
  }
};

connectDB();


// ---------------- GLOBAL ERROR HANDLER ----------------
app.use((err, req, res, next) => {
  console.error(err.stack);

  res.status(500).json({
    message: "Internal Server Error",
    error: err.message
  });
});