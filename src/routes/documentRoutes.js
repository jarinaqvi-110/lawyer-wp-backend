const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");

const { uploadDocument, listDocuments } = require("../controllers/documentController");

// storage config
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => {
    const unique = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, unique + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

router.post("/upload", upload.single("file"), uploadDocument);
router.get("/:caseId", listDocuments);

module.exports = router;
