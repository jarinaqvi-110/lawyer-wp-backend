require("dotenv").config();
const transporter = require("./src/utils/mailer");

(async () => {
  try {
    await transporter.sendMail({
      from: process.env.MAIL_FROM,
      to: process.env.MAIL_USER,
      subject: "OTP Test Email ✅",
      text: "If you received this, Gmail SMTP is working!",
    });

    console.log("✅ Test email sent successfully");
  } catch (err) {
    console.error("❌ Email failed:", err.message);
  }
})();
