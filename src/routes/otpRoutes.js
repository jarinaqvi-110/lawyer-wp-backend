const express = require("express");
const router = express.Router();
const otpController = require("../controllers/otpController");

router.post("/request-reset", otpController.requestReset);
router.post("/reset-password", otpController.resetPassword);

module.exports = router;
