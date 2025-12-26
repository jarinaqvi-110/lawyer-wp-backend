const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Case = sequelize.define(
  "Case",
  {
    case_id: {
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

    title: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },

    description: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },

    status: {
      type: DataTypes.STRING(45),
      defaultValue: "pending",
    },

    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "cases",
    timestamps: false,
  }
);

module.exports = Case;
