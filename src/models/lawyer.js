const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Lawyer = sequelize.define(
  "Lawyer",
  {
    lawyer_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    name: {
      type: DataTypes.STRING(45),
      allowNull: false,
    },

    email: {
      type: DataTypes.STRING(45),
      allowNull: false,
      unique: true,
    },

    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },

   specialization: {
 type: DataTypes.STRING(100),
  allowNull: true,
  defaultValue: "General"
   },


    rating: {
      type: DataTypes.DECIMAL(2, 1),
      defaultValue: 0.0,
    },

    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "lawyers",
    timestamps: false,
  }
);

module.exports = Lawyer;
