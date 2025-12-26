const Client = require("./client");
const Lawyer = require("./lawyer");
const Case = require("./case");
const Appointment = require("./appointment");
const Message = require("./message");
const Document = require("./document");
const Rating = require("./rating");
const Otp = require("./otp");


// Client → Case (1 to many)
Client.hasMany(Case, { foreignKey: "client_id" });
Case.belongsTo(Client, { foreignKey: "client_id" });

// Lawyer → Case (1 to many)
Lawyer.hasMany(Case, { foreignKey: "lawyer_id" });
Case.belongsTo(Lawyer, { foreignKey: "lawyer_id" });

// Client → Appointment (1 to many)
Client.hasMany(Appointment, { foreignKey: "client_id" });
Appointment.belongsTo(Client, { foreignKey: "client_id" });

// Lawyer → Appointment (1 to many)
Lawyer.hasMany(Appointment, { foreignKey: "lawyer_id" });
Appointment.belongsTo(Lawyer, { foreignKey: "lawyer_id" });

// Case → Message (1 to many)
Case.hasMany(Message, { foreignKey: "case_id" });
Message.belongsTo(Case, { foreignKey: "case_id" });

// Case → Document (1 to many)
Case.hasMany(Document, { foreignKey: "case_id" });
Document.belongsTo(Case, { foreignKey: "case_id" });

// Case → Rating (1 to 1)
Case.hasOne(Rating, { foreignKey: "case_id" });
Rating.belongsTo(Case, { foreignKey: "case_id" });

// Client → Rating (1 to many)
Client.hasMany(Rating, { foreignKey: "client_id" });
Rating.belongsTo(Client, { foreignKey: "client_id" });

// Lawyer → Rating (1 to many)
Lawyer.hasMany(Rating, { foreignKey: "lawyer_id" });
Rating.belongsTo(Lawyer, { foreignKey: "lawyer_id" });

module.exports = {
  Client,
  Lawyer,
  Case,
  Appointment,
  Message,
  Document,
  Rating,
  Otp,
};
