const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");
const connectDB = require("./src/config/db");
dotenv.config();
// 🔹 DB connect
connectDB();
// 🔹 App init (VERY IMPORTANT: sabse pehle)
const app = express();
// 🔹 Middlewares
app.use(cors());
app.use(express.json());
// 🔹 Routes
const authRoutes = require("./src/routes/auth.routes");
app.use("/api/auth", authRoutes);
// 🔹 Test route
app.get("/api", (req, res) => {
  res.send("HealthLens Backend Running 🚀");
});
// 🔹 Serve frontend
app.use(express.static(path.join(__dirname, "Healthlens_Frontend")));
// 🔹 Server start (ALWAYS AT END)
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});