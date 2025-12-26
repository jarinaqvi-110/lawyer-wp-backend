const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Client, Lawyer } = require("../models");

const generateToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "7d" });
};

const registerClient = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const emailUsed =
      (await Client.findOne({ where: { email } })) ||
      (await Lawyer.findOne({ where: { email } }));

    if (emailUsed) return res.status(409).json({ message: "Email already in use" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const client = await Client.create({
      name,
      email,
      password: hashedPassword,
    });

    return res.status(201).json({
      message: "Client registered successfully",
      client_id: client.client_id,
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const registerLawyer = async (req, res) => {
  try {
    const { name, email, password, specialization } = req.body;

    const emailUsed =
      (await Client.findOne({ where: { email } })) ||
      (await Lawyer.findOne({ where: { email } }));

    if (emailUsed) return res.status(409).json({ message: "Email already in use" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const lawyer = await Lawyer.create({
      name,
      email,
      password: hashedPassword,
      specialization,
      rating: 0.0,
    });

    return res.status(201).json({
      message: "Lawyer registered successfully",
      lawyer_id: lawyer.lawyer_id,
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const client = await Client.findOne({ where: { email } });
    if (client) {
      const ok = await bcrypt.compare(password, client.password);
      if (!ok) return res.status(401).json({ message: "Invalid credentials" });

      const token = generateToken({ id: client.client_id, role: "client" });
      return res.json({ token, role: "client", id: client.client_id });
    }

    const lawyer = await Lawyer.findOne({ where: { email } });
    if (lawyer) {
      const ok = await bcrypt.compare(password, lawyer.password);
      if (!ok) return res.status(401).json({ message: "Invalid credentials" });

      const token = generateToken({ id: lawyer.lawyer_id, role: "lawyer" });
      return res.json({ token, role: "lawyer", id: lawyer.lawyer_id });
    }

    return res.status(401).json({ message: "Invalid credentials" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

module.exports = {
  registerClient,
  registerLawyer,
  login,
};
