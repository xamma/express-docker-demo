const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const app = express();
const port = 3000;

// Middleware zum Erstellen des Upload-Ordners, wenn er nicht vorhanden ist
const createUploadsFolder = (req, res, next) => {
  const uploadDir = path.join(__dirname, "uploads");
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
  }
  next();
};

// Speicherort für die hochgeladenen Dateien
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
  },
});

// Initialisieren von multer
const upload = multer({ storage: storage });

// Initialisieren des Upload-Ordners-Middleware
app.use(createUploadsFolder);

// GET-Route für die Startseite
app.get("/", (req, res) => {
  res.send("Hooray, it's weekend!");
});

// POST-Route zum Hochladen von Bildern
app.post("/images", upload.single("image"), (req, res) => {
  // Zugriff auf die hochgeladene Datei über req.file
  if (!req.file) {
    return res.status(400).send("No file uploaded.");
  }
  res.send("Image uploaded successfully.");
});

// Starten des Servers
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
