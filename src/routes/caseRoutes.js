const express = require("express");
const router = express.Router();

const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");

const {
  createCase,
  getMyCases,
  getLawyerCases,
} = require("../controllers/caseController");

// CLIENT
router.post("/", auth, role("client"), createCase);
router.get("/my", auth, role("client"), getMyCases);

// LAWYER
router.get("/lawyer", auth, role("lawyer"), getLawyerCases);

module.exports = router;
