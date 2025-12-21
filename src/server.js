console.log("👉 Server file started");

require("dotenv").config();

console.log("👉 ENV LOADED");
console.log("👉 PORT:", process.env.PORT);
console.log("👉 MONGO_URI exists:", process.env.MONGO_URI ? "YES" : "NO");

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("HealthLens Backend is LIVE 🚀");
});

(async () => {
  try {
    console.log("👉 Trying DB connection...");
    await connectDB();

    app.listen(process.env.PORT, () => {
      console.log(`🚀 Server running on port ${process.env.PORT}`);
    });
  } catch (err) {
    console.error("❌ Startup error:", err);
  }
})();
