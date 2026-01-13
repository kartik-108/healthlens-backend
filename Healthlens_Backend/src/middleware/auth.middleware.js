const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // Token present hai ya nahi
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    // Token verify
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // ✅ IMPORTANT: controller isi ko use kar raha hai
    req.userId = decoded.id;

    next();
  } catch (error) {
    console.error("AUTH MIDDLEWARE ERROR 👉", error);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

module.exports = authMiddleware;
