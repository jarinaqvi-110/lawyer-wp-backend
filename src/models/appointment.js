const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Appointment = sequelize.define(
  "Appointment",
  {
    appointment_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    client_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    lawyer_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    appointment_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },

    status: {
      type: DataTypes.STRING(45),
      defaultValue: "pending", // pending / confirmed / completed
    },

    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "appointments",
    timestamps: false,
  }
);

module.exports = Appointment;
