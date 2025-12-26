const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Otp = sequelize.define(
  "Otp",
  {
    otp_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    user_type: {
      type: DataTypes.ENUM("client", "lawyer"),
      allowNull: false,
    },

    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    otp_hash: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },

    expires_at: {
      type: DataTypes.DATE,
      allowNull: false,
    },

    is_used: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },

    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "otps",
    timestamps: false,
    indexes: [
      { fields: ["user_type", "user_id"] },
      { fields: ["expires_at"] },
    ],
  }
);

module.exports = Otp;
