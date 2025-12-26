const bcrypt = require("bcrypt");
const { Client, Lawyer, Otp } = require("../models");
const transporter = require("../utils/mailer");
const { generateOtp, hashOtp } = require("../utils/otp");

// POST /api/otp/request-reset
// body: { email, userType: "client" | "lawyer" }
exports.requestReset = async (req, res) => {
  try {
    const { email, userType } = req.body;

    if (!email || !userType) {
      return res.status(400).json({ message: "email and userType are required" });
    }
    if (userType !== "client" && userType !== "lawyer") {
      return res.status(400).json({ message: "userType must be 'client' or 'lawyer'" });
    }

    const UserModel = userType === "lawyer" ? Lawyer : Client;
    const idField = userType === "lawyer" ? "lawyer_id" : "client_id";

    const user = await UserModel.findOne({ where: { email } });
    if (!user) return res.status(404).json({ message: "User not found" });

    // Optional: invalidate previous OTPs for this user (cleaner UX)
    await Otp.update(
      { is_used: true },
      { where: { user_type: userType, user_id: user[idField], is_used: false } }
    );

    const otp = generateOtp();           // "123456"
    const otpHash = hashOtp(otp);        // sha256 hash

    await Otp.create({
      user_type: userType,
      user_id: user[idField],
      otp_hash: otpHash,
      expires_at: new Date(Date.now() + 10 * 60 * 1000), // 10 minutes
      is_used: false,
    });

    await transporter.sendMail({
      from: process.env.MAIL_FROM,
      to: email,
      subject: "Password Reset OTP",
      text: `Your OTP is ${otp}. It expires in 10 minutes.`,
    });

    return res.json({ message: "OTP sent to email" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// POST /api/otp/reset-password
// body: { email, userType: "client" | "lawyer", otp, newPassword }
exports.resetPassword = async (req, res) => {
  try {
    const { email, userType, otp, newPassword } = req.body;

    if (!email || !userType || !otp || !newPassword) {
      return res.status(400).json({ message: "email, userType, otp, newPassword are required" });
    }
    if (userType !== "client" && userType !== "lawyer") {
      return res.status(400).json({ message: "userType must be 'client' or 'lawyer'" });
    }
    if (newPassword.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters" });
    }

    const UserModel = userType === "lawyer" ? Lawyer : Client;
    const idField = userType === "lawyer" ? "lawyer_id" : "client_id";

    const user = await UserModel.findOne({ where: { email } });
    if (!user) return res.status(404).json({ message: "User not found" });

    const otpRecord = await Otp.findOne({
      where: {
        user_type: userType,
        user_id: user[idField],
        is_used: false,
      },
      order: [["otp_id", "DESC"]],
    });

    if (!otpRecord) return res.status(400).json({ message: "No valid OTP found" });
    if (otpRecord.expires_at < new Date()) {
      return res.status(400).json({ message: "OTP expired" });
    }

    const incomingHash = hashOtp(otp);
    if (incomingHash !== otpRecord.otp_hash) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    // Update password
    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    // Mark OTP used
    otpRecord.is_used = true;
    await otpRecord.save();

    return res.json({ message: "Password reset successful" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
