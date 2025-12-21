const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./src/config/db");

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

// ROUTES
const authRoutes = require("./src/routes/auth.routes");
app.use("/api/auth", authRoutes);

// TEST ROUTE
app.get("/", (req, res) => {
  res.send("HealthLens Backend Running 🚀");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
