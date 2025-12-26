const express = require("express");
const cors = require("cors");
require("dotenv").config();

const sequelize = require("./src/config/db");
require("./src/models"); // loads models + associations

const app = express();
app.use(cors());
app.use(express.json());

// static uploads
app.use("/uploads", express.static("uploads"));

// routes
const authRoutes = require("./src/routes/authRoutes");
const otpRoutes = require("./src/routes/otpRoutes");
const caseRoutes = require("./src/routes/caseRoutes");

app.use("/api/auth", authRoutes);
app.use("/api/otp", otpRoutes);
app.use("/api/cases", caseRoutes);

// base route
app.get("/", (req, res) => {
  res.send("Backend API running ✅");
});

const PORT = process.env.PORT || 3000;

(async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Database connected successfully");

    await sequelize.sync({ alter: true });
    console.log("✅ Models synced");

    app.listen(PORT, () => {
      console.log(`✅ Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error("❌ Startup failed:", err.message);
    process.exit(1);
  }
})();
