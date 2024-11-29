const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

router.post("/tokens", authController.loginUser);
router.post("/token", authController.loginAdmin);

module.exports = router;
