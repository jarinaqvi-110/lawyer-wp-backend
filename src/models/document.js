const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Document = sequelize.define(
  "Document",
  {
    document_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    case_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    uploaded_by_type: {
      type: DataTypes.ENUM("client", "lawyer"),
      allowNull: false,
    },

    uploaded_by_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    file_path: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },

    uploaded_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "documents",
    timestamps: false,
  }
);

module.exports = Document;
