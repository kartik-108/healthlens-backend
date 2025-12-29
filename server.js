const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");

const connectDB = require("./src/config/db");

dotenv.config();

// 🔹 Connect MongoDB
connectDB();

// 🔹 App init
const app = express();

// 🔹 Middlewares
app.use(cors());
app.use(express.json());

// 🔹 API Routes
const authRoutes = require("./src/routes/auth.routes");
app.use("/api/auth", authRoutes);

// 🔹 Health check / test route
app.get("/api", (req, res) => {
  res.send("HealthLens Backend Running 🚀");
});

// 🔹 Serve Frontend (STATIC FILES)
const FRONTEND_PATH = path.join(__dirname, "Healthlens_Frontend");
app.use(express.static(FRONTEND_PATH));

// 🔹 Handle direct HTML access (IMPORTANT)
app.get("*", (req, res) => {
  res.sendFile(path.join(FRONTEND_PATH, "index.html"));
});

// 🔹 Start server (ALWAYS LAST)
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
