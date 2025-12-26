const Case = require("../models/Case");

/**
 * CLIENT → Create case
 */
exports.createCase = async (req, res) => {
  try {
    const { title, description, lawyer_id } = req.body;

    const newCase = await Case.create({
      client_id: req.user.id, // from JWT
      lawyer_id: lawyer_id || null,
      title,
      description,
    });

    res.status(201).json(newCase);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/**
 * CLIENT → Get own cases
 */
exports.getMyCases = async (req, res) => {
  try {
    const cases = await Case.findAll({
      where: { client_id: req.user.id },
    });

    res.json(cases);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/**
 * LAWYER → Get assigned cases
 */
exports.getLawyerCases = async (req, res) => {
  try {
    const cases = await Case.findAll({
      where: { lawyer_id: req.user.id },
    });

    res.json(cases);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
