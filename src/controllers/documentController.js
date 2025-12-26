const { Document, Case } = require("../models");

exports.uploadDocument = async (req, res) => {
  try {
    const { case_id, uploader_type, uploader_id } = req.body;

    if (!req.file) return res.status(400).json({ message: "No file uploaded" });

    // Optional: validate case exists
    const foundCase = await Case.findByPk(case_id);
    if (!foundCase) return res.status(404).json({ message: "Case not found" });

    const doc = await Document.create({
      case_id: Number(case_id),
      uploader_type,
      uploader_id: Number(uploader_id),
      file_name: req.file.originalname,
      file_path: req.file.path,
      file_type: req.file.mimetype,
      uploaded_at: new Date(),
    });

    res.json({ message: "Uploaded", document: doc });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.listDocuments = async (req, res) => {
  try {
    const { caseId } = req.params;
    const docs = await Document.findAll({
      where: { case_id: Number(caseId) },
      order: [["uploaded_at", "DESC"]],
    });
    res.json(docs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
