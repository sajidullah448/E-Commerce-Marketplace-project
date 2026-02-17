const multer = require("multer");
const path = require("path");

/**
 * Storage configuration
 */
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "src/uploads/");
  },
  filename: (req, file, cb) => {
    const uniqueName =
      Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      uniqueName + path.extname(file.originalname)
    );
  }
});

/**
 * File filter (images only)
 */
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|webp/;
  const extName = allowedTypes.test(
    path.extname(file.originalname).toLowerCase()
  );
  const mimeType = allowedTypes.test(file.mimetype);

  if (extName && mimeType) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed"), false);
  }
};

/**
 * Multer upload instance
 */
const upload = multer({
  storage,
  limits: { fileSize: 2 * 1024 * 1024 }, // 2MB
  fileFilter
});

module.exports = upload;
