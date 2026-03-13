const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");
const connectDB = require("./src/config/db");
const sosRoutes = require('./src/routes/sos.routes');

app.use("/api/sos", sosRoutes);
dotenv.config();
// 🔹 DB connect
connectDB();
// 🔹 App init
const app = express();
// 🔹 Middlewares
app.use(cors());
app.use(express.json());
// 🔹 Routes
const authRoutes = require('./src/routes/auth.routes');
const userRoutes = require('./src/routes/user.routes');
app.use("/api/auth", authRoutes);
app.use("/api/auth", userRoutes);
app.get("/", (req, res) => {
  res.send("HealthLens Backend is Live! 🚀");
});
// 🔹 Test route
app.get("/api", (req, res) => {
  res.send("HealthLens Backend Running 🚀");
});
// 🔹 Serve frontend
app.use(express.static(path.join(__dirname, "Healthlens_Frontend")));
// 🔹 Server start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
const locationRoutes = require("./src/routes/location.routes");

app.use("/api/location", locationRoutes);
const reportRoutes = require("./src/routes/report.routes");

app.use("/api/report", reportRoutes);