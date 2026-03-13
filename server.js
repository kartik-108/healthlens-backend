const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();


// ---------------- MIDDLEWARE ----------------
app.use(cors());
app.use(express.json());


// ---------------- HEALTH CHECK ROUTE ----------------
app.get("/", (req, res) => {
  res.status(200).json({
    message: "HealthLens Backend API Running 🚀",
    status: "success"
  });
});


// ---------------- ROUTES ----------------
const authRoutes = require("./src/routes/auth.routes");
const userRoutes = require("./src/routes/user.routes");
const sosRoutes = require("./src/routes/sos.routes");
const locationRoutes = require("./src/routes/location.routes");
const reportRoutes = require("./src/routes/report.routes");

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/sos", sosRoutes);
app.use("/api/location", locationRoutes);
app.use("/api/report", reportRoutes);


// ---------------- DATABASE CONNECTION ----------------
mongoose.connect(process.env.MONGO_URI)
.then(() => {
  console.log("MongoDB Connected");

  const PORT = process.env.PORT || 5000;

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });

})
.catch((error) => {
  console.error("MongoDB connection failed:", error);
  process.exit(1);
});


// ---------------- GLOBAL ERROR HANDLER ----------------
app.use((err, req, res, next) => {
  console.error(err.stack);

  res.status(500).json({
    message: "Internal Server Error",
    error: err.message
  });
});