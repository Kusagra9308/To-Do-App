const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  changePassword,
} = require("../controllers/auth-controllers");
const requireAuth = require("../middleware/auth-middleware");

router.post("/register", registerUser);
router.post("/login", loginUser);

// 🔐 protected
router.post("/change-password", requireAuth, changePassword);

module.exports = router;
