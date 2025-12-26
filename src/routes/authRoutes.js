const express = require("express");
const router = express.Router();

const { registerClient, registerLawyer, login } = require("../controllers/authController");

router.post("/client/register", registerClient);
router.post("/lawyer/register", registerLawyer);
router.post("/login", login);

module.exports = router;
