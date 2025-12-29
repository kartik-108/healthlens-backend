const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

const connectDB = require("./src/config/db");

dotenv.config();

// 🔹 Connect MongoDB
connectDB();

// 🔹 Init app
const app = express();

// 🔹 Middlewares
app.use(cors({
  origin: "*", // Netlify + local dono allow
}));
app.use(express.json());

// 🔹 Routes
const authRoutes = require("./src/routes/auth.routes");
app.use("/api/auth", authRoutes);

// 🔹 Health check route (VERY IMPORTANT FOR RENDER)
app.get("/", (req, res) => {
  res.send("HealthLens Backend API is running 🚀");
});

// 🔹 Server start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
