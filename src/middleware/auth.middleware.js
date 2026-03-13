const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  try {
    // 1️⃣ Get Authorization header
    const authHeader = req.headers.authorization;

    // 2️⃣ Check if header exists
    if (!authHeader) {
      return res.status(401).json({
        success: false,
        message: "Authorization header missing"
      });
    }

    // 3️⃣ Check Bearer format
    if (!authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Invalid authorization format. Use: Bearer TOKEN"
      });
    }

    // 4️⃣ Extract token
    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Token missing"
      });
    }

    // 5️⃣ Verify token
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "healthlens_secret"
    );


    // 6️⃣ Validate payload
    if (!decoded.id) {
      return res.status(401).json({
        success: false,
        message: "Invalid token payload"
      });
    }

    // 7️⃣ Attach user ID to request
    req.userId = decoded.id;

    // Optional debug log
    console.log("Authenticated user:", req.userId);

    // 8️⃣ Continue to next middleware / route
    next();

  } catch (error) {

    console.error("AUTH MIDDLEWARE ERROR:", error.message);

    // Token expired
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        success: false,
        message: "Token expired"
      });
    }

    // Invalid token
    return res.status(401).json({
      success: false,
      message: "Invalid token"
    });
  }
};

module.exports = authMiddleware;